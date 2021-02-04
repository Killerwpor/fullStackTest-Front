import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioComponent } from './cambio.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {ListadoComponent} from '../listado/listado.component'


describe('CambioComponent', () => {
  let component: CambioComponent;
  let fixture: ComponentFixture<CambioComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
      ],
      declarations: [CambioComponent, ListadoComponent],
      providers: [     
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioComponent);
    component = fixture.componentInstance;
  });

  it('Debe llamar al metodo obtenerToken()', () => {
    spyOn(component, 'obtenerToken').and.callThrough();
    component.obtenerToken();
    expect(component.obtenerToken).toHaveBeenCalled();
  });

  it('Trae los 1700 assets', async () => {
   const assets=await component.traerAssets();
    expect(assets).toHaveLength(1700);
  });

  it('Obtener precio retorna número ',async () => {
    const token=await component.obtenerToken();
    const bitcoinId="f1ff77b6-3ab4-4719-9ded-2fc7e71cff1f";
    const precio=await component.obtenerPrecio(token,bitcoinId)
     expect(precio).toEqual(expect.any(Number));
  });

  it('Cambiar moneda base a moneda convertir y viceversa ',async () => {

    const monedaConvertir=component.monedaConvertir;
    const monedaBase=component.monedaBase;
    component.cambiarMonedas();
    expect(component.monedaBase).toBe(monedaConvertir); 
  });


});


