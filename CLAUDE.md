# CLAUDE.md — Projeto Titan Engenharia

> **LEITURA OBRIGATÓRIA antes de qualquer sessão.**
> Leia este arquivo inteiro antes de tocar em qualquer código.
> Para detalhes de produto e design system, consulte também [`PRD.md`](PRD.md).

---

## 🌐 Status do Projeto (Atualizado: 2026-04-08)

| Item | Status | Detalhe |
|------|--------|---------|
| Site no ar | ✅ PRODUÇÃO | [www.engenhariatitan.com](https://www.engenhariatitan.com) |
| Repositório GitHub | ✅ Público | [JoaoGsm05/titan-engenharia-](https://github.com/JoaoGsm05/titan-engenharia-) |
| Deploy | ✅ Vercel | Auto-deploy a cada push no branch `master` |
| Domínio | ✅ Ativo | `engenhariatitan.com` via Cloudflare → Vercel |
| Email (formulário) | ✅ Funcionando | Resend → `marlon@engenhariatitan.com.br` |
| i18n | ✅ PT + EN | `proxy.ts` (Next.js 16 pattern) |

---

## 🏗️ Estrutura do Workspace

```
/Site Marlon/
├── 00-documentacao/   ← [Negócio] Respostas do Marlon, Documentos, Domínio WHOIS.
├── 01-ui-ux/          ← [Design/UI] Fotos brutas (originais) e referências visuais.
├── skills/            ← [Automação] Skills customizadas (image-optimizer).
└── titan-engenharia/  ← [Code] Projeto Next.js — TUDO que é código fica aqui.
```

---

## 💻 Arquitetura do Código (`titan-engenharia/`)

### Stack
| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js | 16.2.2 (App Router, Turbopack) |
| Linguagem | TypeScript | 5.x |
| Estilo | Tailwind CSS | 4.x |
| i18n | next-intl | 4.x — usa `proxy.ts` (NÃO `middleware.ts`) |
| Email | Resend | 4.x — cliente instanciado DENTRO da função, não no módulo |
| Deploy | Vercel | Hobby plan — branch `master` → produção |
| DNS | Cloudflare | Proxy DESATIVADO (nuvem cinza) nos registros A e CNAME |

### Backend
- `app/api/contact/route.ts` — Controlador da API de contato
- `lib/services/email.ts` — Lógica Resend + template HTML (**Resend instanciado dentro da função `sendContactEmail`, não no topo do módulo — necessário para o build da Vercel funcionar**)
- `lib/utils/rate-limit.ts` — Anti-spam por IP

### Frontend
- `components/sections/` — Hero, About, Services, Portfolio, Contact
- `components/layout/` — Navbar, Footer
- `components/ui/` — ServiceCard, ProjectModal, LanguageSwitcher, WhatsAppButton, **MetallurgicalBackground**
- `public/assets/fotos/` — 21 fotos reais otimizadas em `.webp`

### Componente Novo: MetallurgicalBackground
- **Arquivo:** `components/ui/MetallurgicalBackground.tsx`
- **Tipo:** Client Component (`"use client"`)
- **Função:** Canvas animado no Hero — 6 orbs molten (cobre/âmbar), 5 stream lines sinusoidais, 55 sparks ascendentes
- **Integrado em:** `components/sections/Hero.tsx` (z-index: 10, entre foto e conteúdo)

---

## 🔑 Variáveis de Ambiente

| Variável | Onde configurar | Valor atual |
|----------|----------------|-------------|
| `RESEND_API_KEY` | Vercel Dashboard → Settings → Environment Variables | `re_jNRAqoWs_...` (não commitar) |
| `CONTACT_EMAIL` | Vercel Dashboard → Settings → Environment Variables | `marlon@engenhariatitan.com.br` |

> `.env.local` existe localmente mas está no `.gitignore` — **nunca commitar**.

---

## 🌍 Infraestrutura de Deploy

### DNS (Cloudflare)
| Tipo | Nome | Valor | Proxy |
|------|------|-------|-------|
| A (UM) | `@` | `216.198.79.1` | Desativado (cinza) |
| CNAME | `www` | `64d8f7ceaf93b06f.vercel-dns-017.com` | Desativado (cinza) |

### Vercel
- **Projeto:** `titan-engenharia` em `jgsm05-7962s-projects`
- **Domínio principal:** `www.engenhariatitan.com` (Produção)
- **Redirect:** `engenhariatitan.com` → `www.engenhariatitan.com` (307)
- **GitHub:** conectado ao repo `JoaoGsm05/titan-engenharia-` (push = deploy automático)

### Git
- **Author padrão:** `JoaoGsm05 <jgsm05@gmail.com>` (obrigatório — Vercel Hobby rejeita outros autores)
- **Branch:** `master`
- **Commits sem `Co-Authored-By`** — Vercel Hobby interpreta como colaboração e bloqueia

---

## ✅ Histórico de Sessões

### Sessão 1 (2026-04-07)
- Arquitetura backend em camadas (Services + Utils)
- Otimização de 21 fotos brutas para WebP
- Correção visual da Foto Profissional (espelhamento)
- Sincronização do Portfólio com fotos reais
- Skill `image-optimizer` criada

### Sessão 2 (2026-04-08)
- `MetallurgicalBackground.tsx` — efeito Canvas metalúrgico no Hero
- Repositório GitHub criado e publicado (público)
- Varredura de segurança completa — sem chaves expostas
- Resend refatorado: cliente instanciado dentro da função (fix crítico de build)
- Deploy na Vercel funcionando
- Domínio `engenhariatitan.com` configurado via Cloudflare
- Site em produção: **www.engenhariatitan.com**

---

## 🚀 Backlog (próxima sessão)

### Alta Prioridade
- [ ] **Logo fundo branco** — `Navbar.tsx` e `Footer.tsx` — trocar `logo.png` por versão com transparência ou usar `mix-blend-mode: lighten`
- [ ] **OG Image** — Criar `public/assets/og-image.jpg` (1200×630px) para compartilhamento em redes sociais

### Média Prioridade
- [ ] **GA4** — Criar conta Google Analytics → substituir `G-XXXXXXXXXX` em `lib/config.ts:22`
- [ ] **Email domínio** — Trocar `marlon@engenhariatitan.com.br` por `marlon@engenhariatitan.com` em `CONTACT_EMAIL` (Vercel) e `lib/config.ts` quando domínio de email estiver ativo no Resend

### Baixa Prioridade
- [ ] **LinkedIn/Instagram** — Preencher strings vazias em `lib/config.ts:19-20`
- [ ] **i18n EN** — Validar termos técnicos de metalurgia em `messages/en.json`

---

## Regras de Ouro (não violar)

1. **Build local antes de push:** `npm run build` deve passar sem erros
2. **Git author:** sempre `JoaoGsm05 <jgsm05@gmail.com>` — Vercel Hobby bloqueia outros autores
3. **Sem `Co-Authored-By` nos commits** — Vercel interpreta como colaboração (plano Hobby)
4. **Resend client:** instanciar DENTRO da função, nunca no topo do módulo
5. **Mudanças visuais:** cirúrgicas — não reescrever componentes funcionais, só estender
6. **Tokens CSS:** apenas adicionar em `globals.css`, nunca remover sem avaliar impacto
7. **Backend intocável:** não alterar `app/api/`, `lib/services/`, `lib/utils/` sem necessidade explícita

---

*Atualizado em 2026-04-08 — Próxima leitura obrigatória antes de qualquer sessão.*
