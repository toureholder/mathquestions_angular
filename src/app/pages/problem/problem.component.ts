import { Component, OnInit } from '@angular/core';
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
  userAnswer?: number;

  constructor(private subractionService: SubtractionService) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer?: number): void {
    this.isCorrect = answer === this.problem?.correctAnswer;
  }

  generateNewQestion(): void {
    this.problem = this.subractionService.getProblem();
    this.numbers = this.problem.numbers;
    this.isCorrect = undefined;
    this.userAnswer = undefined;
  }
}
