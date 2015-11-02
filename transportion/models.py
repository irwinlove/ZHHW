# -*- coding: utf-8 -*-
from django.db import models
import uuid
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
	parentId = models.ForeignKey('self',null=True)
	hierarchys = models.CharField(max_length=1,choices=HIERARCHY_DEPARTMENT)
	def __unicode__(self):
		return self.name
class Vehicles(models.Model):
	"""docstring for vehicles"""
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	licenseNumber=models.CharField(max_length=10)
	enterprise=models.ForeignKey(Enterprises)
	def __unicode__(self):
		return self.licenseNumber