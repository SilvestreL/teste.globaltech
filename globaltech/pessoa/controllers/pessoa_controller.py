from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pessoa.serializers.pessoa_serializer import PessoaSerializer
from pessoa.services.pessoa_service import PessoaService

class PessoaController(APIView):
    def post(self, request):
        serializer = PessoaSerializer(data=request.data)
        if serializer.is_valid():
            pessoa = PessoaService.incluir(serializer.validated_data)
            return Response(PessoaSerializer(pessoa).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        pessoa = PessoaService.pesquisar(pk)
        return Response(PessoaSerializer(pessoa).data)

    def put(self, request, pk):
        pessoa = PessoaService.alterar(pk, request.data)
        return Response(PessoaSerializer(pessoa).data)

    def delete(self, request, pk):
        PessoaService.excluir(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

class CalculoPesoIdealView(APIView):
    def get(self, request, pk):
        pessoa = PessoaService.pesquisar(pk)
        peso_ideal = PessoaService.calcular_peso_ideal(pessoa)
        return Response({'peso_ideal': peso_ideal})