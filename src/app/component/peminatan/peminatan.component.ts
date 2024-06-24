import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Peminatan } from 'src/app/model/peminatan';
import { ModalDeletePeminatanMahasiswaComponent } from '../modal-delete-peminatan-mahasiswa/modal-delete-peminatan-mahasiswa.component';
import { NilaiPeminatanMahasiswa } from 'src/app/model/nilai-peminatan-mahasiswa';
import { NilaiPeminatanMahasiswaService } from 'src/app/service/nilai-peminatan-mahasiswa.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MataKuliah } from 'src/app/model/mata-kuliah';
import { User } from 'src/app/model/user';
import { PeminatanService } from 'src/app/service/peminatan.service';
import { MataKuliahService } from 'src/app/service/mata-kuliah.service';
import { FinalisePeminatanMahasiswaComponent } from '../finalise-peminatan-mahasiswa/finalise-peminatan-mahasiswa.component';

@Component({
  selector: 'app-peminatan',
  templateUrl: './peminatan.component.html',
  styleUrls: ['./peminatan.component.css'],
})
export class PeminatanComponent implements OnInit {
  @ViewChild(MatPaginator) paginatior!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  dataSource: any;
  decodedToken: any;
  // dataPeminatanMahasiswa!: NilaiPeminatanMahasiswa[];
  nilaiPeminatanMahasiswaList!: NilaiPeminatanMahasiswa[];
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
  formPeminatanMahasiswa!: FormGroup;
  formNilaiPeminatanMahasiswa!: FormGroup;
  formFinalSubmit!: FormGroup;
  peminatan$!: Observable<Peminatan[]>;
  mataKuliah$!: any; //Observable<MataKuliah[]>;
  userId!: Pick<User, 'id'>;
  selectedPeminatan: any;
  isOpen = false;
  isEditable = false;
  nilaiPeminatanMahasiswa$!: any;

  constructor(
    private authService: AuthService,
    private nilaiPeminatanMahasiswaService: NilaiPeminatanMahasiswaService,
    private peminatanService: PeminatanService,
    private dialog: MatDialog,
    private mataKuliahService: MataKuliahService,
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
    this.peminatan$ = this.fetchAllPeminatan();
    this.mataKuliah$ = this.fetchAllMataKuliah();
    this.userId = this.authService.userId;
    this.formNilaiPeminatanMahasiswa = this.createNilaiPeminatanFormGroup();
    this.formFinalSubmit = this.updateIsFinalSubmitNilaiPeminatanFormGroup();
    this.nilaiPeminatanMahasiswa$ = this.loadPeminatanMahasiswa(this.decodedToken.userId);
  }

  loadPeminatanMahasiswa(userId: number) {
    this.nilaiPeminatanMahasiswaService.fetchNamaPeminatanNamaMatkulNilai(userId).subscribe((res) => {
      this.nilaiPeminatanMahasiswaList = res;
      this.dataSource = new MatTableDataSource<NilaiPeminatanMahasiswa>(this.nilaiPeminatanMahasiswaList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  // fetchAllPeminatan(): Observable<Peminatan[]> {
  //   return this.masterPeminatanService.fetchAll();
  // }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  deletePeminatanMahasiswa(id: any) {
    this.openPopUp(id, 'Delete Peminatan Mahasiswa', ModalDeletePeminatanMahasiswaComponent);
  }

  submitFinalisePeminatanMahasiswa(id: any) {
    this.openPopUp(id, 'Submit Peminatan Mahasiswa', FinalisePeminatanMahasiswaComponent);
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

  editData() {
    this.isEditable = true
  }

  fetchAllPeminatan(): Observable<Peminatan[]> {
    return this.peminatanService.fetchAll();
  }

  fetchAllMataKuliah(): Observable<MataKuliah[]> {
    return this.mataKuliahService.fetchAll();
  }

  fetchMatkulBasedOnIdPeminatan(): Observable<{}> {
    return this.mataKuliahService.fetchMatkulBasedOnIdPeminatan(
      this.formPeminatanMahasiswa.controls['pilihanPeminatan'].value
    );
  }

  createNilaiPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      idPeminatan: new FormControl('', [Validators.required]),
      urutanMinat: new FormControl('', [Validators.required]),
      idMatkul1: new FormControl('', [Validators.required]),
      nilaiMatkul1: new FormControl('', [Validators.required]),
      idMatkul2: new FormControl('', [Validators.required]),
      nilaiMatkul2: new FormControl('', [Validators.required]),
      idMatkul3: new FormControl('', [Validators.required]),
      nilaiMatkul3: new FormControl('', [Validators.required]),
      idMatkul4: new FormControl('', [Validators.required]),
      nilaiMatkul4: new FormControl('', [Validators.required]),
      idMatkul5: new FormControl('', [Validators.required]),
      nilaiMatkul5: new FormControl('', [Validators.required]),
    });
  }

  updateIsFinalSubmitNilaiPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      isFinalSubmit: new FormControl('', [Validators.required])
    });
  }

  onSubmitNilaiPeminatanMahasiswa(
    formNilaiPeminatanMahasiswa: Pick<
      NilaiPeminatanMahasiswa,
      | 'idPeminatan'
      | 'urutanMinat'
      | 'idMatkul1'
      | 'nilaiMatkul1'
      | 'idMatkul2'
      | 'nilaiMatkul2'
      | 'idMatkul3'
      | 'nilaiMatkul3'
      | 'idMatkul4'
      | 'nilaiMatkul4'
      | 'idMatkul5'
      | 'nilaiMatkul5'
    >
  ): void {
    console.log(formNilaiPeminatanMahasiswa);
    this.nilaiPeminatanMahasiswaService
      .createNilaiPeminatanMahasiswa(
        formNilaiPeminatanMahasiswa,
        this.authService.userId
      )
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
        this.loadPeminatanMahasiswa(this.decodedToken.userId);
      });

    this.formNilaiPeminatanMahasiswa.reset();
    this.formDirective.resetForm();
  }

  selectPeminatan(pilihanPeminatan: any) {
    if (!pilihanPeminatan) {
      this.formNilaiPeminatanMahasiswa.controls['mataKuliah'].setValue('');
      this.mataKuliah$ = [];
      return;
    }
    const peminatanId = parseInt(pilihanPeminatan);
    this.mataKuliahService.fetchMatkulBasedOnIdPeminatan(peminatanId).subscribe(
      (response) => {
        this.mataKuliah$ = response.data;
        this.mataKuliah$ = JSON.stringify(this.mataKuliah$[0]);
        this.mataKuliah$ = JSON.parse(this.mataKuliah$);
      },
      (error) => {
        console.log('Something went wrong: ', error);
      }
    );
  }

  onSubmitIsFinalSubmit(
    formFinalSubmit: Pick<
      NilaiPeminatanMahasiswa,
      | 'isFinalSubmit'
    >
  ): void {
    console.log(formFinalSubmit);
    console.log(this.nilaiPeminatanMahasiswa$.id);
    this.nilaiPeminatanMahasiswaService
      .updateIsFinalSubmit(
        formFinalSubmit,
        this.nilaiPeminatanMahasiswa$.id
      )
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
        this.loadPeminatanMahasiswa(this.decodedToken.userId);
      });

    this.formFinalSubmit.reset();
    this.formDirective.resetForm();
  }
}
