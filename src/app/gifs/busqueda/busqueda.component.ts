import { Component,ElementRef ,ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
// el signo ! significa que se puede ignorar
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;


constructor(private gifsService:GifsService){}


  buscar(){
    //se obtiene el valor de input
   const valor = this.txtBuscar.nativeElement.value;

   //VALIDACION
   if(valor.trim().length ==0){
      return;
   }
   
   //se inserta el valor en el arreglo
   this.gifsService.buscarGifs(valor)

   //limpia el input
   this.txtBuscar.nativeElement.value = '';

  }

}
