# -*- coding: utf-8 -*-
from odoo import models, fields


class Defect(models.Model):
    _name = 'pulsar.defect'
    _description = 'Production Defect'

    production_order_id = fields.Many2one('pulsar.production_order', string='Production Order')
    defect_type = fields.Char(string='Defect Type')
    quantity = fields.Integer(string='Quantity', default=1)
    description = fields.Text(string='Description')
    created_date = fields.Datetime(string='Created', default=fields.Datetime.now)
