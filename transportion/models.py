# -*- coding: utf-8 -*-
from django.db import models
import uuid
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

class Enterprises(models.Model):
	"""docstring for Enterprises"""
	HIERARCHY_DEPARTMENT = (('1','一级单位'),('2','二级部门'),('3','三级部门'),('4','四级部门'))
	name = models.CharField(max_length=50,blank=False)
	parentId = models.ForeignKey('self',null=True,blank=True,default=None, related_name='children')
	hierarchys = models.CharField(max_length=1,choices=HIERARCHY_DEPARTMENT)
	def __unicode__(self):
		return self.name
	def toDict(self):
		if self.hierarchys=='1':
			return{
			'id':self.id,
			'parent':'#',
			'text':self.name
			}
		else:
			return{
			'id':self.id,
			'parent':self.parentId.id,
			'text':self.name
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
		}
class GPSdevices(models.Model):
	"""docstring for GPSdevices"""
	gpsNo=models.CharField(max_length=10)
	sim=models.CharField(max_length=11)
	name=models.CharField(max_length=40)
	types=models.CharField(max_length=30)
	manufacturer=models.CharField(max_length=50)
	remarks=models.CharField(max_length=200)
	def __unicode__(self):
		return '%s-%s-%s'%(self.gpsNo,self.name,self.types)
	
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