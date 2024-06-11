import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Dosen } from 'src/app/model/dosen';
import { MasterDosenService } from 'src/app/service/master-dosen.service';

@Component({
  selector: 'app-modal-delete-dosen',
  templateUrl: './modal-delete-dosen.component.html',
  styleUrls: ['./modal-delete-dosen.component.css'],
})
export class ModalDeleteDosenComponent {
  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDeleteDosenComponent>,
    private masterDosenService: MasterDosenService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closePopUp() {
    this.ref.close('closing from detail');
  }

  onSubmitDeleteDosen(dosenId: Pick<Dosen, 'id'>): void {
    this.masterDosenService.deleteDosen(dosenId).subscribe(() => {
      this.closePopUp();
    });
  }
}
