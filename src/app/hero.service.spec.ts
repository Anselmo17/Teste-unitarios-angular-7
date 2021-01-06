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

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
          service.getHero(1).subscribe();
          const req = httpTestingController.expectOne('api/heroes/1');
          req.flush({ id:1 , name:'SuperMan' , strength: 8 });
          httpTestingController.verify();
        });
  });
});
