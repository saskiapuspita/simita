import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Dosen } from 'src/app/model/dosen';
import { JudulPenelitian } from 'src/app/model/judul-penelitian';
import { Peminatan } from 'src/app/model/peminatan';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { JudulPenelitianService } from 'src/app/service/judul-penelitian.service';
import { MasterDosenService } from 'src/app/service/master-dosen.service';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';

@Component({
  selector: 'app-modal-add-pengajuan-judul-penelitian',
  templateUrl: './modal-add-pengajuan-judul-penelitian.component.html',
  styleUrls: ['./modal-add-pengajuan-judul-penelitian.component.css'],
})
export class ModalAddPengajuanJudulPenelitianComponent implements OnInit {
  inputdata: any;
  editdata: any;
  decodedToken: any;
  closemessage = 'closed using directive';
  formPengajuanJudulPenelitian!: FormGroup;
  peminatan$!: Observable<Peminatan[]>;
  dosenPembimbing$!: Observable<Dosen[]>;
  listJudulPenelitian!: any[];
  dataJudulPenelitianById: any;
  dataSource: any;
  displayedColumns: string[] = [
    'no',
    'namaJudulPenelitian',
    'lokasiPenelitian',
    'namaDosenPembimbing',
    'namaPeminatan'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ModalAddPengajuanJudulPenelitianComponent>,
    private authService: AuthService,
    private masterPeminatanService: MasterPeminatanService,
    private masterDosen: MasterDosenService,
    private judulPenelitianService: JudulPenelitianService
  ) {
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();

    this.peminatan$ = this.fetchAllPeminatan();

    this.dosenPembimbing$ = this.fetchAllDosenPembimbing();

    this.inputdata = this.data;
    
    if (this.inputdata.id > 0) {
      this.setPopUpData(this.inputdata.id);
    }

    this.formPengajuanJudulPenelitian =
      this.pengajuanJudulPenelitianFormGroup();
  }

  setPopUpData(id: any) {
    console.log("id " + id);
    this.judulPenelitianService.fetchById(id).subscribe((item) => {
      this.editdata = item.data[0];
      this.formPengajuanJudulPenelitian.setValue({
        namaJudulPenelitian: this.editdata.namaJudulPenelitian,
        lokasiPenelitian: this.editdata.lokasiPenelitian,
        idDosenPembimbing: this.editdata.idDosenPembimbing,
        idPeminatan: this.editdata.idPeminatan,
      });
    });
  }

  closePopUp() {
    this.ref.close('Closed using function');
  }

  pengajuanJudulPenelitianFormGroup(): FormGroup {
    return new FormGroup({
      namaJudulPenelitian: new FormControl(''),
      lokasiPenelitian: new FormControl(''),
      idDosenPembimbing: new FormControl(''),
      idPeminatan: new FormControl(''),
    });
  }

  submitForm() {
    if (this.inputdata.id > 0) {
      this.onSubmitUpdatePengajuanJudulPenelitian(
        this.formPengajuanJudulPenelitian.value,
        this.decodedToken.userId,
        this.inputdata.id
      );
    } else {
      this.onSubmitAddPengajuanJudulPenelitian(
        this.formPengajuanJudulPenelitian.value,
        this.decodedToken.userId
      );
    }
  }

  onSubmitAddPengajuanJudulPenelitian(
    formPengajuanJudulPenelitian: Pick<
      JudulPenelitian,
      | 'namaJudulPenelitian'
      | 'lokasiPenelitian'
      | 'idDosenPembimbing'
      | 'idPeminatan'
    >,
    idUser: Pick<User, 'id'>
  ): void {
    this.judulPenelitianService
      .createJudulPenelitian(formPengajuanJudulPenelitian, idUser)
      .subscribe(() => {
        this.closePopUp();
      });
  }

  onSubmitUpdatePengajuanJudulPenelitian(
    formPengajuanJudulPenelitian: Pick<
      JudulPenelitian,
      | 'namaJudulPenelitian'
      | 'lokasiPenelitian'
      | 'idDosenPembimbing'
      | 'idPeminatan'
    >,
    idUser: Pick<User, 'id'>,
    idPengajuanJudulPenelitian: Pick<JudulPenelitian, 'id'>
  ): void {
    this.judulPenelitianService
      .updateJudulPenelitian(
        formPengajuanJudulPenelitian,
        idUser,
        idPengajuanJudulPenelitian
      )
      .subscribe(() => {
        this.closePopUp();
      });
  }

  fetchAllPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }

  fetchAllDosenPembimbing(): Observable<Dosen[]> {
    return this.masterDosen.fetchAll();
  }

  loadPengajuanJudulPenelitianById(id: any) {
    this.judulPenelitianService.fetchById(id).subscribe((res) => {
      this.dataJudulPenelitianById = res;
      this.dataSource = new MatTableDataSource<any>(this.dataJudulPenelitianById);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  // editPengajuanJudulPenelitian(id: any) {
  //   this.openModalAddMataKuliah(id, 'Edit Pengajuan Judul Penelitian', ModalAddPengajuanJudulPenelitianComponent);
  // }
  
}
