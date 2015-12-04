# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0011_auto_20151127_1455'),
    ]

    operations = [
        migrations.AddField(
            model_name='enterprises',
            name='region',
            field=models.ForeignKey(related_name='region_belong', default=None, blank=True, to='transportion.Regions', null=True),
        ),
    ]
