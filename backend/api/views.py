from api.models import Medicos, Especialidad, ObraSocial, Sede, Turnos
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import MedicosSerializer, EspecialidadSerializer, ObraSocialSerializer, \
    SedeSerializer, RegisterSerializer, MeSerializer, TurnosSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


@api_view(['get'])
@permission_classes([IsAuthenticated])
def me(request):
    print(MeSerializer(request.user).data)
    return Response(MeSerializer(request.user).data)


class MedicosViewSet(viewsets.ModelViewSet):
    serializer_class = MedicosSerializer
    queryset = Medicos.objects.all()

    def get_queryset(self):
        queryset = Medicos.objects.all()
        id_especialidad = self.request.query_params.get('id_especialidad')
        id_medicos = self.request.query_params.get('id_medicos')
        if id_especialidad is not None:
            queryset = queryset.filter(especialidad_id=id_especialidad)
        if id_medicos is not None:
            queryset = queryset.filter(id=id_medicos)
        # print(id_especialidad)
        return queryset


class EspecialidadViewSet(viewsets.ModelViewSet):
    serializer_class = EspecialidadSerializer
    queryset = Especialidad.objects.all()


class ObraSocialViewSet(viewsets.ModelViewSet):
    serializer_class = ObraSocialSerializer
    queryset = ObraSocial.objects.all()


# permission_classes = [IsAuthenticated]

class SedeViewSet(viewsets.ModelViewSet):
    serializer_class = SedeSerializer
    queryset = Sede.objects.all()


class TurnosViewSet(viewsets.ModelViewSet):
    serializer_class = TurnosSerializer
    queryset = Turnos.objects.all()


class DoctorEspecialidadViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MedicosSerializer
    queryset = Medicos.objects.all()

    def get_queryset(self):
        queryset = Medicos.objects.all()
        id_especialidad = self.request.query_params.get('id_especialidad')
        if id_especialidad is not None:
            queryset = queryset.filter(especialidad_id=id_especialidad)
        else:
            queryset = []
        # print(id_especialidad)
        return queryset
        #en este endpoint se recibe como parametro un id de especialidad y se filtran los medicos que contenga este id
        # en caso de que no haya ninguno se devuelve una lista vacia
# Create your views here.

class TurnosDisponiblesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TurnosSerializer
    queryset = Turnos.objects.filter(turnodisponible=1)

class TurnosPorPacienteViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TurnosSerializer
    queryset = Turnos.objects.all()

    def get_queryset(self):
        queryset = Turnos.objects.all()
        id_paciente = self.request.query_params.get('id_paciente')
        if id_paciente is not None:
            queryset = queryset.filter(usuario_turno_id=id_paciente)
        else:
            queryset = []
        # print(id_especialidad)
        return queryset
