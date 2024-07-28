import { Component, Input } from '@angular/core';

import { Invoice } from 'src/app/core/models/invoice.model';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrl: './invoice-item.component.scss'
})
export class InvoiceItemComponent {
  @Input() invoice?: Invoice;

}
