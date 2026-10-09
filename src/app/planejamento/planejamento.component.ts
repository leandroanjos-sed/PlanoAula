import { Component } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DateMaskDirective } from '../../util/date-mask.directive';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { CompetenciaUtil } from '../../util/competencia-util';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HabilidadeUtil } from '../../util/habilidade-util';
import { InputTextareaModule } from 'primeng/inputtextarea';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-planejamento',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    DateMaskDirective,
    InputNumberModule,
    InputTextModule,
    CommonModule,
    ListboxModule,
    ToastModule,
    InputTextareaModule,
  ],
  templateUrl: './planejamento.component.html',
  styleUrl: './planejamento.component.scss',
  providers: [MessageService],
})
export class PlanejamentoComponent {
  habilidades: any[] = [];
  habilidadesCurriculoDigital: any[] = [];
  competencias: any[] = [];
  escolas = [
    {
      label: 'São Lourenço do Oeste',
      value: 'sao-lourenco-do-oeste',
      items: [
        { label: 'EEB Sóror Angélica', value: 'EEB Sóror Angélica' },
        { label: 'EEB Rui Barbosa', value: 'EEB Rui Barbosa' },
      ],
    },
    {
      label: 'Campo Erê',
      value: 'campo-ere',
      items: [
        {
          label: 'EEB Emílio Garrastazu Médici',
          value: 'EEB Emílio Garrastazu Médici',
        },
        { label: 'EEB Raul Pompéia', value: 'EEB Raul Pompéia' },
        { label: 'CEDUP Campo Erê', value: 'CEDUP Campo Erê' },
      ],
    },
    {
      label: 'São Bernardino',
      value: 'sao-bernardino',
      items: [{ label: 'EEB São Bernardino', value: 'EEB São Bernardino' }],
    },
    {
      label: 'Jupiá',
      value: 'jupia',
      items: [
        {
          label: 'EEB Maria Madalena de Moura Ferro',
          value: 'EEB Maria Madalena de Moura Ferro',
        },
      ],
    },
    {
      label: 'Coronel Martins',
      value: 'coronel-martins',
      items: [
        {
          label: 'EEB Profª Olga Nunes de Abreu',
          value: 'EEB Profª Olga Nunes de Abreu',
        },
      ],
    },
    {
      label: 'Galvão',
      value: 'galvao',
      items: [{ label: 'EEB Verônica Senem', value: 'EEB Verônica Senem' }],
    },
  ];

  seriesAnos = [
    {
      label: 'Ensino Fundamental - Anos Finais',
      value: 'anos-finais',
      items: [
        { label: '6º Ano', value: '6º Ano, Ensino Fundamental - Anos Finais' },
        { label: '7º Ano', value: '7º Ano, Ensino Fundamental - Anos Finais' },
        { label: '8º Ano', value: '8º Ano, Ensino Fundamental - Anos Finais' },
        { label: '9º Ano', value: '9º Ano, Ensino Fundamental - Anos Finais' },
      ],
    },
    {
      label: 'Ensino Médio',
      value: 'ensino-medio',
      items: [
        { label: '1º Ano', value: '1º Ano, Ensino Médio' },
        { label: '2º Ano', value: '2º Ano, Ensino Médio' },
        { label: '3º Ano', value: '3º Ano, Ensino Médio' },
      ],
    },
  ];

  disciplinas: any[] = [];

  instrumentos: any[] = [
    'Prova',
    'Análise de entrevista',
    'Autoavaliação',
    'Dinâmica',
    'Entrevista',
    'Execução de experimento',
    'Interpretação de texto',
    'Pesquisa de campo',
    'Portfólio',
    'Produção de texto',
    'Projeto',
    'Prova oral',
    'Registros no caderno',
    'Relatório',
    'Resolução de exercícios',
    'Seminário',
    'Trabalho',
    'Trabalho de pesquisa',
    'Trabalho prático',
    'P.I/IFA',
  ];

