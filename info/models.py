from django.db import models


class WorkCategory(models.Model):
    PYTHON = "PY"
    JAVA = "JA"
    SCALA = "SC"
    NET = "NE"
    NODE = "NO"
    RUBY = "RB"
    PHP = "PHP"
    FRONTEND = "FE"
    ANDROID = "AN"
    GOLANG = "GO"
    C = "C"
    UI = "UI"
    QA = "QA"
    PM = "PM"
    BA = "BA"
    DATASCIENCE = "DS"
    DEVOPS = "DO"
    HR = "HR"
    CATEGORY_CHOICES = [
        (PYTHON, "Python"),
        (JAVA, "Java"),
        (SCALA, "Scala"),
        (NET, "C#/.NET"),
        (NODE, "Node.js"),
        (RUBY, "Ruby"),
        (PHP, "PHP"),
        (FRONTEND, "Frontend/HTML"),
        (ANDROID, "Android"),
        (GOLANG, "Go"),
        (C, "C/C++/Embedded"),
        (UI, "UI/UX Designer"),
        (QA, "QA Automation/Manual"),
        (PM, "Project Manager"),
        (BA, "Business analyst"),
        (DATASCIENCE, "Data science"),
        (DEVOPS, "DevOps"),
        (HR, "HR recruiter"),
    ]
    category = models.CharField(
        max_length=256,
        choices=CATEGORY_CHOICES,
    )
    verbose_name_plural = "Work Categories"

    def __str__(self):
        return self.category


class Skills(models.Model):
    name = models.CharField(max_length=512, unique=True)
    verbose_name_plural = "Skills"

    def __str__(self):
        return self.name


class Cities(models.Model):
    city = models.CharField(max_length=512, unique=True)
    verbose_name_plural = "Cities"

    def __str__(self):
        return self.city
