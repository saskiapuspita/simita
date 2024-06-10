import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';

@Component({
  selector: 'app-modal-detail-peminatan',
  templateUrl: './modal-detail-peminatan.component.html',
  styleUrls: ['./modal-detail-peminatan.component.css'],
})
export class ModalDetailPeminatanComponent implements OnInit {
  editdata: any;
  formPeminatan!: FormGroup;
  inputdata: any;
  custdata: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDetailPeminatanComponent>,
    private masterPeminatanService: MasterPeminatanService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    console.log('data: ' + this.data);
    if (this.inputdata.id > 0) {
      this.setPopUpData(this.inputdata.id);
    }

    this.formPeminatan = this.peminatanFormGroup();
  }

  peminatanFormGroup(): FormGroup {
    return new FormGroup({
      nama: new FormControl('')
    });
  }

  setPopUpData(id: any) {
    this.masterPeminatanService.fetchById(id).subscribe((item) => {
      this.editdata = item;
      this.formPeminatan.setValue({
        nama: this.editdata[0][0].nama
      });
    });
  }

  closepopup() {
    this.ref.close('closing from detail');
  }
}
