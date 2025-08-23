from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ReportIssue

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ReportIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportIssue
        fields = ['name', 'email', 'error_type', 'message']
        
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required")
        return value
        
    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long")
        return value
    
    