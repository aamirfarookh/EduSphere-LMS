from django.db import models
from departments.models import Department
from django.contrib.auth.models import User



class Instructor(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )
    
    DEPARTMENT_CHOICES = (
        ('Science', 'Science'),
        ('Arts', 'Arts'),
        ('Engineering', 'Engineering'),
        # Add more department choices as needed
    )

    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)
    password = models.CharField(max_length=128, null=False)
    # REQUIRED_FIELDS = ['email', 'student_id', 'gender', 'date_of_birth', 'major', 'contact_number']
    # USERNAME_FIELD = 'username'

    def __str__(self):
        return self.name
