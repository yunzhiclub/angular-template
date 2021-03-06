import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavComponent} from './nav.component';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
