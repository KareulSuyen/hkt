from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ReportIssue, UserProfile
import uuid

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        # Remove confirm_password from validated_data
        validated_data.pop('confirm_password', None)
        
        # Create user
        user = User.objects.create_user(**validated_data)
        
        # Create user profile with verification token
        UserProfile.objects.create(
            user=user,
            email_verified=False,
            email_verification_token=uuid.uuid4()
        )
        
        return user

class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    
    def validate_token(self, value):
        try:
            profile = UserProfile.objects.get(email_verification_token=value)
            if profile.email_verified:
                raise serializers.ValidationError("Email is already verified.")
        except UserProfile.DoesNotExist:
            raise serializers.ValidationError("Invalid or expired verification token.")
        return value

class ResendVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    
    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
            if user.profile.email_verified:
                raise serializers.ValidationError("Email is already verified.")
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with this email.")
        return value

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