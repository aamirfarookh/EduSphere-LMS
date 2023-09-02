from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Announcement(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    publish_date = models.DateField()
    
    # Generic Foreign Key to link to either a Department or a Course
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return self.title

