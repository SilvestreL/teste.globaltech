from django.urls import path
from pessoa.controllers.pessoa_controller import PessoaController, CalculoPesoIdealView

urlpatterns = [
    path('pessoa/', PessoaController.as_view()),
    path('pessoa/<int:pk>/', PessoaController.as_view()),
    path('pessoa/<int:pk>/pesoideal/', CalculoPesoIdealView.as_view()),
]