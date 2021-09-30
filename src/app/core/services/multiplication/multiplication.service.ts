import { Injectable } from '@angular/core';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import { Problem } from 'src/app/pages/problem/models/problem.interface';
import {
  MultiplicationQuestionData,
  randomMultiplicationQuestionData,
} from 'src/app/pages/problem/models/question-subject.interface';
import { ProblemService } from '../problem-service.interface';

@Injectable({
  providedIn: 'root',
})
export class MultiplicationService implements ProblemService {
  getProblem(forcedOptions?: MultiplicationProblemOptions): Problem {
    const firstNumber = Math.floor(Math.random() * 98) + 2;
    const secondNumber = Math.floor(Math.random() * 5) + 2;

    const data = forcedOptions?.data || randomMultiplicationQuestionData();

    return {
      text: `
      ${data.place}, haviam ${firstNumber} ${data.actors}. Se cada ${data.actor}
      ${data.futureSubjunctive} ${secondNumber} ${data.thing}, ${
        data.thingGender === Gender.male ? 'quantos' : 'quantas'
      } ${data.thing} 
      ${data.futurePlural} no total?
      `,
      correctAnswer: firstNumber * secondNumber,
    };
  }
}

export interface MultiplicationProblemOptions {
  data?: MultiplicationQuestionData;
}
