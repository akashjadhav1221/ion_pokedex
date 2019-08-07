import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../services/poke.service';
import { delay } from 'q';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private details: any;
  slideOpts = {
    autoPlay : {
      delay: 1000,
      disableOnInteraction: false
    }
  };

  constructor(private activeRoute: ActivatedRoute, private pokeService: PokeService) { }

  ngOnInit() {
    let index = this.activeRoute.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(res => {

      if(res){
        console.log(res);
       let obj = {};
       let imgs = res['sprites'];
        obj['images'] = [];
        if(imgs.front_default){
          obj['images'][0] = imgs.front_default;
        }
        if(imgs.front_shiny){
          obj['images'][1] = imgs.front_shiny;
        }
        if(imgs.back_default){
          obj['images'][2] = imgs.back_default;
        }

       let types = res['types'];
        obj['types'] = [];
       for(let i=0; i < types.length; i++){
        obj['types'][i] = types[i].type.name;
       }

       let abilities = res['abilities'];
        obj['abilities'] = [];
       for(let i=0; i < types.length; i++){
        obj['abilities'][i] = abilities[i].ability.name;
       }


       obj['weight'] = res['weight'];
       obj['height'] = res['height'];
       obj['name'] = res['name'];

       obj['stats'] = res['stats'];
       this.details = obj;
       console.log(this.details)
      }
    });
  }

}
