from django.contrib import admin

# Register your models here.

from .models import Note, ListOfNotes

admin.site.register(Note)
admin.site.register(ListOfNotes)