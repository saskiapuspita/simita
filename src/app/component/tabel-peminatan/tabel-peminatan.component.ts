import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/model/Customer';
import { MasterService } from 'src/app/service/master.service';
import { PopupComponent } from '../popup/popup.component';
import { UserdetailComponent } from '../userdetail/userdetail.component';
import { PeminatanMahasiswa } from 'src/app/model/peminatan-mahasiswa';
import { Observable } from 'rxjs';
import { PeminatanMahasiswaService } from 'src/app/service/peminatan-mahasiswa.service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-tabel-peminatan',
  templateUrl: './tabel-peminatan.component.html',
  styleUrls: ['./tabel-peminatan.component.css'],
})
export class TabelPeminatanComponent implements OnInit {
  customerlist!: Customer[];
  peminatanMahasiswa!: PeminatanMahasiswa[];
  dataSource: any;
  decodedToken: any;
  dataPeminatanMahasiswa: any;
  peminatanMahasiswa$!: any;
  displayedColumns: string[] = [
    'code',
    'name',
    'email',
    'phone',
    'status',
    'action',
  ];
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private peminatanMahasiswaService: PeminatanMahasiswaService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    // this.loadPeminatanMahasiswa();
  }

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
    this.peminatanMahasiswa$ = this.loadPeminatanMahasiswa();
    // this.peminatanMahasiswa$ = this.fetchByUserIdPeminatanMahasiswa(this.decodedToken.userId);

    console.log("nama peminatan mahasiswa: " + this.peminatanMahasiswa$.nama);
  }

  // loadcustomer() {
  //   this.service.GetCustomer().subscribe((res) => {
  //     this.customerlist = res;
  //     this.dataSource = new MatTableDataSource<Customer>(this.customerlist);
  //     this.dataSource.paginator = this.paginatior;
  //     this.dataSource.sort = this.sort;
  //   });
  // }
  
  loadPeminatanMahasiswa() {
    this.peminatanMahasiswaService.fetchByUserId(this.decodedToken.userId).subscribe((res) => {
      this.dataPeminatanMahasiswa = res;
      // this.dataSource = new MatTableDataSource<Customer>(this.customerlist);
      // this.dataSource.paginator = this.paginatior;
      // this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editcustomer(code: any) {
    this.Openpopup(code, 'Edit Customer', PopupComponent);
  }

  detailcustomer(code: any) {
    this.Openpopup(code, 'Customer Detail', UserdetailComponent);
  }

  addcustomer() {
    this.Openpopup(0, 'Add Customer', PopupComponent);
  }

  Openpopup(code: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
      // this.loadcustomer();
    });
  }

  fetchByUserIdPeminatanMahasiswa(userId: Pick<User, 'id'>): Observable<{}> {
    return this.peminatanMahasiswaService.fetchByUserId(userId);
  }
}
