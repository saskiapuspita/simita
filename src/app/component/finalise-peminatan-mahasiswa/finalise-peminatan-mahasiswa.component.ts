import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { first } from 'rxjs';
import { NilaiPeminatanMahasiswa } from 'src/app/model/nilai-peminatan-mahasiswa';
import { User } from 'src/app/model/user';
import { MasterMahasiswaService } from 'src/app/service/master-mahasiswa.service';
import { NilaiPeminatanMahasiswaService } from 'src/app/service/nilai-peminatan-mahasiswa.service';

@Component({
  selector: 'app-finalise-peminatan-mahasiswa',
  templateUrl: './finalise-peminatan-mahasiswa.component.html',
  styleUrls: ['./finalise-peminatan-mahasiswa.component.css'],
})
export class FinalisePeminatanMahasiswaComponent implements OnInit {
  inputdata: any;
  formFinalSubmit!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<FinalisePeminatanMahasiswaComponent>,
    private nilaiPeminatanMahasiswaService: NilaiPeminatanMahasiswaService
  ) {}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.formFinalSubmit = this.finaliseNilaiPeminatanFormGroup();
  }

  finaliseNilaiPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      isFinalSubmit: new FormControl(''),
    });
  }

  closePopUp() {
    this.ref.close('closing from detail');
  }

  onSubmitFinalisePeminatanMahasiswa(
    formFinalSubmit: Pick<NilaiPeminatanMahasiswa, 'isFinalSubmit'>,
    idNilaiPeminatan: Pick<NilaiPeminatanMahasiswa, 'id'>
  ): void {
    console.log('formFinalSubmit:' + formFinalSubmit);
    this.nilaiPeminatanMahasiswaService
      .updateIsFinalSubmit(formFinalSubmit, idNilaiPeminatan)
      .pipe(first())
      .subscribe(() => {
        this.closePopUp();
      });
  }
}
