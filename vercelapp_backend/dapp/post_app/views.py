from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from .models import Post
from .serializers import PostSerializer
# from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreateView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    


