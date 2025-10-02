import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer], // <-- Ya no necesitas NgIf aquí
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class AppComponent {
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta header/navbar en /doctor y /paciente
        this.showLayout = !(
          event.urlAfterRedirects.startsWith('/doctor') ||
          event.urlAfterRedirects.startsWith('/paciente') ||
          event.urlAfterRedirects.startsWith('/loginpaciente') ||
          event.urlAfterRedirects.startsWith('/logindoctor')
        );
      }
    });
  }
}
