<?php
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

$name = $_POST['name'];
$email = $_POST['email'];
$room = $_POST['room'];
$check_in = $_POST['check_in'];
$check_out = $_POST['check_out'];
$user_id = $_SESSION['user_id'] ?? null;

$stmt = $pdo->prepare("SELECT total_rooms FROM rooms WHERE type = ?");
$stmt->execute([$room]);
$total = $stmt->fetchColumn();

if (!$total) {
    http_response_code(400);
    exit('Wrong type of room');
}

$stmt = $pdo->prepare("SELECT COUNT(*) FROM reservations WHERE room = ? AND NOT (check_out <= ? OR check_in >= ?)");
$stmt->execute([$room, $check_in, $check_out]);
$booked = $stmt->fetchColumn();

if ($booked >= $total) {
    http_response_code(409);
    exit('There is no available rooms for this date');
}

$stmt = $pdo->prepare("INSERT INTO reservations (user_id, name, email, room, check_in, check_out) VALUES (?, ?, ?, ?, ?,?)");
$stmt->execute([$user_id, $name, $email, $room, $check_in, $check_out]);

http_response_code(200);
echo 'Reservation saved';