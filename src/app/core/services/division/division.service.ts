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
    let divisor;

    let isRemanderQuestion =
      forcedOptions?.isRemanderQuestion || Math.random() > 0.5;

    if (isRemanderQuestion) {
      let max = Math.min(maxDivisor, dividend);
      divisor = forcedOptions?.divisor || Math.floor(Math.random() * max) + 1;

      while (dividend % divisor === 0) {
        dividend = Math.floor(Math.random() * maxDividend) + 1;
        max = Math.min(maxDivisor, dividend);
        divisor = Math.floor(Math.random() * max) + 1;
      }
    } else {
      divisor = forcedOptions?.divisor || maxDivisor;

      while (dividend % divisor != 0) {
        divisor--;
      }
    }

    return {
      text: this.getQProblemText(
        subject,
        dividend,
        divisor,
        isRemanderQuestion
      ),
      correctAnswer: {
        quotient: isRemanderQuestion ? dividend % divisor : dividend / divisor,
      },
      divisor,
    };
  }

  private getQProblemText(
    subject: QuestionSubject,
    dividend: number,
    divisor: number,
    hasReimainder: boolean
  ): string {
    const exactDivisionOptions: string[] = [
      `
      ${subject.name} comprou um saco com ${dividend} balas e decidiu separar igualmente a 
      quantidade de balas para cada um dos ${divisor} integrantes da sua família. Quantas balas
      cada um vai receber?
      `,
      `
      Em um jogo de basquete, a equipe Gaviões do Centro-Oeste marcou ${dividend} pontos. Se a equipe tem ${divisor} 
      jogadores e cada jogador marcou o mesmo número de pontos. Quantos pontos cada jogador marcou?
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
      ${subject.name} quer jogar um jogo de cartas com ${
        divisor === 2 ? 'um dos seus amigos' : ''
      } ${divisor > 2 ? 'mais' : ''} ${divisor > 2 ? divisor - 1 : ''} ${
        divisor > 2 ? 'dos seus amigos' : ''
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
      ${subject.name} tem ${divisor - 1} ${
        divisor === 2 ? 'irmão' : 'irmãos'
      }. Ela ganhou ${dividend} ursos de pelúcia em um sorteio e resolveu repartir esse total 
      igualmente entre ${subject.gender == Gender.male ? 'ele' : 'ela'} e ${
        divisor === 2 ? 'seu irmão' : 'seus irmãos'
      }. Com quantas ursos de pelúcia cada um ficou?
      `,
      `
      ${subject.gender == Gender.male ? 'O professor' : 'A professora'} ${
        subject.name
      } tem 
      ${dividend} alunos e deseja formar grupos de ${divisor} alunos. Quantos grupos
      ${subject.gender == Gender.male ? 'ele' : 'ela'} poderá formar?
      `,
      `
      ${subject.name} vende frutas na feira. Quando sobram frutas, ele divide igualmente por ${divisor} 
      e entrega para ${divisor} famílias carentes. Se hoje sobraram ${dividend} frutas. Quantas frutas 
      cada família receberá?
      `,
      `
      O gerente da loja tinha ${dividend} flores e entregou-as aos clientes que estavam presentes 
      na loja. Nesse momento, havia 4 clientes na loja. Quantas flores cada cliente receberá?
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

    const nonExactDivisionOptions: string[] = [
      `
      ${subject.name} comprou um saco com ${dividend} balas e decidiu separar igualmente a 
      quantidade de balas para cada um dos ${divisor} integrantes da sua família. Depois de separar as 
      balas igualmente, quantas vão sobrar?
      `,
      `
      ${
        subject.name
      } preparou ${dividend} salgadinhos para sua festa de aniversário e convidou ${divisor} 
      pessoas. Se ${
        subject.gender == Gender.male ? 'ele' : 'ela'
      } separar os salgadinhos igualmente para
      os convidados, quantos salgadinhos vão sobrar depois da separação?
      `,
      `
      ${subject.name} quer jogar um jogo de cartas com ${
        divisor === 2 ? 'um dos seus amigos' : ''
      } ${divisor > 2 ? 'mais' : ''} ${divisor > 2 ? divisor - 1 : ''} ${
        divisor > 2 ? 'dos seus amigos' : ''
      }. Neste jogo há 
      ${dividend} cartas no baralho. Se as cartas devem ser distibuídas igualmente entre os 
      jogadores, quantas cartas vão sobrar depois de cada jogador receber as suas?
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
      }. Depois de dividir as rosquinhas igualmente, quantas vão sobrar?
      `,
      `
      Os alunos do terceiro ano arrecadaram ${dividend} garrafas PET para fazer uma horta vertical. 
      Essas garrafas serão dividas igualmente para ${divisor} grupos. Depois da divisão quantas garrafas 
      vão sobrar?
      `,
      `
      O abrigo Jardim das Flores abriga ${divisor} crianças e recebeu uma doação de ${dividend} peças 
      de roupa. Todas as crianças vão receber a mesma quantidade de peças. Depois de cada 
      criança receber sua roupas, quantas peças vão sobrar?
      `,
    ];

    const pool = hasReimainder ? nonExactDivisionOptions : exactDivisionOptions;

    const index = Math.floor(Math.random() * pool.length);

    return pool[index];
  }
}

export interface DivisionProblemOptions {
  subject?: QuestionSubject;
  divisor?: number;
  isRemanderQuestion?: boolean;
}
