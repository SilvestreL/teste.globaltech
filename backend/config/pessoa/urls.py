from django.urls import path
from . import views

urlpatterns = [
    path("", views.PessoaListCreateView.as_view(), name="pessoa-list"),
    path("<int:pk>/", views.PessoaDetailView.as_view(), name="pessoa-detail"),
    path("<int:pk>/pesoideal/", views.PesoIdealView.as_view(), name="pessoa-pesoideal"),
]
