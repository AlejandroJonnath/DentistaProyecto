import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Doctorsito } from './doctorsito';

describe('Doctorsito', () => {
  let component: Doctorsito;
  let fixture: ComponentFixture<Doctorsito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Doctorsito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Doctorsito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
