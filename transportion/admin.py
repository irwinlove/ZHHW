# -*- coding: utf-8 -*-
from django.contrib import admin
from transportion.models import Regions,Vehicles,Enterprises,GPSdevices,markerTypes,locationMarkers
# Register your models here.
admin.site.register(Vehicles)
admin.site.register(Enterprises)
admin.site.register(GPSdevices)
admin.site.register(markerTypes)
admin.site.register(locationMarkers)
admin.site.register(Regions)