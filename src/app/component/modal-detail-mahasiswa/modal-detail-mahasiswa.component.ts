import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MasterMahasiswaService } from 'src/app/service/master-mahasiswa.service';

@Component({
  selector: 'app-modal-detail-mahasiswa',
  templateUrl: './modal-detail-mahasiswa.component.html',
  styleUrls: ['./modal-detail-mahasiswa.component.css'],
})
export class ModalDetailMahasiswaComponent implements OnInit {
  editdata: any;
  formMahasiswa!: FormGroup;
  inputdata: any;
  custdata: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDetailMahasiswaComponent>,
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

  mahasiswaFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      nim: new FormControl(''),
      email: new FormControl(''),
      ipk: new FormControl(''),
    });
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

  closepopup() {
    this.ref.close('closing from detail');
  }
}
