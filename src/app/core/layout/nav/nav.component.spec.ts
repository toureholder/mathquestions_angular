import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProblemComponent } from 'src/app/pages/problem/problem.component';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;

  beforeEach(async () => {
    const routes = [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'problem',
        component: ProblemComponent,
      },
    ];

    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#showConfigButton', () => {
    it('should set showConfigButton to false for some routes', fakeAsync(() => {
      // Given
      component.ngOnInit();

      // When
      if (fixture.ngZone) {
        fixture.ngZone.run(() => {
          router.navigate(['/home']);
        });
      }

      tick();

      // Then
      expect(component.showConfigButton).toBeFalse();
    }));

    it('should set showConfigButton to true for some routes', fakeAsync(() => {
      // Given
      component.ngOnInit();

      // When
      if (fixture.ngZone) {
        fixture.ngZone.run(() => {
          router.navigate(['/problem']);
        });
      }

      tick();

      // Then
      expect(component.showConfigButton).toBeTrue();
    }));
  });
});
