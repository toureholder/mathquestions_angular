import { TestBed } from '@angular/core/testing';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import { MultiplicationQuestionData } from 'src/app/pages/problem/models/question-subject.interface';

import { MultiplicationService } from './multiplication.service';

describe('MultiplicationService', () => {
  let service: MultiplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiplicationService);
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
      const data: MultiplicationQuestionData = {
        actor: 'participante',
        actors: 'participantes',
        thing: 'quilômetros',
        thingGender: Gender.male,
        place: 'Em um festival de natação',
        futureSubjunctive: 'nadar',
        futurePlural: 'nadarão',
      };

      // Then
      expect(service.getProblem({ data })).toBeTruthy();
    });

    it('works with female subjects and objects', () => {
      // Given
      const data: MultiplicationQuestionData = {
        actor: 'criança',
        actors: 'crianças',
        thing: 'bolas de sorvete',
        thingGender: Gender.female,
        place: 'Em uma sorveteria',
        futureSubjunctive: 'comer',
        futurePlural: 'comerão',
      };

      // Then
      expect(service.getProblem({ data })).toBeTruthy();
    });
  });
});
