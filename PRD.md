# PRD — Site Titan Engenharia
**Product Requirements Document — v1.0 (2026-04-07)**

---

## 1. Visão do Produto

**O que é:** Site institucional de uma empresa de engenharia metalúrgica de metais não ferrosos com atuação global.

**Para quem:** Gestores industriais, mineradoras e empresas de metalurgia no Brasil, África e América do Sul que precisam de consultoria técnica especializada.

**Problema que resolve:** Marlon de Mendonça (fundador da Titan Engenharia) precisava de presença digital profissional para captar clientes internacionais. Sem site, dependia apenas de indicações.

**Objetivo de negócio:** MVP para captação de clientes — o KPI principal é o número de contatos recebidos via formulário e WhatsApp.

---

## 2. Personas

### Persona A — Gestor de Mineração (África/América do Sul)
- Procura especialista em metais não ferrosos para novo projeto
- Precisa de referências e portfólio antes de contatar
- Prefere WhatsApp para contato inicial

### Persona B — Empresa Industrial Brasileira
- Quer otimizar processo existente (CAPEX/OPEX)
- Lê todo o conteúdo antes de entrar em contato
- Prefere formulário ou e-mail

---

## 3. Stack Técnica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js | 16 (App Router) |
| Linguagem | TypeScript | 5.x |
| Estilo | Tailwind CSS | 4.x |
| i18n | next-intl | 4.x |
| Email | Resend | 4.x |
| Analytics | GA4 via @next/third-parties | — |
| Sitemap | next-sitemap | — |
| Deploy | Vercel | — |

**Nota crítica:** Next.js 16 usa `proxy.ts` em vez de `middleware.ts`. O next-intl exporta `createMiddleware`, usado dentro de `proxy.ts`.

---

## 4. Arquitetura de Arquivos

```
titan-engenharia/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          ← Layout raiz com i18n, GA4, metadados
│   │   └── page.tsx            ← Página principal (monta todas as seções)
│   ├── api/contact/
│   │   └── route.ts            ← Controlador da API de contato (Resend)
│   ├── favicon.ico
│   └── globals.css             ← Design tokens CSS + utilitários globais
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Navbar fixa, scroll-aware, mobile menu
│   │   └── Footer.tsx          ← Footer 3 colunas (brand, nav, contato)
│   └── sections/
│   │   ├── Hero.tsx            ← Hero full-screen com BG, stats, CTAs
│   │   ├── About.tsx           ← Foto + texto + stats + missão
│   │   ├── Services.tsx        ← Grid 4 cards de serviços
│   │   ├── Portfolio.tsx       ← Grid 6 projetos com modal
│   │   └── Contact.tsx         ← Formulário + info de contato
│   └── ui/
│       ├── ServiceCard.tsx     ← Card de serviço com ícone SVG
│       ├── ProjectModal.tsx    ← Modal de detalhes do projeto
│       ├── LanguageSwitcher.tsx ← Toggle PT/EN com bandeirinhas
│       └── WhatsAppButton.tsx  ← Botão flutuante WhatsApp
│
├── lib/
│   ├── config.ts               ← Constantes globais (empresa, contato, SEO)
│   ├── portfolio.ts            ← Array de projetos com imagens
│   ├── routing.ts              ← Configuração de rotas i18n
│   └── services/
│       ├── email.ts            ← Lógica Resend + templates HTML
│       └── utils/rate-limit.ts ← Anti-spam por IP
│
├── messages/
│   ├── pt.json                 ← Todas as strings PT-BR
│   └── en.json                 ← Todas as strings EN
│
├── public/assets/fotos/        ← 21 fotos reais otimizadas em .webp
├── proxy.ts                    ← Middleware i18n (Next.js 16 pattern)
└── types/index.ts              ← Tipos TypeScript (Project, ContactFormData)
```

---

## 5. Design System

### 5.1 Tokens de Cor (CSS Custom Properties)

