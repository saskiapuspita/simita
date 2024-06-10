import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PeminatanMahasiswa } from 'src/app/model/peminatan-mahasiswa';
import { PeminatanMahasiswaService } from 'src/app/service/peminatan-mahasiswa.service';

@Component({
  selector: 'app-modal-delete-peminatan-mahasiswa',
  templateUrl: './modal-delete-peminatan-mahasiswa.component.html',
  styleUrls: ['./modal-delete-peminatan-mahasiswa.component.css']
})
export class ModalDeletePeminatanMahasiswaComponent implements OnInit {
  inputdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDeletePeminatanMahasiswaComponent>,
    private peminatanMahasiswaService: PeminatanMahasiswaService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closePopUp() {
    this.ref.close('closing from detail');
  }

  onSubmitDeletePeminatanMahasiswa(idPeminatanMahasiswa: Pick<PeminatanMahasiswa, 'id'>): void {
    this.peminatanMahasiswaService.deletePeminatanMahasiswa(idPeminatanMahasiswa).subscribe(() => {
      this.closePopUp();
    });
  }
}
