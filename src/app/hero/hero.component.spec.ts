import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HeroComponent} from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";


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

    // pegando seletor de css se tem o texto
    expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperMan');

    // verifica se existe o texto no seletor
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperMan');
  });

});
