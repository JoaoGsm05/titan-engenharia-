# CLAUDE.md — Projeto Titan Engenharia

> **LEITURA OBRIGATÓRIA antes de qualquer sessão:**
> - Este arquivo → contexto técnico e backlog
> - [`PRD.md`](PRD.md) → documentação completa do produto, design system e arquitetura

## 🏗️ Estrutura do Workspace (Organizada em Abril/2026)
O projeto foi reestruturado para separação total de responsabilidades:

```
/Site Marlon/
├── 00-documentacao/   ← [Negócio] Respostas do Marlon, Documentos de Engenharia.
├── 01-ui-ux/          ← [Design/UI] Fotos brutas (originais) e referências.
├── skills/            ← [Automação] Skills customizadas para o Gemini CLI.
│   └── image-optimizer.skill  <-- Ferramenta de otimização de imagens.
└── titan-engenharia/  ← [Code/Fullstack] O projeto Next.js (Front + Back).
```

## 💻 Arquitetura do Projeto (Em `titan-engenharia/`)

### **1. Backend (Refatorado em Camadas)**
- `app/api/contact/route.ts` — Controlador limpo que gerencia as requisições.
- `lib/services/email.ts` — **Novo:** Isola a lógica do Resend e templates HTML.
- `lib/utils/rate-limit.ts` — **Novo:** Gerencia segurança de IP (Anti-spam).

### **2. Frontend & UI/UX**
- `public/assets/fotos/` — **Atualizado:** Contém todas as 21 fotos otimizadas em `.webp`.
- `lib/portfolio.ts` — **Atualizado:** Mapeado com as fotos reais de fornos e processos.
- `components/sections/About.tsx` — **Corrigido:** Usa a foto profissional com banner "WELCOME" legível.

## 🛠️ Ferramentas Customizadas (Skills)
### **Image Optimizer Skill**
- **Local:** `skills/image-optimizer/`
- **Função:** Converte para WebP, redimensiona para 1920px e permite espelhamento horizontal (mirror) para corrigir selfies ou banners invertidos.
- **Uso via Terminal:** `node "../skills/image-optimizer/scripts/optimize.cjs" "origem" "destino" "arquivos-para-espelhar"`

## ✅ Tarefas Concluídas nesta Sessão
- [x] **Arquitetura:** Separação de Back-end (Services) e Front-end (Components).
- [x] **Imagens:** Otimização de 21 fotos brutas para formato WebP de alta performance.
- [x] **Correção Visual:** Espelhamento da `Foto Profissional.jpeg` para corrigir o banner de fundo.
- [x] **Portfólio:** Sincronização do código com as fotos reais de fornos, lingotes e fluxogramas.
- [x] **Skill:** Criação e empacotamento da Skill `image-optimizer`.

## 🚀 Backlog Atual (2026-04-07)

### Correções Visuais (ANTES do deploy)
- [ ] **Logo fundo branco** — `Navbar.tsx` e `Footer.tsx` — usar `mix-blend-mode` ou trocar PNG por SVG/WebP com transparência
- [ ] **Hero escuro** — `Hero.tsx:19` — mudar `opacity-20` para `opacity-30`

### Deploy
- [ ] **GA4:** Criar conta → substituir `G-XXXXXXXXXX` em `lib/config.ts`
- [ ] **OG Image:** Criar `public/assets/og-image.jpg` (1200×630px)
- [ ] **GitHub:** Push do projeto
- [ ] **Vercel:** Conectar repositório + domínio `engenhariatitan.com`
- [ ] **Email:** Trocar `.com.br` por `.com` quando domínio ativo

### Design (via Stitch MCP)
- [ ] Compartilhar PRD no Stitch para análise de melhorias visuais
- [ ] Aplicar melhorias aprovadas cirurgicamente (ver §13 do PRD)

### Conteúdo
- [ ] **i18n EN:** Validar termos de engenharia metalúrgica em `messages/en.json`
- [ ] **LinkedIn/Instagram:** Preencher `lib/config.ts` quando disponíveis

## Regra de Ouro para Mudanças de Design
> Qualquer alteração visual DEVE:
> 1. Ser testada localmente com `npm run dev`
> 2. Respeitar os tokens CSS em `globals.css` (não sobrescrever, apenas estender)
> 3. Não afetar a lógica de backend (`app/api/`, `lib/services/`, `lib/utils/`)
> Ver PRD.md §13 para o workflow completo com Stitch.

---
*Este arquivo deve ser a primeira leitura de qualquer nova sessão para manter a continuidade do projeto.*
