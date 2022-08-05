from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import serializers, response

from api.models import ObraSocial, Medicos, Especialidad, Sede, User, Turnos

from backend import settings


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
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']

        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            nro_afiliado=validated_data['nro_afiliado'],
            obra_social=validated_data['obra_social'],
            # num_matricula=validated_data['num_matricula'],
            username=validated_data['username'],
            password=validated_data['password']
        )

        if user is not {}:
            subject = 'Bienvenido a SGR'
            message = 'Hola ' + first_name + '' + last_name + ' Se ha registrado con exito'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [validated_data['email']]
            send_mail(subject, message, email_from, recipient_list, fail_silently=False)

        return user


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = "__all__"


class MedicosSerializer(serializers.ModelSerializer):
    especialidades = EspecialidadSerializer(source='especialidad', read_only=True)

    class Meta:
        model = Medicos
        fields = "__all__"


class MeSerializer(serializers.ModelSerializer):
    obrassociales = ObraSocialSerializer(source='obra_social', read_only=True)
    medicos = MedicosSerializer(source='medico', read_only=True)

    class Meta:
        model = get_user_model()
        fields = "__all__"


class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = "__all__"


class TurnosSerializer(serializers.ModelSerializer):
    usuariosturnos = RegisterSerializer(source='usuario_turno', read_only=True)
    medicosturnos = MedicosSerializer(source='medico_turno', read_only=True)
    sedeturnos = SedeSerializer(source='sede_turno', read_only=True)

    class Meta:
        model = Turnos
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.fechaturno_turno = validated_data.get('fechaturno_turno', instance.fechaturno_turno)
        instance.horaturno_turno = validated_data.get('horaturno_turnoo', instance.horaturno_turno)
        instance.usuario_turno = validated_data.get('usuario_turno', instance.usuario_turno)
        instance.medico_turno = validated_data.get('medico_turno', instance.medico_turno)
        instance.sede_turno = validated_data.get('sede_turno', instance.sede_turno)
        instance.turnodisponible = validated_data.get('turnodisponible', instance.turnodisponible)
        dia = instance.fechaturno_turno
        hora = instance.horaturno_turno
        lugar = instance.sede_turno
        medico = instance.medico_turno
        mail = instance.usuario_turno.email
        if instance.turnodisponible is False:
            subject = 'Turno confirmado SGR'
            message = 'Hola , su turno ha sido confirmado para el día ' + str(dia) + ' a las ' + str(hora) + ' con el doctor ' + str(medico) + ' en ' + str(lugar)
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [mail]
            send_mail(subject, message, email_from, recipient_list, fail_silently=False)
        instance.save()
        return instance
