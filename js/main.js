/* ==========================================================================
   main.js — lê o window.CONFIG (config.js) e monta o site
   - Aplica tema (variáveis CSS), fontes do Google e SEO básico
   - Renderiza cada seção ativa, na ordem de CONFIG.secoes
   - Cabeçalho com menu, rodapé, botão flutuante de WhatsApp e animações
   Nenhum texto do site fica aqui: tudo vem do config.js.
   ========================================================================== */

// Guarda o config para as demais funções usarem
let config = null;

/* --------------------------------------------------------------------------
   Ícones SVG inline (decorativos, por isso aria-hidden)
   As chaves de "diferenciais" usam: ingredientes, coracao, calendario, entrega
   -------------------------------------------------------------------------- */
const ICONES = {
  ingredientes: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  coracao: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  entrega: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  local: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'
};

// Ícone do WhatsApp é preenchido (não usa traço)
const ICONE_WHATSAPP = '<svg class="icone-whatsapp" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/></svg>';

/** Monta o <svg> de um ícone de traço pelo nome (vazio se a chave não existir). */
function icone(nome) {
  const desenho = ICONES[nome];
  if (!desenho) return '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${desenho}</svg>`;
}

/* --------------------------------------------------------------------------
   Utilitários
   -------------------------------------------------------------------------- */

/**
 * Lê o config definido em config.js (window.CONFIG).
 * Lança erro claro se o arquivo não carregou ou tem erro de sintaxe.
 */
function carregarConfig() {
  if (!window.CONFIG || typeof window.CONFIG !== 'object') {
    throw new Error(
      'window.CONFIG não encontrado. Confira se o config.js existe, se o <script src="config.js"> ' +
      'vem antes do js/main.js no index.html e se o config.js não tem erro de sintaxe ' +
      '(vírgula, aspas ou chave faltando — veja o erro acima no console).'
    );
  }
  return window.CONFIG;
}

