import { Component, OnInit } from '@angular/core';
import { Answer } from '@shared/models/answer.interface';
import { AditionService } from 'src/app/core/services/adition/adition.service';
import { DivisionService } from 'src/app/core/services/division/division.service';
import { MultiplicationService } from 'src/app/core/services/multiplication/multiplication.service';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { SubtractionService } from 'src/app/core/services/subtraction/subtraction.service';
import { OperationComponent } from 'src/app/shared/models/operation-component.interface';
import { MathOperation } from 'src/app/shared/models/operation.enum';
import { Problem } from './models/problem.interface';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent implements OnInit, OperationComponent {
  problem?: Problem;
  operation = MathOperation.Subtraction;
  numbers: number[] = [];
  isCorrect?: boolean | undefined;
  userInput: { quotient?: number; remainder?: number } = {};

  constructor(
    private subractionService: SubtractionService,
    private aditionService: AditionService,
    private multiplicationService: MultiplicationService,
    private divisionService: DivisionService,
    private questionConfigService: QuestionConfigService
  ) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer: { quotient?: number; remainder?: number }): void {
    if (!this.problem) {
      return;
    }

    const correctAnswer = this.problem.correctAnswer;

    this.isCorrect =
      answer.quotient === correctAnswer.quotient &&
      answer.remainder === correctAnswer.remainder;
  }

  generateNewQestion(): void {
    const config = this.questionConfigService.getConfig();

    const pool: Problem[] = [];

    const operationsConfig = config.problems.operations;

    if (operationsConfig.Adition) {
      pool.push(this.aditionService.getProblem());
    }

    if (operationsConfig.Subtraction) {
      pool.push(this.subractionService.getProblem());
    }

    if (operationsConfig.Multiplication) {
      pool.push(this.multiplicationService.getProblem());
    }

    if (operationsConfig.Division) {
      pool.push(this.divisionService.getProblem());
    }

    const index = Math.floor(Math.random() * pool.length);

    this.problem = pool[index];
    this.isCorrect = undefined;
    this.userInput = {};
  }
}
