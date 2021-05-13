import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component'


import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';

import { ChemicalElementService } from './table/services/chemical-element.service'

import { DemoMaterialModule } from './material-module';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    TableVirtualScrollModule,
  ],
  providers: [
    ChemicalElementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
