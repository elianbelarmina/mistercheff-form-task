<?php
$host = 'localhost';
$dbname = 'cadastros_db';
$user = 'root';
$password = '';

// Conecta ao banco de dados
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica se a requisição é do tipo GET (Obter empresas)
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Busca todas as empresas cadastradas
        $sql = "SELECT nome_loja, logomarca, contato FROM cads";
        $stmt = $pdo->query($sql);
        $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Retorna os dados em formato JSON
        echo json_encode($empresas);
    }

} catch (PDOException $e) {
    echo "Erro ao conectar ou processar o formulário: " . $e->getMessage();
}
?>