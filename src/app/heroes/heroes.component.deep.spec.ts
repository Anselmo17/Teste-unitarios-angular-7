import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { By } from "@angular/platform-browser";

describe('HeroesComponent Deep', () => {
  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [ 
      { id:1, name:'SuperMam', strength:8 },
      { id:2, name:'Batman', strength:9 },
      { id:3, name:'Homem-Aranha', strength:7 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero','deleteHero'])
    TestBed.configureTestingModule({
      declarations:[HeroesComponent, HeroComponent],
      providers:[
        {
          provide: HeroService , useValue: mockHeroService
        }
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    
    // run ngOnit
    fixture.detectChanges();

    const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDes.length).toEqual(3);
    
    for(let i=0; i < heroComponentDes.length; i++){
      expect(heroComponentDes[i].componentInstance.hero.name).toEqual(HEROES[i]);
    }
  });
});
