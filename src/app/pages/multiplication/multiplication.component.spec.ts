import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import {
  fakeQuestionConfig,
  QuestionConfig,
} from 'src/app/shared/models/question-config.interface';
import { SharedModule } from 'src/app/shared/shared.module';

import { MultiplicationComponent } from './multiplication.component';

describe('MultiplicationComponent', () => {
  let component: MultiplicationComponent;
  let fixture: ComponentFixture<MultiplicationComponent>;
  let mockQuestionConfigService: jasmine.SpyObj<QuestionConfigService>;
  const multiplicationConfig = fakeQuestionConfig.multiplication;

  beforeEach(async () => {
    mockQuestionConfigService = jasmine.createSpyObj(
      'mockQuestionConfigService',
      ['getConfig']
    );

    await TestBed.configureTestingModule({
      declarations: [MultiplicationComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: QuestionConfigService, useValue: mockQuestionConfigService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockQuestionConfigService.getConfig.and.returnValue(fakeQuestionConfig);

    fixture = TestBed.createComponent(MultiplicationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnit', () => {
    it('should call generateNewQestion', () => {
      // Given
      spyOn(component, 'generateNewQestion');

      // When
      component.ngOnInit();

      // Then
      expect(component.generateNewQestion).toHaveBeenCalled();
    });
  });

  describe('#checkAnswer', () => {
    it('should set isCorrect to true when answer is correct', () => {
      // Given
      component.numbers = [10, 3];

      // When
      component.checkAnswer(30);

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to false when answer is wrong', () => {
      // Given
      component.numbers = [10, 3];

      // When
      component.checkAnswer(234);

      // Then
      expect(component.isCorrect).toBeFalse();
    });
  });

  describe('#generateNewQestion', () => {
    it('should genereate a question numbers in expected range', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.numbers.length).toBeLessThanOrEqual(
        multiplicationConfig.maxNumberOfNumbers
      );
    });

    it('should reset isCorrect', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.isCorrect).toBeUndefined();
    });

    describe('when maxValues is not in sync with quantity', () => {
      beforeEach(() => {
        const newConfig = JSON.parse(
          JSON.stringify(fakeQuestionConfig)
        ) as QuestionConfig;

        newConfig.multiplication.maxNumberOfNumbers = 5;
        newConfig.multiplication.maxValues = [10];

        mockQuestionConfigService.getConfig.and.returnValue(newConfig);
      });

      it('should genereate a question numbers in expected range', () => {
        // When
        component.generateNewQestion();

        // Then
        expect(component.numbers.length).toBeLessThanOrEqual(
          multiplicationConfig.maxNumberOfNumbers
        );
      });
    });

    describe('when maxValues is empty', () => {
      beforeEach(() => {
        const newConfig = JSON.parse(
          JSON.stringify(fakeQuestionConfig)
        ) as QuestionConfig;

        newConfig.multiplication.maxNumberOfNumbers = 5;
        newConfig.multiplication.maxValues = [];

        mockQuestionConfigService.getConfig.and.returnValue(newConfig);
      });

      it('should genereate a question numbers in expected range', () => {
        // When
        component.generateNewQestion();

        // Then
        expect(component.numbers.length).toBeLessThanOrEqual(
          multiplicationConfig.maxNumberOfNumbers
        );
      });
    });
  });
});
