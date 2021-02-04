import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoComponent } from '../listado/listado.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { CambioComponent } from '../cambio/cambio.component';
import { FormsModule } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';


describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
      ],
      declarations: [ListadoComponent, CambioComponent],
      providers: [     
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
  });

  it('Debe llamar al metodo obtenerToken()', () => {
    spyOn(component, 'obtenerToken').and.callThrough();
    component.obtenerToken();
    expect(component.obtenerToken).toHaveBeenCalled();
  });

  it('Metodo OnScroll aumenta limite superior a 12', () => {
    component.onScroll();
     const limite=component.limite;
     expect(limite).toBe(12 );

  });

  it('Metodo OnScroll aumenta limite inferior a 7 ', () => {
    component.onScroll();
     const limite=component.limiteInf;
     expect(limite).toBe(7);

  });

  it('Obtener precio retorna número ',async () => {
    const token=await component.obtenerToken();
    const bitcoinId="f1ff77b6-3ab4-4719-9ded-2fc7e71cff1f";
    const precio=await component.obtenerPrecio(token,bitcoinId)
     expect(precio).toEqual(expect.any(Number));
  });




});
