import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';
import { Peminatan } from 'src/app/model/peminatan';
import { ModalAddPeminatanComponent } from '../modal-add-peminatan/modal-add-peminatan.component';
import { ModalDetailPeminatanComponent } from '../modal-detail-peminatan/modal-detail-peminatan.component';
import { ModalDeletePeminatanComponent } from '../modal-delete-peminatan/modal-delete-peminatan.component';
import { JudulPenelitianService } from 'src/app/service/judul-penelitian.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-approval-pengajuan-judul-penelitian',
  templateUrl: './approval-pengajuan-judul-penelitian.component.html',
  styleUrls: ['./approval-pengajuan-judul-penelitian.component.css'],
})
export class ApprovalPengajuanJudulPenelitianComponent implements OnInit {
  listJudulPenelitian!: any[];
  dataSource: any;
  decodedToken: any;
  displayedColumns: string[] = [
    'no',
    'namaMahasiswa',
    'namaJudulPenelitian',
    'lokasiPenelitian',
    'namaDosenPembimbing',
    'namaPeminatan',
    'status',
    'action',
  ];
  status!: string;
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private judulPenelitianService: JudulPenelitianService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();

    this.loadJudulPenelitianBasedOnStatus();
  }

  loadJudulPenelitianBasedOnStatus() {
    this.judulPenelitianService.fetchByStatusNeedApproval().subscribe((res) => {
      this.listJudulPenelitian = res.data;
      this.dataSource = new MatTableDataSource<any>(this.listJudulPenelitian);
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editPeminatan(id: any) {
    this.openModalAddPeminatan(
      id,
      'Edit Peminatan',
      ModalAddPeminatanComponent
    );
  }

  approvePengajuanJudulPenelitian(userId: any) {
    this.status = 'Disetujui.';
    this.judulPenelitianService
      .updateStatusPengajuanJudulPenelitian(this.status, userId)
      .pipe(first())
      .subscribe(() => {
        this.loadJudulPenelitianBasedOnStatus();
      });
  }

  detailPeminatan(id: any) {
    this.openModalAddPeminatan(
      id,
      'Detail Peminatan',
      ModalDetailPeminatanComponent
    );
  }

  deletePeminatan(id: any) {
    this.openModalAddPeminatan(
      id,
      'Delete Peminatan',
      ModalDeletePeminatanComponent
    );
  }

  openModalAddPeminatan(id: any, title: any, component: any) {
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
      // console.log(item)
      this.loadJudulPenelitianBasedOnStatus();
    });
  }
}
