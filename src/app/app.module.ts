import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CambioComponent } from './cambio/cambio.component';
import { ListadoComponent } from './listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    CambioComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
