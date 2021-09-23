import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { MultiplicationComponent } from './multiplication.component';

describe('MultiplicationComponent', () => {
  let component: MultiplicationComponent;
  let fixture: ComponentFixture<MultiplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiplicationComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
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
    it('should genereate a question with two numbers', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.numbers.length).toEqual(2);
    });

    it('should reset isCorrect', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.isCorrect).toBeUndefined();
    });
  });
});
