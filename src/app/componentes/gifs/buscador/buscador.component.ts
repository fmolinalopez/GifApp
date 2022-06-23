import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent {

  constructor( private gifsService: GifsService ){}

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(): void {
    this.gifsService.buscar(this.txtBuscar.nativeElement.value);
    this.txtBuscar.nativeElement.value = '';
  }
} 
