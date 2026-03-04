from django.urls import path
from DocPost.views import DocPostListView, DocPostDetailView

app_name = "DocPost"
urlpatterns = [
    path('doc/', DocPostListView.as_view(), name='doc-list'),
    path('doc/<slug:slug>/', DocPostDetailView.as_view(), name='post_detail'),
    # path('doc/create/', PostCreateView.as_view(), name='doc-create'),
] 