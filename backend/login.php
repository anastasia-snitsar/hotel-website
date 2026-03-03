<?php
session_start();
require 'db.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(404); 
    echo "User does not exist. Sign up";
    exit;
}

if (!password_verify($password, $user['password'])) {
    http_response_code(401); 
    echo "Wrong password";
    exit;
}

$_SESSION['user_id'] = $user['id'];
echo "Logged in successfuly";
