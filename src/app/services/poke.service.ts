import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  public offset: number  = 0;
  public limit: number = 20;
  private baseUrl: string = 'https://pokeapi.co/api/v2';
  private imgUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(public http: HttpClient) { }

  getPokemon(){
    return this.http.get(this.baseUrl + '/pokemon?limit=' + this.limit + '&offset=' + this.offset);
  }

  getPokeImage(index){
    return this.imgUrl + '' + index + '.png';
  }

  findPokemon(query){
    return this.http.get(this.baseUrl + '/pokemon/' + query);
  }

  getPokeDetails(index){
    return this.http.get(this.baseUrl + '/pokemon/' + index);
  }
}
