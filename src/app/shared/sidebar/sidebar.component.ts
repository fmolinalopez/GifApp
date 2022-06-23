import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../componentes/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) { }

  get historial(): string[] {
    return this.gifsService.historial;
  }

  public buscarOnClick( query: string ): void {
    this.gifsService.buscar(query);
  }
}
