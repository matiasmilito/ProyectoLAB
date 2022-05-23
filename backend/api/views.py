from django.shortcuts import render
from api.models import Medicos, Especialidad, ObraSocial, Sede, User, Turnos
from .serializers import MedicosSerializer, EspecialidadSerializer, ObraSocialSerializer, \
    SedeSerializer, RegisterSerializer, MeSerializer, TurnosSerializer
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, generics, request
from django.conf import settings
from django.core.mail import EmailMultiAlternatives, send_mail


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
        #print(id_especialidad)
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


class DeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MedicosSerializer
    queryset = Medicos.objects.all()

    def get_queryset(self):
        queryset = Medicos.objects.all()
        id_especialidad = self.request.query_params.get('id_especialidad')
        if id_especialidad is not None:
            queryset = queryset.filter(especialidad_id=id_especialidad)
        else:
            queryset = []
        #print(id_especialidad)
        return queryset
# Create your views here.
