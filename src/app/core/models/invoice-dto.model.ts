import { Invoice } from "./invoice.model";

export interface InvoiceDto extends Invoice {
  // DTO properties that are not part of the model
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}
