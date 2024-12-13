import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUploadComponent } from './seller-upload.component';

describe('SellerUploadComponent', () => {
  let component: SellerUploadComponent;
  let fixture: ComponentFixture<SellerUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
