from django.contrib.auth.models import User
from django.db import models
import uuid

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    email_verified = models.BooleanField(default=False)
    email_verification_token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - Verified: {self.email_verified}"

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