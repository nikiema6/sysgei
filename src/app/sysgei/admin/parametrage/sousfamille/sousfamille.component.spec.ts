import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousfamilleComponent } from './sousfamille.component';

describe('SousfamilleComponent', () => {
  let component: SousfamilleComponent;
  let fixture: ComponentFixture<SousfamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousfamilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousfamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
