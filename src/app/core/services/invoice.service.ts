import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { InvoiceDto } from '../models/invoice-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private http = inject(HttpClient);

  getInvoiceDueDate(year: number, month: number): Date {
    const dueMonth = month + 2;
    const lastDay = new Date(year, dueMonth, 0).getDate();
    return new Date(year, dueMonth, lastDay);
  }

  createInvoice(invoice: InvoiceDto): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>('invoices', invoice);
  }

  deleteInvoice(id: number): Observable<InvoiceDto> {
    return this.http.delete<InvoiceDto>('invoices/' + id);
  }

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>('invoices');
  }
}
