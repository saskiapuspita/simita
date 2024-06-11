import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dosen } from 'src/app/model/dosen';
import { MasterDosenService } from 'src/app/service/master-dosen.service';

@Component({
  selector: 'app-modal-add-dosen',
  templateUrl: './modal-add-dosen.component.html',
  styleUrls: ['./modal-add-dosen.component.css'],
})
export class ModalAddDosenComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  formDosen!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalAddDosenComponent>,
    private masterDosenService: MasterDosenService
  ) {}
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('data: ' + this.data);
    if (this.inputdata.id > 0) {
      this.setPopUpData(this.inputdata.id);
    }

    this.formDosen = this.dosenFormGroup();
  }

  setPopUpData(id: any) {
    this.masterDosenService.fetchById(id).subscribe((item) => {
      this.editdata = item.data;
      this.formDosen.setValue({
        name: this.editdata[0].name,
        nidn: this.editdata[0].nidn,
        email: this.editdata[0].email,
      });
    });
  }

  closePopUp() {
    this.ref.close('Closed using function');
  }

  dosenFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      nidn: new FormControl(''),
      email: new FormControl(''),
    });
  }

  submitForm() {
    if (this.inputdata.id > 0) {
      this.onSubmitUpdateDosen(this.formDosen.value, this.inputdata.id);
    } else {
      this.onSubmitAddDosen(this.formDosen.value);
    }
  }

  onSubmitAddDosen(formDosen: Pick<Dosen, 'name' | 'nidn' | 'email'>): void {
    this.masterDosenService.createDosen(formDosen).subscribe(() => {
      this.closePopUp();
    });
  }

  onSubmitUpdateDosen(
    formDosen: Pick<Dosen, 'name' | 'nidn' | 'email'>,
    userId: Pick<Dosen, 'id'>
  ): void {
    this.masterDosenService.updateDosen(formDosen, userId).subscribe(() => {
      this.closePopUp();
    });
  }
}
