from django.urls import path
from . import views

urlpatterns = [
    path("crud_vacancy/", views.CRUDVacancy.as_view()),
    path("crud_vacancy/<int:pk>/", views.CRUDVacancy.as_view()),
    path("subscribe_vacancy/<int:pk>/", views.SubscribeVacancy.as_view()),
    path("list_of_all_vacancies/", views.ListOfAllVacancies.as_view()),
]
