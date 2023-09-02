from rest_framework import serializers
from .models import Instructor

class InstructorSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('department','email', 'password', 'name', 'gender', 'date_of_birth','contact_number')

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('department','email', 'password', 'name', 'gender', 'date_of_birth','contact_number')