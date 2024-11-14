import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sol'
})
export class SolPipe implements PipeTransform {
  private currencyPipe = inject(CurrencyPipe)

  transform(value: number, digitsInfo: string = '1.2-2'): string | null {
    // Usa el pipe de currency de Angular, con la configuración para Soles (PEN)
    return this.currencyPipe.transform(value, 'PEN', 'symbol', digitsInfo);
  }

}
