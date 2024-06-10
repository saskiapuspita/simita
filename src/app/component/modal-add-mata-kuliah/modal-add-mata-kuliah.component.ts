import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MataKuliah } from 'src/app/model/mata-kuliah';
import { Peminatan } from 'src/app/model/peminatan';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { MasterMataKuliahService } from 'src/app/service/master-mata-kuliah.service';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';

@Component({
  selector: 'app-modal-add-mata-kuliah',
  templateUrl: './modal-add-mata-kuliah.component.html',
  styleUrls: ['./modal-add-mata-kuliah.component.css'],
})
export class ModalAddMataKuliahComponent implements OnInit {
  inputdata: any;
  editdata: any;
  decodedToken: any;
  closemessage = 'closed using directive';
  formMataKuliah!: FormGroup;
  peminatan$!: Observable<Peminatan[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalAddMataKuliahComponent>,
    private authService: AuthService,
    private masterPeminatanService: MasterPeminatanService,
    private masterMataKuliahService: MasterMataKuliahService
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();

    this.peminatan$ = this.fetchAllPeminatan();

    this.inputdata = this.data;
    console.log('input data id: ' + this.inputdata.id);
    if (this.inputdata.id > 0) {
      this.setPopUpData(this.inputdata.id);
    }

    this.formMataKuliah = this.mataKuliahFormGroup();
  }

  setPopUpData(id: any) {
    this.masterMataKuliahService.fetchById(id).subscribe((item) => {
      this.editdata = item;
      this.formMataKuliah.setValue({
        nama: this.editdata[0][0].nama,
        sks: this.editdata[0][0].sks,
        minat: this.editdata[0][0].minat
      });
    });
  }

  closePopUp() {
    this.ref.close('Closed using function');
  }

  mataKuliahFormGroup(): FormGroup {
    return new FormGroup({
      nama: new FormControl(''),
      sks: new FormControl(''),
      minat: new FormControl('')
    });
  }

  submitForm() {
    if (this.inputdata.id > 0) {
      this.onSubmitUpdateMataKuliah(this.formMataKuliah.value, this.decodedToken.userId, this.inputdata.id);
    } else {
      this.onSubmitAddMataKuliah(this.formMataKuliah.value, this.decodedToken.userId);
    }
  }

  onSubmitAddMataKuliah(
    formMataKuliah: Pick<MataKuliah, 'nama' | 'sks' | 'minat'>,
    idUser: Pick<User, 'id'>
  ): void {
    this.masterMataKuliahService.createMataKuliah(formMataKuliah, idUser).subscribe(() => {
      this.closePopUp();
    });
  }

  onSubmitUpdateMataKuliah(
    formMataKuliah: Pick<MataKuliah, 'nama' | 'sks' | 'minat'>,
    idUser: Pick<User, 'id'>,
    idMataKuliah: Pick<MataKuliah, 'id'>
  ): void {
    this.masterMataKuliahService
      .updateMataKuliah(formMataKuliah, idUser, idMataKuliah)
      .subscribe(() => {
        this.closePopUp();
      });
  }

  fetchAllPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }
}
