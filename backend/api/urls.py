
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import RegisterView, TurnosViewSet, DoctorEspecialidadViewSet
from api.views import me
from api.views import MedicosViewSet, EspecialidadViewSet, SedeViewSet, ObraSocialViewSet
from api.views import TurnosDisponiblesViewSet
from api.views import TurnosPorPacienteViewSet

router = routers.DefaultRouter()
router.register(r'medicos', MedicosViewSet)
router.register(r'especialidad', EspecialidadViewSet)
router.register(r'sede', SedeViewSet)
router.register(r'obrasocial', ObraSocialViewSet)
router.register(r'turnos', TurnosViewSet)
router.register(r'doctorespecialidad', DoctorEspecialidadViewSet)
router.register(r'turnosdisponibles', TurnosDisponiblesViewSet)
router.register(r'turnospaciente', TurnosPorPacienteViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view()),
    path('me/', me),
    #path('send/', views.Send.as_view(), name='send'),
]