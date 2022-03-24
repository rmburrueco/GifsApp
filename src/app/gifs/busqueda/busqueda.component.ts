import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //! Non-null assertion operation

  constructor( private gifsService: GifsService ){} //Ya tengo todas sus propiedades y todos sus métodos

  buscar( ){
    
    const valor = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }
}
