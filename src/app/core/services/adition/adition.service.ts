import { Injectable } from '@angular/core';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import { Problem } from 'src/app/pages/problem/models/problem.interface';
import {
  randomAddTwoThingsQuestionData,
  randomMoreAndMoreQuestionData,
} from 'src/app/pages/problem/models/question-subject.interface';
import { ProblemService } from '../problem-service.interface';

@Injectable({
  providedIn: 'root',
})
export class AditionService implements ProblemService {
  getProblem(): Problem {
    const addTwoT = randomAddTwoThingsQuestionData();
    const moreAndMore = randomMoreAndMoreQuestionData();

    const parte1 = Math.floor(Math.random() * (1000 - 10 + 1)) + 0;
    const parte2 = Math.floor(Math.random() * (1000 - 10 + 1)) + 0;
    const parte3 = Math.floor(Math.random() * (1000 - 10 + 1)) + 0;

    const option1: Problem = {
      text: `
      ${addTwoT.actorGender === Gender.male ? 'Um' : 'Uma'} ${addTwoT.actor} ${
        addTwoT.passadoSingular
      } ${parte1} ${addTwoT.things} ${addTwoT.place} 
      e depois ${addTwoT.actorGender === Gender.male ? 'outro' : 'outra'} ${
        addTwoT.actor
      } ${addTwoT.passadoSingular} mais ${parte2} ${addTwoT.things}. ${
        addTwoT.thingsGender === Gender.male ? 'Quantos' : 'Quantas'
      } 
      ${addTwoT.things} ${
        addTwoT.actorGender === Gender.male ? 'os dois' : 'as duas'
      } ${addTwoT.actors} ${addTwoT.passadoPlural} ${addTwoT.place}?
      `,
      correctAnswer: parte1 + parte2,
    };

    const option2: Problem = {
      text: `
      ${moreAndMore.place}, havia ${parte1} ${
        moreAndMore.actors
      }. Depois de um ano 
      chegaram mais ${parte2}, e dois anos depois chegarm mais ${parte3}.
      ${moreAndMore.actorGender === Gender.male ? 'Quantos' : 'Quantas'} ${
        moreAndMore.actors
      } há no total?
      `,
      correctAnswer: parte1 + parte2 + parte3,
    };

    const options: Problem[] = [option1, option2];
    const index = Math.floor(Math.random() * options.length);

    return options[index];
  }
}
