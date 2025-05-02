from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer

from backend.config.pessoa.models.pessoa import Pessoa
from backend.config.pessoa.serializers.pessoa_serializer import PessoaSerializer
from backend.config.pessoa.services.pessoa_service import PessoaService


class PessoaController(APIView):
    """
    PessoaController gerencia as operações CRUD para o modelo Pessoa.
    """

    def get(self, request, pk=None):
        """
        Retorna uma lista de pessoas ou uma pessoa específica pelo ID.
        """
        if pk:
            pessoa = PessoaService.pesquisar(pk)
            if not pessoa:
                return Response(
                    {"error": "Pessoa não encontrada."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            return Response({"id": pessoa.id, "nome": pessoa.nome})
        else:
            pessoas = Pessoa.objects.all()
            return Response([{"id": p.id, "nome": p.nome} for p in pessoas])

    def post(self, request):
        """
        Cria uma nova pessoa.
        """
        # Implementação omitida
        pass


class CalculoPesoIdealView(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request, pk):
        pessoa = PessoaService.pesquisar(pk)
        if not pessoa:
            return Response(
                {"error": "Pessoa não encontrada."}, status=status.HTTP_404_NOT_FOUND
            )

        peso_ideal = PessoaService.calcular_peso_ideal(pessoa)
        return Response({"pesoIdeal": peso_ideal}, status=status.HTTP_200_OK)
