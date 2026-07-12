# Studio Prisma - site estatico

Site pronto para publicar no GitHub Pages. Ele usa apenas HTML, CSS, JavaScript e uma imagem local, entao nao precisa de servidor, banco de dados ou instalacao.

## O que trocar antes de publicar

- Nome da marca: procure por `Studio Prisma` em `index.html`.
- WhatsApp: troque `5500000000000` em `scripts.js` pelo numero com DDI e DDD.
- Instagram, TikTok e e-mail: edite os links na secao `Contato` do `index.html`.
- Produtos e precos: edite os cards dentro da secao `Produtos`.
- Imagem principal: substitua `assets/hero-products.jpg` mantendo o mesmo nome, se quiser.

## Publicar no GitHub Pages

1. Crie um repositorio no GitHub.
2. Envie estes arquivos para a raiz do repositorio: `index.html`, `styles.css`, `scripts.js` e a pasta `assets`.
3. No GitHub, entre em `Settings` > `Pages`.
4. Em `Build and deployment`, escolha `Deploy from a branch`.
5. Escolha a branch principal e a pasta `/root`.
6. Salve e aguarde o link do GitHub Pages ficar disponivel.

## Dominio proprio no futuro

No GitHub Pages, normalmente voce compra um dominio, nao um IP proprio. Quando tiver um dominio, configure o DNS no provedor e adicione o dominio em `Settings` > `Pages` > `Custom domain`.

Depois disso, crie um arquivo chamado `CNAME` na raiz do repositorio contendo apenas o dominio, por exemplo:

```text
www.seudominio.com.br
```

Se preferir hospedar fora do GitHub Pages no futuro, este mesmo site pode ser enviado para qualquer hospedagem estatica.
