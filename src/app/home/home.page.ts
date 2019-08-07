import { Component, OnInit, ViewChild } from '@angular/core';
import { PokeService } from '../services/poke.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public pokemons: any[] = [];
  public query: string = '';
  public searchedPoke: any;
  public searchedCompleted: boolean = false;

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.loadPokemon(false);
  }

  loadPokemon(loadMore, event?){
    if(loadMore){
      this.pokeService.offset += 20;
    }

    this.pokeService.getPokemon().subscribe(res => {
      console.log('res',res['results']);
      if(res){
        for(let i = 0; i < res['results'].length; i++){
          let obj = res['results'][i];
          obj['pokeIndex'] = this.pokeService.offset + i + 1;
          obj['image'] = this.pokeService.getPokeImage(this.pokeService.offset + i + 1);
          this.pokemons.push(obj);
        }

        if(event){
          event.target.complete();
        }

        console.log(this.pokemons);
      }
    });
  }

  searchPokemon(){
    this.searchedCompleted = false;
    if(this.query.trim() === ''){
      return;
    }

    console.log('search poke')
    this.pokeService.findPokemon(this.query).subscribe(res => {
      
      console.log(res);
      if(res){
        let obj = {};
        obj['name'] = res['name'];
        obj['image'] = this.pokeService.getPokeImage(res['id']);
        obj['pokeIndex'] = res['id'];
        this.searchedPoke = obj;
        this.searchedCompleted = true;
        console.log(this.searchedPoke);
       }
    })
  }

  showPoke(){
    console.log('canceled');
    this.query = '';
    this.searchedCompleted = false;
    this.searchedPoke = {};
    
  }

}
