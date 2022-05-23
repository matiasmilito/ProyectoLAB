from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Especialidad(models.Model):
    descripcion_especialidad = models.CharField(max_length=30, blank=False)

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

    def nombre_completo(self):
        return " {} ".format(self.nombre_obrasocial)

    def __str__(self):
        return self.nombre_completo()


class Sede(models.Model):
    nombre_sede = models.CharField(max_length=50, blank=False)
    Direccion = models.CharField(max_length=50)

    def nombre_completo(self):
        return " {}, {} ".format(self.nombre_sede, self.Direccion)

    def __str__(self):
        return self.nombre_completo()


class User(AbstractUser):
    nro_afiliado = models.CharField(max_length=20, null=False, blank=False)
    obra_social = models.ForeignKey(ObraSocial, null=True, on_delete=models.CASCADE, related_name='obrassociales')


class Turnos(models.Model):

    usuario_turno = models.ForeignKey(User, null=False, on_delete=models.CASCADE, related_name='usuariosturnos')
    medico_turno = models.ForeignKey(Medicos, null=False, on_delete=models.CASCADE, related_name='medicosturnos')
    # especialidad_turno = models.ForeignKey(Especialidad, null=False, on_delete= models.CASCADE)
    sede_turno = models.ForeignKey(Sede, null=False, on_delete=models.CASCADE, related_name='sedeturnos')
    fechaturno_turno = models.DateField(null=True)
    horaturno_turno = models.TimeField(null=True)

# Como hago para que en turnos me traiga los medicos que tengan la especialidad que elegí?
