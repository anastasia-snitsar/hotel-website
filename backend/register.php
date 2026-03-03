<?php
require 'db.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $hash]);
    echo "Signed up successfully. You can login to your account";
} catch (PDOException $e) {
    http_response_code(409);
    echo "Email already exists";
}
