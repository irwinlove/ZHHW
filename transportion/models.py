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
class Vehicles(models.Model):
	"""docstring for vehicles"""
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	licenseNumber=models.CharField(max_length=10)
	underEnterprise1=models.CharField(max_length=50)
	underEnterprise2=models.CharField(max_length=50,blank=True)
	underEnterprise2=models.CharField(max_length=50,blank=True)
	def __unicode__(self):
		return self.licenseNumber
