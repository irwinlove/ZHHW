# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class enterprises(models.Model):
	"""docstring for enterprises"""
	name=models.CharField(max_length=40)
	def __str__(self):
		return self.name
class vehicles(models.model):
	"""docstring for vehicles"""
	licenseNumber=models.CharField(max_length=8)
	forEnterprise=models.ForeignKey(enterprises)
		