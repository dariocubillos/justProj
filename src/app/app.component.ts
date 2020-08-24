import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {LoginAppService} from '../app/services/login-app.service'
import {User} from '../app/models/user';
import {Just} from '../app/models/just';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user:User;
  justs: Array<Just>;
  justsNumber:number;
  title = 'justProj';
  dtOptions:any;
  loginPage = true;
  checkoutForm = new FormGroup({
    nameFull: new FormControl(),
    nameUser: new FormControl(),
    password: new FormControl(),
    phone: new FormControl(),
    typeUser: new FormControl()
  });
  loginForm = new FormGroup({
    nameUser: new FormControl(),
    password: new FormControl(),
  });
  justForm = new FormGroup({
    fileJust: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    reason: new FormControl(),
    infoExtra: new FormControl()
  });
  files:string[]=[];

  constructor(
    // private formBuilder: FormBuilder,
    private loginService: LoginAppService,
    public toastr: ToastrService,
    private httpClient: HttpClient
  ) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      data:this.justs,
      pagingType: 'full_numbers',
      deferRender: true,
      pageLength: 5,
      info: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      },
      columns: [{ data: 'id' }, { data: 'usernameFK' }, { data: 'state' },
      { data: 'filename' }, { data: 'dateStart' },
      { data: 'dateEnd' }, { data: 'reason' }, { data: 'info' }]
    };
  }

  registerUser(dataRegister:any){
    if (dataRegister.nameUser != null && dataRegister.password  != null && dataRegister.nameFull != null && dataRegister.phone  != null && dataRegister.typeUser) {
      this.loginService.registerUser(dataRegister.nameUser, dataRegister.password ,dataRegister.nameFull, dataRegister.phone , dataRegister.typeUser).subscribe(
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
    } else {
      this.toastr.warning('Llene todos los campos', 'Registro');
    }
  }

  checkUser(dataRegister:any){
    this.loginService.checkUser(dataRegister.nameUser, dataRegister.password).subscribe(
      (response) =>{
        let result = response as Array<User>;
        if (result.length > 0 ) {
          this.loginPage = false;
          $('.modal-backdrop').remove();
          this.user = result[0];
        } else {
          this.toastr.error('Usuario no encontrado', 'Login');
        }
      },
      error => {
        console.log(error);
      }, () =>{
        if ( this.user != undefined) {
          this.reloadJust();
        }
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
        this.loginService.saveRecord(response,this.user.id,dataRegister.startDate,dataRegister.endDate,
          dataRegister.reason,dataRegister.infoExtra).subscribe(
          response =>{
            if (response) {
              this.toastr.success('Nuevo registro guardado correctamente', 'Guardado');
              this.reloadJust();
              this.justForm.reset();
            } else {
              this.toastr.error('No se pudo guardar hubo un error en la base de datos', 'Guardado');
            }
          },
          error => {
            console.log(error);
            this.toastr.error('No se pudo guardar por un error en la conexion o base de datos', 'Guardado');
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  reloadJust(){
    this.loginService.getRecords(this.user.id).subscribe(
      response => {
        if (response != undefined) {
          this.justs = response;
          console.log(this.justs);                
        }
      },
      error => {
        console.log(error);
      }
    );
  }


  getName(){
    return this.user.name;
  }

  exitUser(){
    this.user = undefined;
    this.justs = undefined;
    this.loginPage = true;
    location.reload();
  }
}
