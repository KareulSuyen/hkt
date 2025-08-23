from django.contrib.auth.models import User
from django.db import models

class ReportIssue(models.Model):
    ERROR_CHOICES = [
        ('bug', 'Bug/Technical Issue'),
        ('ui', 'UI/Design Issue'),
        ('feature', 'Feature Request'),
        ('content', 'Content Issue'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    error_type = models.CharField(max_length=20, choices=ERROR_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.error_type}"