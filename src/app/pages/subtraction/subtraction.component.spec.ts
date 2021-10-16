import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { fakeQuestionConfig } from 'src/app/shared/models/question-config.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubtractionComponent } from './subtraction.component';

describe('SubtractionComponent', () => {
  let component: SubtractionComponent;
  let fixture: ComponentFixture<SubtractionComponent>;
  let mockQuestionConfigService: jasmine.SpyObj<QuestionConfigService>;
  const subtractionConfig = fakeQuestionConfig.subtraction;

  beforeEach(async () => {
    mockQuestionConfigService = jasmine.createSpyObj(
      'mockQuestionConfigService',
      ['getConfig']
    );

    await TestBed.configureTestingModule({
      declarations: [SubtractionComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: QuestionConfigService, useValue: mockQuestionConfigService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockQuestionConfigService.getConfig.and.returnValue(fakeQuestionConfig);

    fixture = TestBed.createComponent(SubtractionComponent);
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
      component.numbers = [100, 99];

      // When
      component.checkAnswer({ quotient: 1 });

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to false when answer is wrong', () => {
      // Given
      component.numbers = [100, 99];

      // When
      component.checkAnswer({ quotient: 34 });

      // Then
      expect(component.isCorrect).toBeFalse();
    });
  });

  describe('#generateNewQestion', () => {
    it('should genereate a question with two numbers', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.numbers.length).toBeLessThanOrEqual(
        subtractionConfig.maxNumberOfNumbers
      );
    });

    it('should correctly order numbers when the first is larger than the second', () => {
      // When
      component.generateNewQestion({ numbers: [100, 50] });

      // Then
      expect(component.numbers[0]).toBeGreaterThanOrEqual(component.numbers[1]);
    });

    it('should correctly order numbers when the second is larger than the first', () => {
      // When
      component.generateNewQestion({ numbers: [50, 100] });

      // Then
      expect(component.numbers[0]).toBeGreaterThanOrEqual(component.numbers[1]);
    });

    it(`should correctly 'order' numbers when they are equal`, () => {
      // When
      component.generateNewQestion({ numbers: [100, 100] });

      // Then
      expect(component.numbers[0]).toBeGreaterThanOrEqual(component.numbers[1]);
    });

    it('should reset isCorrect', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.isCorrect).toBeUndefined();
    });
  });
});
