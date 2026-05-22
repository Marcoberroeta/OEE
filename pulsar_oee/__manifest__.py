# -*- coding: utf-8 -*-
{
    'name': 'Pulsar OEE - Manufacturing Dashboard',
    'version': '1.0.0',
    'category': 'Manufacturing',
    'sequence': 10,
    'summary': 'Real-time OEE (Overall Equipment Effectiveness) monitoring dashboard',
    'description': '''
Pulsar OEE - Manufacturing Real-time Monitoring Dashboard
============================================================

Complete manufacturing monitoring solution with:
- Real-time OEE calculation
- Machine status monitoring
- Production tracking
- Stop/downtime management
- Analytics and reporting
- REST APIs for external integrations
    ''',
    'author': 'Marco Berroeta',
    'website': 'https://github.com/Marcoberroeta/OEE',
    'depends': [
        'base',
        'stock',
        'hr',
    ],
    'data': [
        'security/ir.model.access.csv',
        'security/security_rules.xml',
        'views/menus.xml',
        'views/machine_views.xml',
        'views/production_order_views.xml',
        'views/machine_stop_views.xml',
        'views/oee_dashboard_views.xml',
        'data/demo_data.xml',
    ],
    'demo': [
        'data/demo_data.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'external_dependencies': {
        'python': ['requests'],
    },
}
