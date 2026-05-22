# -*- coding: utf-8 -*-
from odoo import models, fields, api
from datetime import datetime


class MachineStop(models.Model):
    _name = 'pulsar.machine_stop'
    _description = 'Machine Stop/Downtime Record'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'start_time desc'

    # Relations
    machine_id = fields.Many2one('pulsar.machine', string='Machine', required=True, tracking=True)
    production_order_id = fields.Many2one('pulsar.production_order', string='Production Order')
    
    # Stop Details
    general_cause = fields.Selection([
        ('operation', 'Operation'),
        ('personal', 'Personal (HR)'),
        ('maintenance', 'Machine/Maintenance'),
        ('quality', 'Quality'),
        ('planning', 'Planning/Flow'),
        ('other', 'Other'),
    ], string='General Cause', tracking=True)
    
    specific_cause = fields.Char(string='Specific Cause', tracking=True)
    description = fields.Text(string='Description')
    
    # Time tracking
    start_time = fields.Datetime(string='Start Time', required=True, default=fields.Datetime.now, tracking=True)
    end_time = fields.Datetime(string='End Time', tracking=True)
    duration_minutes = fields.Float(string='Duration (minutes)', compute='_compute_duration', store=True)
    
    # Status
    status = fields.Selection([
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    ], string='Status', compute='_compute_status', store=True)
    
    # Annotation
    is_annotated = fields.Boolean(string='Annotated', default=False, tracking=True)
    
    @api.depends('start_time', 'end_time')
    def _compute_duration(self):
        """Calculate stop duration in minutes"""
        for stop in self:
            end = stop.end_time or datetime.now()
            delta = end - stop.start_time
            stop.duration_minutes = delta.total_seconds() / 60
    
    @api.depends('end_time')
    def _compute_status(self):
        """Determine if stop is ongoing or completed"""
        for stop in self:
            stop.status = 'completed' if stop.end_time else 'ongoing'
    
    def complete_stop(self):
        """Mark stop as completed"""
        self.write({'end_time': datetime.now()})
        self.machine_id.resume_production()
    
    def annotate_stop(self, general_cause, specific_cause, description=''):
        """Annotate stop with cause information"""
        self.write({
            'general_cause': general_cause,
            'specific_cause': specific_cause,
            'description': description,
            'is_annotated': True,
        })
