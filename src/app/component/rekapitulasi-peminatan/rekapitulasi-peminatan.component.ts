import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth.service';
import { RekapitulasiPeminatanService } from 'src/app/service/rekapitulasi-peminatan.service';
import { RekapitulasiPeminatan } from 'src/app/model/rekapitulasi-peminatan';

@Component({
  selector: 'app-rekapitulasi-peminatan',
  templateUrl: './rekapitulasi-peminatan.component.html',
  styleUrls: ['./rekapitulasi-peminatan.component.css']
})

export class RekapitulasiPeminatanComponent implements OnInit {
  listRekapitulasiPeminatan!: RekapitulasiPeminatan[];
  dataSource: any;
  decodedToken: any;
  displayedColumns: string[] = [
    'no',
    'namaMahasiswa',
    'ipk',
    'namaPeminatan',
    'urutanMinat'
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private rekapitulasiPeminatanService: RekapitulasiPeminatanService,
    private dialog: MatDialog
  ) {
    this.loadDataRekapitulasiPeminatan();
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
  }

  loadDataRekapitulasiPeminatan() {
    this.rekapitulasiPeminatanService.fetchRekapitulasiPeminatanProter().subscribe((res) => {
      this.listRekapitulasiPeminatan = res;
      this.dataSource = new MatTableDataSource<RekapitulasiPeminatan>(this.listRekapitulasiPeminatan);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}
