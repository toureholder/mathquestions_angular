import { Component } from '@angular/core';
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

  constructor(private service: QuestionConfigService) {
    this.config = JSON.parse(JSON.stringify(this.service.getConfig()));
  }

  onChanges(): void {
    this.service.setConfig(this.config);
    this.refreshConfig();
  }

  private refreshConfig(): void {
    this.config = JSON.parse(JSON.stringify(this.service.getConfig()));
  }
}
