import { not } from '@angular/compiler/src/output/output_ast';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  fakeQuestionConfig,
  QuestionConfig,
} from '@shared/models/question-config.interface';
import { AditionService } from 'src/app/core/services/adition/adition.service';
import { DivisionService } from 'src/app/core/services/division/division.service';
import { MultiplicationService } from 'src/app/core/services/multiplication/multiplication.service';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
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
  let mockQuestionConfigService: jasmine.SpyObj<QuestionConfigService>;

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

    mockQuestionConfigService = jasmine.createSpyObj(
      'mockQuestionConfigService',
      ['getConfig']
    );

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
        {
          provide: QuestionConfigService,
          useValue: mockQuestionConfigService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
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
    mockMultiplicationService.getProblem.and.returnValue(multiplicationProblem);
    mockDivisionService.getProblem.and.returnValue(divisionProblem);
    mockQuestionConfigService.getConfig.and.returnValue(fakeQuestionConfig);

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
    it('should consult config service', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(mockQuestionConfigService.getConfig).toHaveBeenCalled();
    });

    it('should get problems from respective services', () => {
      // When
      component.generateNewQestion();

      // Then
      expect(mockSubtractionService.getProblem).toHaveBeenCalled();
      expect(mockAditionService.getProblem).toHaveBeenCalled();
      expect(mockMultiplicationService.getProblem).toHaveBeenCalled();
      expect(mockDivisionService.getProblem).toHaveBeenCalled();
    });

    it('should not get adition problem if Adition is not true', () => {
      // Given
      const newConfig = JSON.parse(
        JSON.stringify(fakeQuestionConfig)
      ) as QuestionConfig;

      newConfig.problems.operations = {
        Adition: false,
        Subtraction: true,
        Multiplication: true,
        Division: true,
      };

      mockQuestionConfigService.getConfig.and.returnValue(newConfig);

      // When
      component.generateNewQestion();

      // Then
      expect(mockAditionService.getProblem).not.toHaveBeenCalled();
      expect(mockSubtractionService.getProblem).toHaveBeenCalled();
      expect(mockMultiplicationService.getProblem).toHaveBeenCalled();
      expect(mockDivisionService.getProblem).toHaveBeenCalled();
    });

    it('should not get subtraction problem if Subtraction is not true', () => {
      // Given
      const newConfig = JSON.parse(
        JSON.stringify(fakeQuestionConfig)
      ) as QuestionConfig;

      newConfig.problems.operations = {
        Adition: true,
        Subtraction: false,
        Multiplication: true,
        Division: true,
      };

      mockQuestionConfigService.getConfig.and.returnValue(newConfig);

      // When
      component.generateNewQestion();

      // Then
      expect(mockAditionService.getProblem).toHaveBeenCalled();
      expect(mockSubtractionService.getProblem).not.toHaveBeenCalled();
      expect(mockMultiplicationService.getProblem).toHaveBeenCalled();
      expect(mockDivisionService.getProblem).toHaveBeenCalled();
    });

    it('should not get multiplication problem if Multiplication is not true', () => {
      // Given
      const newConfig = JSON.parse(
        JSON.stringify(fakeQuestionConfig)
      ) as QuestionConfig;

      newConfig.problems.operations = {
        Adition: true,
        Subtraction: true,
        Multiplication: false,
        Division: true,
      };

      mockQuestionConfigService.getConfig.and.returnValue(newConfig);

      // When
      component.generateNewQestion();

      // Then
      expect(mockAditionService.getProblem).toHaveBeenCalled();
      expect(mockSubtractionService.getProblem).toHaveBeenCalled();
      expect(mockMultiplicationService.getProblem).not.toHaveBeenCalled();
      expect(mockDivisionService.getProblem).toHaveBeenCalled();
    });

    it('should not get division problem if Division is not true', () => {
      // Given
      const newConfig = JSON.parse(
        JSON.stringify(fakeQuestionConfig)
      ) as QuestionConfig;

      newConfig.problems.operations = {
        Adition: true,
        Subtraction: true,
        Multiplication: true,
        Division: false,
      };

      mockQuestionConfigService.getConfig.and.returnValue(newConfig);

      // When
      component.generateNewQestion();

      // Then
      expect(mockAditionService.getProblem).toHaveBeenCalled();
      expect(mockSubtractionService.getProblem).toHaveBeenCalled();
      expect(mockMultiplicationService.getProblem).toHaveBeenCalled();
      expect(mockDivisionService.getProblem).not.toHaveBeenCalled();
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
