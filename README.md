# Somar Confeitaria Caseira — site de portfólio

Site vitrine da **Somar Confeitaria Caseira**, confeitaria da Anne Laura em Corumbá e Ladário (MS). O objetivo é mostrar os bolos, os preços e as opções de sabor, e levar o visitante a encomendar pelo WhatsApp.

O projeto também serve de **template reutilizável** para portfólios de pequenos negócios e autônomos (boleiras, fotógrafos, maquiadoras etc.). Para atender um novo cliente, basta trocar **um arquivo de configuração** e as imagens.

> **Status:** em desenvolvimento. Layout e seções prontos. Faltam imagens otimizadas, lightbox na galeria, SEO/Open Graph e publicação no GitHub Pages.

## Destaques

- **Conteúdo 100% configurável:** textos, preços, cores, fontes, ordem das seções e rótulos vêm do `config.js`. Não há texto fixo no HTML nem no JS.
- **Abre com duplo clique:** o config é carregado como script (`window.CONFIG`), sem `fetch`. Por isso o site funciona direto do arquivo, sem servidor.
- **Encomenda pelo WhatsApp:** cada produto do cardápio tem um botão que abre a conversa com a mensagem pronta (ex.: *"Tenho interesse em: Bolos Redondos 25 cm (35 a 40 fatias)"*). Há também um botão flutuante sempre visível.
- **Seções liga/desliga:** cada seção tem `ativo: true/false` e ordem própria. Ao desligar uma, ela sai da página e do menu.
- **Mobile-first e responsivo:** testado em 360px, 768px e 1280px, com menu hambúrguer no celular.
- **Acessibilidade:** contraste AA, foco visível, abas no padrão WAI-ARIA (setas do teclado), menu com `aria-expanded` e tecla Esc, FAQ com `<details>`, um único `<h1>` e hierarquia de títulos correta.
- **Detalhes de acabamento:** animação de entrada que respeita `prefers-reduced-motion`. Imagens que ainda não existem viram um bloco com o texto alternativo, sem ícone quebrado.

## Seções

Início · Diferenciais · Cardápio (abas por categoria) · Monte o seu bolo (massas, recheios e adicionais) · Galeria · Como encomendar · Sobre · Depoimentos (pronta, desligada por enquanto) · Perguntas frequentes · Contato

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis e `color-mix`, sem pré-processador
- JavaScript puro (ES2020+)
- Google Fonts, carregadas a partir do tema no config

Sem frameworks, bibliotecas, build ou dependências npm.

## Estrutura

```
├── index.html      esqueleto semântico (containers vazios)
├── config.js       conteúdo, preços, tema, seções e rótulos
├── css/style.css   estilos mobile-first
├── js/main.js      lê o config e renderiza as seções
└── img/            imagens do site (WebP)
```

## Como rodar

Clone o repositório e abra o `index.html` no navegador. Não precisa instalar nada.

```bash
git clone https://github.com/mthsi-a/portifolio-somar.git
```

## Como reaproveitar para outro cliente

1. Copie a pasta do projeto.
2. Edite o `config.js`: dados do negócio, contato, `tema` (cores e fontes), `secoes` (quais aparecem e em que ordem) e o conteúdo de cada seção. Os preços são números (`220`); a formatação em reais é automática.
3. Troque as imagens em `img/`, de preferência em WebP.
4. Abra o `index.html` e confira. Se a página ficar em branco, veja o console (F12): provavelmente falta uma vírgula ou aspas no `config.js`.

## Roteiro

- [x] Estrutura e arquivo de configuração
- [x] Layout e renderização de todas as seções
- [ ] Imagens otimizadas, lightbox e filtro na galeria, SEO (Open Graph e dados estruturados)
- [ ] Revisão final e publicação no GitHub Pages

## Autor

Desenvolvido por [mthsi-a](https://github.com/mthsi-a).
