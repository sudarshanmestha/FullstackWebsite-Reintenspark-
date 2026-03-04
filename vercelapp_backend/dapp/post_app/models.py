from django.db import models
from django.core.exceptions import ValidationError

class Post(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True, null=True)
    year = models.PositiveIntegerField()
    description = models.TextField()

    # For image either URL or Upload
    image_upload = models.ImageField(upload_to="media/posts/", blank=True, null=True, help_text="Upload an image")
    image_url = models.URLField(blank=True, null=True, help_text="Link to an image")

    # Project link
    link = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.year})"

    
def clean(self):
    if not self.image_upload and not self.image_url:
        raise ValidationError("Please provide either an image upload or an image URL.")
