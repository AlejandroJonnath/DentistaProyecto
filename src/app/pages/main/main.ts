import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common'; // <-- Agrega esto
// Importar Anime.js correctamente para Angular y TypeScript
// @ts-ignore
import anime from 'animejs';

interface Doctor {
  nombre: string;
  especialidad: string;
  telefono: string;
  correo: string;
  img: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, CommonModule], // <-- Agrega NgIf y NgFor aquí
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  doctores: Doctor[] = [
    {
      nombre: "Dra. Ana Pérez",
      especialidad: "Ortodoncia",
      telefono: "0991234567",
      correo: "ana.perez@dentistya.com",
      img: "assets/doctor1.jpg"
    },
    {
      nombre: "Dr. Luis Gómez",
      especialidad: "Endodoncia",
      telefono: "0992345678",
      correo: "luis.gomez@dentistya.com",
      img: "assets/doctor2.png" // extensión correcta
    },
    {
      nombre: "Dra. Sofía Ruiz",
      especialidad: "Odontopediatría",
      telefono: "0993456789",
      correo: "sofia.ruiz@dentistya.com",
      img: "assets/doctor3.jpg"
    },
    {
      nombre: "Dr. Carlos Torres",
      especialidad: "Periodoncia",
      telefono: "0994567890",
      correo: "carlos.torres@dentistya.com",
      img: "assets/doctor4.jpg"
    }
  ];

  modalAbierto = false;
  doctorSeleccionado: Doctor | null = null;

  ngAfterViewInit() {
    // Animar las cards de servicios
    anime({
      targets: '.servicio-card',
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.98, 1],
      delay: anime.stagger(120, {start: 300}),
      duration: 900,
      easing: 'easeOutElastic(1, .8)'
    });
    // Animar las cards de doctores
    anime({
      targets: '.doctor-card',
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.98, 1],
      delay: anime.stagger(120, {start: 700}),
      duration: 900,
      easing: 'easeOutElastic(1, .8)'
    });
    // Animar las secciones
    anime({
      targets: ['.servicios-section', '.doctores-section'],
      opacity: [0, 1],
      scale: [0.97, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: 100
    });
  }

  abrirModal(idx: number) {
    this.doctorSeleccionado = this.doctores[idx];
    this.modalAbierto = true;
    setTimeout(() => {
      const modal = document.getElementById('doctor-modal');
      modal?.focus();
      document.body.classList.add('modal-open');
      // Animar el modal con Anime.js
      anime({
        targets: '.doctor-modal-content',
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 700,
        easing: 'easeOutBack'
      });
    });
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.doctorSeleccionado = null;
    document.body.classList.remove('modal-open');
  }

  onModalKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.cerrarModal();
    }
  }
}