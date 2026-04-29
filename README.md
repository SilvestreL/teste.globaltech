Sistema de Gestão de Pessoas

Este é um sistema de gestão de pessoas desenvolvido com **Django** no backend e **React** no frontend. O sistema permite criar, listar, editar, excluir e calcular o peso ideal de pessoas.

## Tecnologias Utilizadas

### Backend

- **Django**: Framework web para o backend.
- **Django REST Framework (DRF)**: Para criação de APIs RESTful.
- **drf-yasg**: Para documentação da API com Swagger.
- **PostgreSQL**: Banco de dados relacional.
- **django-cors-headers**: Para lidar com CORS.

### Frontend

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Zod**: Para validação de formulários.
- **React Hook Form**: Para gerenciamento de formulários.
- **Sonner**: Para exibição de notificações.
- **Axios**: Para requisições HTTP.

---

## Funcionalidades

### Backend

- **CRUD de Pessoas**:
  - Criar, listar, editar e excluir pessoas.
- **Cálculo de Peso Ideal**:
  - Calcula o peso ideal com base na altura e sexo da pessoa.
- **Documentação da API**:
  - Disponível em `/swagger/` (Swagger UI) e `/redoc/` (Redoc).

### Frontend

- **Formulário de Cadastro e Edição**:
  - Validação de dados com Zod.
- **Listagem de Pessoas**:
  - Exibição de pessoas cadastradas em cards.
- **Cálculo de Peso Ideal**:
  - Modal para exibir o peso ideal de uma pessoa.
- **Notificações**:
  - Feedback visual para ações como salvar, excluir e erros.

---

## Instalação e Configuração

### Pré-requisitos

- **Python 3.13+**
- **Node.js 18+**
- **PostgreSQL**

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/teste.globaltech.git
   cd teste.globaltech
   ```
