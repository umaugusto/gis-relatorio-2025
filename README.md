# README — Template de Apresentação HTML/CSS

Este documento contém as orientações técnicas para trabalhar com o template de apresentação. Leia antes de fazer qualquer modificação.

---

## Arquitetura do Projeto

```
Relatorio_Entrega/
├── README.md           ← Este arquivo (orientações técnicas)
├── index.html          ← Apresentação final (editar conteúdo aqui)
├── styles/
│   ├── variables.css   ← Design tokens (cores, fontes, espaçamentos)
│   └── main.css        ← Estilos globais e layouts
└── assets/
    └── (logos e imagens)
```

### Princípios

1. **Dois arquivos CSS apenas**: `variables.css` (tokens) e `main.css` (estilos)
2. **CSS inline apenas para exceções**: quando um slide específico precisa de ajuste que não faz sentido globalizar
3. **Print-first**: o layout é desenhado para funcionar no PDF primeiro, depois adaptado para tela
4. **100% estático**: sem animações, transições ou hovers — documento para impressão/PDF

---

## CSS: Global vs Inline

### Quando usar CSS Global (`main.css`)

- Estrutura base do slide (dimensões, grid, header, footer)
- Layouts reutilizáveis (2 colunas, 3 colunas, cards, timeline)
- Tipografia e hierarquia de texto
- Componentes que aparecem em múltiplos slides

### Quando usar CSS Inline (dentro do `<style>` no HTML ou atributo `style=""`)

- Ajuste de posição específico de UM elemento em UM slide
- Override temporário para teste (depois globalizar se funcionar)
- Espaçamento pontual que não se repete

### Regra de Ouro

> **Se você está copiando o mesmo CSS inline em mais de um slide, ele deveria estar no arquivo global.**

---

## Especificidade CSS — Como Evitar Conflitos

### Hierarquia de Especificidade (do menor para o maior)

```
1. Seletor de elemento:        p { }              → 0,0,1
2. Seletor de classe:          .card { }          → 0,1,0
3. Seletor de ID:              #slide-1 { }       → 1,0,0
4. Inline style:               style="..."        → 1,0,0,0
5. !important:                 color: red !important;
```

### Problemas Comuns de Especificidade

**Problema 1: CSS global não funciona**

```css
/* main.css */
.card { padding: 20px; }

/* Mas no HTML existe: */
<div class="card" style="padding: 10px;">  /* ← Inline vence */
```

**Solução:** Remover o inline e ajustar no global, ou usar classe modificadora:

```css
.card { padding: 20px; }
.card--compact { padding: 10px; }
```

**Problema 2: Regra anterior está "travando" o estilo**

```css
/* Alguém escreveu antes: */
.slide .card { padding: 30px; }  /* ← Especificidade 0,2,0 */

/* Sua regra não funciona: */
.card { padding: 20px; }         /* ← Especificidade 0,1,0 (perde) */
```

**Solução:** Igualar ou superar a especificidade:

```css
.slide .card { padding: 20px; }  /* ← Agora funciona */
```

**Problema 3: `!important` em cascata**

> **Nunca use `!important` no CSS global.** Quando você usa, a única forma de sobrescrever é com outro `!important`, criando uma escalada sem fim.

**Exceção:** `!important` pode ser usado em regras de `@media print` quando necessário forçar comportamento de impressão.

---

## Regras para Print/PDF

### A regra @page

```css
@page {
  size: 1280px 720px;
  margin: 0;
}
```

Esta regra define o tamanho da página no PDF. **Deve estar no início do `main.css`.**

### Estrutura do @media print

```css
@media print {
  /* 1. Reset do body */
  body {
    margin: 0;
    padding: 0;
    background: white;
  }

  /* 2. Slide com dimensões fixas */
  .slide {
    width: 1280px !important;
    height: 720px !important;
    page-break-after: always;
    page-break-inside: avoid;
    box-shadow: none;
  }

  /* 3. Esconder elementos desnecessários */
  .no-print {
    display: none !important;
  }
}
```

### Por que `!important` é permitido aqui?

