# -*- coding: utf-8 -*-
from django.shortcuts import render,render_to_response
from django.template import RequestContext
from django.http import HttpResponse
import json
import models
# import logging
from transportion.models import Vehicles,Enterprises
# Create your views here.
def home(request):
	return render_to_response('transportion/index.html',{},)
def get_tree(request):
    all_vehicles=Vehicles.objects.all()
    all_dicts=toDicts(all_vehicles)
    all_enterprises=Enterprises.objects.all()
    e_dicts=toDicts(all_enterprises)
    all_dicts.extend(e_dicts)
    all_jsons=json.dumps(all_dicts,ensure_ascii=False)
    return HttpResponse(all_jsons)
def toDicts(objs):
    obj_arr=[]
    for o in objs:
        obj_arr.append(o.toDict())
    return obj_arr
def get_map(request):
    return render_to_response('transportion/map.html',{},)