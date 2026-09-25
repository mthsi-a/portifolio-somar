/* ==========================================================================
   config.js — FONTE ÚNICA de conteúdo do site
   Textos, preços, cores, fontes, seções e SEO ficam aqui.
   Formato window.CONFIG (e não JSON com fetch) para o site abrir
   com duplo clique no index.html, sem servidor.
   Preços são números: a formatação "R$ 0,00" é feita pelo main.js.
   ========================================================================== */
window.CONFIG = {
  marca: {
    nome: "Somar",
    slogan: "Confeitaria Caseira",
    responsavel: "Anne Laura",
    cidades: ["Corumbá", "Ladário"],
    estado: "MS",
    logo: "img/logo.webp"
  },

  contato: {
    // Só números, com DDI e DDD
    whatsapp: "5567998185593",
    whatsappExibicao: "(67) 9 9818-5593",
    mensagemWhatsapp: "Olá, Anne! Vi o site da Somar e quero fazer uma encomenda 🎂",
    // {produto} é trocado pelo nome do item no botão "Encomendar"
    mensagemProduto: "Olá, Anne! Tenho interesse em: {produto}",
    instagram: "somarconfeitariacaseira"
  },

  // Cada chave vira uma variável CSS: corPrimaria -> --cor-primaria
  // As fontes também geram o link do Google Fonts automaticamente
  tema: {
    corPrimaria: "#E0607E",
    corPrimariaEscura: "#C94A6A",
    // Fundo dos botões e textos pequenos em rosa: tons mais escuros
    // para garantir contraste AA (4,5:1) com texto branco
    corBotao: "#B5405F",
    corBotaoHover: "#A33756",
    corClara: "#F9DDE3",
    corFundo: "#FDF4EF",
    corTexto: "#5A2E22",
    fonteTitulo: "Playfair Display",
    fonteDestaque: "Dancing Script",
    fonteTexto: "Poppins"
  },

  seo: {
    titulo: "Somar Confeitaria Caseira | Bolos em Corumbá e Ladário",
    descricao: "Bolos redondos, retangulares e bolo vulcão feitos com amor pela Anne Laura. Encomende pelo WhatsApp em Corumbá e Ladário.",
    imagemCompartilhamento: "img/og-somar.jpg"
  },

  // Ordem e visibilidade das seções. "menu" é o texto do link no cabeçalho
  // (sem "menu", a seção aparece no site mas não no menu)
  secoes: [
    { id: "inicio", ativo: true },
    { id: "diferenciais", ativo: true },
    { id: "cardapio", ativo: true, menu: "Cardápio" },
    { id: "opcoes", ativo: true, menu: "Monte seu bolo" },
    { id: "galeria", ativo: true, menu: "Galeria" },
    { id: "como-encomendar", ativo: true, menu: "Como encomendar" },
    { id: "sobre", ativo: true, menu: "Sobre" },
    { id: "depoimentos", ativo: false, menu: "Depoimentos" },
    { id: "faq", ativo: true, menu: "Dúvidas" },
    { id: "contato", ativo: true, menu: "Contato" }
  ],

  hero: {
    chamada: "Feito com amor, para momentos especiais",
    titulo: "Bolos que encantam",
    tituloDestaque: "e criam memórias",
    subtitulo: "Confeitaria caseira em Corumbá e Ladário. Cada bolo é feito à mão, do jeito que você imaginou.",
    botao: "Fazer minha encomenda",
    imagem: "img/hero-bolo.webp",
    imagemAlt: "Naked cake de Ninho com morangos e laço rosa"
  },

  // Ícones disponíveis: ingredientes, coracao, calendario, entrega
  diferenciais: [
    { icone: "ingredientes", titulo: "Ingredientes de qualidade", texto: "Selecionados com carinho, para um sabor que fica na lembrança." },
    { icone: "coracao", titulo: "Feito com amor", texto: "Tudo preparado em casa, um bolo de cada vez." },
    { icone: "calendario", titulo: "Para todas as ocasiões", texto: "Aniversários, casamentos, chás e aquele dia que pede um doce." },
    { icone: "entrega", titulo: "Entrega na sua casa", texto: "Retire ou receba em Corumbá e Ladário." }
  ],

  cardapio: {
    titulo: "Nossos bolos",
    categorias: [
      {
        id: "redondos",
        nome: "Bolos Redondos",
        descricao: "Clássicos de festa, personalizados para o seu tema.",
        itens: [
          { nome: "32 cm", detalhe: "55 a 60 fatias", preco: 220 },
          { nome: "28 cm", detalhe: "45 a 50 fatias", preco: 200 },
          { nome: "25 cm", detalhe: "35 a 40 fatias", preco: 180 },
          { nome: "20 cm", detalhe: "25 a 30 fatias", preco: 140 },
          { nome: "18 cm", detalhe: "15 a 20 fatias", preco: 110 }
        ],
        usaOpcoesFesta: true
      },
      {
        id: "retangulares",
        nome: "Bolos Retangulares",
        descricao: "Perfeitos para festas maiores e muitos convidados.",
        itens: [
          { nome: "40 x 30 cm", detalhe: "75 a 80 fatias", preco: 250 },
          { nome: "36 x 26 cm", detalhe: "55 a 60 fatias", preco: 230 },
          { nome: "30 x 22 cm", detalhe: "40 a 45 fatias", preco: 210 },
          { nome: "25 x 17 cm", detalhe: "20 a 25 fatias", preco: 180 },
          { nome: "20 x 15 cm", detalhe: "15 a 20 fatias", preco: 160 }
        ],
        usaOpcoesFesta: true
      },
      {
        id: "vulcao",
        nome: "Bolo Vulcão",
        descricao: "Aquele bolo caseiro com cobertura escorrendo. Os sabores são sugestões: você pode combinar massa e cobertura do seu jeito.",
        itens: [
          { nome: "Tamanho G", detalhe: "", preco: 50 },
          { nome: "Tamanho P", detalhe: "", preco: 35 }
        ],
        sabores: [
          { nome: "Cenoura", descricao: "Massa de cenoura com cobertura de chocolate" },
          { nome: "Chocolatudo", descricao: "Massa de chocolate com cobertura de chocolate" },
          { nome: "Churros", descricao: "Massa de baunilha com doce de leite e canela" },
          { nome: "Ninho", descricao: "Massa de baunilha com cobertura de Ninho" },
          { nome: "Coco", descricao: "Massa de baunilha com cobertura de beijinho" },
          { nome: "Prestígio", descricao: "Massa de chocolate com cobertura de prestígio" },
          { nome: "Dois Amores", descricao: "Massa de baunilha com cobertura de Ninho e chocolate" }
        ],
        adicionais: [
          { nome: "Frutas (tamanho G)", preco: 10 },
          { nome: "Frutas (tamanho P)", preco: 8 },
          { nome: "Entrega", preco: 10 }
        ],
        usaOpcoesFesta: false
      }
    ]
  },

  opcoesFesta: {
    titulo: "Monte o seu bolo",
    massas: ["Baunilha", "Leite", "Chocolate"],
    recheios: ["Ninho", "Beijinho", "Brigadeiro Branco", "Doce de Leite", "Brigadeiro Tradicional", "Dois Amores", "Quatro Leites", "Oreo", "Prestígio", "Brigadeiro de Maracujá", "Mousse de Maracujá", "Mousse de Morango"],
    adicionais: [
      { nome: "Topo simples", detalhe: "", preco: 20 },
      { nome: "Frutas", detalhe: "bolos menores de 25 cm", preco: 20 },
      { nome: "Laços", detalhe: "", preco: 15 },
      { nome: "Entrega", detalhe: "", preco: 10 }
    ]
  },

  galeria: [
    { src: "img/galeria/ninho-morango.webp", alt: "Naked cake de Ninho com morangos e laço rosa" },
    { src: "img/galeria/chocolate-granulado.webp", alt: "Bolo redondo de chocolate coberto com granulado" },
    { src: "img/galeria/vulcao-uva.webp", alt: "Bolo vulcão com cobertura branca e uvas verdes" },
    { src: "img/galeria/redondo-rosa-flor.webp", alt: "Bolo redondo rosa com rosa vermelha e nome em dourado" },
    { src: "img/galeria/retangular-rosas.webp", alt: "Bolo retangular branco com rosas de chantilly" },
    { src: "img/galeria/retangular-drip.webp", alt: "Bolo retangular branco com drip colorido" }
  ],

  comoEncomendar: {
    titulo: "Como encomendar",
    passos: [
      { titulo: "Chame no WhatsApp", texto: "Conte o tamanho, a massa, o recheio, o tema e a data da sua festa." },
      { titulo: "Confirme o pedido", texto: "Com tudo combinado, é só pagar 50% de sinal para garantir a data." },
      { titulo: "Retire ou receba", texto: "Busque o seu bolo ou receba em casa (entrega R$ 10). Os outros 50% são pagos na entrega." }
    ],
    observacoes: [
      "Prazo combinado com a Anne. De preferência, encomende com 48h de antecedência.",
      "Alterações de massa ou recheio até 12h do dia anterior à entrega.",
      "Pagamento em dinheiro, Pix ou cartão (com a taxa da maquininha)."
    ]
  },

  sobre: {
    titulo: "Quem faz a Somar",
    texto: "A Somar nasceu na cozinha da Anne Laura, da vontade de transformar ingredientes selecionados em bolos que viram lembrança. Cada encomenda é feita à mão, com o mesmo carinho, para adoçar aniversários, encontros e todos os dias que merecem um pouco mais de amor.",
    imagem: "img/anne-laura.webp",
    imagemAlt: "Anne Laura, confeiteira da Somar"
  },

  // Formato de cada item: { nome: "", texto: "" }
  // A seção só aparece se estiver ativa em "secoes" e tiver itens
  depoimentos: [],

  faq: [
    { pergunta: "Com quanto tempo de antecedência devo encomendar?", resposta: "O prazo é combinado com a Anne, mas o ideal é pedir com pelo menos 48h de antecedência." },
    { pergunta: "Vocês entregam?", resposta: "Sim! Entregamos em Corumbá e Ladário por R$ 10. Você também pode retirar." },
    { pergunta: "Posso personalizar o bolo com o tema da festa?", resposta: "Pode sim! Escolha massa, recheio e adicionais como topo, laços e frutas, e conte o tema pelo WhatsApp." },
    { pergunta: "Quais as formas de pagamento?", resposta: "Dinheiro, Pix ou cartão (com a taxa da maquininha). São 50% no pedido e 50% na entrega." },
    { pergunta: "Qual tamanho escolher?", resposta: "Use a quantidade de fatias de cada tamanho como guia. Na dúvida, a Anne ajuda você a escolher." }
  ],

  rodape: {
    frase: "Cada fatia, uma história de amor.",
    ctaTitulo: "Vamos adoçar o seu dia?"
  },

  // Rótulos da interface (botões, títulos de apoio e textos para leitores de tela)
  textos: {
    menu: {
      navegacao: "Menu principal",
      abrir: "Abrir menu",
      fechar: "Fechar menu"
    },
    diferenciais: {
      titulo: "Por que escolher a Somar"
    },
    cardapio: {
      encomendar: "Encomendar",
      verOpcoes: "Ver massas e recheios",
      sabores: "Sabores sugeridos",
      adicionais: "Adicionais"
    },
    opcoes: {
      massas: "Massas",
      recheios: "Recheios",
      adicionais: "Adicionais",
      nota: "Válido para bolos redondos e retangulares"
    },
    galeria: {
      titulo: "Nossos bolos em fotos"
    },
    comoEncomendar: {
      observacoes: "Bom saber"
    },
    depoimentos: {
      titulo: "Quem provou, conta"
    },
    faq: {
      titulo: "Perguntas frequentes"
    },
    contato: {
      botao: "Chamar no WhatsApp",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      atendimento: "Atendemos",
      separadorEstado: " - "
    },
    whatsappFlutuante: "Encomendar pelo WhatsApp",
    rodape: {
      direitos: "Todos os direitos reservados."
    }
  }
};
