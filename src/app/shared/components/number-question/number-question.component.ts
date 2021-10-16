import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Answer } from '@shared/models/answer.interface';
import { MathOperation } from '../../models/operation.enum';

@Component({
  selector: 'app-number-question',
  templateUrl: './number-question.component.html',
  styleUrls: ['./number-question.component.scss'],
})
export class NumberQuestionComponent implements OnInit, OnChanges {
  @Input() operation: MathOperation = MathOperation.Adition;
  @Input() numbers: number[] = [];
  @Input() isCorrect?: boolean;
  @Output() submitEvent = new EventEmitter<Answer>();
  @Output() generateNewQuestionEvent = new EventEmitter<void>();

  sign?: string;
  linesAboveSign: any[] = [];
  showRemainderColumn = false;
  userInput: { quotient?: number; remainder?: number } = {};

  ngOnInit(): void {
    this.setSign();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setRows();
  }

  onSubmit(answer: { quotient?: number; remainder?: number }) {
    if (!answer.quotient) {
      return;
    }

    this.submitEvent.emit({
      quotient: answer.quotient,
      remainder: answer.remainder,
    });
  }

  onGenerateNewQuestion() {
    this.userInput = {};
    this.isCorrect = undefined;
    this.generateNewQuestionEvent.emit();
  }

  private setSign(): void {
    const signMap: { [key in keyof typeof MathOperation]: string } = {
      Adition: '+',
      Subtraction: '-',
      Multiplication: 'x',
      Division: '÷',
    };

    this.sign = signMap[this.operation];
    this.showRemainderColumn = this.operation === MathOperation.Division;
  }

  private setRows(): void {
    this.linesAboveSign = this.numbers.slice(1);
  }
}