  referencias: any[] = [
    'BRASIL. Ministério da Educação. Base Nacional Comum Curricular. Brasília, 2018.',
    'SANTA CATARINA. Secretaria de Estado da Educação. Currículo base da educação infantil e do ensino fundamental do território catarinense/Estado de Santa Catarina, Secretaria de Estado da Educação. – Florianópolis: Governo do Estado, 2019. 492 p.',
    'SANTA CATARINA. Secretaria de Estado da Educação. Currículo base do ensino médio do território catarinense: caderno 2 –formação geral básica / Secretaria de Estado da Educação. – Florianópolis: Gráfica Coan, 2021.Gráfica Coan, 2021. 205p.',
    'SANTA CATARINA. Secretaria de Estado da Educação. Proposta Curricular de Santa Catarina: formação integral na educação básica/Estado de Santa Catarina, 2014, 192p.',
    'SANTA CATARINA. Governo do Estado. Secretaria de Estado da Educação. Itinerário formativo de aprofundamento das áreas do conhecimento - IFA - Florianópolis, 2026.',
    'SANTA CATARINA. Secretaria de Estado da Educação. Currículo de Educação Digital da Rede Estadual de Santa Catarina – 2026. Florianópolis: Secretaria de Estado da Educação, 2026. 339 p. Disponível em: PDF institucional.',
  ];

  recursos: any[] = [
    'Cartaz',
    'Computador',
    'Notícias e Reportagens',
    'Filmes e Documentários',
    'Televisão',
    'Jogos Educativos',
    'Mapas',
    'Lousa Digital',
    'Projetor Multimídia',
    'Quadro branco',
    'Laboratório de Tecnologia',
    'Laboratório Maker',
    'Laboratórios de Área',
    'Utilização de recurso áudio visual',
    'Livros e Revistas Didáticas',
    'Recursos Educacionais Digitais',
    'Músicas',
  ];

  planejamentoForm: FormGroup = new FormGroup({
    escola: new FormControl(undefined, Validators.required),
    dataInicial: new FormControl(undefined, Validators.required),
    dataFinal: new FormControl(undefined, Validators.required),
    serieAno: new FormControl(undefined, Validators.required),
    disciplina: new FormControl(undefined, Validators.required),
    professor: new FormControl(undefined, Validators.required),
    quantidadeAulas: new FormControl(0, Validators.required),
    competencia: new FormControl(),
    habilidade: new FormControl(),
    outrasHabilidades: new FormControl(),
    habilidadeCurriculoDigital: new FormControl(),
    outrasHabilidadesCurriculoDigital: new FormControl(),
    objetoConhecimento: new FormControl(undefined, Validators.required),
    caminhoMetodologico: new FormControl(undefined, Validators.required),
    recurso: new FormControl(),
    outrosRecursos: new FormControl(),
    instrumento: new FormControl(),
    outrosInstrumentos: new FormControl(),
    referencia: new FormControl(),
    outrasReferencias: new FormControl(),
  });

  constructor(private messageService: MessageService) {}

  get escola() {
    return this.planejamentoForm.get('escola')!;
  }
  get dataInicial() {
    return this.planejamentoForm.get('dataInicial')!;
  }
  get dataFinal() {
    return this.planejamentoForm.get('dataFinal')!;
  }
  get serieAno() {
    return this.planejamentoForm.get('serieAno')!;
  }
  get disciplina() {
    return this.planejamentoForm.get('disciplina')!;
  }
  get competencia() {
    return this.planejamentoForm.get('competencia')!;
  }
  get habilidade() {
    return this.planejamentoForm.get('habilidade')!;
  }
  get outrasHabilidades() {
    return this.planejamentoForm.get('outrasHabilidades')!;
  }
  get instrumento() {
    return this.planejamentoForm.get('instrumento')!;
  }

