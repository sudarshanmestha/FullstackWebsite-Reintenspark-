from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "subtitle",
            "year",
            "description",
            "image",         # 👈 custom field
            "image_upload",
            "image_url",
            "link",
            "created_at",
        ]

    def get_image(self, obj):
        if obj.image_upload:
            request = self.context.get("request")  # for full absolute URL
            if request:
                return request.build_absolute_uri(obj.image_upload.url)
            return obj.image_upload.url
        return obj.image_url
