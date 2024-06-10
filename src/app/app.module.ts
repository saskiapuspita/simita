import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './service/auth-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './input/input.component';
import { MaterialModule } from './material-module';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { SliderComponent } from './component/slider/slider.component';
import { TableComponent } from './component/table/table.component';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { PopupComponent } from './component/popup/popup.component';
import { AssociateComponent } from './component/associate/associate.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { CreatePeminatanComponent } from './component/create-peminatan/create-peminatan.component';
import { PeminatanComponent } from './component/peminatan/peminatan.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddNilaiMataKuliahComponent } from './component/add-nilai-mata-kuliah/add-nilai-mata-kuliah.component';
import { TabelPeminatanComponent } from './component/tabel-peminatan/tabel-peminatan.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MasterMahasiswaComponent } from './component/master-mahasiswa/master-mahasiswa.component';
import { AddMahasiswaComponent } from './component/add-mahasiswa/add-mahasiswa.component';
import { ModalDetailMahasiswaComponent } from './component/modal-detail-mahasiswa/modal-detail-mahasiswa.component';
import { ModalAddMahasiswaComponent } from './component/modal-add-mahasiswa/modal-add-mahasiswa.component';
import { ModalDeleteComponent } from './component/modal-delete/modal-delete.component';
import { MasterPeminatanComponent } from './component/master-peminatan/master-peminatan.component';
import { ModalAddPeminatanComponent } from './component/modal-add-peminatan/modal-add-peminatan.component';
import { ModalDetailPeminatanComponent } from './component/modal-detail-peminatan/modal-detail-peminatan.component';
import { ModalDeleteMahasiswaComponent } from './component/modal-delete-mahasiswa/modal-delete-mahasiswa.component';
import { ModalDeletePeminatanComponent } from './component/modal-delete-peminatan/modal-delete-peminatan.component';
import { MasterMataKuliahComponent } from './component/master-mata-kuliah/master-mata-kuliah.component';
import { ModalAddMataKuliahComponent } from './component/modal-add-mata-kuliah/modal-add-mata-kuliah.component';
import { ModalDeleteMataKuliahComponent } from './component/modal-delete-mata-kuliah/modal-delete-mata-kuliah.component';
import { ModalDetailMataKuliahComponent } from './component/modal-detail-mata-kuliah/modal-detail-mata-kuliah.component';
import { ModalDeletePeminatanMahasiswaComponent } from './component/modal-delete-peminatan-mahasiswa/modal-delete-peminatan-mahasiswa.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AutocompleteComponent,
    MenubarComponent,
    HomeComponent,
    CardComponent,
    SliderComponent,
    TableComponent,
    FormdesignComponent,
    PopupComponent,
    AssociateComponent,
    UserdetailComponent,
    CreatePeminatanComponent,
    PeminatanComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AddNilaiMataKuliahComponent,
    TabelPeminatanComponent,
    UserProfileComponent,
    MasterMahasiswaComponent,
    AddMahasiswaComponent,
    ModalDetailMahasiswaComponent,
    ModalAddMahasiswaComponent,
    ModalDeleteComponent,
    MasterPeminatanComponent,
    ModalAddPeminatanComponent,
    ModalDetailPeminatanComponent,
    ModalDeleteMahasiswaComponent,
    ModalDeletePeminatanComponent,
    MasterMataKuliahComponent,
    ModalAddMataKuliahComponent,
    ModalDeleteMataKuliahComponent,
    ModalDetailMataKuliahComponent,
    ModalDeletePeminatanMahasiswaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
