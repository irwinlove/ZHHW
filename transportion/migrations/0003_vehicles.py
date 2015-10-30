# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0002_auto_20151029_1401'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicles',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, serialize=False, editable=False, primary_key=True)),
                ('licenseNumber', models.CharField(max_length=10)),
                ('underEnterprise1', models.CharField(max_length=50)),
                ('underEnterprise2', models.CharField(max_length=50, blank=True)),
            ],
        ),
    ]
