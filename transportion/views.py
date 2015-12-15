# -*- coding: utf-8 -*-
from django.shortcuts import render,render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from django.core import serializers
import json
import models
# import logging
from transportion.models import GPSdevices,GPSRTDatas,Vehicles,Enterprises,Regions
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
def getRealTimeGPSData(request):
    if request.method=='GET':
        vehicles=json.loads(request.GET.get('vehicles'))
        GPSDatas=[]
        print(len(vehicles))
        print(vehicles)
        print(type(vehicles))
        if vehicles is not None:      
            for v in vehicles:
                print(v)
                GPSData=GPSRTDatas.objects.filter(deviceId__vehicleId__licenseNumber=v).order_by('curTime')[-0]
                # GPSDatas.append(list(GPSData))
                # GPSData.deviceId=GPSData.deviceId.vehicleId.licenseNumber
                GPSDatas.append(GPSData)
            GPSDatas_json=serializers.serialize('json',GPSDatas)
            # print(type(GPSDatas_json))
            # print(GPSDatas_json)
            return HttpResponse(GPSDatas_json)
def getHistTracks(request):
    if request.method=='GET':
        vehicle=request.GET.get('vehicle')
        startTime=request.GET.get('startTime')
        endTime=request.GET.get('endTime')
        if vehicle is not None:
            print(vehicle)
            GPSHistdata=GPSRTDatas.objects.filter(deviceId__vehicleId__licenseNumber=vehicle,curTime__lte=endTime,curTime__gte=startTime).order_by('curTime')
            GPSHistdata_json=serializers.serialize('json',GPSHistdata)
            return HttpResponse(GPSHistdata_json)