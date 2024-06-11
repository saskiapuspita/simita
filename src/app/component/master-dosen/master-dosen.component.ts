import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { MasterDosenService } from 'src/app/service/master-dosen.service';
import { Dosen } from 'src/app/model/dosen';
import { ModalAddDosenComponent } from '../modal-add-dosen/modal-add-dosen.component';
import { ModalDetailDosenComponent } from '../modal-detail-dosen/modal-detail-dosen.component';
import { ModalDeleteDosenComponent } from '../modal-delete-dosen/modal-delete-dosen.component';

@Component({
  selector: 'app-master-dosen',
  templateUrl: './master-dosen.component.html',
  styleUrls: ['./master-dosen.component.css'],
})
export class MasterDosenComponent implements OnInit {
  listDosen!: Dosen[];
  dataSource: any;
  decodedToken: any;
  displayedColumns: string[] = ['no', 'name', 'nidn', 'email', 'action'];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private masterDosenService: MasterDosenService,
    private dialog: MatDialog
  ) {
    this.loadDataDosen();
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }

  loadDataDosen() {
    this.masterDosenService.fetchAll().subscribe((res) => {
      this.listDosen = res;
      this.dataSource = new MatTableDataSource<Dosen>(this.listDosen);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editDosen(id: any) {
    this.openModalAddDosen(id, 'Edit Dosen', ModalAddDosenComponent);
  }

  detailDosen(id: any) {
    this.openModalAddDosen(id, 'Detail Dosen', ModalDetailDosenComponent);
  }

  addDosen() {
    this.openModalAddDosen(0, 'Tambah Dosen', ModalAddDosenComponent);
  }

  deleteDosen(id: any) {
    this.openModalAddDosen(id, 'Delete Dosen', ModalDeleteDosenComponent);
  }

  openModalAddDosen(id: any, title: any, component: any) {
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
      this.loadDataDosen();
    });
  }
}
