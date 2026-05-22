# -*- coding: utf-8 -*-
from odoo import models, fields, api
from datetime import datetime, timedelta


class OEEMetrics(models.Model):
    _name = 'pulsar.oee_metrics'
    _description = 'OEE Metrics Summary'
    _order = 'date desc'

    # Date
    date = fields.Date(string='Date', required=True, default=fields.Date.today)
    machine_id = fields.Many2one('pulsar.machine', string='Machine', required=True)
    
    # Metrics
    total_availability = fields.Float(string='Total Availability %')
    total_performance = fields.Float(string='Total Performance %')
    total_quality = fields.Float(string='Total Quality %')
    oee_value = fields.Float(string='OEE %', compute='_compute_oee')
    
    # Time breakdown (in minutes)
    production_time = fields.Float(string='Production Time (min)')
    planned_stop_time = fields.Float(string='Planned Stop Time (min)')
    unplanned_stop_time = fields.Float(string='Unplanned Stop Time (min)')
    
    # Production Summary
    total_produced = fields.Integer(string='Total Produced')
    total_defective = fields.Integer(string='Total Defective')
    total_orders = fields.Integer(string='Total Orders')
    
    @api.depends('total_availability', 'total_performance', 'total_quality')
    def _compute_oee(self):
        """Calculate OEE from its three components"""
        for metric in self:
            metric.oee_value = (metric.total_availability / 100) * (metric.total_performance / 100) * (metric.total_quality / 100) * 100
    
    @api.model
    def calculate_metrics_for_machine(self, machine_id, date=None):
        """Calculate OEE metrics for a machine on a specific date"""
        if not date:
            date = fields.Date.today()
        
        machine = self.env['pulsar.machine'].browse(machine_id)
        
        # Get production orders for the date
        orders = self.env['pulsar.production_order'].search([
            ('machine_id', '=', machine_id),
            ('start_datetime', '>=', datetime.combine(date, datetime.min.time())),
            ('start_datetime', '<=', datetime.combine(date, datetime.max.time())),
        ])
        
        # Calculate metrics
        total_produced = sum(orders.mapped('produced_quantity'))
        total_defective = sum(orders.mapped('defective_quantity'))
        total_production_time = sum(orders.mapped('production_time'))
        
        # Get stops
        stops = self.env['pulsar.machine_stop'].search([
            ('machine_id', '=', machine_id),
            ('start_time', '>=', datetime.combine(date, datetime.min.time())),
            ('start_time', '<=', datetime.combine(date, datetime.max.time())),
        ])
        
        planned_stops = sum(stops.filtered(lambda s: s.general_cause == 'planning').mapped('duration_minutes'))
        unplanned_stops = sum(stops.filtered(lambda s: s.general_cause != 'planning').mapped('duration_minutes'))
        
        # Calculate percentages
        total_time = total_production_time + planned_stops + unplanned_stops
        availability = (total_production_time / total_time * 100) if total_time > 0 else 0
        
        total_count = total_produced + total_defective
        quality = (total_produced / total_count * 100) if total_count > 0 else 0
        
        # Create or update metrics record
        metrics = self.search([
            ('machine_id', '=', machine_id),
            ('date', '=', date),
        ])
        
        data = {
            'machine_id': machine_id,
            'date': date,
            'total_availability': availability,
            'total_performance': 100,  # Simplified
            'total_quality': quality,
            'production_time': total_production_time,
            'planned_stop_time': planned_stops,
            'unplanned_stop_time': unplanned_stops,
            'total_produced': total_produced,
            'total_defective': total_defective,
            'total_orders': len(orders),
        }
        
        if metrics:
            metrics.write(data)
            return metrics
        else:
            return self.create(data)
