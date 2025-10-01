import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHistoryService } from '../../services/patient-history.service';

@Component({
  selector: 'app-doctorsito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctorsito.html',
  styleUrl: './doctorsito.css'
})
export class Doctorsito implements OnInit {
  patients: any[] = [];
  error = '';
  modalHistorialAbierto = false;

  constructor(private patientService: PatientHistoryService) {}

  ngOnInit() {
    this.patientService.getPatients().subscribe({
      next: (res: { success: boolean; patients: any[] }) => {
        if (res.success) {
          this.patients = res.patients;
        } else {
          this.error = 'No se pudo cargar el historial de pacientes';
        }
      },
      error: () => {
        this.error = 'Error de conexión con el servidor';
      }
    });
  }

  abrirModalHistorial() {
    this.modalHistorialAbierto = true;
  }

  cerrarModalHistorial() {
    this.modalHistorialAbierto = false;
  }

    cerrarSesion() {
      // Aquí puedes limpiar el estado, tokens, y redirigir al login
      // Por ejemplo:
      window.location.href = '/';
    }
}
