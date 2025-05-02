from django.test import TestCase

from backend.config.pessoa.models.pessoa import Pessoa


class PessoaModelTest(TestCase):
    def setUp(self):
        self.pessoa = Pessoa.objects.create(
            nome='Lucas',
            idade=30,
            altura=1.75,
            peso=70,
            sexo='M'
        )

    def test_str_representation(self):
        self.assertEqual(str(self.pessoa), 'Lucas')