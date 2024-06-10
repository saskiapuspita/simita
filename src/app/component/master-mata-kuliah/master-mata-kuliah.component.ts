import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { MasterMataKuliahService } from 'src/app/service/master-mata-kuliah.service';
import { MataKuliah } from 'src/app/model/mata-kuliah';
import { ModalAddMataKuliahComponent } from '../modal-add-mata-kuliah/modal-add-mata-kuliah.component';
import { ModalDetailMataKuliahComponent } from '../modal-detail-mata-kuliah/modal-detail-mata-kuliah.component';
import { ModalDeleteMataKuliahComponent } from '../modal-delete-mata-kuliah/modal-delete-mata-kuliah.component';
import { Peminatan } from 'src/app/model/peminatan';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-master-mata-kuliah',
  templateUrl: './master-mata-kuliah.component.html',
  styleUrls: ['./master-mata-kuliah.component.css']
})
export class MasterMataKuliahComponent implements OnInit {
  listMataKuliah!: any[];
  dataSource: any;
  decodedToken: any;
  peminatan$!: Observable<Peminatan[]>;
  displayedColumns: string[] = [
    'no',
    'nama',
    'sks',
    'minat',
    'action',
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private masterMataKuliahService: MasterMataKuliahService,
    private dialog: MatDialog
  ) {
    this.loadDataMataKuliah();
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }

  loadDataMataKuliah() {
    this.masterMataKuliahService.fetchNamaPeminatanBasedOnIdMinat().subscribe((res) => {
      this.listMataKuliah = res;
      this.dataSource = new MatTableDataSource<any>(this.listMataKuliah);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editMataKuliah(id: any) {
    this.openModalAddMataKuliah(id, 'Edit Mata Kuliah', ModalAddMataKuliahComponent);
  }

  detailMataKuliah(id: any) {
    this.openModalAddMataKuliah(id, 'Detail Mata Kuliah', ModalDetailMataKuliahComponent);
  }

  addMataKuliah() {
    this.openModalAddMataKuliah(0, 'Tambah Mata Kuliah', ModalAddMataKuliahComponent);
  }

  deleteMataKuliah(id: any) {
    this.openModalAddMataKuliah(id, 'Delete MataKuliah', ModalDeleteMataKuliahComponent);
  }

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
      this.loadDataMataKuliah();
    });
  }
}
