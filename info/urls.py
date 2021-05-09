from . import views
from django.urls import path

urlpatterns = [path("skills_list/", views.SkillsListView.as_view())]
