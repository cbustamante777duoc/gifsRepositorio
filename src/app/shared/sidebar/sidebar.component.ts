import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  constructor(private gifsService:GifsService) { }


  buscar(termino:string){
     this.gifsService.buscarGifs(termino);
     console.log('pincho sobre el termino '+termino)
  }

  get historial(){
    return this.gifsService.historial;
  }

}
