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
from accounts.models import User


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
        if request.user.is_recruiter:
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
        else:
            return Response({"status": "error", "message": "You are not recruiter"})

    def put(self, request, pk):
        vacancy = Vacancy.objects.get(id=pk)
        if request.user.is_recruiter and vacancy.recruiter == request.user:
            vacancy.title = request.data.get("title", vacancy.title)
            vacancy.text = request.data.get("text", vacancy.text)
            vacancy.salary = request.data.get("salary", vacancy.salary)
            skills = request.data.get("skills")
            if skills:
                vacancy.required_skills.all().delete()
                for skill in skills:
                    skl, created = Skills.objects.get_or_create(name=skill)
                    vacancy.required_skills.add(skl if skl else created)
            vacancy.save()
            return Response({"status": "ok"})
        else:
            return Response(
                {
                    "status": "error",
                    "message": "You don't have perms to change this vacancy",
                }
            )

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
        vacancies = (
            Vacancy.objects.all()
            .order_by("-publish_date", "-views")
            .values(
                "id", "title", "views", "recruiter__username", "publish_date", "salary"
            )
        )
        return Response(vacancies)


class ListOfDefiniteVacancies(APIView):
    def get(self, request):
        vacancies = (
            Vacancy.objects.filter(recruiter=request.user)
            .values(
                "id", "title", "views", "recruiter__username", "publish_date", "salary"
            )
            .order_by("-publish_date")
        )
        return Response(vacancies)


class ListOfResponds(APIView):
    def get(self, request):
        requests = Vacancy.objects.filter(recruiter=request.user)
        output = []
        for i in requests:
            buf = Vacancy.objects.filter(id=i.id).values(
                "id",
                "title",
                "views",
                "publish_date",
                "respond__username",
                "respond__github",
                "respond__salary_expectation",
                "respond__telephone",
            )
            for j in buf:
                user = User.objects.filter(
                    username=j.get("respond__username", "")
                ).first()
                if user:
                    if user.avatar:
                        avatar = user.avatar.url
                        j["respond__avatar"] = avatar
                    else:
                        j["respond__avatar"] = ""
                    skills = user.skills.all()

                    j["skills"] = skills.values("name")
                    output.append(j)
        return Response(output)


# {
# "title":"test2",
# "text":"HELLO",
# "salary":200,
# "skills":["Python","Java"]
# }