/** Escapa texto para inserir com segurança em HTML. */
function esc(texto) {
  const mapa = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(texto ?? '').replace(/[&<>"']/g, (c) => mapa[c]);
}

/** Rótulos da interface de um grupo de CONFIG.textos (objeto vazio se não existir). */
function rotulos(grupo) {
  return config.textos?.[grupo] ?? {};
}

/** Converte camelCase em kebab-case: "corPrimariaEscura" -> "cor-primaria-escura". */
function paraKebabCase(texto) {
  return texto.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Aplica config.tema nas variáveis CSS do :root.
 * Cada chave vira uma variável: corPrimaria -> --cor-primaria.
 * Fontes recebem aspas, pois nomes como "Playfair Display" têm espaço.
 */
function aplicarTema(tema) {
  if (!tema) return;
  const raiz = document.documentElement;

  Object.entries(tema).forEach(([chave, valor]) => {
    const valorCss = chave.startsWith('fonte') ? `"${valor}"` : valor;
    raiz.style.setProperty(`--${paraKebabCase(chave)}`, valorCss);
  });
}

/**
 * Gera o <link> do Google Fonts com todas as chaves "fonte..." de config.tema.
 * Trocar a fonte no config já troca a fonte carregada, sem mexer no HTML.
 */
function carregarFontes(tema) {
  if (!tema) return;
  const familias = [...new Set(
    Object.entries(tema)
      .filter(([chave, valor]) => chave.startsWith('fonte') && valor)
      .map(([, valor]) => valor)
  )];
  if (!familias.length) return;

  const parametros = familias
    .map((familia) => `family=${encodeURIComponent(familia).replace(/%20/g, '+')}:wght@400;500;600;700`)
    .join('&');

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${parametros}&display=swap`;
  document.head.appendChild(link);
}

/** Preenche o <title> e a meta description a partir de config.seo. */
function aplicarSeo(seo) {
  if (!seo) return;

  if (seo.titulo) document.title = seo.titulo;

  if (seo.descricao) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = seo.descricao;
  }
}

/**
 * Formata um número como moeda brasileira.
 * Ex.: formatarPreco(250) => "R$ 250,00"
 */
const formatadorBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

function formatarPreco(valor) {
  return formatadorBRL.format(Number(valor) || 0);
}

/**
 * Monta o link do WhatsApp com a mensagem já preenchida.
 * Sem mensagem, usa a padrão de config.contato.mensagemWhatsapp.
 */
function linkWhatsApp(mensagem) {
  const numero = config?.contato?.whatsapp ?? '';
  const texto = mensagem ?? config?.contato?.mensagemWhatsapp ?? '';
  const base = `https://wa.me/${numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** Mensagem de interesse em um produto: troca {produto} em contato.mensagemProduto. */
function mensagemProduto(produto) {
  const modelo = config.contato?.mensagemProduto ?? '{produto}';
  return modelo.replace('{produto}', produto);
}

/** Botão (link) para o WhatsApp, sempre abrindo em nova aba. */
function botaoWhatsApp(texto, mensagem, classe = 'botao', rotuloAcessivel = '') {
  const aria = rotuloAcessivel ? ` aria-label="${esc(rotuloAcessivel)}"` : '';
  return `<a class="${classe}" href="${esc(linkWhatsApp(mensagem))}" target="_blank" rel="noopener"${aria}>` +
    `${ICONE_WHATSAPP}<span>${esc(texto)}</span></a>`;
}

/** Link do perfil do Instagram a partir do usuário (sem @). */
function linkInstagram(usuario) {
  return `https://www.instagram.com/${encodeURIComponent(usuario)}/`;
}

/** "Corumbá e Ladário - MS" a partir de marca.cidades e marca.estado. */
function textoCidades(marca) {
  const cidades = marca?.cidades ?? [];
  const lista = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(cidades);
  const separador = rotulos('contato').separadorEstado ?? ' ';
  return marca?.estado ? `${lista}${separador}${marca.estado}` : lista;
}

/**
 * HTML de uma imagem. Se o arquivo não existir, o tratador de erro
 * (tratarImagensQuebradas) troca por um bloco com o texto alternativo.
 */
function imagem(src, alt, { classe = '', lazy = true, fallback = '' } = {}) {
  if (!src) return `<div class="img-fallback ${classe}">${esc(alt)}</div>`;
  const carregamento = lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"';
  const tipoFallback = fallback ? ` data-fallback="${fallback}"` : '';
  return `<img class="${classe}" src="${esc(src)}" alt="${esc(alt)}"${carregamento}${tipoFallback}>`;
}

/** Conteúdo em texto da marca (usado quando a imagem do logo não existe). */
function logoEmTexto() {
  const marca = config.marca ?? {};
  return `<span class="logo-nome">${esc(marca.nome)}</span>` +
    (marca.slogan ? `<span class="logo-slogan">${esc(marca.slogan)}</span>` : '');
}

/**
 * Troca imagens que falharem ao carregar por um bloco em corClara com o alt,
 * evitando o ícone de imagem quebrada. No logo, mostra o nome da marca.
 * O evento "error" não borbulha, por isso a escuta é na fase de captura.
 */
function tratarImagensQuebradas() {
  document.addEventListener('error', (evento) => {
    const img = evento.target;
    if (!(img instanceof HTMLImageElement)) return;

    if (img.dataset.fallback === 'logo') {
      img.insertAdjacentHTML('afterend', logoEmTexto());
      img.remove();
      return;
    }

    const bloco = document.createElement('div');
    bloco.className = `img-fallback ${img.className}`;
    bloco.textContent = img.alt;
    img.replaceWith(bloco);
  }, true);
}

/** Cabeçalho padrão de seção (h2 + subtítulo opcional). */
function cabecalhoSecao(id, titulo, subtitulo = '') {
  return `<header class="secao-cabecalho">
      <h2 id="titulo-${id}">${esc(titulo)}</h2>
      ${subtitulo ? `<p class="secao-subtitulo">${esc(subtitulo)}</p>` : ''}
    </header>`;
}

/** Linha "nome ...... preço" usada nos adicionais. */
function itemPreco({ nome, detalhe, preco }) {
  return `<li>
      <span class="lp-nome">${esc(nome)}${detalhe ? ` <small>${esc(detalhe)}</small>` : ''}</span>
      <span class="lp-preco">${esc(formatarPreco(preco))}</span>
    </li>`;
}

/** true se a seção estiver marcada como ativa em CONFIG.secoes. */
function secaoAtiva(id) {
  return (config.secoes ?? []).some((secao) => secao.id === id && secao.ativo);
}

/* --------------------------------------------------------------------------
   Renderização das seções (uma função por seção)
   Cada função recebe o <section> e devolve false se não houver o que mostrar.
   -------------------------------------------------------------------------- */

/** Hero (#inicio): chamada, título com destaque, subtítulo, botão e imagem. */
function renderInicio(el) {
  const hero = config.hero;
  if (!hero) return false;

  el.classList.add('hero');
  el.innerHTML = `
    <div class="container hero-grade">
      <div class="hero-texto">
        ${hero.chamada ? `<p class="hero-chamada">${esc(hero.chamada)}</p>` : ''}
        <h1 id="titulo-inicio">${esc(hero.titulo)}
          ${hero.tituloDestaque ? `<span class="destaque">${esc(hero.tituloDestaque)}</span>` : ''}
        </h1>
        ${hero.subtitulo ? `<p class="hero-subtitulo">${esc(hero.subtitulo)}</p>` : ''}
        ${botaoWhatsApp(hero.botao, undefined, 'botao botao-grande')}
      </div>
      <div class="hero-imagem">
        ${imagem(hero.imagem, hero.imagemAlt, { classe: 'hero-foto', lazy: false })}
      </div>
    </div>`;
  return true;
}

/** Diferenciais: cards com ícone, título e texto. */
function renderDiferenciais(el) {
  const itens = config.diferenciais ?? [];
  if (!itens.length) return false;

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('diferenciais', rotulos('diferenciais').titulo)}
      <ul class="diferenciais-grade">
        ${itens.map((item) => `
          <li class="cartao diferencial">
            <span class="diferencial-icone">${icone(item.icone)}</span>
            <h3>${esc(item.titulo)}</h3>
            <p>${esc(item.texto)}</p>
          </li>`).join('')}
      </ul>
    </div>`;
  return true;
}

/** Cardápio: abas acessíveis, uma por categoria, com itens, preços e botão de encomenda. */
function renderCardapio(el) {
  const cardapio = config.cardapio;
  const categorias = cardapio?.categorias ?? [];
  if (!categorias.length) return false;

  const t = rotulos('cardapio');
  const mostrarLinkOpcoes = secaoAtiva('opcoes') && config.opcoesFesta;

  const abas = categorias.map((cat, i) => `
    <button class="aba" type="button" role="tab" id="aba-${esc(cat.id)}"
      aria-controls="painel-${esc(cat.id)}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
      ${esc(cat.nome)}
    </button>`).join('');

  const paineis = categorias.map((cat, i) => {
    // Texto do produto usado na mensagem: "Bolos Redondos 25 cm (35 a 40 fatias)"
    const itens = (cat.itens ?? []).map((item) => {
      const produto = `${cat.nome} ${item.nome}${item.detalhe ? ` (${item.detalhe})` : ''}`;
      return `
        <li class="item">
          <div class="item-info">
            <span class="item-nome">${esc(item.nome)}</span>
            ${item.detalhe ? `<span class="item-detalhe">${esc(item.detalhe)}</span>` : ''}
          </div>
          <span class="item-preco">${esc(formatarPreco(item.preco))}</span>
          ${botaoWhatsApp(t.encomendar, mensagemProduto(produto), 'botao botao-pequeno item-botao', `${t.encomendar}: ${produto}`)}
        </li>`;
    }).join('');

    const sabores = cat.sabores?.length ? `
      <h4>${esc(t.sabores)}</h4>
      <ul class="sabores">
        ${cat.sabores.map((s) => `<li><strong>${esc(s.nome)}</strong> <span>${esc(s.descricao)}</span></li>`).join('')}
      </ul>` : '';

    const adicionais = cat.adicionais?.length ? `
      <h4>${esc(t.adicionais)}</h4>
      <ul class="lista-precos">${cat.adicionais.map(itemPreco).join('')}</ul>` : '';

    const linkOpcoes = cat.usaOpcoesFesta && mostrarLinkOpcoes
      ? `<a class="link-opcoes" href="#opcoes">${esc(t.verOpcoes)}</a>` : '';

    return `
      <div class="painel cartao" role="tabpanel" id="painel-${esc(cat.id)}"
        aria-labelledby="aba-${esc(cat.id)}" tabindex="0"${i === 0 ? '' : ' hidden'}>
        <h3 class="sr-only">${esc(cat.nome)}</h3>
        ${cat.descricao ? `<p class="painel-descricao">${esc(cat.descricao)}</p>` : ''}
        <ul class="itens">${itens}</ul>
        ${sabores}
        ${adicionais}
        ${linkOpcoes}
      </div>`;
  }).join('');

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('cardapio', cardapio.titulo)}
      <div class="abas" role="tablist" aria-labelledby="titulo-cardapio">${abas}</div>
      ${paineis}
    </div>`;

  ativarAbas(el);
  return true;
}

/**
 * Comportamento das abas (padrão WAI-ARIA):
 * clique ou setas ←/→, Home e End trocam de aba; só a aba ativa entra no Tab.
 */
function ativarAbas(container) {
  const abas = [...container.querySelectorAll('[role="tab"]')];

  function selecionar(aba, focar = false) {
    abas.forEach((item) => {
      const ativa = item === aba;
      item.setAttribute('aria-selected', String(ativa));
      item.tabIndex = ativa ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !ativa;
    });
    if (focar) aba.focus();
  }

  abas.forEach((aba, i) => {
    aba.addEventListener('click', () => selecionar(aba));
    aba.addEventListener('keydown', (evento) => {
      const total = abas.length;
      const destinos = {
        ArrowRight: abas[(i + 1) % total],
        ArrowLeft: abas[(i - 1 + total) % total],
        Home: abas[0],
        End: abas[total - 1]
      };
      const destino = destinos[evento.key];
      if (!destino) return;
      evento.preventDefault();
      selecionar(destino, true);
    });
  });
}

/** Monte o seu bolo (#opcoes): massas e recheios como chips + adicionais com preço. */
function renderOpcoes(el) {
  const opcoes = config.opcoesFesta;
  if (!opcoes) return false;

  const t = rotulos('opcoes');
  const chips = (lista) => `<ul class="chips">${lista.map((nome) => `<li>${esc(nome)}</li>`).join('')}</ul>`;

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('opcoes', opcoes.titulo, t.nota)}
      <div class="opcoes-grade">
        <div class="cartao">
          ${opcoes.massas?.length ? `<h3>${esc(t.massas)}</h3>${chips(opcoes.massas)}` : ''}
          ${opcoes.recheios?.length ? `<h3>${esc(t.recheios)}</h3>${chips(opcoes.recheios)}` : ''}
        </div>
        ${opcoes.adicionais?.length ? `
          <div class="cartao">
            <h3>${esc(t.adicionais)}</h3>
            <ul class="lista-precos">${opcoes.adicionais.map(itemPreco).join('')}</ul>
          </div>` : ''}
      </div>
    </div>`;
  return true;
}

/** Galeria: grade simples (lightbox e filtro ficam para a Etapa 3). */
function renderGaleria(el) {
  const fotos = config.galeria ?? [];
  if (!fotos.length) return false;

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('galeria', rotulos('galeria').titulo)}
      <ul class="galeria-grade">
        ${fotos.map((foto) => `<li class="galeria-item">${imagem(foto.src, foto.alt, { classe: 'galeria-foto' })}</li>`).join('')}
      </ul>
    </div>`;
  return true;
}

/** Como encomendar: passos numerados + observações. */
function renderComoEncomendar(el) {
  const dados = config.comoEncomendar;
  if (!dados?.passos?.length) return false;

  const observacoes = dados.observacoes?.length ? `
    <div class="observacoes">
      <h3>${esc(rotulos('comoEncomendar').observacoes)}</h3>
      <ul>${dados.observacoes.map((obs) => `<li>${esc(obs)}</li>`).join('')}</ul>
    </div>` : '';

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('como-encomendar', dados.titulo)}
      <ol class="passos">
        ${dados.passos.map((passo, i) => `
          <li class="cartao passo">
            <span class="passo-numero" aria-hidden="true">${i + 1}</span>
            <h3>${esc(passo.titulo)}</h3>
            <p>${esc(passo.texto)}</p>
          </li>`).join('')}
      </ol>
      ${observacoes}
    </div>`;
  return true;
}

/** Sobre: imagem + título + texto (parágrafos separados por linha em branco). */
function renderSobre(el) {
  const sobre = config.sobre;
  if (!sobre) return false;

  const paragrafos = String(sobre.texto ?? '').split(/\n\s*\n/).filter(Boolean);

  el.innerHTML = `
    <div class="container sobre-grade">
      <div class="sobre-imagem">${imagem(sobre.imagem, sobre.imagemAlt, { classe: 'sobre-foto' })}</div>
      <div class="sobre-texto">
        <h2 id="titulo-sobre">${esc(sobre.titulo)}</h2>
        ${paragrafos.map((p) => `<p>${esc(p)}</p>`).join('')}
      </div>
    </div>`;
  return true;
}

/** Depoimentos: só aparece se a seção estiver ativa e houver itens preenchidos. */
function renderDepoimentos(el) {
  const lista = (config.depoimentos ?? []).filter((d) => d?.texto);
  if (!lista.length) return false;

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('depoimentos', rotulos('depoimentos').titulo)}
      <ul class="depoimentos-grade">
        ${lista.map((d) => `
          <li>
            <figure class="cartao depoimento">
              <blockquote><p>${esc(d.texto)}</p></blockquote>
              ${d.nome ? `<figcaption>${esc(d.nome)}</figcaption>` : ''}
            </figure>
          </li>`).join('')}
      </ul>
    </div>`;
  return true;
}

/** FAQ: acordeão nativo com <details>/<summary>. */
function renderFaq(el) {
  const perguntas = config.faq ?? [];
  if (!perguntas.length) return false;

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('faq', rotulos('faq').titulo)}
      <div class="faq-lista">
        ${perguntas.map((item) => `
          <details class="faq-item">
            <summary>${esc(item.pergunta)}</summary>
            <div class="faq-resposta"><p>${esc(item.resposta)}</p></div>
          </details>`).join('')}
      </div>
    </div>`;
  return true;
}

/** Contato: chamada final com botão + WhatsApp, Instagram e área de atendimento. */
function renderContato(el) {
  const contato = config.contato;
  if (!contato) return false;

  const t = rotulos('contato');
  const itens = [];

  if (contato.whatsapp) {
    itens.push(`
      <li>
        <span class="contato-icone">${ICONE_WHATSAPP}</span>
        <span class="contato-rotulo">${esc(t.whatsapp)}</span>
        <a href="${esc(linkWhatsApp())}" target="_blank" rel="noopener">${esc(contato.whatsappExibicao || contato.whatsapp)}</a>
      </li>`);
  }
  if (contato.instagram) {
    itens.push(`
      <li>
        <span class="contato-icone">${icone('instagram')}</span>
        <span class="contato-rotulo">${esc(t.instagram)}</span>
        <a href="${esc(linkInstagram(contato.instagram))}" target="_blank" rel="noopener">@${esc(contato.instagram)}</a>
      </li>`);
  }
  if (config.marca?.cidades?.length) {
    itens.push(`
      <li>
        <span class="contato-icone">${icone('local')}</span>
        <span class="contato-rotulo">${esc(t.atendimento)}</span>
        <span>${esc(textoCidades(config.marca))}</span>
      </li>`);
  }

  el.innerHTML = `
    <div class="container">
      ${cabecalhoSecao('contato', config.rodape?.ctaTitulo)}
      <div class="contato-acao">${botaoWhatsApp(t.botao, undefined, 'botao botao-grande')}</div>
      <ul class="contato-lista">${itens.join('')}</ul>
    </div>`;
  return true;
}

// Mapa id da seção -> função de render
const RENDERIZADORES = {
  'inicio': renderInicio,
  'diferenciais': renderDiferenciais,
  'cardapio': renderCardapio,
  'opcoes': renderOpcoes,
  'galeria': renderGaleria,
  'como-encomendar': renderComoEncomendar,
  'sobre': renderSobre,
  'depoimentos': renderDepoimentos,
  'faq': renderFaq,
  'contato': renderContato
};

/**
 * Renderiza as seções ativas na ordem de CONFIG.secoes, movendo os <section>
 * no DOM. Seções inativas, vazias ou fora da lista são removidas.
 * Devolve a lista das seções que ficaram visíveis (usada no menu).
 */
function montarSecoes() {
  const main = document.querySelector('main');
  const listadas = new Set();
  const visiveis = [];

  (config.secoes ?? []).forEach((secao) => {
    listadas.add(secao.id);
    const el = document.getElementById(secao.id);
    const render = RENDERIZADORES[secao.id];

    if (!el) {
      console.warn(`Seção "${secao.id}" está no config.js mas não existe no index.html.`);
      return;
    }
    if (!render) {
      console.warn(`Seção "${secao.id}" não tem função de render no main.js.`);
    }

    const mostrar = secao.ativo && render && render(el) !== false;
    if (!mostrar) {
      el.remove();
      return;
    }

    el.classList.add('secao');
    el.setAttribute('aria-labelledby', `titulo-${secao.id}`);
    main.appendChild(el); // appendChild move o elemento: a ordem final segue o config
    visiveis.push(secao);
  });

  // Seções do HTML que não aparecem em CONFIG.secoes não são exibidas
  main.querySelectorAll(':scope > section').forEach((el) => {
    if (!listadas.has(el.id)) el.remove();
  });

  return visiveis;
}

/* --------------------------------------------------------------------------
   Cabeçalho, rodapé e botão flutuante
   -------------------------------------------------------------------------- */

/** Cabeçalho fixo: logo (com fallback em texto) + menu das seções visíveis. */
function renderHeader(visiveis) {
  const topo = document.getElementById('topo');
  const marca = config.marca ?? {};
  const t = rotulos('menu');
  const links = visiveis.filter((secao) => secao.menu);

  const logo = marca.logo
    ? imagem(marca.logo, [marca.nome, marca.slogan].filter(Boolean).join(' '), { classe: 'logo-img', lazy: false, fallback: 'logo' })
    : logoEmTexto();

  const menu = links.length ? `
    <button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="${esc(t.abrir)}">
      <span class="menu-icone" aria-hidden="true"></span>
    </button>
    <nav class="menu" id="menu-principal" aria-label="${esc(t.navegacao)}">
      <ul>
        ${links.map((secao) => `<li><a href="#${esc(secao.id)}">${esc(secao.menu)}</a></li>`).join('')}
      </ul>
    </nav>` : '';

  topo.className = 'topo';
  topo.innerHTML = `
    <div class="container topo-conteudo">
      <a class="logo" href="#topo">${logo}</a>
      ${menu}
    </div>`;

  if (links.length) ativarMenu(topo);
}

/**
 * Menu hambúrguer: abre/fecha pelo botão, fecha ao clicar num link
 * e com a tecla Esc (devolvendo o foco ao botão).
 */
function ativarMenu(topo) {
  const botao = topo.querySelector('.menu-botao');
  const menu = topo.querySelector('.menu');
  const t = rotulos('menu');

  function definirAberto(aberto) {
    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute('aria-label', aberto ? t.fechar : t.abrir);
    topo.classList.toggle('menu-aberto', aberto);
  }

  botao.addEventListener('click', () => {
    definirAberto(botao.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) definirAberto(false);
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
      definirAberto(false);
      botao.focus();
    }
  });
}

/** Rodapé: marca, frase e ano atual. */
function renderRodape() {
  const rodape = document.getElementById('rodape');
  const marca = config.marca ?? {};
  const ano = new Date().getFullYear();

  rodape.className = 'rodape';
  rodape.innerHTML = `
    <div class="container">
      <p class="rodape-marca">${esc(marca.nome)}</p>
      ${config.rodape?.frase ? `<p class="rodape-frase">${esc(config.rodape.frase)}</p>` : ''}
      <p class="rodape-copia">© ${ano} ${esc([marca.nome, marca.slogan].filter(Boolean).join(' '))}. ${esc(rotulos('rodape').direitos)}</p>
    </div>`;
}

/** Botão flutuante de WhatsApp, fixo no canto inferior direito. */
function renderWhatsappFlutuante() {
  const botao = document.getElementById('whatsapp-flutuante');
  if (!botao || !config.contato?.whatsapp) return;

  botao.href = linkWhatsApp();
  botao.target = '_blank';
  botao.rel = 'noopener';
  botao.setAttribute('aria-label', config.textos?.whatsappFlutuante ?? '');
  botao.innerHTML = ICONE_WHATSAPP;
  botao.hidden = false;
  document.body.classList.add('tem-flutuante');
}

/* --------------------------------------------------------------------------
   Animação de entrada das seções
   -------------------------------------------------------------------------- */

/**
 * Revela as seções ao entrarem na tela (IntersectionObserver).
 * Com prefers-reduced-motion ou sem suporte, nada é escondido.
 */
function animarEntrada() {
  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzir || !('IntersectionObserver' in window)) return;

  const secoes = document.querySelectorAll('main > .secao:not(.hero)');
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  secoes.forEach((secao) => {
    secao.classList.add('revelar');
    observador.observe(secao);
  });
}

/* --------------------------------------------------------------------------
   Ponto de entrada
   -------------------------------------------------------------------------- */
function iniciar() {
  try {
    config = carregarConfig();
  } catch (erro) {
    console.error(erro.message);
    return;
  }

  try {
    tratarImagensQuebradas();
    aplicarTema(config.tema);
    carregarFontes(config.tema);
    aplicarSeo(config.seo);

    const visiveis = montarSecoes();
    renderHeader(visiveis);
    renderRodape();
    renderWhatsappFlutuante();
    animarEntrada();
  } catch (erro) {
    console.error('Erro ao montar o site:', erro);
  }
}

iniciar();
