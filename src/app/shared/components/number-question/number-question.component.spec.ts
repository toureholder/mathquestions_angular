import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Answer } from '@shared/models/answer.interface';
import { MathOperation } from '../../models/operation.enum';

import { NumberQuestionComponent } from './number-question.component';

describe('NumberQuestionComponent', () => {
  let component: NumberQuestionComponent;
  let fixture: ComponentFixture<NumberQuestionComponent>;
  let template: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberQuestionComponent],
      imports: [RouterTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberQuestionComponent);
    template = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#sign', () => {
    it('should show correct operation sign when operation is adition', () => {
      // Given
      component.operation = MathOperation.Adition;

      const operationSignElement = template.querySelector(
        '[data-test="operation-sign"]'
      );

      // When
      component.ngOnInit();
      fixture.detectChanges();

      // Then
      expect(operationSignElement).toBeTruthy();
      expect(operationSignElement?.innerHTML.trim()).toEqual('+');
    });

    it('should show correct operation sign when operation is subtraction', () => {
      // Given
      component.operation = MathOperation.Subtraction;

      const operationSignElement = template.querySelector(
        '[data-test="operation-sign"]'
      );

      // When
      component.ngOnInit();
      fixture.detectChanges();

      // Then
      expect(operationSignElement).toBeTruthy();
      expect(operationSignElement?.innerHTML.trim()).toEqual('-');
    });

    it('should show correct operation sign when operation is subtraction', () => {
      // Given
      component.operation = MathOperation.Multiplication;

      const operationSignElement = template.querySelector(
        '[data-test="operation-sign"]'
      );

      // When
      component.ngOnInit();
      fixture.detectChanges();

      // Then
      expect(operationSignElement).toBeTruthy();
      expect(operationSignElement?.innerHTML.trim()).toEqual('x');
    });
  });

  describe('#numbers', () => {
    it('should display a number cell for each number', () => {
      // Given
      component.numbers = [3214, 1234, 343];

      // When
      component.ngOnInit();
      fixture.detectChanges();

      // Then
      expect(
        template.querySelectorAll('[data-test="number-cell"]').length
      ).toEqual(component.numbers.length);
    });

    it('should display one operator column space less than the quantity of numbers', () => {
      // Given
      component.numbers = [3214, 1234, 343];

      // When
      component.ngOnChanges({});
      fixture.detectChanges();

      // Then
      expect(
        template.querySelectorAll('[data-test="operation-column-space"]').length
      ).toEqual(component.numbers.length - 1);
    });
  });

  describe('#onSubmit', () => {
    it(`should emit an event with Answer object`, () => {
      // Given

      const answer: Answer = {
        quotient: 12,
        remainder: 34,
      };

      spyOn(component.submitEvent, 'emit');

      // When
      component.onSubmit(answer);

      // Then
      expect(component.submitEvent.emit).toHaveBeenCalledWith(answer);
    });

    it(`should not emit an event when answer quotient is undefined`, () => {
      // Given
      const answer = {
        quotient: undefined,
      };

      spyOn(component.submitEvent, 'emit');

      // When
      component.onSubmit(answer);

      // Then
      expect(component.submitEvent.emit).not.toHaveBeenCalled();
    });
  });

  describe('#onGenerateNewQuestion', () => {
    it(`should emit an generateNewQuestionEvent event`, () => {
      // Given
      spyOn(component.generateNewQuestionEvent, 'emit');

      // When
      component.onGenerateNewQuestion();

      // Then
      expect(component.generateNewQuestionEvent.emit).toHaveBeenCalled();
    });

    it(`should reset answer and isCorrect`, () => {
      // Given
      component.userInput = { quotient: 23 };
      component.isCorrect = true;

      // When
      component.onGenerateNewQuestion();

      // Then
      expect(component.userInput).toEqual({});
      expect(component.isCorrect).toBeUndefined();
    });
  });

  describe('ui integration tests', () => {
    let submitButton: HTMLButtonElement | null;
    let newQuestionButton: HTMLButtonElement | null;
    let input: HTMLInputElement | null;

    beforeEach(() => {
      submitButton = template.querySelector('[type="submit"]');
      newQuestionButton = template.querySelector(
        'button[data-test="new-question"]'
      );
      input = template.querySelector('input[data-test="user-answer"]');
    });

    describe('submit button', () => {
      it('should exist', () => {
        expect(submitButton).toBeTruthy();
      });

      it('should be be disabled when user answer quotient is undefined', () => {
        // Given
        component.userInput = {};

        // When
        fixture.detectChanges();

        // Then
        expect(submitButton?.disabled).toBeTrue();
      });

      it('should be be enabled when user answer is defined', () => {
        // Given
        component.userInput = { quotient: 23 };

        // When
        fixture.detectChanges();

        // Then
        expect(submitButton?.disabled).toBeFalse();
      });

      it('should call onSubmit when clicked', () => {
        // Given
        component.userInput = { quotient: 23 };
        spyOn(component, 'onSubmit');

        // When
        fixture.detectChanges();
        submitButton?.click();

        // Then
        expect(component.onSubmit).toHaveBeenCalledWith(
          jasmine.objectContaining<Answer>({})
        );
      });
    });

    describe('new question button', () => {
      it('should exist', () => {
        expect(newQuestionButton).toBeTruthy();
      });

      it('should call onSubmit when clicked', () => {
        // Given
        spyOn(component, 'onGenerateNewQuestion');

        // When
        fixture.detectChanges();
        newQuestionButton?.click();

        // Then
        expect(component.onGenerateNewQuestion).toHaveBeenCalled();
      });
    });

    describe('remainder column', () => {
      it('should display remainder column when operation is division', () => {
        // Given
        component.operation = MathOperation.Division;

        // When
        fixture.detectChanges();

        // Then expect
        expect(
          template.querySelectorAll('[data-test="remainder-col"]').length
        ).toBe(2);
      });

      it('should NOT display remainder column when operation is NOT division', () => {
        // Given
        component.operation = MathOperation.Adition;

        // When
        fixture.detectChanges();

        // Then expect
        expect(
          template.querySelectorAll('[data-test="remainder-col"]').length
        ).toBe(0);
      });
    });
  });
});
