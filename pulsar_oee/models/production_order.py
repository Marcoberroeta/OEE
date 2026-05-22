# -*- coding: utf-8 -*-
from odoo import models, fields, api
from datetime import datetime


class ProductionOrder(models.Model):
    _name = 'pulsar.production_order'
    _description = 'Production Order'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    # Basic Info
    name = fields.Char(string='Order Number', required=True, tracking=True)
    machine_id = fields.Many2one('pulsar.machine', string='Machine', required=True, tracking=True)
    sku_id = fields.Many2one('product.product', string='SKU', tracking=True)
    operator_id = fields.Many2one('hr.employee', string='Operator', tracking=True)
    
    # Status
    status = fields.Selection([
        ('draft', 'Draft'),
        ('running', 'Running'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], string='Status', default='draft', tracking=True)
    
    # Production Data
    planned_quantity = fields.Integer(string='Planned Quantity', required=True)
    produced_quantity = fields.Integer(string='Produced Quantity', default=0)
    defective_quantity = fields.Integer(string='Defective Quantity', default=0)
    
    # Quality
    quality_percentage = fields.Float(string='Quality %', compute='_compute_quality')
    defect_notes = fields.Text(string='Defect Notes')
    
    # Time tracking
    start_datetime = fields.Datetime(string='Start Time', default=fields.Datetime.now)
    end_datetime = fields.Datetime(string='End Time')
    production_time = fields.Float(string='Production Time (min)', compute='_compute_production_time')
    
    # Relations
    defect_ids = fields.One2many('pulsar.defect', 'production_order_id', string='Defects')
    
    @api.depends('produced_quantity', 'defective_quantity')
    def _compute_quality(self):
        """Calculate quality percentage"""
        for order in self:
            total = order.produced_quantity + order.defective_quantity
            if total > 0:
                order.quality_percentage = (order.produced_quantity / total) * 100
            else:
                order.quality_percentage = 0
    
    @api.depends('start_datetime', 'end_datetime')
    def _compute_production_time(self):
        """Calculate production time in minutes"""
        for order in self:
            if order.start_datetime and order.end_datetime:
                delta = order.end_datetime - order.start_datetime
                order.production_time = delta.total_seconds() / 60
            else:
                order.production_time = 0
    
    def start_production(self):
        """Start production order"""
        self.write({
            'status': 'running',
            'start_datetime': datetime.now(),
        })
        self.machine_id.start_production()
    
    def complete_production(self):
        """Complete production order"""
        self.write({
            'status': 'completed',
            'end_datetime': datetime.now(),
        })
        self.machine_id.resume_production()
    
    def cancel_production(self):
        """Cancel production order"""
        self.write({'status': 'cancelled'})
