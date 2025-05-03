from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from news.views import NewsListCreateView
from gallery.views import GalleryImageListView
from advertisements.views import ActiveAdvertisementList
from products.views import TileProductListView
from rest_framework.routers import DefaultRouter
# Создаем основной роутер
router = DefaultRouter()
 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/news/', NewsListCreateView.as_view()),
    path('api/gallery/', GalleryImageListView.as_view()),
    path('api/ads/', ActiveAdvertisementList.as_view(), name='active-ads'),
    path('api/sanitary/', include('sanitary.urls')),
    path('api/tiles/', TileProductListView.as_view(), name='tile-products'),
    path('api/', include(router.urls)),
    path('', include('feedback.urls')),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)