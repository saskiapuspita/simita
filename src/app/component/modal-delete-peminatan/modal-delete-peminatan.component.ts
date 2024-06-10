import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Peminatan } from 'src/app/model/peminatan';
import { User } from 'src/app/model/user';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';

@Component({
  selector: 'app-modal-delete-peminatan',
  templateUrl: './modal-delete-peminatan.component.html',
  styleUrls: ['./modal-delete-peminatan.component.css'],
})
export class ModalDeletePeminatanComponent {
  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDeletePeminatanComponent>,
    private masterPeminatanService: MasterPeminatanService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closePopUp() {
    this.ref.close('closing from detail');
  }

  onSubmitDeletePeminatan(idPeminatan: Pick<Peminatan, 'id'>): void {
    this.masterPeminatanService.deletePeminatan(idPeminatan).subscribe(() => {
      this.closePopUp();
    });
  }
}
