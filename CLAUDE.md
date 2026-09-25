# CLAUDE.md — Somar Confeitaria Caseira

## Cliente

- **Marca:** Somar — Confeitaria Caseira
- **Responsável:** Anne Laura (boleira)
- **Atende:** Corumbá e Ladário - MS
- **Produtos:** bolos redondos, retangulares (com opções de massa/recheio/adicionais) e bolo vulcão
- **Canal de venda:** WhatsApp (5567998185593) e Instagram (@somarconfeitariacaseira)
- **Objetivo do site:** vitrine + levar o visitante a encomendar pelo WhatsApp

Este projeto também é o **TEMPLATE BASE** para futuros portfólios: trocar de cliente deve exigir apenas um novo `config.js` e novas imagens. A especificação do template está em `template_portifolio/template.txt` (usar como checklist; não alterar).

## Stack

- HTML5 semântico, CSS3 (variáveis CSS, `color-mix`), JavaScript vanilla (ES2020+)
- Sem frameworks, sem bibliotecas, sem build, sem `package.json`
- Google Fonts: famílias definidas em `CONFIG.tema` (hoje Playfair Display, Dancing Script e Poppins); o `<link>` é gerado pelo JS
- Hospedagem: GitHub Pages
- Abrir localmente: duplo clique no `index.html` (servidor é opcional)

## Estrutura de pastas

```
/                     raiz do projeto (C:\Projetos_Portifolio)
├── index.html        esqueleto semântico com containers vazios
├── config.js         FONTE ÚNICA: window.CONFIG = { ... } (conteúdo, preços, cores, fontes, seções, SEO, rótulos)
├── css/style.css     variáveis CSS (:root) + reset + estilos mobile-first (768px e 1280px)
├── js/main.js        lê window.CONFIG, aplica tema/fontes/SEO e renderiza as seções
├── img/              imagens otimizadas usadas pelo site (WebP)
│   ├── galeria/      fotos da galeria (WebP)
│   └── originais/    fotos originais do cliente — NÃO MEXER, não publicar
├── template_portifolio/  especificação do template (template.txt) — não alterar
├── README.md
└── CLAUDE.md
```

## Padrões obrigatórios

1. **Tudo vem do `config.js`.** Nenhum texto, preço, cor ou fonte fixo no HTML ou no JS (sem exceções: até o link do Google Fonts é gerado a partir de `CONFIG.tema`). Rótulos de interface (botões, aria-label, títulos de apoio) ficam em `CONFIG.textos`.
2. **`config.js` e não JSON:** o formato `window.CONFIG = {...}` permite abrir o site com duplo clique, sem servidor (`fetch` de arquivo local é bloqueado em `file://`). O `<script src="config.js">` vem antes do `js/main.js`.
3. **Mobile-first:** estilos base para celular, `@media (min-width: 768px)` e `(min-width: 1280px)`. Menu hambúrguer abaixo de 1280px.
4. **HTML semântico**, `lang="pt-BR"`, um único `<h1>` (hero), `h2` por seção, `alt` em todas as imagens (vindo do config).
5. **Acessibilidade:** contraste AA (texto branco só sobre `corBotao`/`corBotaoHover`; `corPrimaria` só em decoração ou texto grande), foco visível, abas no padrão WAI-ARIA, menu com `aria-expanded` e Esc.
6. **Código comentado em português**, uma função `render<Secao>()` por seção.
7. **JS vanilla**, sem dependências. `try/catch` no `iniciar()`.
8. **Preços são números** no config; exibir sempre via `formatarPreco(valor)`.
9. **Links de WhatsApp** sempre via `linkWhatsApp(mensagem)` (ou `botaoWhatsApp`), com `target="_blank" rel="noopener"`.
10. **Variáveis CSS do tema:** cada chave de `CONFIG.tema` vira `--kebab-case` (`corPrimaria` → `--cor-primaria`, `fonteTitulo` → `--fonte-titulo`). No CSS, fontes usam fallback genérico no uso: `font-family: var(--fonte-titulo), Georgia, serif`.
11. **Imagens ausentes:** o `main.js` troca qualquer `<img>` que falhar por um bloco em `corClara` com o texto do `alt` (no logo, mostra nome + slogan).
12. **Não mexer em `img/originais` nem em `template_portifolio/`.**

## Seções (index.html e CONFIG.secoes)

`#inicio`, `#diferenciais`, `#cardapio`, `#opcoes`, `#galeria`, `#como-encomendar`, `#sobre`, `#depoimentos`, `#faq`, `#contato`, além de `<header id="topo">`, `<footer id="rodape">` e `<a id="whatsapp-flutuante">`.

`CONFIG.secoes` é uma lista ordenada de `{ id, ativo, menu? }`. O JS renderiza só as ativas, nessa ordem (move os `<section>` no DOM), e remove as inativas ou vazias. `menu` é o texto do link no cabeçalho; sem ele a seção não entra no menu. Depoimentos só aparece se ativo **e** com itens.

