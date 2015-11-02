# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
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
                ('parentId', models.ForeignKey(to='transportion.Enterprises', null=True)),
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
    ]
