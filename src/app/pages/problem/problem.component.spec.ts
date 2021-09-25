import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AditionService } from 'src/app/core/services/adition/adition.service';
import { SubtractionService } from 'src/app/core/services/subtraction/subtraction.service';
import { Problem } from './models/problem.interface';

import { ProblemComponent } from './problem.component';

describe('ProblemComponent', () => {
  let component: ProblemComponent;
  let fixture: ComponentFixture<ProblemComponent>;
  let mockSubtractionService: jasmine.SpyObj<SubtractionService>;
  let mockAditionService: jasmine.SpyObj<AditionService>;

  beforeEach(async () => {
    mockSubtractionService = jasmine.createSpyObj('mockSubtractionService', [
      'getProblem',
    ]);

    mockAditionService = jasmine.createSpyObj('mockAditionService', [
      'getProblem',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProblemComponent],
      providers: [
        {
          provide: SubtractionService,
          useValue: mockSubtractionService,
        },
        {
          provide: AditionService,
          useValue: mockAditionService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
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
    it('should invoke services to get problems', () => {
      // Given
      const subtractionProblem: Problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: 10,
      };

      const aditionProblem: Problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: 20,
      };

      mockSubtractionService.getProblem.and.returnValue(subtractionProblem);
      mockAditionService.getProblem.and.returnValue(aditionProblem);

      // When
      component.generateNewQestion();

      // Then
      expect(mockSubtractionService.getProblem).toHaveBeenCalled();
      expect(mockAditionService.getProblem).toHaveBeenCalled();
    });
  });

  describe('#checkAnswer', () => {
    it('should set isCorrect to true if answer correct', () => {
      // Given
      component.problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: 80,
      };

      // When
      component.checkAnswer(80);

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to false if answer wrong', () => {
      // Given
      component.problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: 80,
      };

      // When
      component.checkAnswer(45);

      // Then
      expect(component.isCorrect).toBeFalse();
    });

    it('should set isCorrect to false if problem is undefined', () => {
      // When
      component.checkAnswer(45);

      // Then
      expect(component.isCorrect).toBeFalse();
    });
  });
});
