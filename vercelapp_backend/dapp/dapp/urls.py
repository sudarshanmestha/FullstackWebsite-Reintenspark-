from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers, viewsets, routers
from rest_framework.authtoken import views
from django.views.generic import TemplateView

User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User    
        fields = ['url', 'username', 'email', 'is_staff']     
        
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)  
           
urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #my app
    path('api/posts/', include('post_app.urls', namespace="post_app")),
    path('DocPost/', include('DocPost.urls', namespace="DocPosts")),
    #rest
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    
    # Password reset confirm - add this pattern
    re_path(
        r'^api/auth/password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,32})/$',
        TemplateView.as_view(),
        name='password_reset_confirm'
    ),
    
    # dj-rest-auth endpoints (these are working)
    path('api/auth/', include('dj_rest_auth.urls')),  # Move dj-rest-auth under /api/auth/
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('api/', include('core.urls', namespace="core")),
    path('', include(router.urls)),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)