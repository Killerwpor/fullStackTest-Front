import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { ServiceBNCService } from '../service-bnc.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {

  assets: any;
  limiteInf: number=0;
  limite: number=7;
  token: unknown;

  constructor(private service: ServiceBNCService) { }

  ngOnInit(): void {
   

    this.service.traerAssets().subscribe(
      async result => {
     this.assets=result.content;     
     this.token= await this.obtenerToken();
      this.actualizarPrecios();
      }
    );

    
  }

 async actualizarPrecios(){
    let precio;
    for(let i=this.limiteInf;i<this.limite;i++){
      precio= await this.obtenerPrecio(this.token, this.assets[i].id);
      this.assets[i].price="$"+precio.toFixed(4);
    }  
  }

  onScroll(){
    this.limiteInf+=7;
    this.limite+=5;
    this.actualizarPrecios();    
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



}
