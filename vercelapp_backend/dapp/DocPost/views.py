from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from DocPost.models import DocPosts
from DocPost.serializers import DocPostSerializer

class DocPostListView(ListAPIView):
    queryset = DocPosts.objects.filter(is_published=True)
    serializer_class = DocPostSerializer

    def get_queryset(self):
        return DocPosts.objects.filter(is_published=True).order_by('-date')

class DocPostDetailView(RetrieveAPIView):
    queryset = DocPosts.objects.filter(is_published=True)
    serializer_class = DocPostSerializer
    lookup_field = 'slug'
