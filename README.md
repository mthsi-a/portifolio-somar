# Somar Confeitaria Caseira — Portfólio

Site de portfólio da Somar (Anne Laura, Corumbá e Ladário - MS). HTML, CSS e JS puros, sem build.

## Abrir o site

Dê duplo clique no `index.html`. Não precisa de servidor: o conteúdo vem do `config.js`, carregado como script.

Se preferir um servidor local (opcional):

```bash
python -m http.server 8000
```

## Editar o conteúdo

Todo texto, preço, cor, fonte e a ordem das seções ficam no `config.js`. Não é preciso mexer no HTML nem no JS.

- **Textos e preços:** edite `hero`, `cardapio`, `faq` etc. Preços são números (`220`, não `"R$ 220,00"`); a formatação é automática.
- **Seções:** em `secoes`, mude `ativo` para `false` para esconder uma seção (ela some também do menu). A ordem da lista é a ordem no site. `menu` é o texto do link no cabeçalho.
- **Depoimentos:** adicione itens `{ nome: "...", texto: "..." }` em `depoimentos` e ative a seção em `secoes`.
- **Cores e fontes:** edite `tema`. Ex.: `corPrimaria` vira a variável CSS `--cor-primaria`. As fontes do Google são carregadas automaticamente pelo nome.
- **Rótulos da interface:** botões, títulos de apoio e textos para leitores de tela ficam em `textos`.
- **WhatsApp:** `contato.whatsapp` só com números, com DDI e DDD (`5567...`). `mensagemProduto` usa `{produto}` para o nome do item.

Salve e recarregue a página. Se o site ficar em branco, abra o console (F12): provavelmente há uma vírgula, aspas ou chave faltando no `config.js`.
