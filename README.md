# Borough Cycle Repairs — Quote Calculator

Calculadora de orçamento em inglês britânico com React, Vite e Lucide React. CSS responsivo organizado em múltiplas linhas.

## Executar

Requer Node.js compatível com o Vite instalado (22.12+ ou 24+ recomendado).

```sh
npm install
npm run dev
```

Abra a URL exibida no terminal. Abrir `index.html` diretamente não executa a aplicação React. Em PowerShell com bloqueio de scripts, use `npm.cmd` no lugar de `npm`.

```sh
npm test
npm run build
npm run preview
```

O build de produção fica em `dist/`.

## Funcionalidades

- Serviço principal obrigatório: Basic maintenance (£25), Full maintenance (£55), E-bike maintenance (£75).
- Extras: Tyre replacement (+£12) e Brake adjustment (+£18).
- Resumo automático em GBP; extras sozinhos não geram orçamento.
- E-bike com ambos os extras: **£105.00**.
- Confirmação com foco no resumo e botão para reiniciar a seleção.
- Layout responsivo, ilustração SVG local, ícones e animações discretas.
- Campos nativos, teclado, títulos com `aria-labelledby`, resumo com `aria-live` e preferência por movimento reduzido.

## Identidade visual

O kit da marca está em `public/brand/`. Com o servidor local ativo, abra `/brand/guide.html` para consultar o guia visual e baixar os arquivos.

- Logos principal, reverso e monocromático em SVG, com letras convertidas em curvas.
- Símbolos isolados, favicon, padrão gráfico e cartão conceitual.
- Paleta: Workshop Green `#183D32`, Ride Lime `#D4ED9A`, Spoke Paper `#F8F9F4` e Park Olive `#6D8659`.
- Interface: Manrope para títulos e DM Sans para textos; o logotipo é um desenho vetorial fixo.
- Assinatura: “Good care. Great rides.”
- `public/brand/brand-kit.zip`: pacote completo para compartilhar.

## Arquivos do projeto

- `src/main.jsx`: componentes e estado da interface.
- `src/quote.js`: fonte única dos preços e cálculo.
- `src/quote.test.js`: testes das regras e combinações.
- `src/styles.css`: estilos e adaptações para celulares.
- `vite.config.js`: desenvolvimento e build.

Fontes do Google opcionais, com fallback local. A calculadora não agenda serviços nem processa pagamentos. O preço final será confirmado pela oficina após inspeção.

## Verificação manual

1. Envie sem serviço: o navegador deve solicitar um serviço principal.
2. Marque somente extras: o resumo deve continuar sem total.
3. Selecione e-bike e ambos os extras: confira £105.00.
4. Calcule e confira o foco e a confirmação no resumo.
5. Reinicie e confira a seleção limpa e foco no primeiro serviço.
6. Confira teclado, leitor de tela, movimento reduzido e larguras de celular e desktop.
