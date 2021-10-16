import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  fakeQuestionConfig,
  QuestionConfig,
} from '@shared/models/question-config.interface';
import { SharedModule } from '@shared/shared.module';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';

import { DivisionComponent } from './division.component';

describe('DivisionComponent', () => {
  let component: DivisionComponent;
  let fixture: ComponentFixture<DivisionComponent>;
  let mockQuestionConfigService: jasmine.SpyObj<QuestionConfigService>;
  const divisionConfig = fakeQuestionConfig.division;

  beforeEach(async () => {
    mockQuestionConfigService = jasmine.createSpyObj(
      'mockQuestionConfigService',
      ['getConfig']
    );

    await TestBed.configureTestingModule({
      declarations: [DivisionComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: QuestionConfigService, useValue: mockQuestionConfigService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockQuestionConfigService.getConfig.and.returnValue(fakeQuestionConfig);

    fixture = TestBed.createComponent(DivisionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnIt', () => {
    it('should call generateNewQestion', () => {
      // Given
      spyOn(component, 'generateNewQestion');

      // When
      component.ngOnInit();

      // Then
      expect(component.generateNewQestion).toHaveBeenCalled();
    });
  });

  describe('#generateNewQestion', () => {
    it('should reset isCorrect', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.isCorrect).toBeUndefined();
    });
  });

  describe('#checkAnswer', () => {
    it('should set isCorrect to true when quotient and remiander are defined and answser is correct', () => {
      // Given
      component.numbers = [30, 2];

      // When
      expect(component.checkAnswer({ quotient: 15, remainder: 0 }));

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to true when quotient and remiander are not zero and answser is correct', () => {
      // Given
      component.numbers = [31, 2];

      // When
      expect(component.checkAnswer({ quotient: 15, remainder: 1 }));

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to true when only quotient is defined and answser is correct', () => {
      // Given
      component.numbers = [30, 2];

      // When
      expect(component.checkAnswer({ quotient: 15 }));

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to false when answser is not correct', () => {
      // Given
      component.numbers = [60, 2];

      // When
      expect(component.checkAnswer({ quotient: 15 }));

      // Then
      expect(component.isCorrect).toBeFalse();
    });

    it('should set isCorrect to false when quotient is correct but remainder is wrong', () => {
      // Given
      component.numbers = [30, 2];

      // When
      expect(component.checkAnswer({ quotient: 15, remainder: 1 }));

      // Then
      expect(component.isCorrect).toBeFalse();
    });
  });
});
