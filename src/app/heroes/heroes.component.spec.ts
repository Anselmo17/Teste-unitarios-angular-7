import {  } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroesService;

  beforeEach(() => {
    HEROES = [
      { id:1, name:'SuperMam', strength:8 },
      { id:2, name:'Batman', strength:9 },
      { id:3, name:'Homem-Aranha', strength:7 }
    ]
    mockHeroesService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
    component = new HeroesComponent(mockHeroesService);
  });
  
  describe('delete',() => {
    it('should remove the indicated hero from the heroes list', ()=>{
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      const hero = HEROES[0];
     component.delete(hero);
     expect(component.heroes.length).toEqual(2);
    });

    it('should call deleteHero', () =>{
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      const hero = HEROES[0];
     component.delete(hero);
     expect(mockHeroesService.deleteHero).toHaveBeenCalled();
    });
  });
});
