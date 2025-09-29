import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Footer } from "./components/footer/footer";
import { About } from './pages/about/about';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Dentist');
}
