import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  //es mejor romper la refenrencia de esta manera para no 
  //estropear el arreglo
  get historial (){
    return [...this._historial]
  }

  buscarGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      
      //insertar al comienzo del arreglo
      this._historial.unshift(query);
      //limitar la cantidad del arreglo a 10
      this._historial = this._historial.splice(0,10);
    }




    console.log(this._historial);
  }
  
}