No contexto de print, `!important` garante que as dimensões fixas do slide não sejam sobrescritas por regras de screen que possam ter maior especificidade.


---

## Problemas Comuns e Soluções

### Problema: Slide quebra no PDF

**Sintomas:** Conteúdo cortado, slide dividido em duas páginas

**Causas possíveis:**
1. Altura do conteúdo excede 720px
2. Falta `page-break-inside: avoid` no `.slide`
3. Elemento com `margin` ou `padding` excessivo empurrando conteúdo

**Solução:**
```css
.slide {
  height: 720px;
  overflow: hidden;        /* Corta conteúdo excedente */
  page-break-inside: avoid;
}
```

**Prevenção:** Sempre testar exportação PDF após adicionar conteúdo.

---

### Problema: Layout diferente na tela e no PDF

**Sintomas:** Na tela está correto, no PDF está quebrado (ou vice-versa)

**Causa:** Conflito entre regras de `@media screen` e `@media print`

**Solução:** Estruturar CSS nesta ordem:

```css
/* 1. Estilos base (aplicam a ambos) */
.slide { ... }

/* 2. Ajustes específicos para tela */
@media screen {
  .slide { ... }
}

/* 3. Ajustes específicos para print (por último) */
@media print {
  .slide { ... }
}
```

---

### Problema: Fontes não carregam no PDF

**Sintomas:** Fonte padrão do sistema no lugar da fonte definida

**Causa:** Google Fonts ou fontes externas podem não carregar no contexto de print

**Solução:** Usar fontes seguras como fallback:

```css
font-family: 'Work Sans', Arial, Helvetica, sans-serif;
```

---

### Problema: Imagem não aparece no PDF

**Sintomas:** Espaço vazio onde deveria estar a imagem

**Causas possíveis:**
1. Imagem com `background-image` (alguns navegadores não imprimem backgrounds)
2. Caminho relativo incorreto

**Solução:** Usar `<img>` ao invés de `background-image` para conteúdo importante:

```html
<!-- Correto -->
<img src="assets/grafico.png" alt="Gráfico">

<!-- Evitar para conteúdo importante -->
<div style="background-image: url(assets/grafico.png)"></div>
```

Se precisar usar background, adicionar:

```css
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
```


---

## Padrões de Trabalho

### Convenção de Nomenclatura (BEM simplificado)

```css
/* Bloco */
.card { }

/* Elemento (parte do bloco) */
.card__title { }
.card__content { }

/* Modificador (variação) */
.card--highlight { }
.card--compact { }
```

### Estrutura de um Slide

```html
<section class="slide" id="slide-N">
  <header class="slide__header">
    <!-- Breadcrumb, logo -->
  </header>
  
  <div class="slide__content">
    <!-- Conteúdo principal -->
  </div>
  
  <footer class="slide__footer">
    <!-- Paginação, metadados -->
  </footer>
</section>
```

### Ordem das Propriedades CSS

Manter consistência na ordem:

```css
.elemento {
  /* 1. Posicionamento */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  /* 2. Box Model */
  display: flex;
  width: 100%;
  height: auto;
  padding: 20px;
  margin: 0;

  /* 3. Tipografia */
  font-family: inherit;
  font-size: 16px;
  line-height: 1.5;
  color: #333;

  /* 4. Visual */
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  /* 5. Outros */
  cursor: pointer;
  transition: all 0.2s;
}
```


---

## Uso de Variáveis CSS (Design Tokens)

### Por que usar variáveis?

1. **Consistência:** Mesmos valores em todo o projeto
2. **Manutenção:** Mudar em um lugar, reflete em todos
3. **Legibilidade:** `var(--space-4)` é mais claro que `16px`

### Variáveis Disponíveis

```css
/* Espaçamento */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;

/* Tipografia */
--font-size-h1: 48px;
--font-size-h2: 36px;
--font-size-h3: 24px;
--font-size-body: 18px;
--font-size-small: 14px;
--font-size-tiny: 12px;

/* Cores (escala de cinza para wireframe) */
--color-gray-900: #1a1a1a;
--color-gray-700: #4a4a4a;
--color-gray-500: #737373;
--color-gray-300: #a3a3a3;
--color-gray-100: #e5e5e5;
--color-gray-50: #f5f5f5;
--color-white: #ffffff;
```

