import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
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
    it(`should emit an event with input`, () => {
      // Given
      const input = 1234;
      spyOn(component.submitEvent, 'emit');

      // When
      component.onSubmit(input);

      // Then
      expect(component.submitEvent.emit).toHaveBeenCalledWith(input);
    });

    it(`should not emit an event when input is undefined`, () => {
      // Given
      const input = undefined;
      spyOn(component.submitEvent, 'emit');

      // When
      component.onSubmit(input);

      // Then
      expect(component.submitEvent.emit).not.toHaveBeenCalled();
    });
  });

  describe('#onGenerateNewQuestion', () => {
    it(`should emit an event with input`, () => {
      // Given
      spyOn(component.generateNewQuestionEvent, 'emit');

      // When
      component.onGenerateNewQuestion();

      // Then
      expect(component.generateNewQuestionEvent.emit).toHaveBeenCalled();
    });

    it(`should reset answer and isCorrect`, () => {
      // Given
      component.userAnswer = 123;
      component.isCorrect = true;

      // When
      component.onGenerateNewQuestion();

      // Then
      expect(component.userAnswer).toBeUndefined();
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

      it('should be be disabled when user answer is undefined', () => {
        // Given
        component.userAnswer = undefined;

        // When
        fixture.detectChanges();

        // Then
        expect(submitButton?.disabled).toBeTrue();
      });

      it('should be be enabled when user answer is defined', () => {
        // Given
        component.userAnswer = 1234;

        // When
        fixture.detectChanges();

        // Then
        expect(submitButton?.disabled).toBeFalse();
      });

      it('should call onSubmit when clicked', () => {
        // Given
        component.userAnswer = 1234;
        spyOn(component, 'onSubmit');

        // When
        fixture.detectChanges();
        submitButton?.click();

        // Then
        expect(component.onSubmit).toHaveBeenCalledWith(component.userAnswer);
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
  });
});
