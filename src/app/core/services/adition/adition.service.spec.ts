import { TestBed } from '@angular/core/testing';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import {
  AddTwoThingsQuestionData,
  MoreAndMoreQuestionData,
} from 'src/app/pages/problem/models/question-subject.interface';

import { AditionService } from './adition.service';

describe('AditionService', () => {
  let service: AditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProblem', () => {
    it('should return a value', () => {
      expect(service.getProblem()).toBeTruthy();
    });

    it('works with male subjects and objects', () => {
      // Given
      const addTwo: AddTwoThingsQuestionData = {
        actor: 'vendedor',
        actors: 'vendedores',
        actorGender: Gender.male,
        passadoSingular: 'vendeu',
        passadoPlural: 'venderam',
        things: 'brinquedos',
        thingsGender: Gender.male,
        place: 'no final de semana',
      };

      const moreAndMore: MoreAndMoreQuestionData = {
        actors: 'araras',
        actorGender: Gender.female,
        place: 'Em uma reserva ambiental',
      };

      // Then
      expect(service.getProblem({ addTwo, moreAndMore })).toBeTruthy();
    });

    it('works with female subjects and objects', () => {
      // Given
      const addTwo: AddTwoThingsQuestionData = {
        actor: 'construtora',
        actors: 'construtoras',
        actorGender: Gender.female,
        passadoSingular: 'construiu',
        passadoPlural: 'construiram',
        things: 'casas',
        thingsGender: Gender.female,
        place: 'na cidade',
      };

      const moreAndMore: MoreAndMoreQuestionData = {
        actors: 'alunos',
        actorGender: Gender.male,
        place: 'Em uma escola',
      };

      // Then
      expect(service.getProblem({ addTwo, moreAndMore })).toBeTruthy();
    });
  });
});
