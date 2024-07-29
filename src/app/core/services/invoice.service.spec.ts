import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { InvoiceDto } from '../models/invoice-dto.model';
import { InvoiceService } from './invoice.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        InvoiceService
      ]
    });

    service = TestBed.inject(InvoiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getInvoiceDueDate', () => {
    it('should return the correct due date', () => {
      const year = 2023;
      const month = 5; // June
      const dueDate = service.getInvoiceDueDate(year, month);
      expect(dueDate).toEqual(new Date(2023, 7, 31)); // August 31, 2023
    });
  });

  describe('#createInvoice', () => {
    it('should create an invoice and return it', () => {
      const mockInvoice: InvoiceDto = { id: 1, amount: 1000, dueDate: new Date(),createdAt: new Date(), jobAdId: 1, updatedAt: new Date() };
      service.createInvoice(mockInvoice).subscribe((invoice) => {
        expect(invoice).toEqual(mockInvoice);
      });

      const req = httpMock.expectOne('invoices');
      expect(req.request.method).toBe('POST');
      req.flush(mockInvoice);
    });
  });

  describe('#deleteInvoice', () => {
    it('should delete the invoice and return it', () => {
      const mockInvoice: InvoiceDto = { id: 1, amount: 1000, dueDate: new Date(),createdAt: new Date(), jobAdId: 1, updatedAt: new Date() };
      service.deleteInvoice(1).subscribe((invoice) => {
        expect(invoice).toEqual(mockInvoice);
      });

      const req = httpMock.expectOne('invoices/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(mockInvoice);
    });
  });

  describe('#getInvoices', () => {
    it('should return a list of invoices', () => {
      const mockInvoices: InvoiceDto[] = [
        { id: 1, amount: 1000, dueDate: new Date(),createdAt: new Date(), jobAdId: 1, updatedAt: new Date() },
        { id: 2, amount: 1000, dueDate: new Date(),createdAt: new Date(), jobAdId: 1, updatedAt: new Date() }
      ];

      service.getInvoices().subscribe((invoices) => {
        expect(invoices).toEqual(mockInvoices);
      });

      const req = httpMock.expectOne('invoices');
      expect(req.request.method).toBe('GET');
      req.flush(mockInvoices);
    });
  });
});
