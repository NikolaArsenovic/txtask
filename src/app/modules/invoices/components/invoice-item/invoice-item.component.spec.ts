import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoiceItemComponent } from './invoice-item.component';

describe('InvoiceItemComponent', () => {
  let component: InvoiceItemComponent;
  let fixture: ComponentFixture<InvoiceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceItemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display invoice details when input is provided', () => {
    const mockInvoice: Invoice = {
      id: 1,
      jobAdId: 101,
      amount: 1000,
      dueDate: new Date('2023-12-31')
    };

    component.invoice = mockInvoice;
    fixture.detectChanges();

    const idElement = fixture.debugElement.query(By.css('.id')).nativeElement;
    const amountElement = fixture.debugElement.query(By.css('.amount')).nativeElement;
    const dueDateElement = fixture.debugElement.query(By.css('.date')).nativeElement;

    expect(idElement.textContent).toContain(mockInvoice.id?.toString());
    expect(amountElement.textContent).toContain('$1,000.00');
    expect(dueDateElement.textContent).toContain('December 31, 2023');
  });

  it('should not display invoice details when input is not provided', () => {
    component.invoice = undefined;
    fixture.detectChanges();

    const idElement = fixture.debugElement.query(By.css('.id'));
    const amountElement = fixture.debugElement.query(By.css('.amount'));
    const dueDateElement = fixture.debugElement.query(By.css('.date'));

    expect(idElement).toBeNull();
    expect(amountElement).toBeNull();
    expect(dueDateElement).toBeNull();
  });
});
