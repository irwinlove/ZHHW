# -*- coding: utf-8 -*-
from django.db import models
import uuid,json
from transportion.fields import ListField
# Create your models here.
# class Enterprises(models.Model):
# 	"""docstring for Enterprises"""
# 	# id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
# 	name=models.CharField(max_length=40)
# 	def __unicode__(self):
# 		return self.name
# class Area(models.Model):
# 	"""docstring for Area"""
# 	name=models.CharField(max_length=40)
# 	def __unicode__(self):
# 		return self.name
class Regions(models.Model):
	"""docstring for regions"""
	LEVEL_NAME = (('1','省/直辖市/自治区'),('2','市'),('3','区/县'))
	id=models.CharField(primary_key=True,max_length=6)
	pid=models.CharField(max_length=6)
	name=models.CharField(max_length=20)
	level=models.CharField(max_length=1,choices=LEVEL_NAME)
	zipCode=models.CharField(max_length=6,null=True)
	tel=models.CharField(max_length=4,null=True)
	def __unicode__(self):
		return self.name
	def toDict(self):
		if self.level=='2':
			return{
			'id':self.id,
			'parent':'#',
			# 'pId':'#',
			'text':self.name
			# 'name':self.name
			}
		if self.level=='3':
			return{
			'id':self.id,
			'parent':self.pid,
			# 'pId':self.parentId.id,
			'text':self.name
			# 'name':self.name
			}
		
class Enterprises(models.Model):
	"""docstring for Enterprises"""
	HIERARCHY_DEPARTMENT = (('1','一级单位'),('2','二级部门'),('3','三级部门'),('4','四级部门'))
	name = models.CharField(max_length=50,blank=False)
	parentId = models.ForeignKey('self',null=True,blank=True,default=None, related_name='children')
	hierarchys = models.CharField(max_length=1,choices=HIERARCHY_DEPARTMENT)
	region=models.ForeignKey(Regions,null=True,blank=True,default=None,related_name='region_belong')
	def __unicode__(self):
		return self.name
	def toDict(self):
		if self.hierarchys=='1':
			return{
			'id':self.id,
			'parent':'#',
			# 'pId':'#',
			'text':self.name
			# 'name':self.name
			}
		else:
			return{
			'id':self.id,
			'parent':self.parentId.id,
			# 'pId':self.parentId.id,
			'text':self.name
			# 'name':self.name
			}

class Vehicles(models.Model):
	"""docstring for vehicles"""
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	licenseNumber=models.CharField(max_length=10)
	enterprise=models.ForeignKey(Enterprises)
	def __unicode__(self):
		return self.licenseNumber
	def toDict(self):
		return{
		'id':str(self.id),
		'parent':self.enterprise.id,
		'text':self.licenseNumber
		# 'pId':self.enterprise.id,
		# 'name':self.licenseNumber
		}
	def toRegionDict(self):
		return{
		'id':str(self.id),
		'parent':self.enterprise.region.id,
		'text':self.licenseNumber
		# 'pId':self.enterprise.id,
		# 'name':self.licenseNumber
		}

	
class markerTypes(models.Model):
	"""docstring for markerTypes"""
	name=models.CharField(max_length=50)
	icons=models.CharField(max_length=50)
	remarks=models.CharField(max_length=200)
	def __unicode__(self):
		return self.name			
class locationMarkers(models.Model):
	"""docstring for locationMarkers"""
	markerNo=models.CharField(max_length=10)
	name=models.CharField(max_length=50)
	markertypes=models.ForeignKey(markerTypes)
	markerMaker=models.CharField(max_length=40,blank=True)
	address=models.CharField(max_length=100,blank=True)
	location=models.CharField(max_length=20)
	lnglatXY=ListField(blank=True)
	def __unicode__(self):
		return self.name
class GPSdevices(models.Model):
	"""docstring for GPSdevices"""
	gpsNo=models.CharField(max_length=10)
	vehicleId=models.ForeignKey(Vehicles,null=True,blank=True,default=None,related_name='vehicles_fixedOn')
	sim=models.CharField(max_length=11)
	name=models.CharField(max_length=40)
	types=models.CharField(max_length=30)
	manufacturer=models.CharField(max_length=50)
	remarks=models.CharField(max_length=200)
	def __unicode__(self):
		return '%s-%s-%s'%(self.gpsNo,self.name,self.types)
class GPSRTDatas(models.Model):
 	"""docstring for GPSRTDatas"""
 	deviceId=models.ForeignKey(GPSdevices)
 	signalState=models.CharField(max_length=1,blank=True)
 	lngX=models.FloatField(blank=True,null=True)
 	latY=models.FloatField(blank=True,null=True)
	curTime=models.DateTimeField(blank=True)
 	velocity=models.FloatField(blank=True)
 	direction=models.CharField(max_length=1,blank=True)
 	temprature=models.FloatField(blank=True)
 	deviceState=models.CharField(max_length=1,blank=True)
 	ometer=models.FloatField()
 	event=models.CharField(max_length=20,blank=True)
 	parameter=models.CharField(max_length=100,blank=True)
 	def __unicode__(self):
 		return '%s-%s-%s'%(self.deviceId.vehicleId.licenseNumber,self.deviceId.name,self.curTime)
 	def toJSON(self):
 		fields = []
 		for field in self._meta.fields:
 			fields.append(field.name)
 		d = {}
 		for attr in fields:
 			if isinstance(getattr(self, attr),datetime.datetime):
 				d[attr] = getattr(self, attr).strftime('%Y-%m-%d %H:%M:%S')
 			elif isinstance(getattr(self, attr),datetime.date):
 				d[attr] = getattr(self, attr).strftime('%Y-%m-%d')
 			else:
 				d[attr] = getattr(self, attr)
 		data_json=json.dumps(d,ensure_ascii=False)
 		return data_json