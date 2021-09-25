import { Injectable } from '@angular/core';
import { Gender } from 'src/app/pages/problem/models/gender.interface';
import { Problem } from 'src/app/pages/problem/models/problem.interface';
import {
  randomMoreThingsQuestionData,
  randomObject,
  randomPurchase,
  randomSubject,
} from 'src/app/pages/problem/models/question-subject.interface';
import { ProblemService } from '../problem-service.interface';

@Injectable({
  providedIn: 'root',
})
export class SubtractionService implements ProblemService {
  getProblem(): Problem {
    const subject = randomSubject();
    const object = randomObject();
    const purchase = randomPurchase();
    const more = randomMoreThingsQuestionData();

    const total = Math.floor(Math.random() * (2000 - 750 + 1)) + 750;
    const parte = Math.floor(Math.random() * (749 - 50 + 1)) + 50;

    const cheaperTotal = Math.floor(Math.random() * (200 - 75 + 1)) + 75;
    const cheaperParte = Math.floor(Math.random() * (74 - 25 + 1)) + 25;

    const option1: Problem = {
      text: `
      ${subject.name} comprou ${object.gender === Gender.male ? 'um' : 'uma'} ${
        object.name
      } que custa ${total} reais e deu ${parte} reais de
      entrada. Quanto falta para ${
        subject.gender === Gender.male ? 'ele' : 'ela'
      } pagar todo o valor ${object.gender === Gender.male ? 'do' : 'da'} ${
        object.name
      }?
      `,
      correctAnswer: total - parte,
    };

    const option2: Problem = {
      text: `
      ${purchase.establishmentGender === Gender.male ? 'O' : 'A'} ${
        purchase.establishment
      } de ${subject.name} fez um pedido de ${total} ${
        purchase.products
      }. Com a pandemia e fechamento dos Correios, chegaram apenas ${parte} ${
        purchase.products
      }. ${purchase.productsGender === Gender.male ? 'Quantos' : 'Quantas'} ${
        purchase.products
      } faltam chegar?
      `,
      correctAnswer: total - parte,
    };

    const option3: Problem = {
      text: `
      ${subject.name} está ${
        purchase.establishmentGender === Gender.male ? 'no' : 'na'
      } ${purchase.establishment} e ${
        subject.gender === Gender.male ? 'ele' : 'ela'
      } quer comprar ${purchase.itemGender === Gender.male ? 'um' : 'uma'} ${
        purchase.item
      } que custa ${cheaperTotal} 
      reais. Porém, ${
        subject.gender === Gender.male ? 'ele' : 'ela'
      } só tem ${cheaperParte} reais. Quanto dinheiro ${
        subject.gender === Gender.male ? 'ele' : 'ela'
      } terá que pedir emprestado 
      do seus pais para conseguir comprar ${
        purchase.itemGender === Gender.male ? 'o' : 'a'
      } ${purchase.item}?
      `,
      correctAnswer: cheaperTotal - cheaperParte,
    };

    const option4: Problem = {
      text: `
      Até ${more.ago} havia somente ${parte} ${more.things} ${more.place}. ${
        more.action
      } mais ${more.thingsGender === Gender.male ? 'alguns' : 'algumas'} ${
        more.things
      }. Se hoje há ${total} ${more.things} ${more.place}. ${
        more.thingsGender === Gender.male ? 'Quantos' : 'Quantas'
      } ${more.things} foram ${more.done}?
      `,
      correctAnswer: total - parte,
    };

    const options: Problem[] = [option1, option2, option3, option4];
    const index = Math.floor(Math.random() * options.length);

    return options[index];
  }
}
