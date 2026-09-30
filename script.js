// --- Lógica del Pop-Up ---
let focoAntesDelPopup = null;

window.onload = function() {
    let popup = document.getElementById('molesto-popup');
    // Si existe el popup (solo en index), lo abre a los 2 segundos
    if (popup) {
        setTimeout(function() {
            abrirPopup();
        }, 2000);
    }
};

function abrirPopup() {
    let popup = document.getElementById('molesto-popup');
    if (!popup) return;
    focoAntesDelPopup = document.activeElement;
    popup.style.display = 'block';
    // Arreglo: mueve el foco al modal (antes se quedaba en la página de atrás)
    let cerrar = popup.querySelector('.cerrar-modal');
    if (cerrar) cerrar.focus();
    document.addEventListener('keydown', manejarTecladoPopup);
}

function cerrarPopup() {
    let popup = document.getElementById('molesto-popup');
    if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('keydown', manejarTecladoPopup);
        // Arreglo: devuelve el foco a donde estaba antes de abrirse
        if (focoAntesDelPopup) focoAntesDelPopup.focus();
    }
}

function manejarTecladoPopup(evento) {
    if (evento.key === 'Escape') {
        cerrarPopup();
    }
}

//logica form
//original: solo el borde de "email" se pintaba de rojo si estaba
let validacionesCampo = {
    //regex
    guest_nombre: function (valor) {
        return valor.trim().length >= 3 ? "" : "Ingresá tu nombre completo.";
    },
    guest_email: function (valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()) ? "" : "Ingresá un correo electrónico válido.";
    },
    guest_telefono: function (valor) {
        return /^[0-9 ()+-]{6,20}$/.test(valor.trim()) ? "" : "Ingresá un teléfono válido.";
    },
    topico: function (valor) {
        return valor ? "" : "Seleccioná un tópico.";
    },
    descripcion: function (valor) {
        return valor.trim().length >= 10 ? "" : "Contanos tu consulta (mínimo 10 caracteres).";
    }
};

function validarCampo(campo) {
    let validar = validacionesCampo[campo.id];
    if (!validar) return true;
    let mensaje = validar(campo.value);
    let contenedor = campo.closest('.campo');
    let error = document.getElementById('error-' + campo.id);
    if (mensaje) {
        contenedor.classList.add('campo-invalido');

        // NUEVO: informa a lectores de pantalla que el campo es inválido
        campo.setAttribute('aria-invalid', 'true');

        error.textContent = mensaje;
    } else {
        contenedor.classList.remove('campo-invalido');

        // NUEVO: informa que el campo volvió a ser válido
        campo.setAttribute('aria-invalid', 'false');

        error.textContent = '';
    }
    return mensaje === "";
}

function enviarConsulta(evento) {
    evento.preventDefault();

    let form = document.getElementById('formulario-contacto');
    let estado = document.getElementById('estado-formulario');
    let valido = true;
    let primerCampoInvalido = null;

    Object.keys(validacionesCampo).forEach(function (id) {
        let campo = document.getElementById(id);
        if (!validarCampo(campo)) {
            valido = false;
            if (!primerCampoInvalido) primerCampoInvalido = campo;
        }
    });

    if (!valido) {
        estado.className = 'error';
        estado.textContent = 'Hay errores en el formulario. Revisá los campos marcados.';
        primerCampoInvalido.focus();
        return;
    }

    let data = new FormData(form);

    fetch('contacto.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.text())
    .then(function () {
        estado.className = 'exito';
        estado.textContent = 'Consulta enviada. Te vamos a contactar a la brevedad.';
        estado.focus();
        form.reset();
    })
    .catch(function () {
        estado.className = 'error';
        estado.textContent = 'Error de conexión. Intentá nuevamente.';
        estado.focus();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('formulario-contacto');
    if (form) form.addEventListener('submit', enviarConsulta);
});