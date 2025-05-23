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

// Obtener el ID del administrador de la sesión
$user_id = $_SESSION['user_id'];

// Preparar y ejecutar la consulta SQL para obtener la información del administrador
$stmt = $conn->prepare("SELECT nombre, primer_apellido, segundo_apellido, foto FROM administrador WHERE idadministrador = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el administrador
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
} else {
    echo "Error: Administrador no encontrado.";
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
    <title>PerfilAdministrador - Innova-Dent</title>
    <link rel="stylesheet" href="css/PerfilAdministrador.css">
</head>
<body>
	<header>
        <nav class="navbar">
            <div class="logo">
                <img src="images/logo.png" alt="Innova-Dent Logo">
            </div>
			 <div class="menu">
                <ul>
                    <li><a href="PerfilAdministrador.html">Perfil</a></li>
					<li><a href="editar.html">Editar Contenido</a></li>
					<li><a href="editar.html">Calendario de citas</a></li>
					<li><a href="editar.html">Añadir entrada</a></li>
					<li><a href="Controlador/logout.php">Cerrar sesión</a></li>
                </ul>
            </div>
			<div class="profile">
				<?php if (!empty($row['foto'])): ?>
                    <img src="<?php echo htmlspecialchars($row['foto']); ?>" alt="Foto de perfil del administrador">
                <?php endif; ?>
			</div>
        </nav>
    </header>
	<main>
		<h1 class="titulo">PERFIL</h1>
		<div class="profile-container">
			<div class="profile-info">
				<p>Nombre y Apellidos: <?php echo htmlspecialchars($row['nombre'] . ' ' . $row['primer_apellido'] . ' ' . $row['segundo_apellido']); ?></p>
			</div>
			<div class="profile-image">
				<?php if (!empty($row['foto'])): ?>
					<img src="<?php echo htmlspecialchars($row['foto']); ?>" alt="Foto de perfil del administrador">
				<?php endif; ?>
			</div>
		</div>
    </main>
</body>
</html>