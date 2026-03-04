# core/serializers.py

from rest_framework import serializers
# *** CRITICAL CHANGE: Use get_user_model() instead of importing User directly ***
from django.contrib.auth import get_user_model 
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from dj_rest_auth.serializers import PasswordResetSerializer
# Assign the result of get_user_model() to the variable 'User'
User = get_user_model()

from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer

class LoginSerializer(DefaultLoginSerializer):
    def validate(self, attrs):
        print(f"🔍 Login attempt - Username: {attrs.get('username')}, Password: {'*' * len(attrs.get('password', ''))}")
        return super().validate(attrs)

class UserSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""
    class Meta:
        # This now references your custom 'core.User' model correctly
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    email = serializers.EmailField(
        required=True,
        # This now uses the correct 'User.objects.all()'
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        # This now references your custom 'core.User' model correctly
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name']
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        # This now uses the correct 'User.objects.create_user'
        user = User.objects.create_user(**validated_data)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for password change"""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password2 = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError(
                {"new_password": "Password fields didn't match."}
            )
        return attrs


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def get_email_options(self):
        return {
            'extra_email_context': {
                'password_reset_url': f"{settings.FRONTEND_URL}/reset-password"
            },
        }
