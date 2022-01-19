import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'byPassSecurity'
})
export class ByPassSecurityPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform (value: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}