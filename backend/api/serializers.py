from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import serializers, response
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from api.models import ObraSocial, Medicos, Especialidad, Sede, User, Turnos

from backend import settings
#las clases serializers pasan los objetos a json y los json a objetos

class ObraSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObraSocial
        fields = "__all__" #se seleccionan todos los campos del modelo obra social


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'nro_afiliado', 'obra_social', 'username', 'password']
        #se seleccionan los campos que están en fields del modelo user
    def create(self, validated_data): #en esta funcion se toma como parametro los input del register
        #y se guardan en distintas variables que luego van a ser insertadas en la tabla de usuarios.
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        email = validated_data['email']
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            nro_afiliado=validated_data['nro_afiliado'],
            obra_social=validated_data['obra_social'],
            # num_matricula=validated_data['num_matricula'],
            username=validated_data['username'],
            password=validated_data['password']
        )

        if User.objects.filter(email=email).exists():
            raise ValidationError("El mail ya existe")
        #si el mail ingresado por el usuario ya existe, se devuelve el mensaje "el mail ya existe"

        if user is not {}:
            subject = 'Bienvenido a SGR'
            message = 'Hola ' + first_name + '' + last_name + ' Se ha registrado con exito'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [validated_data['email']]
            send_mail(subject, message, email_from, recipient_list, fail_silently=False)

        user.save()
        #si el usuario no está vacio, se envia el mail con los datos del mismo.
        return user


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = "__all__"


class MedicosSerializer(serializers.ModelSerializer):
    especialidades = EspecialidadSerializer(source='especialidad', read_only=True)
    #la linea de arriba hace referencia a que medicos tiene una foreign key del objeto especialidad
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
        #en la funcion update se recibe como parametros los input del turno y se guardan en distintas variables
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
        #si el turno pasa a estar no disponible(is false), se envia el mail con los datos del turno
        return instance
