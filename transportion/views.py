from django.shortcuts import render,render_to_response
from django.template import RequestContext
import json
import models
# Create your views here.
def home(request):
	return render_to_response('transportion/index.html',{},)
def vehicles_tree(request):
	return render_to_response('transportion/vehicles.html',{},)
def ajax(request):
    data = {}
    data['something'] = 'useful'
    return HttpResponse(json.dumps(data), content_type = "application/json")