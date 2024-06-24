import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NilaiPeminatanMahasiswa } from 'src/app/model/nilai-peminatan-mahasiswa';
import { NilaiPeminatanMahasiswaService } from 'src/app/service/nilai-peminatan-mahasiswa.service';

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
    private nilaiPeminatanMahasiswaService: NilaiPeminatanMahasiswaService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  closePopUp() {
    this.ref.close('closing from detail');
  }

  onSubmitDeletePeminatanMahasiswa(id: Pick<NilaiPeminatanMahasiswa, 'id'>): void {
    this.nilaiPeminatanMahasiswaService.deleteNilaiPeminatanMahasiswa(id).subscribe(() => {
      this.closePopUp();
    });
  }
}
