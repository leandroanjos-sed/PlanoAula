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
  exibirTodosOsCampos: boolean = false;
  habilidades: any[] = [];
  habilidadesCurriculoDigital: any[] = [];
  habilidadesLinguaPortuguesa: any[] = [];
  habilidadesArtesVisuais: any[] = [];
  habilidadesDanca: any[] = [];
  habilidadesMusica: any[] = [];
  habilidadesTeatro: any[] = [];
  competencias: any[] = [];
  escolas = [
    {
      label: 'São Lourenço do Oeste',
      value: 'sao-lourenco-do-oeste',
      items: [
        { label: 'EEB Sóror Angélica', value: 'EEB Sóror Angélica' },
        { label: 'CEJA', value: 'CEJA' },
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
    {
      label: 'Novo Horizonte',
      value: 'novo-horizonte',
      items: [{ label: 'EEB Santa Lúcia', value: 'EEB Santa Lúcia' }],
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
    quantidadeAulas: new FormControl(undefined, Validators.required),
    competencia: new FormControl(),
    habilidade: new FormControl(),
    habilidadeLinguaPortuguesa: new FormControl(),
    habilidadeCurriculoDigital: new FormControl(),
    habilidadeArtesVisuais: new FormControl(),
    habilidadeDanca: new FormControl(),
    habilidadeMusica: new FormControl(),
    habilidadeTeatro: new FormControl(),
    itinerarioFormativo: new FormControl(),
    objetoConhecimento: new FormControl(),
    caminhoMetodologico: new FormControl(),
    recomposicaoAprendizagem: new FormControl(),
    adaptacaoCurricular: new FormControl(),
    atividadesIntegradoras: new FormControl(),
    recurso: new FormControl(),
    outrosRecursos: new FormControl(),
    criteriosAvaliacao: new FormControl(),
    instrumento: new FormControl(),
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
  get professor() {
    return this.planejamentoForm.get('professor')!;
  }
  get quantidadeAulas() {
    return this.planejamentoForm.get('quantidadeAulas')!;
  }

  exibirOsCampos() {
    if (this.planejamentoForm.invalid) {
      Object.values(this.planejamentoForm.controls).forEach((c) => {
        c.markAsDirty();
        c.markAsTouched();
      });
      return;
    }
    this.exibirTodosOsCampos = true;
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

      if (this.disciplina.value?.includes('Arte')) {
        this.habilidadesArtesVisuais =
          HabilidadeUtil.habilidadesAnosFinais.filter(
            (t) =>
              this.disciplina.value?.includes(t.Disciplina) &&
              t.Codigo.slice(2, 4).includes(this.serieAno.value[0]) &&
              t.Area?.includes('Teatro'),
          );
        this.habilidadesDanca = HabilidadeUtil.habilidadesAnosFinais.filter(
          (t) =>
            this.disciplina.value?.includes(t.Disciplina) &&
            t.Codigo.slice(2, 4).includes(this.serieAno.value[0]) &&
            t.Area?.includes('Dança'),
        );
        this.habilidadesMusica = HabilidadeUtil.habilidadesAnosFinais.filter(
          (t) =>
            this.disciplina.value?.includes(t.Disciplina) &&
            t.Codigo.slice(2, 4).includes(this.serieAno.value[0]) &&
            t.Area?.includes('Música'),
        );
        this.habilidadesTeatro = HabilidadeUtil.habilidadesAnosFinais.filter(
          (t) =>
            this.disciplina.value?.includes(t.Disciplina) &&
            t.Codigo.slice(2, 4).includes(this.serieAno.value[0]) &&
            t.Area?.includes('Teatro'),
        );
      }
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
      event.value?.pop();
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
          this.competencia.value
            ?.map((c: any) => c.Numero + '')
            .includes(t.Competencia as number),
      );

      this.habilidadesCurriculoDigital =
        HabilidadeUtil.habilidadesCurriculoDigital.filter(
          (t) => !t.Etapa.includes('Ensino Médio'),
        );

      const numeros = new Set<number>(
        this.competencia.value?.map((c: any) => c.Numero) ?? [],
      );

      this.habilidadesLinguaPortuguesa =
        HabilidadeUtil.habilidadesLinguaPortuguesaEM
          .map((grupo) => ({
            ...grupo,
            items: grupo.items.filter((t) =>
              t.Competencia.some((comp) => numeros.has(comp)),
            ),
          }))
          .filter((grupo) => grupo.items.length > 0);
    }
  }

  onChangeHabilidade(event: ListboxChangeEvent) {
    if (event.value?.length > 4) {
      event.value?.pop();
      this.messageService.add({
        severity: 'info',
        detail: 'Máximo de quatro habilidades por plano de aula!',
        summary: 'Aviso',
      });
    }
  }

  onChangeHabilidadeArte(event: ListboxChangeEvent) {
    if (event.value?.length > 2) {
      event.value?.pop();
      this.messageService.add({
        severity: 'info',
        detail: 'Máximo de quatro habilidades por plano de aula!',
        summary: 'Aviso',
      });
    }
  }

  onChangeInstrumentos(event: ListboxChangeEvent) {
    if (event.value?.length > 2) {
      event.value?.pop();
      this.messageService.add({
        severity: 'info',
        detail: 'Máximo de dois instrumentos de avaliação!',
        summary: 'Aviso',
      });
    }
  }

  async gerarPdf() {
    if (this.planejamentoForm.invalid) {
      Object.values(this.planejamentoForm.controls).forEach((c) => {
        c.markAsDirty();
        c.markAsTouched();
      });
      return;
    }

    let isEnsinoMedio = this.serieAno.value?.includes('Ensino Médio');
    const dados = structuredClone(this.planejamentoForm.getRawValue());

    if (dados.outrasReferencias && dados.outrasReferencias.length > 0) {
      dados.referencia.push(dados.outrasReferencias);
    }

    if (dados.outrosInstrumentos && dados.outrosInstrumentos.length > 0) {
      dados.instrumento.push(dados.outrosInstrumentos);
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    doc.setDocumentProperties({ title: 'Plano de Aula' });

    switch (this.escola.value) {
      case 'EEB Sóror Angélica':
        const logo_soror = await this.carregarImagem(
          'assets/img/logos-escolas/soror-angelica.png',
        );
        doc.addImage(logo_soror, 'PNG', 14, 7, 24, 24);
        doc.setFontSize(10);
        doc.text('ESTADO DE SANTA CATARINA', 40, 14);
        doc.text('ESCOLA DE EDUCAÇÃO BÁSICA SÓROR ANGÉLICA', 40, 18);
        doc.text('SÃO LOURENÇO DO OESTE - SC', 40, 22);
        doc.text('Email:', 40, 26);
        doc.setTextColor('#0000FC');
        doc.text('eebsororangelica@sed.sc.gov.br', 51, 26);
        doc.setDrawColor('#0000FF');
        doc.line(
          51,
          26.5,
          52 + doc.getTextWidth('eebsororangelica@sed.sc.gov.br'),
          26.5,
        );
        doc.setTextColor('#000000');
        doc.text('Fone 49 3372 - 1049', 115, 26);
        break;
      case 'EEB Emílio Garrastazu Médici':
        const logo_medici = await this.carregarImagem(
          'assets/img/logos-escolas/medici.png',
        );
        doc.addImage(logo_medici, 'PNG', 14, 7, 146.12, 23.53);
        break;
      case 'EEB Raul Pompéia':
        const logo_pompeia = await this.carregarImagem(
          'assets/img/logos-escolas/pompeia.png',
        );
        doc.addImage(logo_pompeia, 'PNG', 24, 7, 144.04, 28.73);
        break;
      case 'CEDUP Campo Erê':
        const logo_cedup = await this.carregarImagem(
          'assets/img/logos-escolas/cedup.png',
        );
        doc.addImage(logo_cedup, 'PNG', 24, 7, 163.28, 30.68);
        break;
      case 'EEB São Bernardino':
        const logo_bernardino = await this.carregarImagem(
          'assets/img/logos-escolas/bernardino.png',
        );
        doc.addImage(logo_bernardino, 'PNG', 26, 7, 143.26, 31.59);
        break;
      case 'EEB Maria Madalena de Moura Ferro':
        const logo_maria_madalena = await this.carregarImagem(
          'assets/img/logos-escolas/maria-madalena.png',
        );
        doc.addImage(logo_maria_madalena, 'PNG', 24, 7, 152, 32.8);
        break;
      case 'EEB Profª Olga Nunes de Abreu':
        const logo_olga = await this.carregarImagem(
          'assets/img/logos-escolas/olga.png',
        );
        doc.addImage(logo_olga, 'PNG', 26, 7, 147.81, 36.79);
        break;
      case 'EEB Verônica Senem':
        const logo_veronica = await this.carregarImagem(
          'assets/img/logos-escolas/veronica.png',
        );
        doc.addImage(logo_veronica, 'PNG', 26, 7, 103.35, 25.22);
        break;
      case 'EEB Santa Lúcia':
        const logo_santa_lucia = await this.carregarImagem(
          'assets/img/logos-escolas/santa-lucia.png',
        );
        doc.addImage(logo_santa_lucia, 'PNG', 28, 7, 155.22, 34.71);
        break;
      case 'CEJA':
        const logo_ceja = await this.carregarImagem(
          'assets/img/logos-escolas/ceja.png',
        );
        doc.addImage(logo_ceja, 'PNG', 25, 7, 165.36, 27.43);
        break;
      default:
        const logo = await this.carregarImagem('assets/img/logo-sed.png');
        doc.addImage(logo, 'PNG', 14, 11, 20, 20);
        doc.setFontSize(10);
        doc.text('ESTADO DE SANTA CATARINA', 36, 14);
        doc.text('SECRETARIA DE ESTADO DA EDUCAÇÃO', 36, 18);
        doc.text('3º CRE - SÃO LOURENÇO DO OESTE', 36, 22);
        doc.text('ESCOLA: E.E.B. _________________', 36, 26);
        doc.text('MUNICÍPIO: _____________________', 36, 30);
        break;
    }

    doc.setFontSize(14);

    if (isEnsinoMedio) {
      doc.text('PLANO DE AULA - ENSINO MÉDIO', 70, 60);
    } else {
      doc.text('PLANO DE AULA', 89, 60);
      doc.text('NO ENSINO FUNDAMENTAL', 75, 66);
    }

    autoTable(doc, {
      theme: 'grid',
      startY: 70,
      styles: {
        fontSize: 10,
        cellPadding: 2,
        textColor: 0, // preto
        lineColor: 0,
      },
      columnStyles: {
        0: { cellWidth: 30, halign: 'center' },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 'auto', halign: 'center' },
      },
      body: [
        [
          'Ano/série',
          dados.serieAno?.split(',')[0] ?? '',
          'Número de Aulas',
          dados.quantidadeAulas,
          'Período',
          (dados.dataInicial?.toLocaleDateString() ?? '') +
            ' - ' +
            (dados.dataFinal?.toLocaleDateString() ?? ''),
        ],
      ],
    });

    let body: any[] = [];
    body.push(['Componente curricular', dados.disciplina ?? '']);
    body.push(['Professor', dados.professor ?? '']);
    body.push([
      'Competências       específicas da área',
      dados.competencia
        ?.map((t: any) => t.Numero + ' - ' + t.Competencia)
        ?.join('\n\n') ?? '',
    ]);

    if (
      !this.serieAno.value?.includes('Ensino Médio') &&
      this.disciplina.value?.includes('Artes')
    ) {
      body.push([
        'Habilidade',
        'Artes Visuais\n\n' +
          dados.habilidadeArtesVisuais
            ?.map((t: any) => t.Codigo + ' - ' + t.Habilidade)
            ?.join('\n\n') +
          '\n\nDança\n\n' +
          dados.habilidadeDanca
            ?.map((t: any) => t.Codigo + ' - ' + t.Habilidade)
            ?.join('\n\n') +
          '\n\nMúsica\n\n' +
          dados.habilidadeMusica
            ?.map((t: any) => t.Codigo + ' - ' + t.Habilidade)
            ?.join('\n\n') +
          '\n\nTeatro\n\n' +
          dados.habilidadeTeatro
            ?.map((t: any) => t.Codigo + ' - ' + t.Habilidade)
            ?.join('\n\n'),
      ]);
    } else {
      body.push([
        'Habilidade',
        dados.habilidade
          ?.map(
            (t: any) =>
              (t.Codigo.length > 4 ? t.Codigo : '') + ' - ' + t.Habilidade,
          )
          ?.join('\n\n') ?? '',
      ]);
    }

    if (
      this.serieAno.value?.includes('Ensino Médio') &&
      this.disciplina.value?.includes('Língua Portuguesa')
    ) {
      const porCampo = new Map<string, string[]>();

      for (const t of dados.habilidadeLinguaPortuguesa ?? []) {
        if (!porCampo.has(t.CampoDeAtuacao)) {
          porCampo.set(t.CampoDeAtuacao, []);
        }
        porCampo.get(t.CampoDeAtuacao)!.push(`${t.Codigo} - ${t.Habilidade}`);
      }

      const texto = Array.from(porCampo.entries())
        .map(
          ([campo, habilidades]) => `${campo}\n\n${habilidades.join('\n\n')}`,
        )
        .join('\n\n\n');

      body.push(['Habilidades de Língua Portuguesa', texto ?? '']);
    }

    body.push([
      'Habilidade do Currículo Digital',
      dados.habilidadeCurriculoDigital
        ?.map((t: any) => t.Codigo + ' - ' + t.Habilidade)
        ?.join('\n\n') ?? '',
    ]);

    if (
      this.serieAno.value?.includes('Ensino Médio') &&
      (this.disciplina.value?.includes('Biologia') ||
        this.disciplina.value?.includes('Matemática') ||
        this.disciplina.value?.includes('Língua Portuguesa') ||
        this.disciplina.value?.includes('Geografia'))
    ) {
      body.push([
        'IFAs (itinerários Formativos)',
        dados.itinerarioFormativo ?? '',
      ]);
    }

    body.push(['Objetos de conhecimento', dados.objetoConhecimento ?? '']);
    body.push(['Caminho Metodológico', dados.caminhoMetodologico ?? '']);
    if (this.serieAno.value?.includes('Ensino Médio')) {
      body.push([
        'Atividades Integradoras     (40 horas anuais)',
        dados.atividadesIntegradoras ?? '',
      ]);
    }
    body.push([
      'Recomposição da Aprendizagem (Língua Portuguesa e Matemática)',
      dados.recomposicaoAprendizagem ?? '',
    ]);
    body.push(['Critérios de Avaliação', dados.criteriosAvaliacao ?? '']);
    body.push([
      'Instrumentos de Avaliação',
      juntarComE(dados.instrumento?.map((t: any) => t)) ?? '',
    ]);
    body.push([
      'Adaptação curricular para estudante incluso',
      dados.adaptacaoCurricular ?? '',
    ]);
    body.push(['Referências', dados.referencia?.join('\n\n') ?? '']);

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
      body: body,
    });

    //doc.save('plano_de_aula.pdf');
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  private async carregarImagem(url: string): Promise<string> {
    const resposta = await fetch(url);
    const blob = await resposta.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}

function juntarComE(array: string[]): string {
  if (array == undefined) return '';
  if (array.length === 0) return '';
  if (array.length === 1) return array[0];
  if (array.length === 2) return `${array[0]} e ${array[1]}`;

  return `${array.slice(0, -1).join(', ')} e ${array.at(-1)}`;
}
