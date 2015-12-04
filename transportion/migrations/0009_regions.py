# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0008_locationmarkers'),
    ]

    operations = [
        migrations.CreateModel(
            name='regions',
            fields=[
                ('id', models.CharField(max_length=6, serialize=False, primary_key=True)),
                ('pid', models.CharField(max_length=6)),
                ('name', models.CharField(max_length=20)),
                ('level', models.CharField(max_length=1)),
            ],
        ),
    ]
