import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { MasterMahasiswaService } from 'src/app/service/master-mahasiswa.service';
import { ModalDetailMahasiswaComponent } from '../modal-detail-mahasiswa/modal-detail-mahasiswa.component';
import { ModalAddMahasiswaComponent } from '../modal-add-mahasiswa/modal-add-mahasiswa.component';
import { ModalDeleteMahasiswaComponent } from '../modal-delete-mahasiswa/modal-delete-mahasiswa.component';

@Component({
  selector: 'app-master-mahasiswa',
  templateUrl: './master-mahasiswa.component.html',
  styleUrls: ['./master-mahasiswa.component.css'],
})
export class MasterMahasiswaComponent implements OnInit {
  listMahasiswa!: User[];
  dataSource: any;
  decodedToken: any;
  displayedColumns: string[] = [
    'no',
    'name',
    'nim',
    'email',
    'ipk',
    'action',
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private masterMahasiswaService: MasterMahasiswaService,
    private dialog: MatDialog
  ) {
    this.loadDataMahasiswa();
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }

  loadDataMahasiswa() {
    this.masterMahasiswaService.fetchAll().subscribe((res) => {
      this.listMahasiswa = res;
      this.dataSource = new MatTableDataSource<User>(this.listMahasiswa);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editMahasiswa(id: any) {
    this.openModalAddMahasiswa(id, 'Edit Mahasiswa', ModalAddMahasiswaComponent);
  }

  detailMahasiswa(id: any) {
    this.openModalAddMahasiswa(id, 'Detail Mahasiswa', ModalDetailMahasiswaComponent);
  }

  addMahasiswa() {
    this.openModalAddMahasiswa(0, 'Tambah Mahasiswa', ModalAddMahasiswaComponent);
  }

  deleteMahasiswa(id: any) {
    this.openModalAddMahasiswa(id, 'Delete Mahasiswa', ModalDeleteMahasiswaComponent);
  }

  openModalAddMahasiswa(id: any, title: any, component: any) {
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
      this.loadDataMahasiswa();
    });
  }
}
