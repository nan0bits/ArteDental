document.addEventListener('DOMContentLoaded', () => {
    
    /* --- BASE DE DATOS DE TRATAMIENTOS --- */
const tratamientosData = {
    'prevencion': {
        title: "Prevención",
        subtitle: "La base de una sonrisa sana",
        bg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        desc: "Las visitas regulares y limpiezas profesionales son esenciales. Detectamos problemas antes de que sean dolorosos y costosos.",
        video: "https://videos.pexels.com/video-files/6620573/6620573-uhd_2560_1440_25fps.mp4"
    },
    'estetica': {
        title: "Estética Dental",
        subtitle: "Diseñamos la sonrisa de tus sueños",
        bg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        desc: "Carillas, blanqueamientos y diseño digital de sonrisa. Analizamos tus facciones para crear dientes que se vean naturales y perfectos.",
        video: "https://videos.pexels.com/video-files/3840445/3840445-uhd_2560_1440_24fps.mp4"
    },
    'rehabilitacion': {
        title: "Rehabilitación",
        subtitle: "Recupera la función y la estética",
        bg: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        desc: "Tratamientos complejos para bocas dañadas. Usamos coronas, puentes y resinas de alta resistencia para que vuelvas a comer con confianza.",
        video: "https://videos.pexels.com/video-files/6620573/6620573-uhd_2560_1440_25fps.mp4"
    },
    'cirugia': {
        title: "Cirugía e Implantes",
        subtitle: "Soluciones definitivas",
        bg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        desc: "Implantes de titanio que se integran a tu hueso. La mejor opción para reemplazar dientes perdidos con una sensación 100% natural.",
        video: "https://videos.pexels.com/video-files/3840445/3840445-uhd_2560_1440_24fps.mp4"
    }
};

/* --- FUNCIONES PARA ABRIR/CERRAR MODAL --- */
const modal = document.getElementById('treatment-modal');
const body = document.body;

function abrirDetalle(id) {
    const modal = document.getElementById('treatment-modal');
    const data = tratamientosData[id];

    if(data) {
        // 1. Llenar textos
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-subtitle').innerText = data.subtitle;
        document.getElementById('modal-desc').innerHTML = data.desc;
        
        // 2. Cambiar Fondo del Header (Arriba)
        document.getElementById('modal-hero-bg').style.backgroundImage = `url('${data.bg}')`;
        
        // 3. Cambiar IMAGEN LATERAL (Abajo/Derecha)
        const sideImg = document.getElementById('modal-side-img');
        
        // Verificación de seguridad:
        if(sideImg) {
            sideImg.src = data.sideImage || data.bg; // Si no hay imagen lateral, usa la de fondo por si acaso
            sideImg.style.display = 'block'; // Asegura que sea visible
        } else {
            console.error("¡Error! No encuentro la etiqueta <img id='modal-side-img'> en el HTML");
        }

        // 4. Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function cerrarDetalle() {
    modal.classList.remove('active');
    body.style.overflow = 'auto'; // Reactivar scroll
    
    // Pausar video al cerrar para que no se quede sonando
    document.getElementById('modal-video-src').pause();
}
    // --- LÓGICA DEL MENÚ (Ya la tenías) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    // ... (Tu código de menú anterior aquí) ...


    // --- NUEVO: ANIMACIÓN AL HACER SCROLL (Intersection Observer) ---
    // Esta es la forma moderna y eficiente de hacer animaciones
    
    const observerOptions = {
        root: null, // Observa el viewport (pantalla)
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento entra en pantalla, le ponemos la clase 'show-section'
                entry.target.classList.add('show-section');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    // Seleccionamos todas las secciones que queremos animar
    // (Asegúrate de agregar la clase 'hidden-section' a tus <section> en el HTML)
    const sections = document.querySelectorAll('.hidden-section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
