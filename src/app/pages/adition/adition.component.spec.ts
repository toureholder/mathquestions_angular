import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { fakeQuestionConfig } from 'src/app/shared/models/question-config.interface';
import { SharedModule } from 'src/app/shared/shared.module';

import { AditionComponent } from './adition.component';

describe('AditionComponent', () => {
  let component: AditionComponent;
  let fixture: ComponentFixture<AditionComponent>;
  let mockQuestionConfigService: jasmine.SpyObj<QuestionConfigService>;
  const aditionConfig = fakeQuestionConfig.adition;

  beforeEach(async () => {
    mockQuestionConfigService = jasmine.createSpyObj(
      'mockQuestionConfigService',
      ['getConfig']
    );

    await TestBed.configureTestingModule({
      declarations: [AditionComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: QuestionConfigService, useValue: mockQuestionConfigService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockQuestionConfigService.getConfig.and.returnValue(fakeQuestionConfig);

    fixture = TestBed.createComponent(AditionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should generate a new question', () => {
      // When
      component.ngOnInit();

      // Then
      expect(component.numbers.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('#generateNewQestion', () => {
    it('should generate numbers between min and max', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(component.numbers.length).toBeLessThanOrEqual(
        aditionConfig.maxNumberOfNumbers
      );

      for (const number of component.numbers) {
        expect(number).toBeLessThanOrEqual(aditionConfig.maxValue);
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
