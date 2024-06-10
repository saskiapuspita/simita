import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { MasterMahasiswaService } from 'src/app/service/master-mahasiswa.service';

@Component({
  selector: 'app-modal-delete-mahasiswa',
  templateUrl: './modal-delete-mahasiswa.component.html',
  styleUrls: ['./modal-delete-mahasiswa.component.css'],
})
export class ModalDeleteMahasiswaComponent implements OnInit {
  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDeleteMahasiswaComponent>,
    private masterMahasiswaService: MasterMahasiswaService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closePopUp() {
    this.ref.close('closing from detail');
  }

  onSubmitDeleteMahasiswa(userId: Pick<User, 'id'>): void {
    this.masterMahasiswaService.deleteUser(userId).subscribe(() => {
      this.closePopUp();
    });
  }
}
