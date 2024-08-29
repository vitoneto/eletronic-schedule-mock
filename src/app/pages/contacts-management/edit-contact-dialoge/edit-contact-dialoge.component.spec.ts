import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactDialogeComponent } from './edit-contact-dialoge.component';

describe('EditContactDialogeComponent', () => {
  let component: EditContactDialogeComponent;
  let fixture: ComponentFixture<EditContactDialogeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContactDialogeComponent]
    });
    fixture = TestBed.createComponent(EditContactDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
