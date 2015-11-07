# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0004_auto_20151107_1652'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gpsdevices',
            name='parentId',
            field=models.ForeignKey(related_name='children', default=None, blank=True, to='transportion.GPSdevices', null=True),
        ),
    ]
