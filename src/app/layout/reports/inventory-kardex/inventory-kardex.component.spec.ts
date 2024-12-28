import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryKardexComponent } from './inventory-kardex.component';

describe('InventoryKardexComponent', () => {
  let component: InventoryKardexComponent;
  let fixture: ComponentFixture<InventoryKardexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryKardexComponent]
    });
    fixture = TestBed.createComponent(InventoryKardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
