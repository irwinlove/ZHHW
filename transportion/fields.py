# -*- coding: utf-8 -*-
from django.db import models
from django import forms
from django.utils.text import capfirst
from django.core import exceptions
import ast
class ListField(models.TextField):
	"""docstring for ListField"""
	def __init__(self, *arg,**kwargs):
		super(ListField, self).__init__(*arg,**kwargs)
	def from_db_value(self, value, expression, connection, context):
		# print(value,type(value))
		if not value:
			value = []
		if isinstance(value, list):
			return value
		return ast.literal_eval(value)
	def get_prep_value(self,value):
		if value is None:
			return value
		return unicode(value)
	def value_to_string(self,obj):
		value=self._get_val_from_obj(obj)
		return self.get_db_prep_value(value)

