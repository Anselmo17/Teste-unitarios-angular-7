import { TestBed, ComponentFixture, fakeAsync, flush } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { HeroDetailComponent } from "./hero-detail.component";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { tick } from "@angular/core/src/render3";

describe('HeroDetailComponent', () => {

  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService , mockLocation;

  beforeEach(() => {
  mockActivatedRoute = {
    snapshot:{ paramMap: { get:() => { return '1'; }}}
  };

  mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);
  mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations:[ HeroDetailComponent],
      providers:[
       { provide: ActivatedRoute , useValue: mockActivatedRoute },
       { provide: HeroService , useValue: mockHeroService },
       { provide: Location , useValue: mockLocation }
      ],
      imports:[FormsModule]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({ id: 1 , name: 'SuperMam', strength: 8 }));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERMAM');
  });

  it('should call updateHero when save is called', fakeAsync (() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});