## Funções disponíveis em `js/main.js`

| Função | O que faz |
| --- | --- |
| `carregarConfig()` | devolve `window.CONFIG`; se não existir, lança erro com instruções (logado no console) |
| `aplicarTema(tema)` | escreve `CONFIG.tema` nas variáveis CSS do `:root` |
| `carregarFontes(tema)` | gera o `<link>` do Google Fonts com as chaves `fonte*` do tema |
| `aplicarSeo(seo)` | preenche `document.title` e `meta[name=description]` |
| `formatarPreco(valor)` | `Intl.NumberFormat('pt-BR', BRL)` → `"R$ 250,00"` |
| `linkWhatsApp(mensagem?)` | `https://wa.me/<numero>?text=...`; sem argumento usa `contato.mensagemWhatsapp` |
| `mensagemProduto(produto)` | troca `{produto}` em `contato.mensagemProduto` |
| `botaoWhatsApp(texto, mensagem, classe, aria?)` | HTML do botão/link de WhatsApp |
| `imagem(src, alt, opções)` | HTML de `<img>` (lazy por padrão; `lazy:false` no hero/logo) |
| `render<Secao>(el)` | uma por seção; devolve `false` se não houver conteúdo |
| `montarSecoes()` | aplica `CONFIG.secoes` (ordem/visibilidade) e devolve as seções visíveis |
| `renderHeader(visiveis)` / `ativarMenu()` | logo + menu das seções visíveis + hambúrguer |
| `ativarAbas(container)` | abas do cardápio (clique, ←/→, Home, End) |
| `renderRodape()` / `renderWhatsappFlutuante()` | rodapé com ano atual e botão fixo |
| `animarEntrada()` | IntersectionObserver; desligado com `prefers-reduced-motion` |
| `iniciar()` | ponto de entrada; o config fica na variável global `config` |

## Etapas

- [x] **Etapa 1** — estrutura + config
- [x] **Etapa 2** — config.js + layout e renderização de todas as seções
- [ ] **Etapa 3** — imagens WebP, galeria (lightbox/filtro), SEO (meta e Open Graph fixos no `<head>`, JSON-LD LocalBusiness)
- [ ] **Etapa 4** — revisão final e deploy no GitHub Pages

## Histórico

### Etapa 1 — concluída (2026-09-25)

- Criados `index.html`, `config.json`, `css/style.css`, `js/main.js`, `README.md`, `CLAUDE.md` e `img/galeria/` (com `.gitkeep`). `img/originais/` já existia com as artes do cliente e não foi alterada.
- `main.js`: carregava o config via `fetch`, aplicava tema e SEO; utilitários `formatarPreco` e `linkWhatsApp`.

### Etapa 2 — concluída (2026-09-25)

- **`config.json` → `config.js`** (`window.CONFIG = {...}`), mesmo conteúdo. Motivo: abrir o site com duplo clique, sem servidor. `config.json` apagado; `main.js` não usa mais `fetch`.
- Novos campos no config: `secoes` (ordem/ativo/menu), `depoimentos: []` (seção inativa), `contato.mensagemProduto`, `textos` (rótulos da interface) e, no `tema`, `corBotao` (#B5405F) e `corBotaoHover` (#A33756).
  - Motivo das cores novas: branco sobre `corPrimaria` dá 3,42:1 e sobre `corPrimariaEscura` 4,49:1 — ambos abaixo do AA (4,5:1). `corBotao` dá 5,44:1.
- Link do Google Fonts removido do HTML e gerado pelo JS (a exceção do padrão 1 deixou de existir).
- Todas as seções renderizadas: header fixo com hambúrguer, hero, diferenciais (SVG inline), cardápio em abas acessíveis com botão "Encomendar" por item, monte o seu bolo (chips + adicionais), galeria em grade, como encomendar, sobre, depoimentos (pronto, oculto), FAQ em `<details>`, contato, rodapé e botão flutuante de WhatsApp.
- Fallback de imagens ausentes (bloco com o alt) e animação de entrada com IntersectionObserver.
- Verificado em Chrome headless via `file://`: sem rolagem horizontal em 360/768/1280px, preços corretos, mensagem de encomenda correta, menu (abrir, Esc) e abas por teclado funcionando, nenhum erro no console.
- Pendências para a Etapa 3: imagens do config (`img/logo.webp`, `img/hero-bolo.webp`, `img/anne-laura.webp`, `img/og-somar.jpg`, fotos da galeria) ainda não existem (aparecem os fallbacks); lightbox e filtro da galeria; meta/OG estáticos no `<head>` (o `aplicarSeo` via JS não gera prévia no WhatsApp); JSON-LD.
- Observação: esta máquina não tem Python nem Node instalados; o servidor local é opcional.