  onChangeSerieAnos(event: DropdownChangeEvent) {
    this.disciplina.setValue(undefined);
    this.disciplina.updateValueAndValidity();
    if (event?.value?.includes('Anos Finais')) {
      this.disciplinas = [
        { label: 'Língua Portuguesa', value: 'Língua Portuguesa' },
        { label: 'Artes', value: 'Artes' },
        { label: 'Educação Física', value: 'Educação Física' },
        { label: 'Língua Inglesa', value: 'Língua Inglesa' },
        { label: 'Matemática', value: 'Matemática' },
        { label: 'Ciências', value: 'Ciências' },
        { label: 'Geografia', value: 'Geografia' },
        { label: 'História', value: 'História' },
        { label: 'Ensino Religioso', value: 'Ensino Religioso' },
      ];
    } else if (event?.value?.includes('Ensino Médio')) {
      this.disciplinas = [
        {
          label: 'Linguagens e suas Tecnologias',
          value: 'linguagens',
          items: [
            {
              label: 'Língua Portuguesa',
              value: 'Língua Portuguesa, Linguagens e suas Tecnologias',
            },
            {
              label: 'Língua Inglesa',
              value: 'Língua Inglesa, Linguagens e suas Tecnologias',
            },
            { label: 'Arte', value: 'Arte, Linguagens e suas Tecnologias' },
            {
              label: 'Educação Física',
              value: 'Educação Física, Linguagens e suas Tecnologias',
            },
          ],
        },
        {
          label: 'Matemática e suas Tecnologias',
          value: 'matematica',
          items: [
            {
              label: 'Matemática',
              value: 'Matemática, Matemática e suas Tecnologias',
            },
          ],
        },
        {
          label: 'Ciências da Natureza e suas Tecnologias',
          value: 'ciencias-da-natureza',
          items: [
            {
              label: 'Biologia',
              value: 'Biologia, Ciências da Natureza e suas Tecnologias',
            },
            {
              label: 'Física',
              value: 'Física, Ciências da Natureza e suas Tecnologias',
            },
            {
              label: 'Química',
              value: 'Química, Ciências da Natureza e suas Tecnologias',
            },
          ],
        },
        {
          label: 'Ciências Humanas e Sociais Aplicadas',
          value: 'ciencias-humanas-e-sociais-aplicadas',
          items: [
            {
              label: 'Geografia',
              value: 'Geografia, Ciências Humanas e Sociais Aplicadas',
            },
            {
              label: 'História',
              value: 'História, Ciências Humanas e Sociais Aplicadas',
            },
            {
              label: 'Filosofia',
              value: 'Filosofia, Ciências Humanas e Sociais Aplicadas',
            },
            {
              label: 'Sociologia',
              value: 'Sociologia, Ciências Humanas e Sociais Aplicadas',
            },
          ],
        },
      ];
    } else {
      this.disciplinas = [];
    }
  }

  onChangeDisciplina(event: DropdownChangeEvent) {
    this.competencia.setValue(undefined);
    this.competencia.updateValueAndValidity();

    let isEnsinoMedio = this.serieAno.value?.includes('Ensino Médio');

    if (!isEnsinoMedio) {
      this.competencias = CompetenciaUtil.competenciasAnosFinais;
      this.competencias = this.competencias.filter((t) =>
        event.value?.includes(t.Disciplina),
      );
      this.competencias = this.competencias;

      this.habilidades = HabilidadeUtil.habilidadesAnosFinais;
      this.habilidades = this.habilidades.filter(
        (t) =>
          this.disciplina.value?.includes(t.Disciplina) &&
          t.Codigo.slice(2, 4).includes(this.serieAno.value[0]),
      );

      this.habilidadesCurriculoDigital =
        HabilidadeUtil.habilidadesCurriculoDigital.filter(
          (t) => !t.Etapa.includes('Ensino Médio'),
        );
    } else {
      this.competencias = CompetenciaUtil.competenciasEnsinoMedio;
      this.competencias = this.competencias.filter((t) =>
        event.value?.includes(t.Area),
      );
      this.competencias = this.competencias;
    }
  }

