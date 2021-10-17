import { Component } from '@angular/core';
import { MathOperation } from '@shared/models/operation.enum';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { QuestionConfig } from 'src/app/shared/models/question-config.interface';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  config: QuestionConfig;
  test?: number = 99;
  operationsConfig: {
    [MathOperation.Adition]: boolean;
    [MathOperation.Subtraction]: boolean;
    [MathOperation.Multiplication]: boolean;
    [MathOperation.Division]: boolean;
  };

  constructor(private service: QuestionConfigService) {
    this.config = JSON.parse(JSON.stringify(this.service.getConfig()));
    this.operationsConfig = { ...this.config.problems.operations };
  }

  onChanges(): void {
    const newConfig = JSON.parse(JSON.stringify(this.config)) as QuestionConfig;
    newConfig.problems.operations = this.operationsConfig;

    this.service.setConfig(newConfig);
    this.refreshConfig();
  }

  private refreshConfig(): void {
    this.config = JSON.parse(JSON.stringify(this.service.getConfig()));
  }
}
