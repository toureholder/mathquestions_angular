import { Gender } from './gender.interface';

export interface QuestionSubject {
  name: string;
  gender: Gender;
  plural?: string;
}

export interface QuestionEstablishmentSubject {
  establishment: string;
  establishmentGender: Gender;
  products: string;
  productsGender: Gender;
  item: string;
  itemGender: Gender;
}

export const randomSubject = (): QuestionSubject => {
  const pool: QuestionSubject[] = [
    {
      name: 'Antônio',
      gender: Gender.male,
    },
    {
      name: 'Kyan',
      gender: Gender.male,
    },
    {
      name: 'Eduardo',
      gender: Gender.male,
    },
    {
      name: 'Caio',
      gender: Gender.male,
    },
    {
      name: 'Daniel',
      gender: Gender.male,
    },
    {
      name: 'Bernardo',
      gender: Gender.male,
    },
    {
      name: 'Samuel',
      gender: Gender.male,
    },
    {
      name: 'Jônatas',
      gender: Gender.male,
    },
    {
      name: 'Lucas',
      gender: Gender.male,
    },
    {
      name: 'Henruqie',
      gender: Gender.male,
    },
    {
      name: 'Júlia',
      gender: Gender.female,
    },
    {
      name: 'Daniela',
      gender: Gender.female,
    },
    {
      name: 'Amanda',
      gender: Gender.female,
    },
    {
      name: 'Renata',
      gender: Gender.female,
    },
    {
      name: 'Vanessa',
      gender: Gender.female,
    },
    {
      name: 'Érica',
      gender: Gender.female,
    },
    {
      name: 'Viviane',
      gender: Gender.female,
    },
    {
      name: 'Carla',
      gender: Gender.female,
    },
    {
      name: 'Tati',
      gender: Gender.female,
    },
    {
      name: 'Mariana',
      gender: Gender.female,
    },
  ];

  return pool[Math.floor(Math.random() * pool.length)];
};

export const randomObject = (): QuestionSubject => {
  const pool: QuestionSubject[] = [
    {
      name: 'bicicleta',
      plural: 'bicicletas',
      gender: Gender.female,
    },
    {
      name: 'relógio',
      plural: 'relógios',
      gender: Gender.male,
    },
    {
      name: 'camisa',
      plural: 'camisas',
      gender: Gender.female,
    },
    {
      name: 'boné',
      plural: 'bonés',
      gender: Gender.male,
    },
    {
      name: 'bola',
      plural: 'bolas',
      gender: Gender.female,
    },
    {
      name: 'célular',
      plural: 'célulares',
      gender: Gender.male,
    },
    {
      name: 'tênis',
      plural: 'tênis',
      gender: Gender.male,
    },
    {
      name: 'par de sapatos',
      plural: 'pares de sapatos',
      gender: Gender.male,
    },
    {
      name: 'ingresso para a festa',
      plural: 'ingressos para a festa',
      gender: Gender.male,
    },
    {
      name: 'colar',
      plural: 'colares',
      gender: Gender.male,
    },
    {
      name: 'calça',
      plural: 'calças',
      gender: Gender.female,
    },
    {
      name: 'pranhca de surf',
      plural: 'pranhcas de surf',
      gender: Gender.female,
    },
    {
      name: 'skate',
      plural: 'skates',
      gender: Gender.male,
    },
    {
      name: 'livro',
      plural: 'livros',
      gender: Gender.male,
    },
    {
      name: 'tablet',
      plural: 'tablets',
      gender: Gender.male,
    },
    {
      name: 'par de patins',
      plural: 'pares de patins',
      gender: Gender.male,
    },
    {
      name: 'par de óculos',
      plural: 'pares de óculos',
      gender: Gender.male,
    },
    {
      name: 'fone de ouvido',
      plural: 'fones de ouvido',
      gender: Gender.male,
    },
  ];

  const index = Math.floor(Math.random() * pool.length);

  return pool[index];
};

