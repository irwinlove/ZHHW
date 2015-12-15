# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import transportion.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Enterprises',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('hierarchys', models.CharField(max_length=1, choices=[(b'1', b'\xe4\xb8\x80\xe7\xba\xa7\xe5\x8d\x95\xe4\xbd\x8d'), (b'2', b'\xe4\xba\x8c\xe7\xba\xa7\xe9\x83\xa8\xe9\x97\xa8'), (b'3', b'\xe4\xb8\x89\xe7\xba\xa7\xe9\x83\xa8\xe9\x97\xa8'), (b'4', b'\xe5\x9b\x9b\xe7\xba\xa7\xe9\x83\xa8\xe9\x97\xa8')])),
                ('parentId', models.ForeignKey(related_name='children', default=None, blank=True, to='transportion.Enterprises', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='GPSdevices',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gpsNo', models.CharField(max_length=10)),
                ('sim', models.CharField(max_length=11)),
                ('name', models.CharField(max_length=40)),
                ('types', models.CharField(max_length=30)),
                ('manufacturer', models.CharField(max_length=50)),
                ('remarks', models.CharField(max_length=200)),
            ],
        ),
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
            ],
        ),
        migrations.CreateModel(
            name='markerTypes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('icons', models.CharField(max_length=50)),
                ('remarks', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Regions',
            fields=[
                ('id', models.CharField(max_length=6, serialize=False, primary_key=True)),
                ('pid', models.CharField(max_length=6)),
                ('name', models.CharField(max_length=20)),
                ('level', models.CharField(max_length=1, choices=[(b'1', b'\xe7\x9c\x81/\xe7\x9b\xb4\xe8\xbe\x96\xe5\xb8\x82/\xe8\x87\xaa\xe6\xb2\xbb\xe5\x8c\xba'), (b'2', b'\xe5\xb8\x82'), (b'3', b'\xe5\x8c\xba/\xe5\x8e\xbf')])),
                ('zipCode', models.CharField(max_length=6, null=True)),
                ('tel', models.CharField(max_length=4, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicles',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, serialize=False, editable=False, primary_key=True)),
                ('licenseNumber', models.CharField(max_length=10)),
                ('enterprise', models.ForeignKey(to='transportion.Enterprises')),
            ],
        ),
        migrations.AddField(
            model_name='locationmarkers',
            name='markertypes',
            field=models.ForeignKey(to='transportion.markerTypes'),
        ),
        migrations.AddField(
            model_name='enterprises',
            name='region',
            field=models.ForeignKey(related_name='region_belong', default=None, blank=True, to='transportion.Regions', null=True),
        ),
    ]
