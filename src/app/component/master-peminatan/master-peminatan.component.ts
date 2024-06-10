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

@Component({
  selector: 'app-master-peminatan',
  templateUrl: './master-peminatan.component.html',
  styleUrls: ['./master-peminatan.component.css'],
})
export class MasterPeminatanComponent implements OnInit {
  listPeminatan!: Peminatan[];
  dataSource: any;
  decodedToken: any;
  displayedColumns: string[] = [
    'no',
    'nama',
    'action',
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private masterPeminatanService: MasterPeminatanService,
    private dialog: MatDialog
  ) {
    this.loadDataPeminatan();
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }

  loadDataPeminatan() {
    this.masterPeminatanService.fetchAll().subscribe((res) => {
      this.listPeminatan = res;
      this.dataSource = new MatTableDataSource<Peminatan>(this.listPeminatan);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
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

  detailPeminatan(id: any) {
    this.openModalAddPeminatan(
      id,
      'Detail Peminatan',
      ModalDetailPeminatanComponent
    );
  }

  addPeminatan() {
    this.openModalAddPeminatan(
      0,
      'Tambah Peminatan',
      ModalAddPeminatanComponent
    );
  }

  deletePeminatan(id: any) {
    this.openModalAddPeminatan(id, 'Delete Peminatan', ModalDeletePeminatanComponent);
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
      this.loadDataPeminatan();
    });
  }
}
