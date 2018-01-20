import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap }    from 'rxjs/operators';

import { Hero } from './hero';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {
  // URL to web api
  private heroesUrl = 'https://gateway.marvel.com:443/v1/public/characters?limit=10&apikey=2613d3beb415606554f219d832a23901';
  private heroUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
  private key = 'apikey=2613d3beb415606554f219d832a23901';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // Get heroes from the server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}?${this.key}`;

    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Log a HeroService message with the MessageService
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}