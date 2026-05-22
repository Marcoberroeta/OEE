# -*- coding: utf-8 -*-
from odoo import models, fields, api
from datetime import datetime, timedelta


class Machine(models.Model):
    _name = 'pulsar.machine'
    _description = 'Production Machine'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    # Basic Info
    name = fields.Char(string='Machine ID', required=True, tracking=True)
    machine_type = fields.Selection([
        ('oee_pro', 'OEE Pro'),
        ('standard', 'Standard'),
    ], string='Type', default='oee_pro', tracking=True)
    
    # Status
    status = fields.Selection([
        ('idle', 'Idle'),
        ('producing', 'Producing'),
        ('stopped', 'Stopped'),
        ('maintenance', 'Maintenance'),
        ('offline', 'Offline'),
    ], string='Status', default='idle', tracking=True)
    
    # Metrics
    availability = fields.Float(string='Availability %', compute='_compute_availability', store=True)
    current_speed = fields.Float(string='Current Speed (u/min)', default=0)
    oee_percentage = fields.Float(string='OEE %', compute='_compute_oee', store=True)
    total_products = fields.Integer(string='Total Products', default=0)
    performance = fields.Float(string='Performance %', compute='_compute_performance', store=True)
    quality = fields.Float(string='Quality %', default=100)
    
    # Relations
    current_operator_id = fields.Many2one('hr.employee', string='Current Operator', tracking=True)
    current_sku_id = fields.Many2one('product.product', string='Current SKU', tracking=True)
    shift = fields.Selection([
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('night', 'Night'),
    ], string='Current Shift')
    
    # Operational Info
    current_operation = fields.Char(string='Current Operation')
    operation_type = fields.Selection([
        ('normal', 'Normal'),
        ('warning', 'Warning'),
        ('maintenance', 'Maintenance'),
    ], string='Operation Type', default='normal')
    
    elapsed_time = fields.Char(string='Elapsed Time', compute='_compute_elapsed_time')
    total_production_time = fields.Float(string='Total Production Time (min)', default=0)
    total_stop_time = fields.Float(string='Total Stop Time (min)', default=0)
    
    # Relations
    production_order_ids = fields.One2many('pulsar.production_order', 'machine_id', string='Production Orders')
    machine_stop_ids = fields.One2many('pulsar.machine_stop', 'machine_id', string='Machine Stops')
    
    # Active
    active = fields.Boolean(string='Active', default=True)
    created_date = fields.Datetime(string='Created', default=fields.Datetime.now)
    
    @api.depends('total_production_time', 'total_stop_time')
    def _compute_availability(self):
        """Calculate availability percentage"""
        for machine in self:
            total_time = machine.total_production_time + machine.total_stop_time
            if total_time > 0:
                machine.availability = (machine.total_production_time / total_time) * 100
            else:
                machine.availability = 0
    
    @api.depends('availability', 'current_speed', 'quality')
    def _compute_oee(self):
        """Calculate OEE = Availability * Performance * Quality"""
        for machine in self:
            performance = 0 if machine.current_speed == 0 else min(100, (machine.current_speed / 600) * 100)  # Assume 600 is max speed
            machine.oee_percentage = (machine.availability / 100) * (performance / 100) * (machine.quality / 100) * 100
    
    @api.depends('current_speed')
    def _compute_performance(self):
        """Calculate performance percentage"""
        for machine in self:
            if machine.current_speed > 0:
                machine.performance = min(100, (machine.current_speed / 600) * 100)  # Assume 600 is max speed
            else:
                machine.performance = 0
    
    @api.depends('created_date')
    def _compute_elapsed_time(self):
        """Calculate elapsed time since shift start"""
        for machine in self:
            if machine.created_date:
                elapsed = datetime.now() - machine.created_date
                hours = int(elapsed.total_seconds() // 3600)
                minutes = int((elapsed.total_seconds() % 3600) // 60)
                machine.elapsed_time = f'{hours}h {minutes}m'
            else:
                machine.elapsed_time = '0h 0m'
    
    def start_production(self):
        """Start machine production"""
        self.write({'status': 'producing'})
    
    def stop_production(self, reason=''):
        """Stop machine production"""
        self.write({'status': 'stopped'})
        # Create stop record
        self.env['pulsar.machine_stop'].create({
            'machine_id': self.id,
            'start_time': datetime.now(),
            'reason': reason,
        })
    
    def resume_production(self):
        """Resume machine production"""
        self.write({'status': 'producing'})
