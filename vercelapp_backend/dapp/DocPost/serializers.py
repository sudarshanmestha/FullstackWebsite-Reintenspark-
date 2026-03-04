# DocPost/serializers.py
from rest_framework import serializers
from .models import DocPosts

class DocPostSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = DocPosts
        fields = [
            'id',
            'title',
            'slug',
            'description',
            'html_content',
            'date',
            'is_published',
            'image_url',        # ← ADDED!
        ]

    def get_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return obj.featured_image.url
        return None