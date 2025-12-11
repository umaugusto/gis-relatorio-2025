# Verificação de Contraste — Identidade Visual Einstein

## Análise WCAG 2.1 (Nível AA)

### Combinações Aprovadas ✅

| Fundo | Texto | Ratio | WCAG AA |
|-------|-------|-------|---------|
| #FFFFFF (branco) | #00539A (azul-escuro) | 7.2:1 | ✅ Passa (AAA) |
| #FFFFFF (branco) | #241F21 (gray-900) | 15.4:1 | ✅ Passa (AAA) |
| #FFFFFF (branco) | #545454 (gray-700) | 6.0:1 | ✅ Passa (AA) |
| #00539A (azul-escuro) | #FFFFFF (branco) | 7.2:1 | ✅ Passa (AAA) |
| #0096D2 (azul-médio) | #FFFFFF (branco) | 3.1:1 | ✅ Passa (AA Large) |
| #F2F2F2 (gray-50) | #00539A (azul-escuro) | 6.5:1 | ✅ Passa (AA) |
| #F2F2F2 (gray-50) | #241F21 (gray-900) | 13.9:1 | ✅ Passa (AAA) |

### Combinações com Atenção ⚠️

| Fundo | Texto | Ratio | Observação |
|-------|-------|-------|------------|
| #FFFFFF (branco) | #0096D2 (azul-médio) | 3.1:1 | Apenas texto grande (≥18pt bold ou ≥24pt) |
| #FFFFFF (branco) | #A6A8AB (gray-500) | 2.7:1 | Não usar para texto principal |
| Gradiente | #FFFFFF (branco) | Variável | OK na área escura do gradiente |

### Combinações Reprovadas ❌

| Fundo | Texto | Ratio | Problema |
|-------|-------|-------|----------|
| #FFFFFF (branco) | #00DBFF (azul-claro) | 1.7:1 | Contraste insuficiente |
| #00DBFF (azul-claro) | #FFFFFF (branco) | 1.7:1 | Contraste insuficiente |
| #00539A (azul-escuro) | #0096D2 (azul-médio) | 2.3:1 | Não combinar azuis entre si |

---

## Recomendações Aplicadas

### Slides de Conteúdo (fundo branco)
- Títulos: `#00539A` (azul-escuro) ✅
- Texto principal: `#241F21` (gray-900) ✅
- Texto secundário: `#545454` (gray-700) ✅
- Labels/Captions: `#545454` (gray-700) — não usar gray-500

### Slides Escuros (capa, seções)
- Todos os textos: `#FFFFFF` ou `rgba(255,255,255,0.8+)` ✅
- Nunca usar azul-claro para texto sobre gradiente

### Elementos de UI
- Bordas: `#D1D4D4` (gray-100) ou `#BABABA` (gray-300) ✅
- Acentos/Links: `#0096D2` (azul-médio) — apenas como destaque, não texto corrido

---

*Última verificação: 11/12/2025*
