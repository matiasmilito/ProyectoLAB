from django.contrib import admin

# Register your models here.
from api.models import *


admin.site.register(Especialidad)
admin.site.register(Sede)
admin.site.register(Turnos)
admin.site.register(Medicos)
admin.site.register(User)
admin.site.register(ObraSocial)

