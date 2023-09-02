from django.db import models
from students.models import Student
from assignments.models import Assignment

class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    submission_date = models.DateField()
    
    STATUS_CHOICES = (
        ('Submitted', 'Submitted'),
        ('Late', 'Late'),
        ('Graded', 'Graded'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.student} - {self.assignment} ({self.submission_date})"
