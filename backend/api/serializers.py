from api.models import Medicos, Especialidad, ObraSocial, Sede, User, Turnos
from django.contrib.auth import get_user_model
from rest_framework import serializers


class ObraSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObraSocial
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'nro_afiliado', 'obra_social', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            nro_afiliado=validated_data['nro_afiliado'],
            obra_social=validated_data['obra_social'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


class MeSerializer(serializers.ModelSerializer):
    obrassociales = ObraSocialSerializer(source='obra_social',read_only=True)

    class Meta:
        model = get_user_model()
        fields = "__all__"


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = "__all__"

class MedicosSerializer(serializers.ModelSerializer):
    especialidades = EspecialidadSerializer(source='especialidad',read_only=True)

    class Meta:
        model = Medicos
        fields = "__all__"


class SedeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sede
        fields = "__all__"

class TurnosSerializer(serializers.ModelSerializer):
    usuariosturnos = RegisterSerializer(source='usuario_turno',read_only=True)
    medicosturnos = MedicosSerializer(source='medico_turno',read_only=True)
    #especialidad_turno = EspecialidadSerializer(read_only=True)
    sedeturnos = SedeSerializer(source='sede_turno',read_only=True)
    class Meta:
        model = Turnos
        fields = '__all__'