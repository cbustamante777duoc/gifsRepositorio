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

  constructor(private http: HttpClient){}

  buscarGifs(query:string){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      
      //insertar al comienzo del arreglo
      this._historial.unshift(query);
      //limitar la cantidad del arreglo a 10
      this._historial = this._historial.splice(0,10);
    }
  
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=B6dTxEDwOm9Pv3qKvrB3fXNpfyFMaBI7&q=${query}&limit=20`)
        .subscribe((resp )=>{
          console.log(resp.data);
          this.resultados = resp.data;
          
        });

 
  }
  
}
