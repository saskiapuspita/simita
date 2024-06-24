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
import { Peminatan } from 'src/app/model/peminatan';
import { MataKuliah } from 'src/app/model/mata-kuliah';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { PeminatanService } from 'src/app/service/peminatan.service';
import { MataKuliahService } from 'src/app/service/mata-kuliah.service';
import { NilaiPeminatanMahasiswa } from 'src/app/model/nilai-peminatan-mahasiswa';
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
  // formNilaiMataKuliah!: FormGroup;
  formNilaiPeminatanMahasiswa!: FormGroup;
  decodedToken: any;
  // selected = 'none';
  // numRegex = /^\d+\.\d{2}$/;
  // peminatanOptionValue: any;
  peminatan$!: Observable<Peminatan[]>;
  mataKuliah$!: any; //Observable<MataKuliah[]>;
  // dataMataKuliah: any;
  userId!: Pick<User, 'id'>;
  selectedPeminatan: any;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private peminatanService: PeminatanService,
    private mataKuliahService: MataKuliahService,
    private nilaiPeminatanMahasiswaService: NilaiPeminatanMahasiswaService
  ) {}

  ngOnInit(): void {
    this.decodedToken = this.authService.decodeToken();
    this.peminatan$ = this.fetchAllPeminatan();
    this.mataKuliah$ = this.fetchAllMataKuliah();
    this.userId = this.authService.userId;
    this.formNilaiPeminatanMahasiswa = this.createNilaiPeminatanFormGroup();
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
}
