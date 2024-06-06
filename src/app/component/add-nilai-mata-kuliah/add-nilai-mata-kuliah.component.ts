import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { first } from 'rxjs/operators';

import { NilaiMataKuliah } from 'src/app/model/nilai-mata-kuliah';

import { AuthService } from 'src/app/service/auth.service';
// import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-nilai-mata-kuliah',
  templateUrl: './add-nilai-mata-kuliah.component.html',
  styleUrls: ['./add-nilai-mata-kuliah.component.css']
})
export class AddNilaiMataKuliahComponent {
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;
  decodedToken: any;
  selected = 'none';
  
  isOpen = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();

    this.decodedToken = this.authService.decodeToken();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      nilai: new FormControl('', [
        Validators.required
      ]),
      mataKuliah: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmit(formData: Pick<NilaiMataKuliah, 'nilai' | 'mataKuliah'>): void {
    console.log(formData);
  }

}
