from pessoa.models.pessoa import Pessoa
from django.shortcuts import get_object_or_404

class PessoaTask:
    @staticmethod
    def incluir(data):
        return Pessoa.objects.create(**data)

    @staticmethod
    def alterar(pk, data):
        pessoa = get_object_or_404(Pessoa, pk=pk)
        for attr, value in data.items():
            setattr(pessoa, attr, value)
        pessoa.save()
        return pessoa

    @staticmethod
    def excluir(pk):
        pessoa = get_object_or_404(Pessoa, pk=pk)
        pessoa.delete()

    @staticmethod
    def pesquisar(pk):
        return get_object_or_404(Pessoa, pk=pk)

    @staticmethod
    def calcular_peso_ideal(pessoa):
        if pessoa.sexo == 'M':
            return (72.7 * pessoa.altura) - 58
        else:
            return (62.1 * pessoa.altura) - 44.7