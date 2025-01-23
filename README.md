# Cadastro de Lojas

Este é um sistema de cadastro de lojas utilizando PHP, HTML, CSS, JavaScript e o XAMPP para execução local.

## Requisitos

Para executar o projeto localmente, você precisará de:

- **PHP** (versão 7.4 ou superior)
- **XAMPP** (ou qualquer servidor web local que suporte PHP e MySQL)
- **Navegador web** (Google Chrome, Firefox, etc.)

## Passos para Executar o Projeto Localmente

### 1. Instalar o XAMPP

Se você ainda não tem o XAMPP instalado, siga os seguintes passos:

- Acesse [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html) e faça o download do XAMPP.
- Instale o XAMPP seguindo as instruções para o seu sistema operacional.

### 2. Configurar o Ambiente Local

Após a instalação do XAMPP, siga os passos abaixo:

1. **Iniciar o XAMPP:**
   - Abra o XAMPP e inicie o Apache e o MySQL.
   
2. **Configurar o diretório do projeto:**
   - Copie o código do projeto para a pasta `htdocs` do XAMPP. Normalmente, ela está localizada em `C:\xampp\htdocs` (Windows) ou `/Applications/XAMPP/htdocs` (macOS).
   - O nome da pasta onde você copiou o projeto será a URL para acessá-lo no navegador (por exemplo, `http://localhost/nome-do-projeto`).

3. **Configurar o banco de dados:**
   - Acesse o `phpMyAdmin` clicando no botão "Admin" ao lado de "MySQL" no painel de controle do XAMPP.
   - Crie um banco de dados para o seu projeto (exemplo: `cadastros_db`).
   - Importe qualquer estrutura de tabelas necessária para o funcionamento do projeto (dependendo das necessidades, você pode criar tabelas para armazenar dados como lojas, logomarcas, etc).

### Criar Tabela no MySQL

Para criar a tabela `cads` no seu banco de dados, você pode usar o seguinte comando SQL:

CREATE DATABASE cadastros_db;
USE cadastros_db;
CREATE TABLE cads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_loja VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contato VARCHAR(50),
    cep VARCHAR(10),
    rua VARCHAR(255),
    numero VARCHAR(10),
    complemento VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(2),
    logomarca VARCHAR(255)
);


// Executando o Projeto
Abra o navegador e acesse http://localhost/nome-do-projeto (substitua nome-do-projeto pelo nome da pasta onde você salvou o código).

A página inicial exibirá um formulário para cadastrar lojas com as seguintes informações:

Nome da loja
CNPJ
E-mail
Contato
Endereço (CEP, rua, número, complemento, bairro, cidade, estado)
Logomarca (upload de imagem)
Ao preencher o formulário e clicar em "Enviar Dados", os dados serão enviados para o arquivo data.php, que processará e salvará os dados no banco de dados.

Acesse a página http://localhost/nome-do-projeto/lojas.html para visualizar as lojas cadastradas.


// Máscaras de Formulário
O formulário possui máscaras de entrada para alguns campos:

CNPJ: Formatação automática para CNPJ (XX.XXX.XXX/XXXX-XX).
Telefone: Formatação automática para telefone (XX XXXXX-XXXX).
CEP: Formatação automática para CEP (XXXXX-XXX).
5. Validações de Formulário
O formulário inclui validações para garantir que os dados inseridos estão no formato correto:

Nome da loja: Apenas letras, números, espaços e hífens são permitidos. Máximo de 32 caracteres.
CNPJ: O CNPJ precisa ter exatamente 14 caracteres no formato correto.
E-mail: O e-mail deve seguir o formato (exemplo@dominio.com).
Telefone: O telefone deve seguir o formato (XX XXXXX-XXXX).
CEP: O CEP precisa ter o formato 00000-000.
UF: A UF deve conter apenas 2 letras maiúsculas.
6. Visualização das Lojas Cadastradas
A página de visualização (lojas.html) exibe as lojas cadastradas com suas respectivas informações e logomarcas.

// Estrutura do Projeto
index.html: Página de cadastro de lojas.
lojas.html: Página de visualização das lojas cadastradas.
style/style.css: Estilos para a página de cadastro.
style/styleCads.css: Estilos para a página de visualização.
script/script.js: Scripts JavaScript para validação e formatação dos campos do formulário.
data.php: Script PHP para processar o formulário e interagir com o banco de dados.
Conclusão
Este sistema de cadastro de lojas permite que você cadastre e visualize lojas em um ambiente local utilizando PHP, HTML, CSS e JavaScript. Siga os passos acima para configurar e executar o projeto localmente.