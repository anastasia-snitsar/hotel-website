<?php
require 'db.php';

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$stmt = $pdo->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
$stmt->execute([$name, $email, $message]);

echo "Massage sent";