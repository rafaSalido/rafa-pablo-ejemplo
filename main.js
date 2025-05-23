document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendar-body');
    const daysInMonth = 30; // Suponiendo un mes de 30 días
    const occupiedDays = [5, 12, 19, 26]; // Días ocupados

    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('td');
        dayCell.textContent = i;

        if (occupiedDays.includes(i)) {
            dayCell.classList.add('occupied');
        } else {
            dayCell.classList.add('available');
        }

        calendarBody.appendChild(dayCell);

        // Crear una nueva fila cada 7 días
        if (i % 7 === 0) {
            const row = document.createElement('tr');
            calendarBody.appendChild(row);
        }
    }
}); 