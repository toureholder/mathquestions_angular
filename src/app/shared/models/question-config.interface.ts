export interface QuestionConfig {
  adition: { maxNumberOfNumbers: number; maxValue: number };
  subtraction: { maxNumberOfNumbers: number; maxValue: number };
  multiplication: {
    maxNumberOfNumbers: number;
    maxValues: number[];
    defaultMaxValue: number;
  };
}

export const fakeQuestionConfig: QuestionConfig = {
  adition: { maxNumberOfNumbers: 343, maxValue: 353 },
  subtraction: { maxNumberOfNumbers: 23, maxValue: 450 },
  multiplication: {
    maxNumberOfNumbers: 27,
    maxValues: [3540, 54322],
    defaultMaxValue: 333,
  },
};