export const randomPurchase = (): QuestionEstablishmentSubject => {
  const pool: QuestionEstablishmentSubject[] = [
    {
      establishment: 'livraria',
      establishmentGender: Gender.female,
      products: 'livros de história em quadrinhos',
      productsGender: Gender.male,
      item: 'livro',
      itemGender: Gender.male,
    },
    {
      establishment: 'livraria',
      establishmentGender: Gender.female,
      products: 'revistas',
      productsGender: Gender.female,
      item: 'revista',
      itemGender: Gender.female,
    },
    {
      establishment: 'papelaria',
      establishmentGender: Gender.female,
      products: 'clipes de papel',
      productsGender: Gender.male,
      item: 'mochila',
      itemGender: Gender.female,
    },
    {
      establishment: 'papelaria',
      establishmentGender: Gender.female,
      products: 'cadernos',
      productsGender: Gender.male,
      item: 'calculadora',
      itemGender: Gender.female,
    },
    {
      establishment: 'loja',
      establishmentGender: Gender.female,
      products: 'guarda chuvas',
      productsGender: Gender.male,
      item: 'ventilador',
      itemGender: Gender.male,
    },
    {
      establishment: 'loja',
      establishmentGender: Gender.female,
      products: 'guarda chuvas',
      productsGender: Gender.male,
      item: 'relógio',
      itemGender: Gender.male,
    },
    {
      establishment: 'loja',
      establishmentGender: Gender.female,
      products: 'guarda chuvas',
      productsGender: Gender.male,
      item: 'robô aspirador',
      itemGender: Gender.male,
    },
    {
      establishment: 'padaria',
      establishmentGender: Gender.female,
      products: 'sacos de farinha',
      productsGender: Gender.male,
      item: 'revista',
      itemGender: Gender.female,
    },
    {
      establishment: 'supermercado',
      establishmentGender: Gender.male,
      products: 'potes de manteiga',
      productsGender: Gender.male,
      item: 'torradeira',
      itemGender: Gender.female,
    },
    {
      establishment: 'loja de informática',
      establishmentGender: Gender.female,
      products: 'celulares',
      productsGender: Gender.male,
      item: 'teclado',
      itemGender: Gender.male,
    },
    {
      establishment: 'loja de informática',
      establishmentGender: Gender.female,
      products: 'tablets',
      productsGender: Gender.male,
      item: 'tablet',
      itemGender: Gender.male,
    },
    {
      establishment: 'clube',
      establishmentGender: Gender.male,
      products: 'bolas de vôlei',
      productsGender: Gender.female,
      item: 'boia',
      itemGender: Gender.female,
    },
    {
      establishment: 'supermercado',
      establishmentGender: Gender.male,
      products: 'quilogramas de banana',
      productsGender: Gender.female,
      item: 'liquidificador',
      itemGender: Gender.male,
    },
    {
      establishment: 'restaurante',
      establishmentGender: Gender.male,
      products: 'pacotes de guardanapo',
      productsGender: Gender.female,
      item: 'pizza',
      itemGender: Gender.female,
    },
    {
      establishment: 'escola de natação',
      establishmentGender: Gender.female,
      products: 'pranchas',
      productsGender: Gender.female,
      item: 'roupão',
      itemGender: Gender.male,
    },
  ];

  const index = Math.floor(Math.random() * pool.length);

  return pool[index];
};

export interface MoreThingsQuestionData {
  ago: string;
  place: string;
  things: string;
  thingsGender: Gender;
  action: string;
  done: string;
}

export const randomMoreThingsQuestionData = (): MoreThingsQuestionData => {
  const pool: MoreThingsQuestionData[] = [
    {
      ago: 'mês passado',
      place: 'no parque da cidade',
      things: 'árvores',
      thingsGender: Gender.female,
      action: 'Um grupo comunitário plantou',
      done: 'plantadas',
    },
    {
      ago: 'semana passada',
      things: 'brinquedos',
      thingsGender: Gender.male,
      place: 'na loja de brinquedos',
      action: 'O gerente da loja comprou',
      done: 'comprados',
    },
    {
      ago: 'ano passado',
      things: 'prédios',
      thingsGender: Gender.male,
      place: 'no bairro',
      action: 'O prefeito mandou constuir',
      done: 'construídos',
    },
    {
      ago: 'ontém',
      things: 'revistas',
      thingsGender: Gender.female,
      place: 'na banca de jornais',
      action: 'O entregador entregou',
      done: 'entregues',
    },
  ];

  const index = Math.floor(Math.random() * pool.length);

  return pool[index];
};

