from django.contrib.auth.models import User
from django.db import models

# Create your models here

class ListOfNotes(models.Model):
    name = models.CharField(blank=False,max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.IntegerField(blank=False)
    created = models.DateField(blank=False, auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('created',)


class Note(models.Model):
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=2000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    list = models.ForeignKey(ListOfNotes, on_delete=models.CASCADE)
    created = models.DateField(blank=False,auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('created',)
