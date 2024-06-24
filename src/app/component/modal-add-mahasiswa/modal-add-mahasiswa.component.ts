import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { MasterMahasiswaService } from 'src/app/service/master-mahasiswa.service';

@Component({
  selector: 'app-modal-add-mahasiswa',
  templateUrl: './modal-add-mahasiswa.component.html',
  styleUrls: ['./modal-add-mahasiswa.component.css'],
})
export class ModalAddMahasiswaComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  formMahasiswa!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalAddMahasiswaComponent>,
    private masterMahasiswaService: MasterMahasiswaService
  ) {}
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('data: ' + this.data);
    if (this.inputdata.id > 0) {
      this.setPopUpData(this.inputdata.id);
    }

    this.formMahasiswa = this.mahasiswaFormGroup();
  }

  setPopUpData(id: any) {
    this.masterMahasiswaService.fetchById(id).subscribe((item) => {
      this.editdata = item;
      this.formMahasiswa.setValue({
        name: this.editdata[0][0].name,
        nim: this.editdata[0][0].nim,
        email: this.editdata[0][0].email,
        ipk: this.editdata[0][0].ipk,
      });
    });
  }

  closePopUp() {
    this.ref.close('Closed using function');
  }

  mahasiswaFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      nim: new FormControl(''),
      email: new FormControl(''),
      ipk: new FormControl(''),
    });
  }

  submitForm() {
    if (this.inputdata.id > 0) {
      this.onSubmitUpdateMahasiswa(this.formMahasiswa.value, this.inputdata.id);
    } else {
      this.onSubmitAddMahasiswa(this.formMahasiswa.value);
    }
  }

  onSubmitAddMahasiswa(
    formMahasiswa: Pick<User, 'name' | 'nim' | 'email' | 'ipk'>
  ): void {
    this.masterMahasiswaService.createUser(formMahasiswa).subscribe(() => {
      this.closePopUp();
    });
  }

  onSubmitUpdateMahasiswa(
    formMahasiswa: Pick<User, 'name' | 'nim' | 'email' | 'ipk'>,
    userId: Pick<User, 'id'>
  ): void {
    this.masterMahasiswaService
      .updateUser(formMahasiswa, userId)
      .subscribe(() => {
        this.closePopUp();
      });
  }
}
