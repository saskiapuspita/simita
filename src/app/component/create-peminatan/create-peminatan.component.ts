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
  decodedToken: any;
  selected = 'none';
  numRegex = /^\d+\.\d{2}$/;
  peminatanOptionValue: any;
  peminatan$!: Observable<Peminatan[]>;
  mataKuliah$!: Observable<MataKuliah[]>;
  userId!: Pick<User, 'id'>;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private peminatanService: PeminatanService,
    private mataKuliahService: MataKuliahService,
    private peminatanMahasiswaService: PeminatanMahasiswaService,
    private nilaiMataKuliahService: NilaiMataKuliahService
  ) {}

  ngOnInit(): void {
    this.peminatan$ = this.fetchAllPeminatan();
    this.mataKuliah$ = this.fetchAllMataKuliah();
    this.userId = this.authService.userId;

    this.formPeminatanMahasiswa = this.createPeminatanFormGroup();
    this.formNilaiMataKuliah = this.createNilaiMataKuliahFormGroup();

    this.decodedToken = this.authService.decodeToken();
  }

  fetchAllPeminatan(): Observable<Peminatan[]> {
    return this.peminatanService.fetchAll();
  }

  fetchAllMataKuliah(): Observable<MataKuliah[]> {
    return this.mataKuliahService.fetchAll();
  }

  createPeminatanFormGroup(): FormGroup {
    return new FormGroup({
      ipk: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numRegex),
      ]),
      pilihanPeminatan: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  createNilaiMataKuliahFormGroup(): FormGroup {
    return new FormGroup({
      nilai: new FormControl('', [Validators.required]),
      mataKuliah: new FormControl('', [Validators.required]),
    });
  }

  onSubmitPeminatanMahasiswa(
    formPeminatanMahasiswa: Pick<PeminatanMahasiswa, 'ipk' | 'pilihanPeminatan'>
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
}
