# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GPSRTDatas',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('signalState', models.CharField(max_length=1, blank=True)),
                ('lngX', models.FloatField(null=True, blank=True)),
                ('latY', models.FloatField(null=True, blank=True)),
                ('curTime', models.DateTimeField(blank=True)),
                ('velocity', models.FloatField(blank=True)),
                ('direction', models.CharField(max_length=1, blank=True)),
                ('temprature', models.FloatField(blank=True)),
                ('deviceState', models.CharField(max_length=1, blank=True)),
                ('ometer', models.FloatField()),
                ('event', models.CharField(max_length=20, blank=True)),
                ('parameter', models.CharField(max_length=100, blank=True)),
                ('deviceId', models.ForeignKey(to='transportion.GPSdevices')),
            ],
        ),
    ]
