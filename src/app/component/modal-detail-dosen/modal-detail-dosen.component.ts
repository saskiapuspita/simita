import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MasterDosenService } from 'src/app/service/master-dosen.service';

@Component({
  selector: 'app-modal-detail-dosen',
  templateUrl: './modal-detail-dosen.component.html',
  styleUrls: ['./modal-detail-dosen.component.css'],
})
export class ModalDetailDosenComponent implements OnInit {
  editdata: any;
  formDosen!: FormGroup;
  inputdata: any;
  custdata: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDetailDosenComponent>,
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

  dosenFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      nidn: new FormControl(''),
      email: new FormControl(''),
    });
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

  closepopup() {
    this.ref.close('closing from detail');
  }
}