| Token | Valor | Uso |
|-------|-------|-----|
| `--titan-red` | `#CC2020` | Cor primária, CTAs, destaques |
| `--titan-dark-red` | `#791515` | Gradientes, bordas ativas |
| `--titan-black` | `#0D0D0D` | Fundo principal (Hero, About, Portfolio) |
| `--titan-coal` | `#1A1A1A` | Fundo secundário (Services, Contact) |
| `--titan-card` | `#242424` | Background de cards e inputs |
| `--titan-border` | `#2E2E2E` | Bordas, divisores |
| `--titan-text` | `#F0EDE8` | Texto principal (off-white quente) |
| `--titan-muted` | `#9A9A9A` | Texto secundário, subtítulos |
| `--titan-white` | `#FFFFFF` | Texto em fundos escuros (botões) |

### 5.2 Tipografia

- **Família:** `Inter`, `DM Sans`, `system-ui` (fallback)
- **Títulos principais (h1):** `4xl–6xl`, `font-bold`, `tracking-tight`, `leading-[1.1]`
- **Títulos de seção (h2):** `3xl–4xl`, `font-bold`
- **Body:** `sm`, `leading-relaxed`, cor `--titan-muted`
- **Labels de seção:** `0.8rem`, `font-bold`, `uppercase`, `tracking-[0.15em]`, cor `--titan-red`
- **Anti-aliasing:** `antialiased` em `body`

### 5.3 Componentes de UI

#### `.btn-primary`
```css
background: linear-gradient(135deg, #CC2020, #791515)
padding: 12px 28px | border-radius: 4px | font-weight: 600
hover: opacity 0.9 + translateY(-1px)
```

#### `.btn-outline`
```css
background: transparent | border: 1px solid #2E2E2E
hover: border-color #CC2020 + color #CC2020 + translateY(-1px)
```

#### `.titan-card`
```css
background: #242424 | border: 1px solid #2E2E2E | border-radius: 8px
hover: border-color #CC2020 + translateY(-2px)
```

#### `.section-label`
```css
inline-flex + gap-10px | font-size: 0.8rem | font-weight: 700
uppercase | letter-spacing: 0.15em | color: #CC2020
Sempre acompanha .titan-line (barra horizontal vermelha 40px × 3px)
```

#### `.titan-line`
```css
width: 40px | height: 3px
background: linear-gradient(90deg, #CC2020, #791515) | border-radius: 2px
```

#### `.hero-texture`
```css
radial-gradient(ellipse 20% 50%, rgba(204,32,32,0.08))
radial-gradient(ellipse 80% 20%, rgba(121,21,21,0.06))
```

### 5.4 Animações

| Classe | Keyframe | Duração |
|--------|----------|---------|
| `.animate-fade-in-up` | `opacity 0→1 + translateY 24px→0` | `0.6s ease` |
| `.animate-fade-in` | `opacity 0→1` | `0.4s ease` |

Delays escalonados no Hero: `0.1s → 0.2s → 0.3s → 0.4s → 0.5s`

### 5.5 Scrollbar Custom
- **Largura:** 4px | **Track:** `--titan-coal` | **Thumb:** `--titan-red`

### 5.6 Padrões de Layout
- **Container máximo:** `max-w-7xl mx-auto px-6`
- **Padding de seção:** `py-24`
- **Alternância de fundo:** `#0D0D0D` ↔ `#1A1A1A` por seção
- **Scroll offset navbar:** `scroll-margin-top: 80px`

---

## 6. Seções do Site

### 6.1 Navbar (fixed, z-50)
- Logo PNG 140×48px (problema conhecido: fundo branco — ver §9)
- Links de navegação: Sobre, Serviços, Portfólio, Contato
- CTA primário: "Fale Conosco" → WhatsApp
- `LanguageSwitcher` com bandeirinhas PT/EN
- Mobile: hamburger menu com `animate-fade-in`
- Comportamento scroll: `bg-transparent` → `bg-[#0D0D0D]/95 backdrop-blur-sm`

