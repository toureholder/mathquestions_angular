import { Injectable } from '@angular/core';
import { Answer } from '@shared/models/answer.interface';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import { Problem } from 'src/app/pages/problem/models/problem.interface';
import {
  QuestionSubject,
  randomSubject,
} from 'src/app/pages/problem/models/question-subject.interface';
import { ProblemService } from '../problem-service.interface';
import { QuestionConfigService } from '../question-config/question-config.service';

@Injectable({
  providedIn: 'root',
})
export class DivisionService implements ProblemService {
  constructor(private configService: QuestionConfigService) {}

  getProblem(forcedOptions?: DivisionProblemOptions): Problem {
    let problem: Problem | undefined;

    while (!problem || problem.divisor === 1) {
      problem = this.generateProblem(forcedOptions);
    }

    return problem;
  }

  private generateProblem(forcedOptions?: DivisionProblemOptions): Problem {
    const subject = forcedOptions?.subject || randomSubject();

    const maxValues = this.configService.getConfig().division.maxValues;

    const maxDividend = maxValues[0] || 100;
    const maxDivisor = maxValues[1] || 10;

    let dividend = Math.floor(Math.random() * maxDividend) + 1;
    let divisor = forcedOptions?.divisor || maxDivisor;

    while (dividend % divisor != 0) {
      divisor--;
    }

    return {
      text: this.getQProblemText(subject, dividend, divisor),
      correctAnswer: {
        quotient: dividend / divisor,
      },
      divisor,
    };
  }

  private getQProblemText(
    subject: QuestionSubject,
    dividend: number,
    divisor: number
  ): string {
    const options: string[] = [
      `
      ${subject.name} comprou um saco com ${dividend} balas e decidiu separar igualmente a 
      quantidade de balas para cada um dos ${divisor} integrantes da sua família. Quantas balas
      cada um vai receber?
      `,
      `
      ${
        subject.name
      } preparou ${dividend} salgadinhos para sua festa de aniversário e convidou ${divisor} 
      pessoas. Se ${
        subject.gender == Gender.male ? 'ele' : 'ela'
      } separar os salgadinhos igualmente para
      os convidados, quantos salgadinhos cada convidado poderá comer?
      `,
      `
      ${
        subject.name
      } ganhou de aniversário uma caixa com ${dividend} bombons. Ela quer colocar ${divisor} 
      bombons em saquinhos para compatilhar com alguns colegas. De quantos saquinhos ${
        subject.gender == Gender.male ? 'ele' : 'ela'
      } irá 
      precisar?
      `,
      `
      ${subject.name} quer jogar um jogo de cartas com mais ${
        divisor - 1
      } amigos ${
        subject.gender == Gender.male ? 'dele' : 'dela'
      }. Neste jogo há 
      ${dividend} cartas no baralho. Se as cartas devem ser distibuídas igualmente entre os 
      jogadores, quantas cartas cada um deve receber?
      `,
      `
      ${subject.name} está recebendo a visita de ${
        divisor === 2 ? 'seu' : 'seus'
      } ${divisor === 2 ? '' : divisor - 1} ${
        divisor === 2 ? 'primo' : 'primos'
      } em casa. Eles vão lanchar e ${
        subject.name
      } quer dividir ${dividend} rosquinhas 
      de coco em porções iguais entre ${
        subject.gender == Gender.male ? 'ele' : 'ela'
      } e ${
        divisor === 2 ? 'seu primo' : 'seus primos'
      }. Quantas rosquinhas cada um vai comer?
      `,
      `
      Os alunos do terceiro ano arrecadaram ${dividend} garrafas PET para fazer uma horta vertical. 
      Essas garrafas serão dividas igualmente para ${divisor} grupos. Quantas garrafas cada grupo 
      receberá?
      `,
      `
      O abrigo Jardim das Flores abriga ${divisor} crianças e recebeu uma doação de ${dividend} peças 
      de roupa. Todas as crianças vão receber a mesma quantidade de peças. Quantas peças de roupa cada 
      criança vai receber?
      `,
      `
      ${subject.name} está planejando convidar ${dividend} pessoas para sua festa de aniversário. Sabendo 
      que em cada mesa cabem ${divisor} pessoas, quantas mesas serão necessárias para acomodar todos os 
      convidados?
      `,
    ];

    const index = Math.floor(Math.random() * options.length);

    return options[index];
  }
}

export interface DivisionProblemOptions {
  subject?: QuestionSubject;
  divisor?: number;
}
