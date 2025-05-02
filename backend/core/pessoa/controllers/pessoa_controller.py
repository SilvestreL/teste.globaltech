from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PessoaController(APIView):
    def post(self, request):
        
        return Response({"message": "POST working"}, status=status.HTTP_201_CREATED)

    def get(self, request, pk=None):
        return Response({"message": f"GET working for {pk}"})

class CalculoPesoIdealView(APIView):
    def get(self, request, pk=None):
        return Response({"peso_ideal": 70})