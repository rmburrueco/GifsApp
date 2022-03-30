import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'qrCOq8loXedQFRqXtisR5KLk3FgRh51q';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! ); // Confía en mí, no es nulo (lo indica el signo !)
    // }
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    console.log(this._historial);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=qrCOq8loXedQFRqXtisR5KLk3FgRh51q&q=${ query }&limit=10`)
      .subscribe( ( resp ) => {
        console.log( resp.data );
        this.resultados = resp.data;
      });

  }

}
