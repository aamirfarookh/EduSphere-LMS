from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
# Create your models here.


class Student(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    student_id = models.CharField(max_length=20, unique=True)
    gender_choices = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    gender = models.CharField(max_length=10, choices=gender_choices)
    date_of_birth = models.DateField()
    major = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True,max_length=15)
    contact_number = models.CharField(max_length=20)
    password = models.CharField(max_length=128, null=False)
    REQUIRED_FIELDS = ['email', 'student_id', 'gender', 'date_of_birth', 'major', 'contact_number']
    USERNAME_FIELD = 'username'
    def __str__(self):
        return self.name

        # pbkdf2_sha256$600000$GYUzkeA90zJIHtPsCuTSuJ$zSSUdrbPZsQKMnzh2jHHEiDAnhk9VP7aaSc/h6CRCkw= 
        # pbkdf2_sha256$600000$3kWLpVHK9vmzuHSU5KqoDh$+k2jyispmqvtFU9TlBB3z57c0APrPjk4aS2M/KqxwnU=