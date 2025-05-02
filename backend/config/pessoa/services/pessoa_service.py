from backend.config.pessoa.tasks.pessoa_task import PessoaTask


class PessoaService:
    @staticmethod
    def incluir(data):
        return PessoaTask.incluir(data)

    @staticmethod
    def alterar(pk, data):
        return PessoaTask.alterar(pk, data)

    @staticmethod
    def excluir(pk):
        PessoaTask.excluir(pk)

    @staticmethod
    def pesquisar(pk):
        return PessoaTask.pesquisar(pk)

    @staticmethod
    def calcular_peso_ideal(pessoa):
        return PessoaTask.calcular_peso_ideal(pessoa)
