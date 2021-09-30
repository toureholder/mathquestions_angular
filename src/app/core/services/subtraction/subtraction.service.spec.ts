import { TestBed } from '@angular/core/testing';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import {
  MoreThingsQuestionData,
  QuestionEstablishmentSubject,
  QuestionSubject,
} from 'src/app/pages/problem/models/question-subject.interface';

import { SubtractionService } from './subtraction.service';

describe('SubtractionService', () => {
  let service: SubtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtractionService);
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
      const subject: QuestionSubject = {
        name: 'Antônio',
        gender: Gender.male,
      };

      const object: QuestionSubject = {
        name: 'carro',
        gender: Gender.male,
      };

      const purchase: QuestionEstablishmentSubject = {
        establishment: 'supermercado',
        establishmentGender: Gender.male,
        products: 'potes de manteiga',
        productsGender: Gender.male,
        item: 'bolo',
        itemGender: Gender.male,
      };

      const moreThings: MoreThingsQuestionData = {
        ago: 'semana passada',
        things: 'brinquedos',
        thingsGender: Gender.male,
        place: 'na loja de brinquedos',
        action: 'O gerente da loja comprou',
        done: 'comprados',
      };

      expect(
        service.getProblem({
          subject,
          object,
          purchase,
          moreThings,
        })
      ).toBeTruthy();
    });

    it('works with female subjects and objects', () => {
      // Given
      const subject: QuestionSubject = {
        name: 'Amanda',
        gender: Gender.female,
      };

      const object: QuestionSubject = {
        name: 'bola',
        gender: Gender.female,
      };

      const purchase: QuestionEstablishmentSubject = {
        establishment: 'livraria',
        establishmentGender: Gender.female,
        products: 'revistas',
        productsGender: Gender.female,
        item: 'revista',
        itemGender: Gender.female,
      };

      const moreThings: MoreThingsQuestionData = {
        ago: 'mês passado',
        place: 'no parque da cidade',
        things: 'árvores',
        thingsGender: Gender.female,
        action: 'Um grupo comunitário plantou',
        done: 'plantadas',
      };

      expect(
        service.getProblem({
          subject,
          object,
          purchase,
          moreThings,
        })
      ).toBeTruthy();
    });
  });
});
