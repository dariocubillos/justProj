import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {LoginAppService} from '../app/services/login-app.service'
import { ToastrService } from 'ngx-toastr';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'justProj';
  loginPage = true;
  checkoutForm = new FormGroup({
    nameFull: new FormControl(),
    nameUser: new FormControl(),
    password: new FormControl(),
    phone: new FormControl()
  });
  loginForm = new FormGroup({
    nameUser: new FormControl(),
    password: new FormControl(),
  });
  justForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    reason: new FormControl(),
    infoExtra: new FormControl()
  });
  files:string[]=[];

  constructor(
    // private formBuilder: FormBuilder,
    private loginService: LoginAppService,
    public toastr: ToastrService
  ) {
  }

  registerUser(dataRegister:any){
    this.loginService.registerUser(dataRegister.nameUser, dataRegister.password ,dataRegister.nameFull, dataRegister.phone).subscribe(
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

  checkUser(dataRegister:any){
    this.loginService.checkUser(dataRegister.nameUser, dataRegister.password).subscribe(
      (response) =>{
        if (response) {
          this.loginPage = false;
          $('.modal-backdrop').remove();
        } else {
          this.toastr.error('Usuario no encontrado', 'Login');
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  onFileChange(event)  {
    for  (var i =  0; i <  event.target.files.length; i++)  {  
        this.files.push(event.target.files[i]);
    }
  }

  saveJust(dataRegister:any){
    this.loginService.saveImage(this.files).subscribe(
      (response) => {
        this.loginService.saveRecord(response,'minix','unix','minix','unix','unix').subscribe(
          response =>{
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }



}
