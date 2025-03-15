import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(private datePipe: DatePipe) {}

  /**
   * Formats a date in the specified format
   * @param date The date to format
   * @param format The format string (defaults to 'MMMM d, yyyy')
   * @returns Formatted date string
   */
  formatDate(date: string | Date, format: string = 'MMMM d, yyyy'): string {
    if (!date) return '';
    return this.datePipe.transform(date, format) || '';
  }
}
