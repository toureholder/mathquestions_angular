import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { AditionComponent } from './adition.component';

describe('AditionComponent', () => {
  let component: AditionComponent;
  let fixture: ComponentFixture<AditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AditionComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should generate a new question', () => {
      // When
      component.ngOnInit();

      // Then
      expect(component.numbers.length).toBeGreaterThanOrEqual(
        component.minNumberOfNumbers
      );
    });
  });

  describe('#generateNewQestion', () => {
    it('should generate two or three numbers between min and max', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.numbers.length).toBeGreaterThanOrEqual(
        component.minNumberOfNumbers
      );

      expect(component.numbers.length).toBeLessThanOrEqual(
        component.maxNumberOfNumbers
      );

      for (const number of component.numbers) {
        expect(number).toBeGreaterThanOrEqual(component.minNumberValue);
        expect(number).toBeLessThan(component.maxNumberValue);
      }
    });
  });

  it('should reset isCorrect', () => {
    // When
    component.generateNewQestion();

    // Then
    expect(component.isCorrect).toBeUndefined();
  });

  describe('#checkAnswer', () => {
    it('should set isCorrect to be true when answer is correct', () => {
      // Given
      component.numbers = [100, 50];

      // When
      component.checkAnswer(150);

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to be false when answer is wrong', () => {
      // Given
      component.numbers = [100, 50];

      // When
      component.checkAnswer(232);

      // Then
      expect(component.isCorrect).toBeFalse();
    });
  });
});
