import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MataKuliah } from 'src/app/model/mata-kuliah';
import { User } from 'src/app/model/user';
import { MasterMataKuliahService } from 'src/app/service/master-mata-kuliah.service';

@Component({
  selector: 'app-modal-delete-mata-kuliah',
  templateUrl: './modal-delete-mata-kuliah.component.html',
  styleUrls: ['./modal-delete-mata-kuliah.component.css']
})

export class ModalDeleteMataKuliahComponent {
  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDeleteMataKuliahComponent>,
    private masterMataKuliahService: MasterMataKuliahService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closePopUp() {
    this.ref.close('closing from detail');
  }

  onSubmitDeleteMataKuliah(idMataKuliah: Pick<MataKuliah, 'id'>): void {
    this.masterMataKuliahService.deleteMataKuliah(idMataKuliah).subscribe(() => {
      this.closePopUp();
    });
  }
}