  onChangeCompetencia(event: ListboxChangeEvent) {
    if (event.value?.length > 2) {
      this.competencia.setValue(event.value?.slice(-2));
      this.messageService.add({
        severity: 'info',
        detail: 'Máximo de duas competências por plano de aula!',
        summary: 'Aviso',
      });
    }

    let isEnsinoMedio = this.serieAno.value?.includes('Ensino Médio');
    if (isEnsinoMedio) {
      this.habilidades = HabilidadeUtil.habilidadesEnsinoMedio;

      this.habilidades = this.habilidades.filter(
        (t) =>
          this.disciplina.value?.includes(t.Area) &&
          t.Codigo.slice(2, 4).includes(this.serieAno.value[0]) &&
          this.competencia.value
            ?.map((c: any) => c.Numero + '')
            .includes(t.Competencia as number),
      );

      this.habilidadesCurriculoDigital =
        HabilidadeUtil.habilidadesCurriculoDigital.filter(
          (t) => !t.Etapa.includes('Ensino Médio'),
        );
    }
  }

  onChangeHabilidade(event: ListboxChangeEvent) {
    if (event.value?.length > 4) {
      this.habilidade.setValue(event.value?.slice(-4));
      this.messageService.add({
        severity: 'info',
        detail: 'Máximo de quatro habilidades por plano de aula!',
        summary: 'Aviso',
      });
    }
  }

  gerarPdf() {
    let isEnsinoMedio = this.serieAno.value?.includes('Ensino Médio');
    const dados = this.planejamentoForm.value;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    doc.setDocumentProperties({ title: 'Plano de Aula' });
    doc.setFontSize(14);

    if (isEnsinoMedio) {
      doc.text('PLANO DE AULA - ENSINO MÉDIO', 105, 20);
    } else {
      doc.text('PLANO DE AULA', 125, 20);
      doc.text('NO ENSINO FUNDAMENTAL', 110, 26);
    }

    autoTable(doc, {
      theme: 'grid',
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 2,
        textColor: 0, // preto
        lineColor: 0,
      },
      columnStyles: {
        0: { cellWidth: 44, halign: 'center' },
        1: { cellWidth: 47, halign: 'center' },
        2: { cellWidth: 44, halign: 'center' },
        3: { cellWidth: 45, halign: 'center' },
        4: { cellWidth: 44, halign: 'center' },
        5: { cellWidth: 'auto', halign: 'center' },
      },
      body: [
        [
          'Componente curricular',
          dados.disciplina ?? '',
          'Ano/série',
          dados.serieAno?.split(',')[0] ?? '',
          'Número de Aulas',
          dados.quantidadeAulas,
        ],
      ],
    });

    autoTable(doc, {
      theme: 'grid',
      startY: (doc as any).lastAutoTable.finalY,
      styles: {
        fontSize: 10,
        cellPadding: 2,
        textColor: 0, // preto
        lineColor: 0,
      },
      columnStyles: {
        0: { cellWidth: 50, valign: 'middle', halign: 'left' },
        1: { cellWidth: 'auto' },
      },
      body: [
        ['Professor', dados.professor ?? ''],
        [
          'Competências       específicas da área',
          dados.competencia?.map((t: any) =>t.Numero + ' - ' + t.Competencia)?.join('\n\n') ?? '',
        ],
        ['Habilidade', dados.habilidade?.map((t: any) => t.Codigo + ' - ' +t.Habilidade)?.join('\n\n') ?? ''],
        ['Objetos de conhecimento', dados.objetoConhecimento ?? ''],
        ['Critérios de avaliação', ''],
        ['Caminho Metodológico', dados.caminhoMetodologico ?? ''],
        ['IFAs (Itinerários Formativos)', ''],
        ['Atividades Integradoras     (40 horas anuais)', ''],
        ['Recomposição da Aprendizagem (Língua Portuguesa e Matemática)', ''],
        ['Critérios de Avaliação', ''],
        [
          'Instrumentos de Avaliação',
          juntarComE(dados.instrumento?.map((t: any) => t)) ?? '',
        ],
        ['Adaptação curricular para estudante incluso', ''],
      ],
    });

    //doc.save('plano_de_aula.pdf');
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

}

function juntarComE(array: string[]): string {
  if (array.length === 0) return '';
  if (array.length === 1) return array[0];
  if (array.length === 2) return `${array[0]} e ${array[1]}`;

  return `${array.slice(0, -1).join(', ')} e ${array.at(-1)}`;
}
