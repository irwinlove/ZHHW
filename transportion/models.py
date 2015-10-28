# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class Enterprises(models.Model):
	"""docstring for Enterprises"""
	name=models.CharField(max_length=40)
	def __str__(self):
		return self.name
class Vehicles(models.Model):
	"""docstring for vehicles"""
	licenseNumber=models.CharField(max_length=8)
	underEnterprise=models.ForeignKey(Enterprises)
	def __str__(self):
		return self.licenseNumber
		