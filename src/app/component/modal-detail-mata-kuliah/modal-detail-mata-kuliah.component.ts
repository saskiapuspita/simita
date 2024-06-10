import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Peminatan } from 'src/app/model/peminatan';
import { MasterMataKuliahService } from 'src/app/service/master-mata-kuliah.service';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';

@Component({
  selector: 'app-modal-detail-mata-kuliah',
  templateUrl: './modal-detail-mata-kuliah.component.html',
  styleUrls: ['./modal-detail-mata-kuliah.component.css']
})
export class ModalDetailMataKuliahComponent implements OnInit {
  editdata: any;
  formMataKuliah!: FormGroup;
  inputdata: any;
  custdata: any;
  peminatan$!: Observable<Peminatan[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalDetailMataKuliahComponent>,
    private masterPeminatanService: MasterPeminatanService,
    private masterMataKuliahService: MasterMataKuliahService
  ) {}

  ngOnInit(): void {
    this.peminatan$ = this.fetchAllPeminatan();

    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setPopUpData(this.inputdata.id);
    }

    this.formMataKuliah = this.MataKuliahFormGroup();
  }

  MataKuliahFormGroup(): FormGroup {
    return new FormGroup({
      nama: new FormControl(''),
      sks: new FormControl(''),
      minat: new FormControl('')
    });
  }

  setPopUpData(id: any) {
    this.masterMataKuliahService.fetchById(id).subscribe((item) => {
      this.editdata = item;
      this.formMataKuliah.setValue({
        nama: this.editdata[0][0].nama,
        sks: this.editdata[0][0].sks,
        minat: this.editdata[0][0].minat
      });
    });
  }

  closepopup() {
    this.ref.close('closing from detail');
  }

  fetchAllPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }
}
