import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceBNCService } from '../service-bnc.service';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.sass']
})
export class CambioComponent implements OnInit {

  cantidad: number;
  monedaBase: string="BTC";
  monedaConvertir: string="BTC";
  assets: any;
  token: any;
  conversion: any=0;

  constructor(private service: ServiceBNCService, public activatedRoute: ActivatedRoute) { }

   ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
  const parametros = params["coin"];
  if(parametros)
      this.monedaConvertir=parametros;
    });
   
     this.token=this.obtenerToken().then((result)=>{
       this.token=result;

     });    

    

    
  }

  async convertir(){
this.conversion= await this.convertirAux()
  }

  cambiarMonedas(){
    let aux=this.monedaBase;
    this.monedaBase=this.monedaConvertir;
    this.monedaConvertir=aux;
    this.convertir();
  }

  async convertirAux(){ 
    const idMonedaBase=await this.traerId(this.monedaBase);
    const idMonedaConvertir=await this.traerId(this.monedaConvertir);
    return new Promise((resolve,reject)=>{    
    //ConseguirIdMonedas   
    //Sacar precio ambas monedas
    this.service.consultarPrecio(this.token,idMonedaBase).subscribe(
      result => {    
        this.service.consultarPrecio(this.token,idMonedaConvertir).subscribe(
          result2 => {  
          resolve((this.cantidad*result.content[0].price)/result2.content[0].price)
         }
       );  
     }
   );  
  })

}
    //dividir y mostrar
  

  obtenerToken(){
    return new Promise((resolve,reject)=>{
      var precio: number;
   this.service.obtenerToken().subscribe(
      result=>{
         resolve(result.access_token);
       }
     )
    }) 
  }

  async traerId(moneda){
       this.assets=await this.traerAssets();
    return new Promise((resolve,reject)=>{
      let obj = this.assets.find((o, k) => {
        if (o.symbol === moneda) {
  resolve(o.id);
          return true; // Para de buscar
        }
      });
    })
  
  }

  obtenerPrecio(token, assetId) {
    return new Promise((resolve,reject)=>{   
             this.service.consultarPrecio(token,assetId).subscribe(
           result => {    
           resolve(result.content[0].price);
          }
        );    
    }) 
  }
  
  traerAssets(){
return new Promise((resolve,reject)=>{
  this.service.traerAssets().subscribe(
    async result => {       
   resolve(result.content);       
    }
  );
})




  }

}
