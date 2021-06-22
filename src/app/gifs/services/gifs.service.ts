import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'B6dTxEDwOm9Pv3qKvrB3fXNpfyFMaBI7';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  //es mejor romper la refenrencia de esta manera para no 
  //estropear el arreglo
  get historial (){
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    //se va a guardar la llave que fue asignada al localstorage
    if(localStorage.getItem('historial')){
      this._historial =  JSON.parse( localStorage.getItem('historial')!);
    } 

    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse( localStorage.getItem('resultados')!);
 
    }
  }

  buscarGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      
      //insertar al comienzo del arreglo
      this._historial.unshift(query);
      //limitar la cantidad del arreglo a 10
      this._historial = this._historial.splice(0,10);

      //guardar en localstorage el historial de busqueda
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
  
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=B6dTxEDwOm9Pv3qKvrB3fXNpfyFMaBI7&q=${query}&limit=20`)
        .subscribe((resp )=>{
          console.log(resp.data);
          this.resultados = resp.data;
          //guardar en localstorage el resultado
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
        });

 
  }
  
}