### Regra

> **Nunca use valores hardcoded.** Sempre use variáveis.

```css
/* ❌ Errado */
.card { padding: 16px; }

/* ✅ Correto */
.card { padding: var(--space-4); }
```

---

## Checklist Antes de Modificar

### Antes de adicionar CSS novo

- [ ] Verificar se já existe classe que faz o que preciso
- [ ] Verificar se posso estender classe existente com modificador
- [ ] Se for criar classe nova, seguir convenção BEM

### Antes de usar CSS inline

- [ ] Confirmar que é ajuste único (não vai se repetir)
- [ ] Se for se repetir, criar classe global

### Antes de commitar/salvar

- [ ] Testar na tela (responsividade)
- [ ] Testar exportação PDF (Ctrl+P → Salvar como PDF)
- [ ] Verificar se não quebrou outros slides

### Ao encontrar bug de layout

1. Identificar se é problema de tela ou de print
2. Usar DevTools para inspecionar elemento
3. Verificar cascata de estilos (quem está vencendo?)
4. Corrigir na especificidade correta
5. Testar novamente em ambos contextos


---

## Área Útil do Slide

### Dimensões

```
Slide total:     1280 × 720 px
Padding:         64px (cada lado)
Header:          ~48px
Footer:          ~40px

Área útil:       1152 × 568 px (aproximadamente)
```

### Implicações

- Conteúdo não deve exceder altura útil de ~568px
- Em layouts de 2 colunas, cada coluna tem ~556px de largura
- Textos longos devem usar `overflow: hidden` ou ser resumidos

---

## Workflow de Edição

### Para editar conteúdo

1. Abrir `index.html`
2. Localizar o slide pelo `id="slide-N"`
3. Editar texto dentro das tags
4. Salvar e atualizar navegador
5. Testar PDF

### Para criar novo slide

1. Copiar estrutura de slide existente similar
2. Atualizar `id` e `data-slide`
3. Editar conteúdo
4. Ajustar layout se necessário (preferir classes globais)

### Para criar novo layout

1. Verificar se não existe similar em `main.css`
2. Criar classe no `main.css` (não inline)
3. Testar em tela e PDF
4. Documentar no README se for layout reutilizável

---

## Debugging

### DevTools do Chrome

1. `F12` para abrir DevTools
2. `Ctrl+Shift+C` para inspecionar elemento
3. Aba "Styles" mostra cascata de CSS
4. Aba "Computed" mostra valores finais aplicados

### Simular Print no DevTools

1. DevTools → `...` (menu) → More tools → Rendering
2. Emulate CSS media type → `print`
3. Agora a página mostra como será no PDF

### Verificar qual regra está vencendo

No DevTools, regras riscadas (~~strikethrough~~) foram sobrescritas. A regra no topo da lista é a que está aplicada.

---

## Referências Rápidas

### Tamanhos de Slide Comuns

| Proporção | Dimensões | Uso |
|-----------|-----------|-----|
| 16:9 | 1280 × 720 | Padrão (este template) |
| 16:9 | 1920 × 1080 | Alta resolução |
| 4:3 | 1024 × 768 | Legacy |

### Unidades CSS

| Unidade | Uso |
|---------|-----|
| `px` | Dimensões fixas (slides, imagens) |
| `%` | Proporções relativas ao pai |
| `em` | Relativo ao font-size do elemento |
| `rem` | Relativo ao font-size do root |

### Cores em Escala de Cinza (Wireframe)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-gray-900` | #1a1a1a | Texto principal |
| `--color-gray-700` | #4a4a4a | Texto secundário |
| `--color-gray-500` | #737373 | Texto terciário, bordas |
| `--color-gray-300` | #a3a3a3 | Bordas sutis |
| `--color-gray-100` | #e5e5e5 | Backgrounds secundários |
| `--color-white` | #ffffff | Background principal |

---

*Última atualização: 11 de dezembro de 2025*


---

# PLANO DE TRABALHO — GIS Relatório de Encerramento 2025

