# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request, Response
import json
from datetime import datetime


class PulsarAPIController(http.Controller):
    """REST API endpoints for Pulsar OEE Frontend"""

    @http.route('/api/machines', auth='user', type='json', methods=['GET'])
    def get_machines(self, **kwargs):
        """Get all machines with their current metrics"""
        machines = request.env['pulsar.machine'].search([('active', '=', True)])
        return {
            'success': True,
            'data': [{
                'id': m.id,
                'name': m.name,
                'type': m.machine_type,
                'status': m.status,
                'shift': m.shift,
                'availability': m.availability,
                'current_speed': m.current_speed,
                'oee': m.oee_percentage,
                'total_products': m.total_products,
                'performance': m.performance,
                'operator': m.current_operator_id.name if m.current_operator_id else None,
                'sku': m.current_sku_id.name if m.current_sku_id else None,
                'operation': m.current_operation,
                'elapsed_time': m.elapsed_time,
            } for m in machines]
        }

    @http.route('/api/machines/<int:machine_id>', auth='user', type='json', methods=['GET'])
    def get_machine(self, machine_id, **kwargs):
        """Get detailed machine information"""
        machine = request.env['pulsar.machine'].browse(machine_id)
        if not machine.exists():
            return {'success': False, 'error': 'Machine not found'}, 404
        
        return {
            'success': True,
            'data': {
                'id': machine.id,
                'name': machine.name,
                'type': machine.machine_type,
                'status': machine.status,
                'shift': machine.shift,
                'availability': machine.availability,
                'current_speed': machine.current_speed,
                'oee': machine.oee_percentage,
                'total_products': machine.total_products,
                'performance': machine.performance,
                'quality': machine.quality,
                'operator': machine.current_operator_id.name if machine.current_operator_id else None,
                'sku': machine.current_sku_id.name if machine.current_sku_id else None,
                'operation': machine.current_operation,
                'elapsed_time': machine.elapsed_time,
                'production_time': machine.total_production_time,
                'stop_time': machine.total_stop_time,
            }
        }

    @http.route('/api/machines/<int:machine_id>/status', auth='user', type='json', methods=['POST'])
    def update_machine_status(self, machine_id, **kwargs):
        """Update machine status"""
        machine = request.env['pulsar.machine'].browse(machine_id)
        if not machine.exists():
            return {'success': False, 'error': 'Machine not found'}, 404
        
        data = json.loads(request.httprequest.data)
        status = data.get('status')
        
        if status == 'producing':
            machine.start_production()
        elif status == 'stopped':
            reason = data.get('reason', '')
            machine.stop_production(reason)
        
        return {'success': True, 'message': f'Machine {machine.name} status updated to {status}'}

    @http.route('/api/machines/<int:machine_id>/metrics', auth='user', type='json', methods=['GET'])
    def get_machine_metrics(self, machine_id, **kwargs):
        """Get machine OEE metrics"""
        machine = request.env['pulsar.machine'].browse(machine_id)
        if not machine.exists():
            return {'success': False, 'error': 'Machine not found'}, 404
        
        metrics = request.env['pulsar.oee_metrics'].search([
            ('machine_id', '=', machine_id)
        ], limit=30, order='date desc')
        
        return {
            'success': True,
            'data': [{
                'date': m.date.isoformat(),
                'availability': m.total_availability,
                'performance': m.total_performance,
                'quality': m.total_quality,
                'oee': m.oee_value,
                'produced': m.total_produced,
            } for m in metrics]
        }

    @http.route('/api/stops', auth='user', type='json', methods=['GET'])
    def get_stops(self, **kwargs):
        """Get machine stops with filters"""
        machine_id = request.httprequest.args.get('machine_id')
        
        domain = []
        if machine_id:
            domain.append(('machine_id', '=', int(machine_id)))
        
        stops = request.env['pulsar.machine_stop'].search(domain, limit=100, order='start_time desc')
        
        return {
            'success': True,
            'data': [{
                'id': s.id,
                'machine': s.machine_id.name,
                'start_time': s.start_time.isoformat() if s.start_time else None,
                'end_time': s.end_time.isoformat() if s.end_time else None,
                'general_cause': s.general_cause,
                'specific_cause': s.specific_cause,
                'duration': s.duration_minutes,
                'status': s.status,
                'annotated': s.is_annotated,
            } for s in stops]
        }

    @http.route('/api/production-orders', auth='user', type='json', methods=['GET'])
    def get_production_orders(self, **kwargs):
        """Get production orders"""
        machine_id = request.httprequest.args.get('machine_id')
        
        domain = []
        if machine_id:
            domain.append(('machine_id', '=', int(machine_id)))
        
        orders = request.env['pulsar.production_order'].search(domain, limit=100, order='start_datetime desc')
        
        return {
            'success': True,
            'data': [{
                'id': o.id,
                'name': o.name,
                'machine': o.machine_id.name,
                'status': o.status,
                'produced': o.produced_quantity,
                'planned': o.planned_quantity,
                'quality': o.quality_percentage,
                'start_time': o.start_datetime.isoformat() if o.start_datetime else None,
            } for o in orders]
        }

    @http.route('/api/dashboard/summary', auth='user', type='json', methods=['GET'])
    def get_dashboard_summary(self, **kwargs):
        """Get dashboard summary metrics"""
        machines = request.env['pulsar.machine'].search([('active', '=', True)])
        
        total_machines = len(machines)
        producing = len(machines.filtered(lambda m: m.status == 'producing'))
        stopped = len(machines.filtered(lambda m: m.status == 'stopped'))
        avg_oee = sum(machines.mapped('oee_percentage')) / total_machines if total_machines > 0 else 0
        
        return {
            'success': True,
            'data': {
                'total_machines': total_machines,
                'producing': producing,
                'stopped': stopped,
                'average_oee': round(avg_oee, 2),
            }
        }
