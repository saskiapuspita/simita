import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { PeminatanMahasiswa } from 'src/app/model/peminatan-mahasiswa';
import { Peminatan } from 'src/app/model/peminatan';
import { MataKuliah } from 'src/app/model/mata-kuliah';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { PeminatanService } from 'src/app/service/peminatan.service';
import { PeminatanMahasiswaService } from 'src/app/service/peminatan-mahasiswa.service';
import { MataKuliahService } from 'src/app/service/mata-kuliah.service';
import { NilaiMataKuliahService } from 'src/app/service/nilai-mata-kuliah.service';
import { NilaiMataKuliah } from 'src/app/model/nilai-mata-kuliah';
import { NilaiPeminatanMahasiswa } from 'src/app/model/nilai-peminatan-mahasiswa';
import { MatSelectChange } from '@angular/material/select';
import { NilaiPeminatanMahasiswaService } from 'src/app/service/nilai-peminatan-mahasiswa.service';

@Component({
  selector: 'app-create-peminatan',
  templateUrl: './create-peminatan.component.html',
  styleUrls: ['./create-peminatan.component.css'],
})
export class CreatePeminatanComponent implements OnInit {
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  formPeminatanMahasiswa!: FormGroup;
  formNilaiMataKuliah!: FormGroup;
  formNilaiPeminatanMahasiswa!: FormGroup;
  decodedToken: any;
  selected = 'none';
  numRegex = /^\d+\.\d{2}$/;
  peminatanOptionValue: any;
  peminatan$!: Observable<Peminatan[]>;
  mataKuliah$!: any; //Observable<MataKuliah[]>;
  dataMataKuliah: any;
  userId!: Pick<User, 'id'>;
  selectedPeminatan: any;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private peminatanService: PeminatanService,
    private mataKuliahService: MataKuliahService,
    private peminatanMahasiswaService: PeminatanMahasiswaService,
    private nilaiMataKuliahService: NilaiMataKuliahService,
    private nilaiPeminatanMahasiswaService: NilaiPeminatanMahasiswaService
  ) {}

  ngOnInit(): void {
    this.peminatan$ = this.fetchAllPeminatan();
    this.mataKuliah$ = this.fetchAllMataKuliah();
    // this.mataKuliah$ = this.fetchMatkulBasedOnIdPeminatan();
    this.userId = this.authService.userId;

    this.formPeminatanMahasiswa = this.createPeminatanFormGroup();
    this.formNilaiMataKuliah = this.createNilaiMataKuliahFormGroup();
    this.formNilaiPeminatanMahasiswa = this.createNilaiPeminatanFormGroup();

    this.decodedToken = this.authService.decodeToken();
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

  createPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      // ipk: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(this.numRegex),
      // ]),
      pilihanPeminatan: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      mataKuliah: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      nilai: new FormControl('', [Validators.required]),
    });
  }

  createNilaiMataKuliahFormGroup(): FormGroup {
    return new FormGroup({
      nilai: new FormControl('', [Validators.required]),
      mataKuliah: new FormControl('', [Validators.required]),
    });
  }

  createNilaiPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      idPeminatan: new FormControl('', [Validators.required]),
      urutanMinat: new FormControl('', [Validators.required]),
      idMatkul: new FormControl('', [Validators.required]),
      nilai: new FormControl('', [Validators.required]),
    });
  }

  onSubmitPeminatanMahasiswa(
    formPeminatanMahasiswa: Pick<PeminatanMahasiswa, 'pilihanPeminatan'>
  ) {
    console.log(formPeminatanMahasiswa);
    this.peminatanMahasiswaService
      .createPeminatanMahasiswa(formPeminatanMahasiswa, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
  }

  onSubmitNilaiMataKuliah(
    formNilaiMataKuliah: Pick<NilaiMataKuliah, 'nilai' | 'mataKuliah'>
  ): void {
    console.log(formNilaiMataKuliah);
    this.nilaiMataKuliahService
      .createNilaiMataKuliah(formNilaiMataKuliah, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });

    this.formNilaiMataKuliah.reset();
    this.formPeminatanMahasiswa.reset();
    this.formDirective.resetForm();
  }

  onSubmitNilaiPeminatanMahasiswa(
    formNilaiPeminatanMahasiswa: Pick<
      NilaiPeminatanMahasiswa,
      'idPeminatan' | 'idMatkul' | 'nilai'
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

  // change(event: any) {
  //   if (event.isUserInput) {
  //     console.log(event.source.value);

  //     // this.applyFilter(event.source.value);
  //     // this.mataKuliahService
  //     // .fetchMatkulBasedOnIdPeminatan(event.source.value)
  //     // .subscribe((data) => {
  //     //   this.filteredMataKuliah$ = data;
  //     //   console.log('matkul retrieved ' + this.filteredMataKuliah$.value);
  //     // });
  //     // return (this.selectedValue = event.source.value);
  //     // this.formPeminatanMahasiswa.get('pilihanPeminatan').patchValue(event.source.value);
  //     // this.mataKuliahService.fetchMatkulBasedOnIdPeminatan(event.source.value).subscribe((res) => {
  //     //   this.dataMataKuliah = res;
  //     //   this.mataKuliah$ = this.dataMataKuliah[0];
  //     //   console.log("matakuliah: " + this.mataKuliah$.nama);
  //     // this.dataSource = new MatTableDataSource<Customer>(this.customerlist);
  //     // this.dataSource.paginator = this.paginatior;
  //     // this.dataSource.sort = this.sort;
  //     // let findedData =  this.mataKuliahService.fetchAll().find(x => x.id == this.personId);
  //     // var index = this.mataKuliah$.findIndex((obj: { minat: number; }) => obj.minat === event.source.value);
  //     // console.log("index: " + index);
  //   }
  // }

  // filterMatkulBySelectedPeminatan(idPeminatan: any) {
  //   this.filteredMataKuliah$ = this.mataKuliah$.find((i: { minat: any; }) => i.minat === idPeminatan);
  //   console.log("filteredMataKuliah: " + this.filteredMataKuliah$);
  //   if (typeof this.filteredMataKuliah$ === 'undefined') {
  //     return null;
  //   }
  //   return this.filteredMataKuliah$;
  // }

  // onPeminatanSelected(selectedPeminatanId: any) {
  //   this.mataKuliahService
  //     .fetchMatkulBasedOnIdPeminatan(selectedPeminatanId)
  //     .subscribe((data) => {
  //       this.filteredMataKuliah$ = data;
  //       console.log('matkul retrieved ' + this.filteredMataKuliah$);
  //     });
  // }
}
