# -*- coding: utf-8 -*-
from django.shortcuts import render,render_to_response
from django.template import RequestContext
from django.http import HttpResponse
import json
import models
# import logging
from transportion.models import Vehicles,Enterprises,Regions
# Create your views here.
def home(request):
	# return render_to_response('transportion/index.html',{},)
    return render_to_response('_base.html',{},)
def get_vehicleTree(request):
    all_vehicles=Vehicles.objects.all()
    all_enterprises=Enterprises.objects.all()
    all_dicts=toDicts(all_enterprises)
    v_dicts=toDicts(all_vehicles)
    all_dicts.extend(v_dicts)
    all_jsons=json.dumps(all_dicts,ensure_ascii=False)
    return HttpResponse(all_jsons)
def getJSON_VehicleTree(request):
    all_vehicles=Vehicles.objects.all()
    if request.GET['sortByName'] == 'areas':
        all_regions=Regions.objects.exclude(level='1')
        all_dicts=toRegionDicts(all_vehicles)
        r_dicts=toDicts(all_regions)
        all_dicts.extend(r_dicts)
    if request.GET['sortByName'] == 'enterprizes':
        all_enterprises=Enterprises.objects.all()
        all_dicts=toDicts(all_enterprises)
        v_dicts=toDicts(all_vehicles)
        all_dicts.extend(v_dicts)
    all_jsons=json.dumps(all_dicts,ensure_ascii=False)
    return HttpResponse(all_jsons)
def toDicts(objs):
    obj_arr=[]
    for o in objs:
        obj_arr.append(o.toDict())
    return obj_arr
def toRegionDicts(objs):
    obj_arr=[]
    for o in objs:
        obj_arr.append(o.toRegionDict())
    return obj_arr
def get_map(request):
    return render_to_response('transportion/maps.html',{},)
def get_realTimeLocator(request):
    return  render_to_response('transportion/realTimeLocator.html')
def get_allTimeLocator(request):
    return  render_to_response('transportion/allTimeLocator.html')
def get_tracks(request):
    return  render_to_response('transportion/tracks.html')
def get_trackHistory(request):
    return  render_to_response('transportion/trackHistory.html')