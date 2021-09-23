import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubtractionComponent } from './subtraction.component';

describe('SubtractionComponent', () => {
  let component: SubtractionComponent;
  let fixture: ComponentFixture<SubtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtractionComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
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
      component.checkAnswer(1);

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to false when answer is wrong', () => {
      // Given
      component.numbers = [100, 99];

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

    it('should correctly order numbers when the first is larger than the second', () => {
      // When
      component.generateNewQestion([100, 99]);

      // Then
      expect(component.numbers[0]).toBeGreaterThanOrEqual(component.numbers[1]);
    });

    it('should correctly order numbers when the second is larger than the first', () => {
      // When
      component.generateNewQestion([99, 100]);

      // Then
      expect(component.numbers[0]).toBeGreaterThanOrEqual(component.numbers[1]);
    });

    it('should not order equal numbers', () => {
      // When
      component.generateNewQestion([99, 99]);

      // Then
      expect(component.numbers[0]).toEqual(component.numbers[1]);
    });

    it('should reset isCorrect', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.isCorrect).toBeUndefined();
    });
  });
});
