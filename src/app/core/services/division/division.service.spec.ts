import { TestBed } from '@angular/core/testing';
import { fakeQuestionConfig } from '@shared/models/question-config.interface';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import { QuestionConfigService } from '../question-config/question-config.service';

import { DivisionService } from './division.service';

describe('DivisionService', () => {
  let service: DivisionService;
  let mockQuestionConfigService: jasmine.SpyObj<QuestionConfigService>;

  beforeEach(() => {
    mockQuestionConfigService = jasmine.createSpyObj(
      'mockQuestionConfigService',
      ['getConfig']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: QuestionConfigService, useValue: mockQuestionConfigService },
      ],
    });
    service = TestBed.inject(DivisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProblem', () => {
    beforeEach(() => {
      mockQuestionConfigService.getConfig.and.returnValue(fakeQuestionConfig);
    });

    it('should return a value', () => {
      expect(service.getProblem()).toBeTruthy();
    });

    it('should return a value when subject is male', () => {
      expect(
        service.getProblem({ subject: { name: 'Fulano', gender: Gender.male } })
      ).toBeTruthy();
    });

    it('should return a value when subject is male', () => {
      expect(
        service.getProblem({ subject: { name: 'Ana', gender: Gender.female } })
      ).toBeTruthy();
    });

    it('should return a value when divisor is 2', () => {
      expect(service.getProblem({ divisor: 2 })).toBeTruthy();
    });

    it('should return a value when divisor is greater than 2', () => {
      expect(service.getProblem({ divisor: 10 })).toBeTruthy();
    });

    it(`is defensive and returns a value even if config doesn't have max values`, () => {
      mockQuestionConfigService.getConfig.and.returnValue({
        adition: { maxNumberOfNumbers: 343, maxValue: 353 },
        subtraction: { maxNumberOfNumbers: 23, maxValue: 450 },
        multiplication: {
          maxNumberOfNumbers: 27,
          maxValues: [3540, 54322],
          defaultMaxValue: 333,
        },
        division: {
          maxValues: [],
        },
      });

      expect(service.getProblem()).toBeTruthy();
    });

    it('should consult configuration service', () => {
      // When
      service.getProblem();

      // Then
      expect(mockQuestionConfigService.getConfig).toHaveBeenCalled();
    });
  });
});
