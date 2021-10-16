import { QuestionConfig } from '@shared/models/question-config.interface';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';

export class TestUtil {
  static mockLocalStorage(initalStore?: { [key: string]: string }): void {
    const preference: QuestionConfig = {
      adition: { maxNumberOfNumbers: 3, maxValue: 929 },
      subtraction: { maxNumberOfNumbers: 2, maxValue: 103700 },
      multiplication: {
        maxNumberOfNumbers: 2,
        maxValues: [99, 7],
        defaultMaxValue: 10,
      },
      division: {
        maxNumberOfNumbers: 2,
        maxValues: [50, 5],
        defaultMaxValue: 10,
      },
    };

    const defaultStore: { [key: string]: string } = {
      [QuestionConfigService.localStorageKey]: JSON.stringify(preference),
    };

    let store: { [key: string]: string } = initalStore || defaultStore;

    spyOn(localStorage, 'getItem').and.callFake(
      (key: string): string | null => {
        return store[key] || null;
      }
    );

    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] = value);
      }
    );

    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });
  }
}
