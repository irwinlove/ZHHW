# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0010_auto_20151127_1447'),
    ]

    operations = [
        migrations.AddField(
            model_name='regions',
            name='tel',
            field=models.CharField(max_length=4, null=True),
        ),
        migrations.AddField(
            model_name='regions',
            name='zipCode',
            field=models.CharField(max_length=6, null=True),
        ),
    ]
