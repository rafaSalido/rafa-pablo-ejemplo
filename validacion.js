document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirm_password").value;
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            event.preventDefault(); // Evita que el formulario se envíe
        }
    });
});