Este plano orienta a construção da apresentação. Atualizar após cada pacote de trabalho.

**Última atualização:** 11/12/2025
**Status geral:** ✅ Estrutura completa — 36 slides inseridos, aguardando refinamentos pontuais

---

## Estrutura Geral

| Parte | Slides | Descrição | Status |
|-------|--------|-----------|--------|
| **Síntese Executiva** | 1-10 | Visão rápida para liderança | 🟡 Parcial |
| **Detalhamento** | 11-36 | Memória institucional completa | ⚪ Não iniciado |

**Total:** 36 slides

---

## PARTE 1 — SÍNTESE EXECUTIVA (10 slides)

| # | Slide | Layout | Status |
|---|-------|--------|--------|
| 1 | Capa | Hero escuro | ✅ Criado |
| 2 | Sumário | Lista navegável | ✅ Criado |
| 3 | Origem do Projeto | Número destaque | ✅ Criado |
| 4 | O Desafio | Texto centralizado | ✅ Criado |
| 5 | Jornada | Timeline horizontal | ✅ Criado |
| 6 | Principais Entregas | Grid 3 colunas | ✅ Criado |
| 7 | Aprendizados-Chave | Grid 2x2 | ✅ Criado |
| 8 | Direcionamento 2026 | Grid 4 colunas | ✅ Criado |
| 9 | Próximos Passos | Timeline 3 fases | ✅ Criado |
| 10 | Transição | Minimalista | ✅ Criado |

---

## PARTE 2 — DETALHAMENTO (26 slides)

### Seção 01: Contexto e Justificativa

| # | Slide | Layout | Status |
|---|-------|--------|--------|
| 11 | Capa de Seção | Número grande + título | ✅ Criado |
| 12 | A APS do Einstein | 2 colunas | ✅ Criado |
| 13 | Avaliação CBA | Número destaque (62) | ✅ Criado |
| 14 | O Problema de Fundo | Texto + contexto | ✅ Criado |
| 15 | Equipe do Projeto | Tabela RACI | ✅ Criado |

### Seção 02: Metodologia

| # | Slide | Layout | Status |
|---|-------|--------|--------|
| 16 | Capa de Seção | Número grande + título | ✅ Criado |
| 17 | Abordagem de Trabalho | 3 colunas | ✅ Criado |
| 18 | Princípios e Ferramentas | Grid 2x2 | ✅ Criado |


### Seção 03: Resultados

| # | Slide | Layout | Status |
|---|-------|--------|--------|
| 19 | Capa de Seção | Número grande + título | ✅ Criado |
| 20 | Fase CBA (Mai-Ago) | Texto + 2 colunas | ✅ Criado |
| 21 | Entregas da Fase CBA | Grid 3 colunas | ✅ Criado |
| 22 | Primeira Inflexão (Set) | Número destaque | ✅ Criado |
| 23 | Experimento Ágil — Estrutura | 3 colunas | ✅ Criado |
| 24 | Experimento Ágil — Descobertas | Grid 2x2 | ✅ Criado |
| 25 | Segunda Inflexão (Nov) | Número destaque | ✅ Criado |
| 26 | Por que SharePoint | Grid 2x2 | ✅ Criado |

### Seção 04: Aprendizados

| # | Slide | Layout | Status |
|---|-------|--------|--------|
| 27 | Capa de Seção | Número grande + título | ✅ Criado |
| 28 | O que Funcionou | Grid 2x2 | ✅ Criado |
| 29 | Oportunidades de Melhoria | Grid 2x2 | ✅ Criado |
| 30 | Heurísticas para 2026 | Grid 2 colunas | ✅ Criado |

### Seção 05: Direcionamento 2026

| # | Slide | Layout | Status |
|---|-------|--------|--------|
| 31 | Capa de Seção | Número grande + título | ✅ Criado |
| 32 | Tese Central | Texto centralizado | ✅ Criado |
| 33 | SharePoint — 4 Pilares | Grid 4 colunas | ✅ Criado |
| 34 | Recomendações | Grid 2 colunas | ✅ Criado |
| 35 | Cronograma 2026 | Timeline 3 fases | ✅ Criado |

