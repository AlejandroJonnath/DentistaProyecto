import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- Importa Router
import { LoginDoctorService } from '../../services/login-doctor';

@Component({
  selector: 'app-login-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-doctor.html',
  styleUrl: './login-doctor.css'
})
export class LoginDoctor {
  email = '';
  password = '';
  error = '';

  constructor(
    private loginService: LoginDoctorService,
    private router: Router // <-- Inyecta Router
  ) {}

  onSubmit() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/doctorsito']); // <-- Redirige aquí
        } else {
          this.error = res.message || 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Error de conexión';
      }
    });
  }
}