### 6.2 Hero (min-h-screen)
- Background: `forno-operando.jpeg` com `opacity-20` (pendente: aumentar para 30%)
- Gradiente sobreposto: `from-[#0d0d0d] via-[#0d0d0d]/90 to-[#0d0d0d]/60` (left→right)
- Linha decorativa vertical esquerda (gradiente via `#CC2020`)
- Conteúdo: Tagline → H1 → Subheadline → CTAs → Stats → Scroll indicator
- Stats: "Projetos em 3 continentes", "28 anos de experiência", "Mineração e Indústria Pesada"
- CTA primário: WhatsApp | CTA secundário: âncora `#services`

### 6.3 About (bg `#0D0D0D`)
- Grid 2 colunas (1 col mobile): Foto esquerda + Texto direita
- Foto: `Foto Profissional.webp` aspect `4/5`, max-w-md
- Badge experiência: `#CC2020` posição `top-6 -right-4` com `28 anos`
- Linha vermelha decorativa: `absolute -left-4 top-8 bottom-8 w-1`
- Stats: `28+`, `7+`, `20+` (anos, países, projetos)
- Caixa missão: `bg-[#1A1A1A] border-l-2 border-[#CC2020]`
- 3 parágrafos de texto + formação

### 6.4 Services (bg `#1A1A1A`)
- Grid 4 colunas (1→2→4 responsivo)
- 4 grupos de serviços:
  1. **Consultoria Metalúrgica** — análise, balanceamento, viabilidade
  2. **Projetos Industriais** — civil, mecânica, elétrica, comissionamento
  3. **Desenvolvimento de Produtos** — ligas de estanho, solda
  4. **Treinamentos Especializados** — IPC/J-STD, CQI-15, CQI-17
- Cada card: ícone SVG + título + descrição + lista de items + CTA WhatsApp

### 6.5 Portfolio (bg `#0D0D0D`)
- Grid 3 colunas (1→2→3 responsivo)
- 6 projetos com foto real `.webp`
- Hover: scale-105 na imagem + badge "Ver detalhes"
- Click: abre `ProjectModal` (overlay com detalhes)
- Projetos: Forno Industrial (África Ocidental), Planta de Fundição (África Central), Forno em Operação (Costa do Marfim), Refino de Metais (América do Sul), Estoque e Logística (Brasil), Engenharia de Processos (Global)

### 6.6 Contact (bg `#1A1A1A`)
- Grid 2 colunas (1→2)
- **Esquerda:** Info (WhatsApp, Email, Atuação) + CTA WhatsApp
- **Direita:** Formulário (Nome, Telefone, Email, Mensagem)
- Formulário: POST `/api/contact` → Resend
- Feedback: estados `idle | sending | success | error`
- Inputs: `bg-[#242424] border-[#2E2E2E]`, focus `border-[#CC2020]`

### 6.7 Footer (bg `#0D0D0D`)
- Grid 3 colunas: Brand (logo + tagline), Navegação, Contato
- Copyright com ano dinâmico
- WhatsApp, email e cobertura global

### 6.8 WhatsApp Button (flutuante)
- Posição fixa bottom-right
- Abre WhatsApp com mensagem pré-definida

---

## 7. Backend / API

### `/api/contact` (POST)
```
Arquivo: app/api/contact/route.ts
Dependências: lib/services/email.ts + lib/utils/rate-limit.ts

Payload: { name, email, phone, message }
Segurança: Rate limit por IP (anti-spam)
Envio: Resend → marlon@engenhariatitan.com.br
Template: HTML customizado (lib/services/email.ts)
```

### Variáveis de Ambiente (`.env.local`)
```
RESEND_API_KEY=re_...         ← obrigatório
```

---

## 8. Internacionalização (i18n)

- **Locales:** `pt` (padrão), `en`
- **Arquivo de config:** `i18n.ts` + `lib/routing.ts`
- **Proxy:** `proxy.ts` (Next.js 16 — substitui middleware.ts)
- **Switcher:** bandeirinhas BR/US via `LanguageSwitcher.tsx`
- **Cobertura:** 100% das strings nas seções principais

---

## 9. Imagens e Assets

