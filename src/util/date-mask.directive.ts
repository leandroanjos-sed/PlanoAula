import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: 'p-calendar[appDateMask]',
  standalone: true
})
export class DateMaskDirective implements AfterViewInit, OnDestroy {
  private input?: HTMLInputElement;

  private readonly handler = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 8);

    let masked = digits;
    if (digits.length > 4) {
      masked = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length > 2) {
      masked = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    if (input.value !== masked) {
      input.value = masked;
    }
  };

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.input = this.host.nativeElement.querySelector('input') ?? undefined;
    // true = fase de captura, para a máscara rodar antes do parse interno do p-calendar
    this.input?.addEventListener('input', this.handler, true);
  }

  ngOnDestroy(): void {
    this.input?.removeEventListener('input', this.handler, true);
  }
}