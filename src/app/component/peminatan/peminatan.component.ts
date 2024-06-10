import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeminatanMahasiswa } from 'src/app/model/peminatan-mahasiswa';
import { Observable } from 'rxjs';
import { PeminatanMahasiswaService } from 'src/app/service/peminatan-mahasiswa.service';
import { MasterPeminatanService } from 'src/app/service/master-peminatan.service';
import { Peminatan } from 'src/app/model/peminatan';
import { ModalDeletePeminatanMahasiswaComponent } from '../modal-delete-peminatan-mahasiswa/modal-delete-peminatan-mahasiswa.component';
import { NilaiPeminatanMahasiswa } from 'src/app/model/nilai-peminatan-mahasiswa';
import { NilaiPeminatanMahasiswaService } from 'src/app/service/nilai-peminatan-mahasiswa.service';

@Component({
  selector: 'app-peminatan',
  templateUrl: './peminatan.component.html',
  styleUrls: ['./peminatan.component.css'],
})
export class PeminatanComponent implements OnInit {
  dataSource: any;
  decodedToken: any;
  dataPeminatanMahasiswa: any;
  peminatan$!: Observable<Peminatan[]>;
  displayedColumns: string[] = [
    'no',
    'namapeminatan',
    'urutanMinat',
    'namamatkul',
    'nilai',
    'action',
  ];

  isEditable = false;

  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private peminatanMahasiswaService: PeminatanMahasiswaService,
    private nilaiPeminatanMahasiswaService: NilaiPeminatanMahasiswaService,
    private masterPeminatanService: MasterPeminatanService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
    this.loadPeminatanMahasiswa();
    this.peminatan$ = this.fetchAllPeminatan();
  }

  loadPeminatanMahasiswa() {
    // this.peminatanMahasiswaService.fetchNamaPeminatan().subscribe((res) => {
    //   this.dataPeminatanMahasiswa = res;
    //   this.dataSource = new MatTableDataSource<PeminatanMahasiswa>(this.dataPeminatanMahasiswa);
    //   this.dataSource.paginator = this.paginatior;
    //   this.dataSource.sort = this.sort;
    // });
    this.nilaiPeminatanMahasiswaService.fetchNamaPeminatanNamaMatkulNilai().subscribe((res) => {
      this.dataPeminatanMahasiswa = res;
      this.dataSource = new MatTableDataSource<NilaiPeminatanMahasiswa>(this.dataPeminatanMahasiswa);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  fetchAllPeminatan(): Observable<Peminatan[]> {
    return this.masterPeminatanService.fetchAll();
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  deletePeminatanMahasiswa(idPilihanPeminatan: any) {
    this.openPopUp(idPilihanPeminatan, 'Delete Peminatan Mahasiswa', ModalDeletePeminatanMahasiswaComponent);
  }

  openPopUp(idPilihanPeminatan: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        idPilihanPeminatan: idPilihanPeminatan,
      },
    });
    _popup.afterClosed().subscribe((item) => {
    });
  }

  editData() {
    this.isEditable = true
  }
}
