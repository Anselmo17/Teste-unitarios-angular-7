import {TestBed} from "@angular/core/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject} from "@angular/core";

describe('HeroService', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService, {
          provide: MessageService,
          useValue: mockMessageService
        }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

    it('should call get with the correct URL', () => {
          service.getHero(1).subscribe();
          const req = httpTestingController.expectOne('api/heroes/1');
          req.flush({ id:1 , name:'SuperMan' , strength: 8 });
          httpTestingController.verify();
      });

     xit('should call get with the correct URL', () => {
          service.getHeroNo404(10).subscribe();
          const req = httpTestingController.expectOne('api/heroes/10');
          req.flush({ id:1 , name:'SuperMan' , strength: 8 } + `fetched`);
          httpTestingController.verify();
      });

    it('should call get list heroes', () => {
      service.getHeroes().subscribe();
      const req = httpTestingController.expectOne('api/heroes');
      req.flush([{ id:1 , name:'SuperMan' , strength: 8 }]);
      httpTestingController.verify();
    });

     it('should call get searchHeroes', () => {
          service.searchHeroes('Testando o envio').subscribe();
          const req = httpTestingController.expectOne('api/heroes/?name=Testando o envio');
          req.flush({ id:1 , name:'SuperMan' , strength: 8 });
          httpTestingController.verify();
      });

      it('should call get searchHeroes empty', () => {
          const texto = ' tt ';
          service.searchHeroes(texto).subscribe();
          const req = httpTestingController.expectOne(`api/heroes/?name=${texto}`);
          req.flush([]);
          httpTestingController.verify();
      });

       it('should call post addHero', () => {
          const hero = { id:1 , name:'SuperMan' , strength: 8 };
          service.addHero(hero).subscribe();
          const req = httpTestingController.expectOne(`api/heroes`);
          req.flush(hero);
          httpTestingController.verify();
      });
  });
