from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models.pessoa import Pessoa
from backend.config.pessoa.serializers.pessoa_serializer import PessoaSerializer
from backend.config.pessoa.tasks.pessoa_task import PessoaTask
from django.shortcuts import get_object_or_404


class PessoaListCreateView(APIView):
    def get(self, request):
        pessoas = Pessoa.objects.all()
        serializer = PessoaSerializer(pessoas, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        pessoa = PessoaTask.incluir(data)
        serializer = PessoaSerializer(pessoa)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PessoaDetailView(APIView):
    def get(self, request, pk):
        pessoa = PessoaTask.pesquisar(pk)
        serializer = PessoaSerializer(pessoa)
        return Response(serializer.data)

    def put(self, request, pk):
        data = request.data
        pessoa = PessoaTask.alterar(pk, data)
        serializer = PessoaSerializer(pessoa)
        return Response(serializer.data)

    def delete(self, request, pk):
        PessoaTask.excluir(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)


class PesoIdealView(APIView):
    def get(self, request, pk):
        pessoa = PessoaTask.pesquisar(pk)
        peso_ideal = PessoaTask.calcular_peso_ideal(pessoa)
        return Response({"pesoIdeal": peso_ideal})
