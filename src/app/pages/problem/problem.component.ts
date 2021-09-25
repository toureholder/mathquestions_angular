import { Component, OnInit } from '@angular/core';
import { AditionService } from 'src/app/core/services/adition/adition.service';
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

  constructor(
    private subractionService: SubtractionService,
    private aditionService: AditionService
  ) {}

  ngOnInit(): void {
    this.generateNewQestion();
  }

  checkAnswer(answer?: number): void {
    this.isCorrect = answer === this.problem?.correctAnswer;
  }

  generateNewQestion(): void {
    const pool = [
      this.subractionService.getProblem(),
      this.aditionService.getProblem(),
    ];

    const index = Math.floor(Math.random() * pool.length);

    this.problem = pool[index];

    this.isCorrect = undefined;
    this.userAnswer = undefined;
  }
}
