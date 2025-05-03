from django.urls import path
from .views import FeedbackListCreateView

urlpatterns = [
    path('api/feedback/', FeedbackListCreateView.as_view(), name='feedback-list-create'),
]