export interface AddTwoThingsQuestionData {
  actor: string;
  actors: string;
  actorGender: Gender;
  passadoSingular: string;
  passadoPlural: string;
  things: string;
  thingsGender: Gender;
  place: string;
}

export const randomAddTwoThingsQuestionData = (): AddTwoThingsQuestionData => {
  const pool: AddTwoThingsQuestionData[] = [
    {
      actor: 'tartaruga marinha',
      actors: 'tartarugas marinhas',
      actorGender: Gender.female,
      passadoSingular: 'depositou',
      passadoPlural: 'depositaram',
      things: 'ovos',
      thingsGender: Gender.male,
      place: 'na areia da praia',
    },
    {
      actor: 'vendedor',
      actors: 'vendedores',
      actorGender: Gender.male,
      passadoSingular: 'vendeu',
      passadoPlural: 'venderam',
      things: 'brinquedos',
      thingsGender: Gender.male,
      place: 'no final de semana',
    },
    {
      actor: 'construtora',
      actors: 'construtoras',
      actorGender: Gender.female,
      passadoSingular: 'construiu',
      passadoPlural: 'construiram',
      things: 'casas',
      thingsGender: Gender.female,
      place: 'na cidade',
    },
    {
      actor: 'família',
      actors: 'famílias',
      actorGender: Gender.female,
      passadoSingular: 'gastou',
      passadoPlural: 'gastaram',
      things: 'reais',
      thingsGender: Gender.male,
      place: 'no shopping',
    },
  ];

  const index = Math.floor(Math.random() * pool.length);

  return pool[index];
};

export interface MoreAndMoreQuestionData {
  place: string;
  actors: string;
  actorGender: Gender;
}

export const randomMoreAndMoreQuestionData = (): MoreAndMoreQuestionData => {
  const pool: MoreAndMoreQuestionData[] = [
    {
      actors: 'araras',
      actorGender: Gender.female,
      place: 'Em uma reserva ambiental',
    },
    {
      actors: 'alunos',
      actorGender: Gender.male,
      place: 'Em uma escola',
    },
    {
      actors: 'imigrantes',
      actorGender: Gender.male,
      place: 'Em em país',
    },
  ];

  const index = Math.floor(Math.random() * pool.length);

  return pool[index];
};

export interface MultiplicationQuestionData {
  place: string;
  actor: string;
  actors: string;
  futureSubjunctive: string;
  futurePlural: string;
  thing: string;
  thingGender: Gender;
}

export const randomMultiplicationQuestionData =
  (): MultiplicationQuestionData => {
    const pool: MultiplicationQuestionData[] = [
      {
        actor: 'criança',
        actors: 'crianças',
        thing: 'bolas de sorvete',
        thingGender: Gender.female,
        place: 'Em uma sorveteria',
        futureSubjunctive: 'comer',
        futurePlural: 'comerão',
      },
      {
        actor: 'participante',
        actors: 'participantes',
        thing: 'quilômetros',
        thingGender: Gender.male,
        place: 'Em um festival de natação',
        futureSubjunctive: 'nadar',
        futurePlural: 'nadarão',
      },
      {
        actor: 'jogador',
        actors: 'jogadores',
        thing: 'gols',
        thingGender: Gender.male,
        place: 'Em uma temporada do campeonato distrital de futsal',
        futureSubjunctive: 'marcar',
        futurePlural: 'marcarão',
      },
      {
        actor: 'estudante',
        actors: 'estudantes',
        thing: 'desenhos',
        thingGender: Gender.male,
        place: 'Em uma turma',
        futureSubjunctive: 'fizer',
        futurePlural: 'farão',
      },
    ];

    const index = Math.floor(Math.random() * pool.length);

    return pool[index];
  };
