import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryKardexFormComponent } from './inventory-kardex-form.component';

describe('InventoryKardexFormComponent', () => {
  let component: InventoryKardexFormComponent;
  let fixture: ComponentFixture<InventoryKardexFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryKardexFormComponent]
    });
    fixture = TestBed.createComponent(InventoryKardexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
