from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Vacancy
from rest_framework import generics
from .serializers import (
    VacancySerializer,
    VacancyCreateSerializer,
)
from django.db import IntegrityError
from info.models import Skills


class CRUDVacancy(APIView):
    def get(self, request, pk):
        vacancy = Vacancy.objects.filter(id=pk)[0]
        vacancy.views += 1
        vacancy.save()
        required_skills = vacancy.required_skills.all()
        responds = vacancy.respond.all()
        output = {}
        output["main"] = Vacancy.objects.filter(id=pk).values()[0]
        output["responds"] = [x.username for x in responds]
        output["skills"] = [x.name for x in required_skills]
        return Response(output)

    def post(self, request):
        data = request.data
        try:
            vacancy = Vacancy.objects.create(
                title=data.get("title"),
                text=data.get("text"),
                recruiter=request.user,
                salary=data.get("salary"),
            )
            skills = data.get("skills")
            for skill in skills:
                skl, created = Skills.objects.get_or_create(name=skill)
                vacancy.required_skills.add(skl if skl else created)
            return Response({"status": "ok"})
        except IntegrityError:
            return Response({"status": "error"})

    def put(self, request, pk):
        vacancy = Vacancy.objects.get(id=pk)
        vacancy.title = request.data.get("title", vacancy.title)
        vacancy.text = request.data.get("text", vacancy.text)
        vacancy.salary = request.data.get("salary", vacancy.salary)
        vacancy.save()
        return Response({"status": "ok"})

    def delete(self, request, pk):
        vacancy = Vacancy.objects.filter(id=pk)[0].delete()
        return Response({"status": "ok"})


class SubscribeVacancy(APIView):
    def put(self, request, pk):
        vacancy = Vacancy.objects.get(id=pk)
        vacancy.respond.add(request.user)
        vacancy.save()
        return Response({"status": "ok"})


class ListOfAllVacancies(APIView):
    def get(self, request):
        vacancies = Vacancy.objects.all().values(
            "id", "title", "views", "recruiter__username"
        )
        return Response(vacancies)


# {
# "title":"test2",
# "text":"HELLO",
# "salary":200,
# "skills":["Python","Java"]
# }