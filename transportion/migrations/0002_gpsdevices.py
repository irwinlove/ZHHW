# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GPSdevices',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gpsNo', models.CharField(max_length=10)),
                ('sim', models.CharField(max_length=11)),
                ('name', models.CharField(max_length=40)),
                ('types', models.CharField(max_length=30)),
                ('manufacturer', models.CharField(max_length=50)),
                ('remarks', models.CharField(max_length=100)),
                ('parentId', models.ForeignKey(to='transportion.GPSdevices')),
            ],
        ),
    ]
