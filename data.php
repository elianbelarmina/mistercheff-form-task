<?php
$host = 'localhost';
$dbname = 'cadastros_db';
$user = 'root';
$password = '';

// Conecta ao banco de dados
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar se a requisição é do tipo POST (Cadastro de empresa)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Recebe os dados do formulário
        $nome_loja = $_POST['nomeLoja'];
        $cnpj = $_POST['CNPJ'];
        $email = $_POST['email'];
        $contato = $_POST['contato'];
        $cep = $_POST['CEP'];
        $rua = $_POST['rua'];
        $numero = $_POST['numero'];
        $complemento = $_POST['complemento'];
        $bairro = $_POST['bairro'];
        $cidade = $_POST['cidade'];
        $estado = $_POST['estado'];
        $logomarca = $_FILES['logomarca'];

        // Processa o upload da imagem
        if ($logomarca && $logomarca['error'] === UPLOAD_ERR_OK) {
            $logomarca_nome = $logomarca['name'];
            $logomarca_tmp = $logomarca['tmp_name'];
            $logomarca_destino = 'logos/' . uniqid() . '_' . $logomarca_nome;
            move_uploaded_file($logomarca_tmp, $logomarca_destino);
        } else {
            $logomarca_destino = null; // Caso nenhum arquivo tenha sido enviado
        }

        // Insere no banco de dados
        $sql = "INSERT INTO cads (nome_loja, cnpj, email, contato, cep, rua, numero, complemento, bairro, cidade, estado, logomarca)
                VALUES (:nome_loja, :cnpj, :email, :contato, :cep, :rua, :numero, :complemento, :bairro, :cidade, :estado, :logomarca)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nome_loja' => $nome_loja,
            ':cnpj' => $cnpj,
            ':email' => $email,
            ':contato' => $contato,
            ':cep' => $cep,
            ':rua' => $rua,
            ':numero' => $numero,
            ':complemento' => $complemento,
            ':bairro' => $bairro,
            ':cidade' => $cidade,
            ':estado' => $estado,
            ':logomarca' => $logomarca_destino
        ]);

        // Redireciona para a página de sucesso
        header("Location: cadastros.html");
        exit();
    }

} catch (PDOException $e) {
    echo "Erro ao conectar ou processar o formulário: " . $e->getMessage();
}
?>