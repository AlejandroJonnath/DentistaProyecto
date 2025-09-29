import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// --- Modal Doctor Script para main.html ---
interface Doctor {
  nombre: string;
  especialidad: string;
  telefono: string;
  correo: string;
  img: string;
}

const doctores: Doctor[] = [
  {
    nombre: "Dra. Ana Pérez",
    especialidad: "Ortodoncia",
    telefono: "0991234567",
    correo: "ana.perez@dentistya.com",
    img: "assets/doctores/doctor1.jpg"
  },
  {
    nombre: "Dr. Luis Gómez",
    especialidad: "Endodoncia",
    telefono: "0992345678",
    correo: "luis.gomez@dentistya.com",
    img: "assets/doctores/doctor2.jpg"
  },
  {
    nombre: "Dra. Sofía Ruiz",
    especialidad: "Odontopediatría",
    telefono: "0993456789",
    correo: "sofia.ruiz@dentistya.com",
    img: "assets/doctores/doctor3.jpg"
  },
  {
    nombre: "Dr. Carlos Torres",
    especialidad: "Periodoncia",
    telefono: "0994567890",
    correo: "carlos.torres@dentistya.com",
    img: "assets/doctores/doctor4.jpg"
  }
];

function setupDoctorModalScript() {
  const doctorCards = document.querySelectorAll<HTMLDivElement>('.doctor-card');
  doctorCards.forEach((card, idx) => {
    card.addEventListener('click', () => showDoctorModal(idx));
    card.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') showDoctorModal(idx);
    });
  });

  function showDoctorModal(idx: number) {
    const doc = doctores[idx];
    const modal = document.getElementById('doctor-modal') as HTMLElement | null;
    const img = document.getElementById('modal-doctor-img') as HTMLImageElement | null;
    const nombre = document.getElementById('modal-doctor-nombre') as HTMLElement | null;
    const especialidad = document.getElementById('modal-doctor-especialidad') as HTMLElement | null;
    const telefono = document.getElementById('modal-doctor-telefono') as HTMLElement | null;
    const correo = document.getElementById('modal-doctor-correo') as HTMLElement | null;
    if (!modal || !img || !nombre || !especialidad || !telefono || !correo) return;
    img.src = doc.img;
    img.alt = doc.nombre;
    nombre.textContent = doc.nombre;
    especialidad.textContent = doc.especialidad;
    telefono.textContent = doc.telefono;
    correo.textContent = doc.correo;
    modal.style.display = 'flex';
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
    modal.focus();

    // Hace el fondo más oscuro y bloquea scroll
    document.body.classList.add('modal-open');
  }

  function closeDoctorModal() {
    const modal = document.getElementById('doctor-modal') as HTMLElement | null;
    if (modal) modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  // Cerrar modal al hacer click fuera del contenido
  const modal = document.getElementById('doctor-modal');
  if (modal) {
    modal.addEventListener('click', (event: MouseEvent) => {
      if (event.target === modal) closeDoctorModal();
    });
    // Cerrar con ESC
    modal.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDoctorModal();
    });
  }
  // Cerrar modal con la X
  const closeBtn = document.querySelector('.doctor-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDoctorModal);
  }

  // Expone funciones globales si algún HTML inline las llama
  (window as any).showDoctorModal = showDoctorModal;
  (window as any).closeDoctorModal = closeDoctorModal;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDoctorModalScript);
} else {
  setupDoctorModalScript();
}
