import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionConfigService } from 'src/app/core/services/question-config/question-config.service';
import { fakeQuestionConfig } from 'src/app/shared/models/question-config.interface';
import { SharedModule } from 'src/app/shared/shared.module';

import { ConfigComponent } from './config.component';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;
  let mockQuestionConfigService: jasmine.SpyObj<QuestionConfigService>;

  beforeEach(async () => {
    mockQuestionConfigService = jasmine.createSpyObj(
      'mockQuestionConfigService',
      ['getConfig', 'setConfig']
    );

    await TestBed.configureTestingModule({
      declarations: [ConfigComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatExpansionModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: QuestionConfigService, useValue: mockQuestionConfigService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockQuestionConfigService.getConfig.and.returnValue(fakeQuestionConfig);

    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get configuration from question config service.', () => {
    expect(component.config).toEqual(fakeQuestionConfig);
  });

  describe('#onChanges', () => {
    it('should save changes to question config service and refresh', () => {
      // When
      component.onChanges();

      // Then
      expect(mockQuestionConfigService.setConfig).toHaveBeenCalled();
    });
  });
});
