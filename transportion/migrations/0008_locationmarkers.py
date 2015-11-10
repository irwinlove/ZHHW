# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import transportion.fields


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0007_auto_20151109_1009'),
    ]

    operations = [
        migrations.CreateModel(
            name='locationMarkers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('markerNo', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=50)),
                ('markerMaker', models.CharField(max_length=40, blank=True)),
                ('address', models.CharField(max_length=100, blank=True)),
                ('location', models.CharField(max_length=20)),
                ('lnglatXY', transportion.fields.ListField(blank=True)),
                ('markertypes', models.ForeignKey(to='transportion.markerTypes')),
            ],
        ),
    ]