### Fotos Reais (todas em `.webp`, otimizadas)
| Arquivo | Uso |
|---------|-----|
| `Foto Profissional.webp` | About — foto do Marlon |
| `Foto no trabalho.webp` | Disponível para uso |
| `Forno Funcionando.webp` | Portfolio — projeto 1 |
| `Forno funcioando 2.webp` | Portfolio — projeto 2 |
| `WhatsApp Image ... 19.04.10.webp` | Portfolio — projeto 3 |
| `Materia Prima.webp` | Portfolio — projeto 4 |
| `Materia Prima 2.webp` | Portfolio — projeto 5 |
| `Fluxo de trabalho.webp` | Portfolio — projeto 6 |
| `forno-operando.jpeg` | Hero — background |
| `Logo.webp` | Disponível |
| `Titan 00 JPG.jpg.webp` | Disponível |
| `Titan 00 PNG.webp` | Disponível |

### Logo
- **Arquivo em uso:** `public/assets/logo.png` (PNG com fundo branco — problema aberto)
- **Problema:** Aparece caixa branca na Navbar e Footer em fundo escuro

---

## 10. SEO & Analytics

### Metadados (por locale)
- **PT:** "Titan Engenharia — Metalurgia de Metais Não Ferrosos | Global"
- **EN:** "Titan Engenharia — Non-Ferrous Metals Metallurgy | Global"
- Hreflang configurado via `next-sitemap`
- OG image: **pendente** (criar 1200×630px)

### Analytics
- GA4: `G-XXXXXXXXXX` (placeholder — substituir pelo ID real)
- Integração via `@next/third-parties`

---

## 11. Problemas Abertos (Backlog)

| # | Problema | Prioridade | Arquivo |
|---|----------|-----------|---------|
| 1 | **Logo com fundo branco** — PNG sem transparência | ALTA | `Navbar.tsx`, `Footer.tsx` |
| 2 | **Hero muito escuro** — `opacity-20` no background | ALTA | `Hero.tsx:19` |
| 3 | **GA4 ID** — placeholder sem ID real | MÉDIA | `lib/config.ts:22` |
| 4 | **OG Image** — ausente (1200×630px) | MÉDIA | `public/assets/` |
| 5 | **LinkedIn/Instagram** — strings vazias | BAIXA | `lib/config.ts:19-20` |
| 6 | **Email** — `.com.br` provisório (trocar por `.com`) | BAIXA | `lib/config.ts:6` |

---

## 12. Roadmap de Deploy

```
[ ] 1. Corrigir logo (fundo branco → transparente ou mix-blend-mode)
[ ] 2. Ajustar opacity Hero (#0D0D0D → opacity-30)
[ ] 3. Criar conta GA4 → substituir G-XXXXXXXXXX
[ ] 4. Criar OG Image 1200×630px
[ ] 5. Push para repositório GitHub
[ ] 6. Conectar Vercel + domínio engenhariatitan.com
[ ] 7. Ativar e-mail marlon@engenhariatitan.com → trocar no config
```

---

## 13. Workflow de Melhoria de Design (Stitch)

**Princípio:** O site funciona. Qualquer melhoria visual é aplicada **cirurgicamente** — sem reescrever componentes funcionais.

**Fluxo seguro:**
1. Compartilhar o PRD e screenshots no **Stitch** para análise
2. Stitch propõe melhorias visuais (paleta, tipografia, layout)
3. Revisar e aprovar cada sugestão individualmente
4. Aplicar apenas nos arquivos afetados (geralmente `globals.css` ou componente específico)
5. Testar localmente antes de commitar

**O que NÃO mudar sem aprovação explícita:**
- Conteúdo textual (copy aprovado pelo Marlon)
- Estrutura de seções (ordem: Hero→About→Services→Portfolio→Contact)
- Stack técnica
- Lógica de backend (API, rate-limit, Resend)
- Tokens CSS já definidos (só adicionar, nunca remover sem avaliar impacto)

---

*Documento gerado em 2026-04-07 com base no código fonte em `d:/Projetos/Site Marlon/titan-engenharia/`*
*Para dúvidas de negócio: consultar `00-documentacao/` na raiz do workspace*
