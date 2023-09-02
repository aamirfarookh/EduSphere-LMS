from rest_framework import serializers
from django.contrib.auth import get_user_model
Student = get_user_model()
from django.contrib.auth.models import User

class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('username', 'email', 'password', 'name', 'student_id', 'gender', 'date_of_birth', 'major', 'contact_number')

    extra_kwargs = {
        'name': {'required': True, 'allow_blank': False},
        'username': {'required': True, 'allow_blank': False},
        'email': {'required': True, 'allow_blank': False},
        'password': {'required': True, 'allow_blank': False},
        'student_id': {'required': True, 'allow_blank': False},
        'gender': {'required': True, 'allow_blank': False},
        'date_of_birth': {'required': True, 'allow_blank': False},
        'major': {'required': True, 'allow_blank': False},        
        'contact_number': {'required': True, 'allow_blank': False},                              
    }    


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('username', 'email', 'password', 'name', 'student_id', 'gender', 'date_of_birth', 'major', 'contact_number')

