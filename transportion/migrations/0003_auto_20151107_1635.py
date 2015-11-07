# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0002_gpsdevices'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gpsdevices',
            name='remarks',
            field=models.CharField(max_length=200),
        ),
    ]