### Encerramento

| # | Slide | Layout | Status |
|---|-------|--------|--------|
| 36 | Fechamento | Hero "Obrigado" | ✅ Criado |

---

## PACOTES DE TRABALHO

### Pacote 0: Fundação ✅ CONCLUÍDO
- [x] Estrutura de pastas
- [x] README com orientações técnicas
- [x] CSS base (variables.css, main.css)
- [x] Slides capa e fechamento
- [x] Repositório Git inicializado
- [x] Estrutura de slides planejada


### Pacote 1: Layouts Base ✅ CONCLUÍDO
- [x] Layout: Capa de Seção (slide--section)
- [x] Layout: Sumário (slide--toc)
- [x] Layout: Número Destaque (slide--metric)
- [x] Layout: Timeline (slide--timeline)
- [x] Layout: Grid 2x2 (layout-2x2)
- [x] Layout: Grid 4 colunas (layout-4col)
- [x] Layout: Tabela (slide--table)
- [x] Layout: Transição (slide--transition)
- [x] Validação do usuário

### Pacote 2: Síntese Executiva — Conteúdo ✅ CONCLUÍDO
- [x] Slides 2-10 inseridos
- [x] Validação do usuário

### Pacote 3: Seções 01-02 — Contexto e Metodologia ✅ CONCLUÍDO
- [x] Slides 11-15: Contexto e Justificativa
- [x] Slides 16-18: Metodologia

### Pacote 4: Seção 03 — Resultados ✅ CONCLUÍDO
- [x] Slides 19-26: Resultados (8 slides)

### Pacote 5: Seções 04-05 — Aprendizados e Direcionamento ✅ CONCLUÍDO
- [x] Slides 27-30: Aprendizados
- [x] Slides 31-35: Direcionamento 2026

### Pacote 6: Revisão Final 🟡 EM ANDAMENTO
- [ ] Ajustes de feedback
- [ ] Teste completo de PDF
- [ ] Navegação funcionando
- [ ] Commit final

---

## PROTOCOLO DE TRABALHO

### Ao iniciar um pacote:
1. Ler este README
2. Verificar status do pacote anterior
3. Confirmar escopo com usuário se necessário

### Durante o pacote:
1. Trabalhar nos itens listados
2. Fazer commits incrementais
3. Testar PDF a cada layout novo

### Ao concluir um pacote:
1. Atualizar status dos itens ([ ] → [x])
2. Atualizar status do pacote (⚪ → ✅)
3. Fazer commit com resumo
4. **AGUARDAR VALIDAÇÃO** antes de prosseguir

### Legenda de Status
- ⚪ Não iniciado
- 🟡 Em andamento / Próximo
- ✅ Concluído
- ❌ Bloqueado

---

## NAVEGAÇÃO (Breadcrumbs)

```
Início
├── Síntese Executiva
│   ├── Origem
│   ├── Jornada
│   ├── Entregas
│   └── Direcionamento
├── Detalhamento
│   ├── 01 Contexto
│   ├── 02 Metodologia
│   ├── 03 Resultados
│   ├── 04 Aprendizados
│   └── 05 Direcionamento
└── Encerramento
```

---

## LAYOUTS DISPONÍVEIS

| Classe | Uso | Criado |
|--------|-----|--------|
| `slide--cover` | Capa abertura | ✅ |
| `slide--closing` | Capa fechamento | ✅ |
| `slide--section` | Capa de seção | ✅ |
| `slide--toc` | Sumário | ✅ |
| `slide--metric` | Número em destaque | ✅ |
| `slide--timeline` | Linha do tempo | ✅ |
| `slide--table` | Tabela | ✅ |
| `slide--transition` | Transição entre partes | ✅ |
| `layout-2x2` | Grid 2x2 | ✅ |
| `layout-4col` | Grid 4 colunas | ✅ |
| `layout-2col` | Grid 2 colunas | ✅ |
| `layout-3col` | Grid 3 colunas | ✅ |
| `.card` | Card genérico para grids | ✅ |

---

*Atualizar este plano após cada pacote de trabalho concluído.*
