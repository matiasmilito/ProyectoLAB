from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
#Definimos las clases que luego seran entidades de base de datos

class Especialidad(models.Model):
    descripcion_especialidad = models.CharField(max_length=30, blank=False)

     #formateamos el objeto a una manera legible
    def nombre_completo(self):
        return " {} ".format(self.descripcion_especialidad)

    def __str__(self):
        return self.nombre_completo()


class Medicos(models.Model):
    name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    dni = models.IntegerField(null=False)
    especialidad = models.ForeignKey(Especialidad, null=False, on_delete=models.CASCADE, related_name='especialidades')

    def nombre_completo(self):
        return " {} {} ".format(self.name, self.last_name)

    def __str__(self):
        return self.nombre_completo()


class ObraSocial(models.Model):
    nombre_obrasocial = models.CharField(max_length=50, blank=False)
    plan_obrasocial = models.CharField(max_length=15, blank=False)

    def nombre_completo(self):
        return " {}, {} ".format(self.nombre_obrasocial, self.plan_obrasocial)

    def __str__(self):
        return self.nombre_completo()


class Sede(models.Model):
    nombre_sede = models.CharField(max_length=50, blank=False)
    direccion = models.CharField(max_length=50)

    def nombre_completo(self):
        return " {}, {} ".format(self.nombre_sede, self.direccion)

    def __str__(self):
        return self.nombre_completo()


class User(AbstractUser):
    nro_afiliado = models.CharField(max_length=20, blank=True)
    obra_social = models.ForeignKey(ObraSocial, null=True, on_delete=models.CASCADE, related_name='obrassociales')
    num_matricula = models.IntegerField(null=True)
    medico = models.ForeignKey(Medicos, null=True, on_delete=models.CASCADE, related_name='medicos')


class Turnos(models.Model):
    usuario_turno = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='usuariosturnos')
    medico_turno = models.ForeignKey(Medicos, null=False, on_delete=models.CASCADE, related_name='medicosturnos')
    turnodisponible = models.BooleanField(null=False, default=0)
    # especialidad_turno = models.ForeignKey(Especialidad, null=False, on_delete= models.CASCADE)
    sede_turno = models.ForeignKey(Sede, null=False, on_delete=models.CASCADE, related_name='sedeturnos')
    fechaturno_turno = models.DateField(null=True)
    horaturno_turno = models.TimeField(null=True)


