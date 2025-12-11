# Workflow de Publicação

Como publicar atualizações da apresentação.

---

## Repositório

| Item | Valor |
|------|-------|
| **GitHub** | https://github.com/umaugusto/gis-relatorio-2025 |
| **GitHub Pages** | https://umaugusto.github.io/gis-relatorio-2025/ |
| **Pasta local** | `OneDrive\Documentos\Einstein\...\Relatorio_Entrega` |

---

## Como Publicar

```powershell
# 1. Abra PowerShell e navegue até a pasta
Set-Location "C:\Users\anton\OneDrive\Documentos\Einstein\Projetos ativos\GIS - Gestão Integrada APS\05_Documentacao\Relatorio_Entrega"

# 2. Verifique mudanças
git status

# 3. Adicione e commite
git add -A
git commit -m "descricao"

# 4. Envie
git push

# GitHub Pages atualiza em ~1 minuto
```

---

## Comandos Úteis

```powershell
git status          # Ver mudanças
git log --oneline   # Ver histórico
git remote -v       # Ver remote
```

---

*Atualizado: 11/dez/2025*
