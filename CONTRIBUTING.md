# Documentação Técnica — Template de Apresentação HTML/CSS

Este documento contém as orientações técnicas para trabalhar com o template. Leia antes de fazer qualquer modificação.

---

## Arquitetura do Projeto

```
Relatorio_Entrega/
├── README.md           ← Sobre o projeto (público)
├── CONTRIBUTING.md     ← Este arquivo (documentação técnica)
├── WORKFLOW.md         ← Como publicar atualizações
├── index.html          ← Apresentação (editar conteúdo aqui)
├── styles/
│   ├── variables.css   ← Design tokens (cores, fontes, espaçamentos)
│   └── main.css        ← Estilos globais e layouts
└── assets/             ← Logos e imagens
```

---

## Princípios

1. **Dois arquivos CSS apenas**: `variables.css` (tokens) e `main.css` (estilos)
2. **CSS inline apenas para exceções**: ajustes específicos de um slide
3. **Print-first**: layout desenhado para PDF primeiro
4. **100% estático**: sem animações ou transições
5. **Área útil limitada**: ~504px de altura útil por slide

---

## Área Útil do Slide

```
Slide total:     1280 × 720 px
Header:          ~48px
Footer:          ~40px
Margens:         ~64px vertical

Área útil:       1152 × ~504px
```

### Limites por Tipo de Slide

| Tipo | Limite |
|------|--------|
| Texto corrido | 8-10 linhas |
| Lista/bullets | 6-8 itens |
| Cards (2col) | 2 cards, 3 linhas cada |
| Cards (3col) | 3 cards, 2 linhas cada |
| Grid 2×2 | 4 quadrantes, 2-3 linhas |
| Tabela | 8-10 linhas |
| Timeline | 4 itens |

**Regra prática:** +15 elementos = provavelmente vai estourar.

---

## Layouts Disponíveis

| Classe | Uso |
|--------|-----|
| `slide--cover` | Capa abertura |
| `slide--closing` | Capa fechamento |
| `slide--section` | Capa de seção |
| `slide--toc` | Sumário |
| `slide--metric` | Número em destaque |
| `slide--timeline` | Linha do tempo |
| `slide--table` | Tabela |
| `slide--transition` | Transição entre partes |
| `layout-2x2` | Grid 2x2 |
| `layout-2col` | Grid 2 colunas |
| `layout-3col` | Grid 3 colunas |
| `layout-4col` | Grid 4 colunas |
| `.card` | Card genérico |

---

## Variáveis CSS (Design Tokens)

```css
/* Espaçamento */
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-5: 24px;  --space-6: 32px;
--space-7: 48px;  --space-8: 64px;

/* Tipografia */
--font-size-h1: 48px;    --font-size-h2: 36px;
--font-size-h3: 24px;    --font-size-body: 18px;
--font-size-small: 14px; --font-size-tiny: 12px;

/* Cores (escala de cinza) */
--color-gray-900: #1a1a1a;  --color-gray-700: #4a4a4a;
--color-gray-500: #737373;  --color-gray-300: #a3a3a3;
--color-gray-100: #e5e5e5;  --color-white: #ffffff;
```

> **Regra:** Nunca use valores hardcoded. Sempre use variáveis.

---

## Regras para Print/PDF

```css
@page {
  size: 1280px 720px;
  margin: 0;
}

@media print {
  .slide {
    width: 1280px !important;
    height: 720px !important;
    page-break-after: always;
    page-break-inside: avoid;
  }
}
```

---

## Problemas Comuns

### Slide quebra no PDF
- Altura do conteúdo excede 720px
- Falta `page-break-inside: avoid`

### Conteúdo cortado
- Excedeu área útil (~504px)
- Soluções: reduzir font-size, reduzir gaps, dividir em 2 slides

### Fontes não carregam
- Usar fallback: `font-family: 'Work Sans', Arial, sans-serif;`

### Imagem não aparece
- Usar `<img>` ao invés de `background-image`
- Adicionar: `print-color-adjust: exact !important;`

---

## Workflow de Edição

1. Abrir `index.html`
2. Localizar slide por `id="slide-N"`
3. Editar conteúdo
4. Salvar e atualizar navegador
5. Testar PDF (Ctrl+P → Salvar como PDF)

---

## Convenção de Nomenclatura (BEM)

```css
.card { }           /* Bloco */
.card__title { }    /* Elemento */
.card--highlight { } /* Modificador */
```

---

## Debugging

1. `F12` → DevTools
2. `Ctrl+Shift+C` → Inspecionar elemento
3. DevTools → More tools → Rendering → Emulate CSS media type → `print`

---

*Última atualização: 11 de dezembro de 2025*
