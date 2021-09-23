import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Output() submitEvent = new EventEmitter<number>();
  @Output() generateNewQuestionEvent = new EventEmitter<void>();

  sign?: string;
  linesAboveSign: any[] = [];
  userAnswer?: number;

  ngOnInit(): void {
    this.setSign();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setRows();
  }

  onSubmit(input?: number) {
    if (!input) {
      return;
    }

    this.submitEvent.emit(input);
  }

  onGenerateNewQuestion() {
    this.userAnswer = undefined;
    this.isCorrect = undefined;
    this.generateNewQuestionEvent.emit();
  }

  private setSign(): void {
    const signMap: { [key in keyof typeof MathOperation]: string } = {
      Adition: '+',
      Subtraction: '-',
      Multiplication: 'x',
    };

    this.sign = signMap[this.operation];
  }

  private setRows(): void {
    this.linesAboveSign = this.numbers.slice(1);
  }
}
