import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AditionService } from 'src/app/core/services/adition/adition.service';
import { DivisionService } from 'src/app/core/services/division/division.service';
import { MultiplicationService } from 'src/app/core/services/multiplication/multiplication.service';
import { SubtractionService } from 'src/app/core/services/subtraction/subtraction.service';
import { Problem } from './models/problem.interface';

import { ProblemComponent } from './problem.component';

describe('ProblemComponent', () => {
  let component: ProblemComponent;
  let fixture: ComponentFixture<ProblemComponent>;
  let mockSubtractionService: jasmine.SpyObj<SubtractionService>;
  let mockAditionService: jasmine.SpyObj<AditionService>;
  let mockMultiplicationService: jasmine.SpyObj<MultiplicationService>;
  let mockDivisionService: jasmine.SpyObj<DivisionService>;

  beforeEach(async () => {
    mockSubtractionService = jasmine.createSpyObj('mockSubtractionService', [
      'getProblem',
    ]);

    mockAditionService = jasmine.createSpyObj('mockAditionService', [
      'getProblem',
    ]);

    mockMultiplicationService = jasmine.createSpyObj(
      'mockMultiplicationService',
      ['getProblem']
    );

    mockDivisionService = jasmine.createSpyObj('mockDivisionService', [
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
        {
          provide: MultiplicationService,
          useValue: mockMultiplicationService,
        },
        {
          provide: DivisionService,
          useValue: mockDivisionService,
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
        correctAnswer: { quotient: 10 },
      };

      const aditionProblem: Problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: { quotient: 20 },
      };

      const multiplicationProblem: Problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: { quotient: 30 },
      };

      const divisionProblem: Problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: { quotient: 34 },
      };

      mockSubtractionService.getProblem.and.returnValue(subtractionProblem);
      mockAditionService.getProblem.and.returnValue(aditionProblem);
      mockMultiplicationService.getProblem.and.returnValue(
        multiplicationProblem
      );
      mockDivisionService.getProblem.and.returnValue(divisionProblem);

      // When
      component.generateNewQestion();

      // Then
      expect(mockSubtractionService.getProblem).toHaveBeenCalled();
      expect(mockAditionService.getProblem).toHaveBeenCalled();
      expect(mockMultiplicationService.getProblem).toHaveBeenCalled();
      expect(mockDivisionService.getProblem).toHaveBeenCalled();
    });
  });

  describe('#checkAnswer', () => {
    it('should set isCorrect to true if answer only has quotient and is correct', () => {
      // Given
      component.problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: { quotient: 80 },
      };

      // When
      component.checkAnswer({ quotient: 80 });

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to true if answer has quotient and remainder and is correct', () => {
      // Given
      component.problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: { quotient: 80, remainder: 3 },
      };

      // When
      component.checkAnswer({ quotient: 80, remainder: 3 });

      // Then
      expect(component.isCorrect).toBeTrue();
    });

    it('should set isCorrect to false if answer wrong', () => {
      // Given
      component.problem = {
        text: 'Lorem ipsum dolor',
        correctAnswer: { quotient: 80 },
      };

      // When
      component.checkAnswer({ quotient: 45 });

      // Then
      expect(component.isCorrect).toBeFalse();
    });

    it('should not update isCorrect if problem is undefined', () => {
      // When
      component.checkAnswer({ quotient: 45 });

      // Then
      expect(component.isCorrect).toBeUndefined();
    });
  });
});
