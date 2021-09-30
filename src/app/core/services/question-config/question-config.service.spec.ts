import { TestBed } from '@angular/core/testing';
import { TestUtil } from '@testing/test-util';
import {
  fakeQuestionConfig,
  QuestionConfig,
} from 'src/app/shared/models/question-config.interface';

import { QuestionConfigService } from './question-config.service';

describe('QuestionConfigService', () => {
  let service: QuestionConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getConfig', () => {
    it('should return a config', () => {
      expect(service.getConfig()).toBeDefined();
    });

    describe('when localStorage has preferences', () => {
      beforeEach(() => {
        TestUtil.mockLocalStorage();
      });

      it('should return a config', () => {
        expect(service.getConfig()).toBeDefined();
      });
    });

    describe('when localStorage has no preferences', () => {
      beforeEach(() => {
        TestUtil.mockLocalStorage({});
      });

      it('should return a config', () => {
        expect(service.getConfig()).toBeDefined();
      });
    });
  });

  describe('#setConfig', () => {
    it('should set config', () => {
      // Given
      const config = fakeQuestionConfig;

      // When
      service.setConfig(config);

      // Then
      expect(service.getConfig()).toEqual(config);
    });

    it('should update multiplication maxValues when multiplication maxNumberOfNumbers decreases', () => {
      // Given
      const config = fakeQuestionConfig;

      service.setConfig(config);

      const newConfig = JSON.parse(
        JSON.stringify(fakeQuestionConfig)
      ) as QuestionConfig;

      const number = 1;

      newConfig.multiplication.maxNumberOfNumbers = number;

      // When
      service.setConfig(newConfig);

      // Then
      expect(service.getConfig().multiplication.maxValues.length).toEqual(
        number
      );
    });

    it('should update multiplication maxValues when multiplication maxNumberOfNumbers increases', () => {
      // Given
      const config = fakeQuestionConfig;

      service.setConfig(config);

      const newConfig = JSON.parse(
        JSON.stringify(fakeQuestionConfig)
      ) as QuestionConfig;

      const number = 5;

      newConfig.multiplication.maxNumberOfNumbers = number;

      // When
      service.setConfig(newConfig);

      // Then
      expect(service.getConfig().multiplication.maxValues.length).toEqual(
        number
      );
    });
  });
});
