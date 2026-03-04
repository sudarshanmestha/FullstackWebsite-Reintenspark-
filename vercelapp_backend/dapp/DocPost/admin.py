# DocPost/admin.py
from django.contrib import admin
from .models import DocPosts

@admin.register(DocPosts)
class DocPostsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'is_published')
    list_filter = ('is_published', 'date')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('date',)