import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minimoPreenchidos(
  campos: string[],
  minimo = 1,
  chaveErro = 'minimoPreenchidos'
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const preenchidos = campos.filter((nome) =>
      estaPreenchido(group.get(nome)?.value)
    ).length;

    return preenchidos >= minimo
      ? null
      : { [chaveErro]: { minimo, preenchidos, campos } };
  };
}

function estaPreenchido(valor: unknown): boolean {
  if (valor == null) return false;
  if (typeof valor === 'string') return valor.trim().length > 0;
  if (Array.isArray(valor)) return valor.length > 0;
  return true; // números, booleanos, objetos, datas...
}