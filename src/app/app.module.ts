import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPanelUserComponent } from './components/main-panel-user/main-panel-user.component';
import { MainPanelAdminComponent } from './components/main-panel-admin/main-panel-admin.component';
declare var $: any;
@NgModule({
  declarations: [
    AppComponent,
    MainPanelUserComponent,
    MainPanelAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass :"toast-bottom-full-width",
      easing: 'ease-in' 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
