# Workflow de Publicação

Este documento explica como publicar atualizações da apresentação.

---

## Informações do Repositório

| Item | Valor |
|------|-------|
| **GitHub** | https://github.com/umaugusto/gis-relatorio-2025 |
| **GitHub Pages** | https://umaugusto.github.io/gis-relatorio-2025/ |
| **Branch** | master |
| **Pasta local** | `Downloads\gis-relatorio-2025` |

---

## Como Publicar Atualizações

### Opção 1: Via pasta Downloads (recomendado)

A pasta `C:\Users\anton\Downloads\gis-relatorio-2025` está conectada ao GitHub.

```bash
# 1. Navegue até a pasta
cd C:\Users\anton\Downloads\gis-relatorio-2025

# 2. Copie os arquivos atualizados do OneDrive para cá
# (ou edite diretamente nesta pasta)

# 3. Verifique mudanças
git status

# 4. Adicione e commite
git add -A
git commit -m "descricao-da-alteracao"

# 5. Envie para GitHub
git push

# O GitHub Pages atualiza automaticamente em ~1 minuto
```

### Opção 2: Via GitHub CLI (se pasta for deletada)

```bash
# 1. Clone o repositório
gh repo clone umaugusto/gis-relatorio-2025

# 2. Copie arquivos atualizados para dentro
# 3. Commit e push como acima
```

---

## Estrutura de Pastas

```
OneDrive (fonte mestre)
└── GIS - Gestão Integrada APS/
    └── 05_Documentacao/
        └── Relatorio_Entrega/    ← Editar aqui
            ├── index.html
            ├── styles/
            └── assets/

Downloads (publicação)
└── gis-relatorio-2025/           ← Conectado ao GitHub
    ├── .git/
    ├── index.html
    ├── styles/
    └── assets/
```

---

## Fluxo de Trabalho

1. **Editar** na pasta do OneDrive (fonte mestre)
2. **Copiar** arquivos alterados para `Downloads\gis-relatorio-2025`
3. **Commit + Push** para publicar
4. **Verificar** em https://umaugusto.github.io/gis-relatorio-2025/

---

## Comandos Úteis

```bash
# Ver status do repositório
git status

# Ver histórico de commits
git log --oneline

# Verificar remote configurado
git remote -v

# Forçar atualização (se der conflito)
git push -f origin master
```

---

## Troubleshooting

### "not a git repository"
A pasta não tem .git. Use a pasta `Downloads\gis-relatorio-2025` ou clone novamente.

### "Permission denied"
Execute `gh auth login` para autenticar com GitHub.

### "GitHub Pages não atualizou"
Aguarde 1-2 minutos. Verifique em Settings → Pages se está configurado para branch `master`.

---

*Última atualização: 11 de dezembro de 2025*
