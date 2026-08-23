// --- Lógica del Pop-Up ---
window.onload = function() {
    let popup = document.getElementById('molesto-popup');
    // Si existe el popup (solo en index), lo abre a los 2 segundos
    if (popup) {
        setTimeout(function() {
            popup.style.display = 'block';
            // Falla Grave: El foco NO se mueve al modal.
            // Si el usuario usa 'Tab', tabulará por la página detrás del modal.
        }, 2000);
    }
};

function cerrarPopup() {
    let popup = document.getElementById('molesto-popup');
    if (popup) {
        popup.style.display = 'none';
        // Falla: El foco no vuelve al elemento que disparó el modal 
        // (aunque aquí se disparó solo por tiempo).
    }
}

// --- Lógica del Formulario ---
function enviarConsulta() {
    let email = document.getElementById('guest_email');
    
    if (email && email.value === "") {
        email.style.borderColor = "red";
        email.style.backgroundColor = "#ffe6e6";
        return;
    }
    
    if(email) {
        email.style.borderColor = "#ccc";
        email.style.backgroundColor = "#fff";
    }

    let nombreElem = document.getElementById('guest_nombre');
    let data = new FormData();
    data.append('guest_email', email ? email.value : '');
    data.append('guest_nombre', nombreElem ? nombreElem.value : '');
    
    fetch('contacto.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.text())
    .then(data => {
        alert("Consulta enviada a la API.");
    })
    .catch(error => {
        alert("Error de conexión.");
    });
}