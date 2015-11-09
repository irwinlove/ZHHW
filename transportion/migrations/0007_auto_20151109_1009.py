# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0006_auto_20151107_1713'),
    ]

    operations = [
        migrations.CreateModel(
            name='markerTypes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('icons', models.CharField(max_length=50)),
                ('remarks', models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='gpsdevices',
            name='parentId',
        ),
    ]
