import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HeroComponent} from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";


describe('HeroComponent (shalow tests)', () => {

  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the corret hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperMan', strength: 9 };
    expect(fixture.componentInstance.hero.id).toEqual(1);
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperMan', strength: 9 };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperMan');
  });

});
