# -*- coding: utf-8 -*-
from odoo import models, fields, api
from datetime import date, timedelta
import datetime
import logging

_logger=logging.getLogger(__name__)

class LibraryBook(models.Model):
    _name = 'library.book'
    _description = 'Library Book'
    # _inherit=['mail.thread', 'mail.activity.mixin']


    @api.model
    def d_w_m_calc(self, day_week_month):
        amount = 0
        agents_info = []
        full_info = [amount, agents_info]

        if day_week_month == "day":


            transactions = self.env['clickacrm.transactions'].read_group([('date','=', date.today()),('status','=', 'Confirmed'),
                                                                          ('types','=', 'deposit'), ('assigned_user', '!=', False)],
                                                                          fields=['assigned_user', 'amount', 'date', 'id'], groupby=['assigned_user'],
                                                                          orderby='amount DESC', limit=5)


            for t in transactions:

                teams = self.env['clickacrm.transactions'].search([('assigned_user', '=', t['assigned_user'][0])], order="date desc")
                last_id = self.env['clickacrm.transactions'].search([('date', '!=', False),('status','=', 'Confirmed'), ('types','=', 'deposit'),
                                                                     ('assigned_user','!=', False)], order="create_date desc", limit=1)
                full_info[0]+=t['amount']
                agents_info.append({
                    'last_id': last_id[0].id,
                    'agent_name': t['assigned_user'][1],
                    'team': teams[0].team.name,
                    'amount': t['amount']
                })

            return full_info




        if day_week_month == "week":

            now = date.today()
            monday = now - timedelta(days=now.weekday())
            sunday = monday + timedelta(days=7)

            transactions = self.env['clickacrm.transactions'].read_group([('date','>=', monday), ('date','<=', sunday),('status','=', 'Confirmed'), 
                                                                          ('types','=', 'deposit'),('assigned_user','!=', False)],
                                                                   fields=['assigned_user','amount', 'date'], groupby=['assigned_user'] ,orderby='amount DESC', limit=5)
            for t in transactions:
                teams = self.env['clickacrm.transactions'].search([('assigned_user', '=', t['assigned_user'][0])], order="date desc")

                full_info[0]+=t['amount']
                agents_info.append({
                    'agent_name': t['assigned_user'][1],
                    'team': teams[0].team.name,
                    'amount': t['amount']
                })

            return full_info







        if day_week_month == "month":
            ##                                                                    and <= last day of the month add later
            transactions = self.env['clickacrm.transactions'].read_group([('date','>=', date.today().replace(day=1)),('status','=', 'Confirmed'), 
                                                                          ('types','=', 'deposit'),('assigned_user','!=', False)],
                                                                   fields=['assigned_user','amount', 'date'], groupby=['assigned_user'] ,orderby='amount DESC', limit=5)

            for t in transactions:

                teams = self.env['clickacrm.transactions'].search([('assigned_user', '=', t['assigned_user'][0])], order="date desc")

                full_info[0]+=t['amount']
                agents_info.append({
                    'agent_name': t['assigned_user'][1],
                    'team': teams[0].team.name,
                    'amount': t['amount']
                })

            return full_info


    @api.model
    def style_func(self,amount,target):
        persentage = (amount/target*100) if (amount/target*100) < 100 else 100
        return f"width: {round(persentage)}%;"


    @api.model
    def return_time_till_10(self):
        today=datetime.datetime.now()
        month_name=today.strftime("%b")
        day=today.day
        year=today.year

        return f"{month_name} {day}, {year} 22:00:00"



    @api.model
    def today_calculations(self):

        counter = 0
        agents_info = []
        last_deposits=[]
        full_info = [counter, agents_info,last_deposits]

        transactions = self.env['clickacrm.transactions'].read_group(
            [ ('confirmation_date', '>=', datetime.datetime.now().replace(hour=0, minute=0,second=0)),
              ('confirmation_date', '<=', datetime.datetime.now().replace(hour=23, minute=59, second=59)),
              ('status', '=', 'Confirmed'), ('types', '=', 'deposit'),
              ('assigned_user', '!=', False)],
            fields=['assigned_user', 'amount', 'date', 'id'], groupby=['assigned_user'], orderby='amount DESC')

        top_last_deposits = self.env['clickacrm.transactions'].search(
            [('confirmation_date', '>=', datetime.datetime.now().replace(hour=0, minute=0,second=0)),
             ('confirmation_date', '<=', datetime.datetime.now()), ('status', '=', 'Confirmed'), ('types', '=', 'deposit'),
             ('assigned_user', '!=', False)], order="confirmation_date desc", limit=6)



        for last_depositer in top_last_deposits:

            full_info[2].append({
                'agent_name': last_depositer['assigned_user'].name,
                'amount': last_depositer['amount'],
                'time': last_depositer['confirmation_date'].strftime("%H:%M")
            })


        for t in transactions:


            last_id = self.env['clickacrm.transactions'].search(
                [('confirmation_date', '!=', False), ('status', '=', 'Confirmed'), ('types', '=', 'deposit'),
                 ('assigned_user', '!=', False)], order="create_date desc",
                limit=1)
            full_info[0] += t['amount']
            agents_info.append({
                'last_id': last_id[0].id,
                'agent_name': t['assigned_user'][1],
                'amount': t['amount']
            })

        return full_info
