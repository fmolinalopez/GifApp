import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKeyParam: string = 'api_key';
  private _queryParam: string = 'q';
  private _limitParam: string = 'limit';
  private _apiKey: string = 'grFWqNozQiIgkC67NkSwhOskEPr40rC8';
  private _limite: string = '10';
  private _urlBase: string = 'https://api.giphy.com/v1/gifs'
  private _servicioBusqueda = '/search'

  private _historial: string[] = [];

  public _resultados: Gif[] = [];

  constructor( private http:HttpClient ){
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this._resultados = JSON.parse(localStorage.getItem('resultadoBusqueda')!) || [];
  }

  get historial(): string[] {
    return [...this._historial];
  }

  get resultados(): Gif[] {
    return [...this._resultados];
  }

  public buscar( query: string ): void {
    
    this.realizarPeticionBusqueda(query);

    this.anadirAHistorial(query);
  }

  public anadirAHistorial( query: string ): void {

    if (query.trim().length === 0) {
      return;
    }

    query = query.trim().toLowerCase();

    if(this._historial.includes(query)) {
      this._historial.splice(this._historial.indexOf(query), 1);
    }

    this._historial.unshift(query);

    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));
  }

  private realizarPeticionBusqueda( query: string ) {
    const params: HttpParams = this.generarParamsPeticionBusqueda(query);
    
    this.http.get<SearchGifsResponse>(this.generarUrlPeticionBusqueda(), {params})
      .subscribe( (resp) => {
        this._resultados = resp.data;
        localStorage.setItem('resultadoBusqueda', JSON.stringify(this._resultados));
      })
  }
  
  private generarUrlPeticionBusqueda(): string {
    return `${this._urlBase}/${this._servicioBusqueda}`;
  }

  private generarParamsPeticionBusqueda(query: string): HttpParams {
    const params: HttpParams = new HttpParams()
        .set(this._apiKeyParam, this._apiKey)
        .set(this._limitParam, this._limite)
        .set(this._queryParam, query);
    return params;
  }
}
