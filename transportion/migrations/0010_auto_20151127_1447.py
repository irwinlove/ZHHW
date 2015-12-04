# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transportion', '0009_regions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='regions',
            name='level',
            field=models.CharField(max_length=1, choices=[(b'1', b'\xe7\x9c\x81/\xe7\x9b\xb4\xe8\xbe\x96\xe5\xb8\x82/\xe8\x87\xaa\xe6\xb2\xbb\xe5\x8c\xba'), (b'2', b'\xe5\xb8\x82'), (b'3', b'\xe5\x8c\xba/\xe5\x8e\xbf')]),
        ),
    ]
