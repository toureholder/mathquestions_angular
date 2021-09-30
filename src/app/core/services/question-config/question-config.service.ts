import { Injectable } from '@angular/core';
import { QuestionConfig } from 'src/app/shared/models/question-config.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionConfigService {
  private readonly localStorageKey = 'question-config-prefrences';

  private config: QuestionConfig = {
    adition: { maxNumberOfNumbers: 3, maxValue: 10000 },
    subtraction: { maxNumberOfNumbers: 2, maxValue: 10000 },
    multiplication: {
      maxNumberOfNumbers: 2,
      maxValues: [99, 6],
      defaultMaxValue: 10,
    },
  };

  getConfig(): QuestionConfig {
    return this.getFromPreferences() || this.config;
  }

  setConfig(newConfig: QuestionConfig): void {
    this.config = this.addMultiplicationMaxValues(newConfig);
    this.saveToPreferences(this.config);
  }

  private addMultiplicationMaxValues(
    newConfig: QuestionConfig
  ): QuestionConfig {
    const howManyNewMultiplicationNumbers =
      newConfig.multiplication.maxNumberOfNumbers -
      this.config.multiplication.maxNumberOfNumbers;

    if (
      howManyNewMultiplicationNumbers &&
      howManyNewMultiplicationNumbers > 0
    ) {
      const newMaxValues: number[] = [];

      for (let i = 0; i < howManyNewMultiplicationNumbers; i++) {
        newMaxValues.push(this.config.multiplication.defaultMaxValue);
      }

      newConfig.multiplication.maxValues = [
        ...this.config.multiplication.maxValues,
        ...newMaxValues,
      ];
    }

    if (
      howManyNewMultiplicationNumbers &&
      howManyNewMultiplicationNumbers < 0
    ) {
      const newMaxValues = this.config.multiplication.maxValues.slice(
        0,
        this.config.multiplication.maxNumberOfNumbers +
          howManyNewMultiplicationNumbers
      );

      newConfig.multiplication.maxValues = newMaxValues;
    }

    return newConfig;
  }

  private saveToPreferences(config: QuestionConfig): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(config));
  }

  private getFromPreferences(): QuestionConfig | undefined {
    const preference = localStorage.getItem(this.localStorageKey);
    return preference ? JSON.parse(preference) : undefined;
  }
}
