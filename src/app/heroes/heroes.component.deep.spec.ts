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
      expect(heroComponentDes[i].componentInstance.hero.name).toEqual(HEROES[i].name);
    }
  });

  it('should call heroService.deleteHero when the Hero Component`s delete button is clicked', () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button'))
    .triggerEventHandler('click',{ stopPropagation:() => {}});

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked',() => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnit
    fixture.detectChanges();
    const name = 'Mr. Nice';
    mockHeroService.addHero.and.returnValue(of({id:5 , name , strength:6 }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.query(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });
});
