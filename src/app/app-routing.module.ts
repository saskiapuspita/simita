import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './service/auth-guard.service';

import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { InputComponent } from './input/input.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { SliderComponent } from './component/slider/slider.component';
import { TableComponent } from './component/table/table.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { AssociateComponent } from './component/associate/associate.component';
import { LoginComponent } from './component/login/login.component';
import { PeminatanComponent } from './component/peminatan/peminatan.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MasterMahasiswaComponent } from './component/master-mahasiswa/master-mahasiswa.component';
import { MasterPeminatanComponent } from './component/master-peminatan/master-peminatan.component';
import { MasterMataKuliahComponent } from './component/master-mata-kuliah/master-mata-kuliah.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'input', component: InputComponent },
  { path: 'card', component: CardComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'table', component: TableComponent },
  { path: 'form', component: FormdesignComponent },
  { path: 'associate', component: AssociateComponent },
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'peminatan',
    component: PeminatanComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'mastermahasiswa',
    component: MasterMahasiswaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'masterpeminatan',
    component: MasterPeminatanComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'mastermatakuliah',
    component: MasterMataKuliahComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
