document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.resenas-grid');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    let isAnimating = false; // Prevenir múltiples clicks
    
    const reviews = [
        {
            letra: 'M',
            nombre: 'Mónica',
            texto: 'Excelente la atención y el profesionalismo de todo el equipo, muy eficientes y amables. Recomiendo al 100%'
        },
        {
            letra: 'J',
            nombre: 'Jose Manuel',
            texto: 'Atendieron a mi hijo de 10, muy profesionales y amables. Lo Recomiendo 100%'
        },
        {
            letra: 'L',
            nombre: 'Laura',
            texto: 'Hace un tiempo, tras consultar diferentes centros, me decanté por la clínica para mi tratamiento de ortodoncia invisible.'
        },
        {
            letra: 'A',
            nombre: 'Ana',
            texto: 'Un servicio excepcional y un trato muy cercano. Me sentí muy cómoda durante todo el proceso.'
        },
        {
            letra: 'C',
            nombre: 'Carlos',
            texto: 'La clínica es moderna y el personal es muy atento. Definitivamente volveré para futuros tratamientos.'
        },
        {
            letra: 'S',
            nombre: 'Sofía',
            texto: 'Muy contenta con los resultados. El equipo es muy profesional y se nota que tienen mucha experiencia.'
        }
    ];
    
    let currentIndex = 0;
    
    function createReviewElement(review, index) {
        return `
            <div class="resena-item ${index === 1 ? 'active' : ''}">
                <div class="resena-content">
                    <div class="resena-avatar">
                        <span class="avatar-letra">${review.letra}</span>
                    </div>
                    <h3>${review.nombre}</h3>
                    <div class="estrellas">★★★★★</div>
                    <p>${review.texto}</p>
                </div>
            </div>
        `;
    }
    
    function slide(direction) {
        if (isAnimating) return;
        isAnimating = true;
        
        const currentClass = direction === 'next' ? 'slide-next' : 'slide-prev';
        carousel.classList.add(currentClass);
        
        setTimeout(() => {
            currentIndex = direction === 'next' 
                ? (currentIndex + 1) % reviews.length 
                : (currentIndex - 1 + reviews.length) % reviews.length;
            updateCarousel();
            carousel.classList.remove(currentClass);
            isAnimating = false;
        }, 600);
    }
    
    function updateCarousel() {
        const visibleReviews = [
            reviews[(currentIndex - 1 + reviews.length) % reviews.length],
            reviews[currentIndex],
            reviews[(currentIndex + 1) % reviews.length]
        ];
        
        carousel.innerHTML = visibleReviews.map((review, index) => 
            createReviewElement(review, index)
        ).join('');
    }
    
    nextButton.addEventListener('click', () => slide('next'));
    prevButton.addEventListener('click', () => slide('prev'));
    
    // Inicializar el carrusel
    updateCarousel();
}); 
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100; // Mueve el carrusel
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Mostrar la primera imagen al cargar
window.onload = function () {
    showSlide(currentSlide);
};

var swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true, // Habilitar el bucle
    autoplay: {
        delay: 3000, // Cambia la imagen cada 3 segundos
        disableOnInteraction: false,
    },
});

function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "flex"; // Mostrar el modal
    modalImage.src = imageSrc; // Establecer la imagen del modal
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Ocultar el modal
}