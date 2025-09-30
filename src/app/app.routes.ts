import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Services } from './pages/services/services';

import { Paciente } from './pages/paciente/paciente';
import { Doctor } from './pages/doctor/doctor';
import { LoginDoctor } from './components/login-doctor/login-doctor';
import { LoginPaciente } from './components/login-paciente/login-paciente';


export const routes: Routes = [
    { path: '', component: Main },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'services', component: Services },
    { path: 'doctor', component: Doctor },
    { path: 'paciente', component: Paciente },
    { path: 'logindoctor', component: LoginDoctor },
    { path: 'loginpaciente', component: LoginPaciente },
    { path: '**', redirectTo: '' }

];
