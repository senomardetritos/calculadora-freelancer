# Calculadora para Freelancers - Precificação Inteligente
### 📋 Sobre o Projeto
Uma aplicação web desenvolvida para ajudar freelancers a calcular o valor mínimo por hora que precisam cobrar para cobrir todos os custos e atingir a lucratividade desejada.

### 🎯 O Problema
Muitos freelancers, especialmente iniciantes, subestimam custos ocultos (impostos, infraestrutura, software, benefícios) e acabam cobrando valores que, no final, não são lucrativos.

### 💡 A Solução
Esta calculadora inteligente considera todos os aspectos financeiros do trabalho freelancer para fornecer uma precificação realista e sustentável.

## ✨ Funcionalidades Principais
### 🧮 Calculadora de Precificação
- **Cálculo de custos mensais:** Inclui impostos, luz, internet, software, equipamentos e outros gastos
- **Horas Trabalhadas:** Cadastro de horas por dia e dias da semana
- **Lucro Desejado:** Cadastro do valor de lucro desejado
- **Minhas Despesas Mensais:** Cadastro de uma lista de Despesas Mensais
- **Meus Projetos:** Cadastro de uma lista de Projetos
- **Valor hora ideal:** Calcula o preço mínimo por hora para atingir suas metas

### 📊 Dashboard Financeiro
- Visualização de quanto **Você Precisa Cobrar** baseado em suas despesas, horas por dia, dias da semana e lucro desejado
- Visualização de quanto **Você Está Recebendo** baseado nos projetos cadastrados

### 🔐 Autenticação Segura
- Sistema de login para acesso privado aos dados
- Proteção de informações financeiras sensíveis

### 🛠️ Tecnologias Utilizadas
- Framework: Next.js com App Router
- Banco de Dados: MongoDB em container Docker
- Autenticação: Sistema seguro com salt e hash
- Testes: Suíte de testes unitários com cobertura

## 🚀 Configuração do Ambiente
### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- npm ou yarn

## 💾 Configuração do Banco de Dados

O projeto utiliza MongoDB como banco de dados, executado em uma instância Docker para facilitar o desenvolvimento e garantir a consistência do ambiente.

Altere os seguintes arquivos com seus dados de login no banco de dados:

- docker-compose.yaml
- src/lib/mongodb.ts

Rode o comando para criar e instanciar o banco de dados: 

```bash
# Subir container do MongoDB
docker compose up -d
```

## 📊 Acessando o Banco de Dados

O projeto inclui Mongo-Express para gerenciamento visual do banco:
- URL: [http://localhost:8081](http://localhost:8081)
- Credenciais: Configuradas no arquivo docker-compose.yaml

## ⚙️ Configuração de Variáveis de Ambiente

Crie um arquivo na pasta raiz com o nome de .env.local e coloque as seguintes informações:

```env
AUTH_SECRET="CRIE UMA CHAVE"
AUTH_SALT="CRIE UM SALT"
```

## ⚡ Instalando e rodando o projeto

Instale os módulos e rode o projeto com os comandos:

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

## 🧪 Testes e Qualidade

Para rodar os testes unitários do projeto execute o comando:

```bash
# Executar testes unitários
npm run test
```

Será gerada uma pasta coverage para acompanhar a cobertura de código dos testes. 

```bash
# Ver relatório de cobertura
open coverage/lcov-report/index.html
```

