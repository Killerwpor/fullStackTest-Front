import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceBNCService {

  private urlAsset="https://bravenewcoin.p.rapidapi.com/asset?status=ACTIVE&type=CRYPTO"
  private urlToken="https://bravenewcoin.p.rapidapi.com/oauth/token"
  private urlPrecio="https://bravenewcoin.p.rapidapi.com/market-cap"
 


  constructor(private http: HttpClient) { 


   }

   traerAssets(): Observable<any> {
    const headers = { 	
    "x-rapidapi-key": "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
		"x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
    "useQueryString": "true" 
  }
    
    return this.http.get<any>(this.urlAsset,{
      headers: headers
    });
      

    
  }

  consultarPrecio(token,asset): Observable<any> {
    const headers = { 
    "Authorization": "Bearer "+token,	
    "x-rapidapi-key": "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
		"x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
  }
    
    return this.http.get<any>(this.urlPrecio+"?assetId="+asset,{
      headers: headers
    });    
  }

obtenerToken(): Observable<any>{
  const headers = { 	
    "content-type": "application/json",
    "x-rapidapi-key": "79127b6bebmsh025591152333adep107f80jsn114492576aa0",
		"x-rapidapi-host": "bravenewcoin.p.rapidapi.com",
    "useQueryString": "true" 
  }
  
  const datos={
  "audience": "https://api.bravenewcoin.com",
	"client_id": "oCdQoZoI96ERE9HY3sQ7JmbACfBf55RY",
	"grant_type": "client_credentials"
  }

  return this.http.post<any>(this.urlToken, datos, {
    headers: headers
  });
}
}
