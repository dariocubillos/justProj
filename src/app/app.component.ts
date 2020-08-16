import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {LoginAppService} from '../app/services/login-app.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'justProj';
  checkoutForm=   new FormGroup({
    nameFull: new FormControl(),
    nameUser: new FormControl(),
    password: new FormControl(),
    phone: new FormControl()

  });
  formGroup;



  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginAppService,
    public toastr: ToastrService
  ) {
  }


  onSubmit(dataRegister:any){
    this.loginService.registeruser(dataRegister.nameUser, dataRegister.password ,dataRegister.nameFull, dataRegister.phone).subscribe(
      (response) =>{
        if (response) {
          this.toastr.success('Nuevo registro guardado correctamente', 'Registro');
        } else {
          this.toastr.warning('Error en el guardado', 'Registro');
        }

      },
      error => {
        console.log(error);
      }
    );
  }


}
