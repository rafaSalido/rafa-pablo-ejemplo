<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "innovadent";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener el ID del usuario de la sesión
$user_id = $_SESSION['user_id'];

// Preparar y ejecutar la consulta SQL para obtener la información del usuario
$stmt = $conn->prepare("SELECT foto FROM usuarios WHERE idusuarios = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    echo "Error: Usuario no encontrado.";
    exit();
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html>
<head> 
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil - Innova-Dent</title>
    <link rel="stylesheet" href="css/Perfil.css">
</head>
<body>
	<header>
        <nav class="navbar">
            <div class="logo">
                <img src="images/logo.png" alt="Innova-Dent Logo">
            </div>
			<div class="menu">
                <ul>
                    <li><a href="Perfil.php">Perfil</a></li>
					<li><a href="misPruebas.php">Mis pruebas</a></li>
					<li><a href="misTratamientos.php">Mis tratamientos</a></li>
					<li><a href="misCitas.php">Mis citas</a></li>
					<li><a href="Controlador/logout.php">Cerrar sesión</a></li>
                </ul>
            </div>
			<div class="profile">
				<?php if (!empty($row['foto'])): ?>
                    <img src="<?php echo htmlspecialchars($row['foto']); ?>" alt="Foto de perfil">
                <?php endif; ?>
			</div>
        </nav>
    </header>
	<main>
		<h1 class="titulo">MIS CITAS</h1>
		
    </main>
</body>
</html>