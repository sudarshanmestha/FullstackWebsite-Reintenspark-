from django.urls import path
from .views import PostListView, PostCreateView, RetrieveAPIView



app_name = "post_app"
urlpatterns = [
    path('', PostListView.as_view(), name='post-list'),
    path('create/', PostCreateView.as_view(), name='post-create'),
] 

