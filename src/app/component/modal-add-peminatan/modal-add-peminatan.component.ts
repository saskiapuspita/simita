import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Peminatan } from 'src/app/model/peminatan';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';

@Component({
  selector: 'app-modal-add-peminatan',
  templateUrl: './modal-add-peminatan.component.html',
  styleUrls: ['./modal-add-peminatan.component.css'],
})
export class ModalAddPeminatanComponent implements OnInit {
  inputdata: any;
  editdata: any;
  decodedToken: any;
  closemessage = 'closed using directive';
  formPeminatan!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalAddPeminatanComponent>,
    private authService: AuthService,
    private masterPeminatanService: MasterPeminatanService
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
    this.inputdata = this.data;

    if (this.inputdata.id > 0) {
      this.setPopUpData(this.inputdata.id);
    }

    this.formPeminatan = this.peminatanFormGroup();
  }

  setPopUpData(id: any) {
    this.masterPeminatanService.fetchById(id).subscribe((item) => {
      this.editdata = item;
      this.formPeminatan.setValue({
        nama: this.editdata[0][0].nama,
      });
    });
  }

  closePopUp() {
    this.ref.close('Closed using function');
  }

  peminatanFormGroup(): FormGroup {
    return new FormGroup({
      nama: new FormControl(''),
    });
  }

  submitForm() {
    if (this.inputdata.id > 0) {
      this.onSubmitUpdatePeminatan(this.formPeminatan.value, this.inputdata.id);
    } else {
      this.onSubmitAddPeminatan(
        this.formPeminatan.value,
        this.decodedToken.userId
      );
    }
  }

  onSubmitAddPeminatan(
    formPeminatan: Pick<Peminatan, 'nama'>,
    userId: Pick<User, 'id'>
  ): void {
    this.masterPeminatanService
      .createPeminatan(formPeminatan, userId)
      .subscribe(() => {
        this.closePopUp();
      });
  }

  onSubmitUpdatePeminatan(
    formPeminatan: Pick<Peminatan, 'nama'>,
    idPeminatan: Pick<Peminatan, 'id'>
  ): void {
    this.masterPeminatanService
      .updatePeminatan(formPeminatan, idPeminatan)
      .subscribe(() => {
        this.closePopUp();
      });
  }
}
