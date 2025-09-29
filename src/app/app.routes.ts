import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Services } from './pages/services/services';
import { Doctor } from './pages/doctor/doctor';
import { Paciente } from './pages/paciente/paciente';


export const routes: Routes = [
    { path: '', component: Main },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'services', component: Services },
    { path: 'doctor', component: Doctor },
    { path: 'paciente', component: Paciente },
    { path: '**', redirectTo: '' }

];
