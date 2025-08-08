from django.db import models
# models.py
class PopulationData(models.Model):
    date = models.DateField()
    total_population = models.BigIntegerField()
    daily_growth = models.IntegerField()
    growth_rate = models.FloatField()
    
class Country(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=3)
    population = models.BigIntegerField()
    growth_rate = models.FloatField()
    density = models.FloatField()
    
class EnvironmentalMetric(models.Model):
    metric_type = models.CharField(max_length=50)
    value = models.FloatField()
    unit = models.CharField(max_length=50)
    date = models.DateField()
    
class ResourceData(models.Model):
    resource_type = models.CharField(max_length=50)
    available_amount = models.FloatField()
    demand_amount = models.FloatField()
    unit = models.CharField(max_length=50)