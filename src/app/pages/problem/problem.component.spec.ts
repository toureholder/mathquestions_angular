import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubtractionService } from 'src/app/core/services/subtraction/subtraction.service';
import { Problem } from './models/problem.interface';

import { ProblemComponent } from './problem.component';

describe('ProblemComponent', () => {
  let component: ProblemComponent;
  let fixture: ComponentFixture<ProblemComponent>;
  let mockSubtractionService: jasmine.SpyObj<SubtractionService>;

  beforeEach(async () => {
    mockSubtractionService = jasmine.createSpyObj('mockSubtractionService', [
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
    it('should invoke subtraction service to get problem', () => {
      // Given
      const problem: Problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: 50,
        numbers: [100, 50],
      };

      mockSubtractionService.getProblem.and.returnValue(problem);

      // When
      component.generateNewQestion();

      // Then
      expect(component.problem).toEqual(problem);
    });
  });

  describe('#checkAnswer', () => {
    it('should set isCorrect to true if answer correct', () => {
      // Given
      component.problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: 80,
        numbers: [100, 20],
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
        numbers: [100, 20],
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
