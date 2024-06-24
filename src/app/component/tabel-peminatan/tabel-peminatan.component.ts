import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { NilaiPeminatanMahasiswaService } from 'src/app/service/nilai-peminatan-mahasiswa.service';
import { NilaiPeminatanMahasiswa } from 'src/app/model/nilai-peminatan-mahasiswa';
import { ModalDeletePeminatanMahasiswaComponent } from '../modal-delete-peminatan-mahasiswa/modal-delete-peminatan-mahasiswa.component';

@Component({
  selector: 'app-tabel-peminatan',
  templateUrl: './tabel-peminatan.component.html',
  styleUrls: ['./tabel-peminatan.component.css'],
})
export class TabelPeminatanComponent implements OnInit {
  nilaiPeminatanMahasiswaList!: NilaiPeminatanMahasiswa[];
  dataSource: any;
  decodedToken: any;
  displayedColumns: string[] = [
    'no',
    'namapeminatan',
    'urutanMinat',
    'namamatkul1',
    'nilaimatkul1',
    'namamatkul2',
    'nilaimatkul2',
    'namamatkul3',
    'nilaimatkul3',
    'namamatkul4',
    'nilaimatkul4',
    'namamatkul5',
    'nilaimatkul5',
    'action',
  ];

  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private nilaiPeminatanMahasiswaService: NilaiPeminatanMahasiswaService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
    this.loadPeminatanMahasiswa(this.decodedToken.userId);
  }

  loadPeminatanMahasiswa(userId: number) {
    this.nilaiPeminatanMahasiswaService.fetchNamaPeminatanNamaMatkulNilai(userId).subscribe((res) => {
      this.nilaiPeminatanMahasiswaList = res;
      this.dataSource = new MatTableDataSource<NilaiPeminatanMahasiswa>(this.nilaiPeminatanMahasiswaList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  deletePeminatanMahasiswa(id: any) {
    this.openPopUp(id, 'Delete Peminatan Mahasiswa', ModalDeletePeminatanMahasiswaComponent);
  }

  openPopUp(id: any, title: any, component: any) {
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
      this.loadPeminatanMahasiswa(this.decodedToken.userId);
    });
  }
}
