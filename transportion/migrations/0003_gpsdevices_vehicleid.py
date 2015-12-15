# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0002_gpsrtdatas'),
    ]

    operations = [
        migrations.AddField(
            model_name='gpsdevices',
            name='vehicleId',
            field=models.ForeignKey(related_name='vehicles_fixedOn', default=None, blank=True, to='transportion.Vehicles', null=True),
        ),
    ]
