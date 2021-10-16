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
      const preference: QuestionConfig = {
        adition: { maxNumberOfNumbers: 3, maxValue: 929 },
        subtraction: { maxNumberOfNumbers: 2, maxValue: 103700 },
        multiplication: {
          maxNumberOfNumbers: 2,
          maxValues: [99, 7],
          defaultMaxValue: 10,
        },
        division: {
          maxValues: [50, 5],
        },
      };

      beforeEach(() => {
        TestUtil.mockLocalStorage({
          [QuestionConfigService.localStorageKey]: JSON.stringify(preference),
        });
      });

      it('should return preference', () => {
        expect(service.getConfig()).toEqual(preference);
      });
    });

    describe('when localStorage has preferences without all QuestionConfig keys', () => {
      let preference = {
        adition: { maxNumberOfNumbers: 3, maxValue: 929 },
        subtraction: { maxNumberOfNumbers: 2, maxValue: 103700 },
        multiplication: {
          maxNumberOfNumbers: 2,
          maxValues: [99, 7],
          defaultMaxValue: 10,
        },
      };

      beforeEach(() => {
        TestUtil.mockLocalStorage({
          [QuestionConfigService.localStorageKey]: JSON.stringify(preference),
        });
      });

      it('should return preference with missing keys added', () => {
        const expectedValue = {
          ...preference,
          ...{
            division: {
              maxValues: [99, 6],
            },
          },
        } as QuestionConfig;

        expect(service.getConfig()).toEqual(expectedValue);
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

      // Making sure number has decreased in this test
      expect(newConfig.multiplication.maxNumberOfNumbers).toBeLessThan(
        service.getConfig().multiplication.maxNumberOfNumbers
      );

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

      const number = 30;

      newConfig.multiplication.maxNumberOfNumbers = number;

      // Making sure number has increased in this test
      expect(newConfig.multiplication.maxNumberOfNumbers).toBeGreaterThan(
        service.getConfig().multiplication.maxNumberOfNumbers
      );

      // When
      service.setConfig(newConfig);

      // Then
      expect(service.getConfig().multiplication.maxValues.length).toEqual(
        number
      );
    });
  });
});
