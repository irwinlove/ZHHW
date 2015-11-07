# -*- coding: utf-8 -*-
from django.contrib import admin
from transportion.models import Vehicles,Enterprises,GPSdevices
# Register your models here.
admin.site.register(Vehicles)
admin.site.register(Enterprises)
admin.site.register(GPSdevices)