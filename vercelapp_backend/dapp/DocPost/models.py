# DocPost/models.py
from django.db import models
from django.utils.text import slugify
from django.utils import timezone

class DocPosts(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField()
    featured_image = models.ImageField(
        upload_to='posts/',
        blank=True,
        null=True,
        help_text="Upload a featured image"
    )
    html_content = models.TextField(blank=True, null=True, help_text="Raw HTML content for the blog post or documentary")
    date = models.DateTimeField(default=timezone.now)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            base = self.slug
            i = 1
            while DocPosts.objects.filter(slug=self.slug).exists():
                self.slug = f"{base}-{i}"
                i += 1
        super().save(*args, **kwargs)