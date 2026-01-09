/* =========================================
   1. BASE DE DATOS (GLOBAL)
   ========================================= */
// DATOS DE TRATAMIENTOS
const tratamientosData = {
    'prevencion': {
        title: "Prevención",
        subtitle: "La base de una sonrisa sana",
        bg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1950&q=80",
        desc: "Las visitas regulares y limpiezas profesionales son esenciales. Detectamos problemas antes de que sean dolorosos y costosos.",
        sideImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80"
    },
    'estetica': {
        title: "Estética Dental",
        subtitle: "Diseñamos la sonrisa de tus sueños",
        bg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1950&q=80",
        desc: "Carillas, blanqueamientos y diseño digital de sonrisa. Analizamos tus facciones para crear dientes que se vean naturales.",
        sideImage: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80"
    },
    'rehabilitacion': {
        title: "Rehabilitación",
        subtitle: "Recupera la función total",
        bg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1950&q=80",
        desc: "Tratamientos complejos para bocas dañadas. Usamos coronas y puentes de alta resistencia.",
        sideImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80"
    },
    'cirugia': {
        title: "Cirugía e Implantes",
        subtitle: "Soluciones definitivas",
        bg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1950&q=80",
        desc: "Implantes de titanio que se integran a tu hueso. La mejor opción para reemplazar dientes perdidos.",
        sideImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    }
};

// FUNCIONES PARA ABRIR Y CERRAR
function abrirDetalle(id) {
    const modal = document.getElementById('treatment-modal');
    const data = tratamientosData[id];
    if(data) {
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-subtitle').innerText = data.subtitle;
        document.getElementById('modal-desc').innerHTML = data.desc;
        document.getElementById('modal-hero-bg').style.backgroundImage = `url('${data.bg}')`;
        const sideImg = document.getElementById('modal-side-img');
        if(sideImg) sideImg.src = data.sideImage;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarDetalle() {
    document.getElementById('treatment-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* =========================================
   2. FUNCIONES DEL MODAL (GLOBALES)
   IMPORTANTE: Tienen que estar fuera del DOMContentLoaded 
   para que el HTML las encuentre.
   ========================================= */
// Variable global para el modal
const modal = document.getElementById('treatment-modal');

function abrirDetalle(tratamientoKey) {
    // 1. Obtenemos los datos del objeto (asegúrate de que tratamientosData esté definido arriba)
    const data = tratamientosData[tratamientoKey];

    // 2. Verificamos que existan los datos para evitar errores
    if (!data) {
        console.error("No se encontraron datos para: " + tratamientoKey);
        return;
    }

    // 3. Rellenamos el HTML (AQUÍ DABA EL ERROR ANTES)
    // Usamos 'getElementById' asegurándonos que coinciden con el HTML nuevo
    const titleEl = document.getElementById('modal-title');
    const subEl = document.getElementById('modal-subtitle');
    const descEl = document.getElementById('modal-desc');
    const imgEl = document.getElementById('modal-side-img');

    // Asignamos los valores solo si los elementos existen (doble seguridad)
    if(titleEl) titleEl.innerText = data.title;
    if(subEl) subEl.innerText = data.subtitle;
    if(descEl) descEl.innerText = data.desc;
    
    // Para la imagen usamos .src, no .innerText
    if(imgEl) imgEl.src = data.sideImage; 

    // 4. Mostramos el modal usando la API nativa
    if (modal) {
        modal.showModal(); // Esto abre el dialog y pone el backdrop automáticamente
    }
}

function cerrarDetalle() {
    if (modal) {
        // Animación de salida opcional (simulada)
        modal.setAttribute('closing', '');
        
        // Simplemente cerramos
        modal.close(); 
    }
}

// Cierra el modal si hacen click fuera del contenido (en el backdrop)
modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

/* =========================================
   3. LÓGICA QUE ESPERA A QUE CARGUE LA PÁGINA
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- A. CERRAR MODAL SI CLICKEAS FUERA (backdrop) ---
    const dialog = document.getElementById('treatment-modal');
    if (dialog) {
        dialog.addEventListener('click', (e) => {
            const rect = dialog.getBoundingClientRect();
            // Detectar si el clic fue fuera del rectángulo del modal
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
              rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            
            if (!isInDialog) {
                dialog.close();
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- B. MENU MOVIL ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }

    // --- C. CARRUSEL EQUIPO ---
    const scroller = document.getElementById('teamScroller');
    const btnNext = document.getElementById('btnNextEquipo');
    const btnPrev = document.getElementById('btnPrevEquipo');

    if (scroller && btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            // Mueve el ancho de una tarjeta (aprox 300px)
            scroller.scrollBy({ left: 300, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            scroller.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // --- D. ANIMACIÓN AL HACER SCROLL (OPCIONAL) ---
    // Si quieres usar esto, agrega la clase 'hidden-section' a tus sections en el HTML
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    });

    document.querySelectorAll('.hidden-section').forEach((el) => observer.observe(el));

}); 
// FIN DEL DOMContentLoaded