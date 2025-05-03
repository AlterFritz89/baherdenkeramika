from rest_framework import generics
from feedback.models import Feedback
from feedback.serializers import FeedbackSerializer
from django.core.cache import cache

class ApprovedFeedbackListView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    
    def get_queryset(self):
        # Кешируем запрос на 5 минут
        cache_key = 'approved_feedbacks'
        feedbacks = cache.get(cache_key)
        
        if not feedbacks:
            feedbacks = Feedback.objects.filter(status='approved').order_by('-created_at')
            cache.set(cache_key, feedbacks, 300)  # 5 минут кеш
            
        return feedbacks