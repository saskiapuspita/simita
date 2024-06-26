import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { JudulPenelitianService } from 'src/app/service/judul-penelitian.service';
import { ModalAddPengajuanJudulPenelitianComponent } from '../modal-add-pengajuan-judul-penelitian/modal-add-pengajuan-judul-penelitian.component';

@Component({
  selector: 'app-pengecekan-judul-penelitian',
  templateUrl: './pengecekan-judul-penelitian.component.html',
  styleUrls: ['./pengecekan-judul-penelitian.component.css']
})

export class PengecekanJudulPenelitianComponent implements OnInit {
  listJudulPenelitian!: any[];
  dataSource: any;
  decodedToken: any;
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
    private authService: AuthService,
    private judulPenelitianService: JudulPenelitianService,
    private dialog: MatDialog
  ) {
    this.loadDataJudulPenelitian();
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }

  loadDataJudulPenelitian() {
    this.judulPenelitianService.fetchAll().subscribe((res) => {
      this.listJudulPenelitian = res;
      this.dataSource = new MatTableDataSource<any>(this.listJudulPenelitian);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editPengajuanJudulPenelitian(id: any) {
    this.openModalAddMataKuliah(id, 'Edit Pengajuan Judul Penelitian', ModalAddPengajuanJudulPenelitianComponent);
  }

  // detailMataKuliah(id: any) {
  //   this.openModalAddMataKuliah(id, 'Detail Mata Kuliah', ModalDetailMataKuliahComponent);
  // }

  addPengajuanJudulPenelitian() {
    this.openModalAddMataKuliah(0, 'Tambah Pengajuan Judul Penelitian', ModalAddPengajuanJudulPenelitianComponent);
  }

  // deleteMataKuliah(id: any) {
  //   this.openModalAddMataKuliah(id, 'Delete MataKuliah', ModalDeleteMataKuliahComponent);
  // }

  openModalAddMataKuliah(id: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        id: id,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      this.loadDataJudulPenelitian();
    });
  }
}
