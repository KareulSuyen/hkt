# api/models.py
from django.db import models

class ReportIssue(models.Model):
    ERROR_TYPE_CHOICES = [
        ('bugs', 'Bugs'),
        ('ai', 'AI Issues'),
        ('ui', 'UI/UX Problems'),
        ('performance', 'Performance Issues'),
        ('feature', 'Feature Request'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    error_type = models.CharField(max_length=20, choices=ERROR_TYPE_CHOICES)
    message = models.CharField(max_length=3500)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.error_type} - {self.created_at}"

    class Meta:
        ordering = ['-created_at']