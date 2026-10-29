# Borough Cycle Repairs — Quote Calculator

Calculadora de orçamento responsiva, feita com HTML5, CSS3 e JavaScript puro. Interface em inglês britânico para os clientes da oficina em Londres.

## Executar

Abra `index.html` no navegador. Não é necessário instalar dependências ou executar um build. As fontes do Google são opcionais: sem internet, a página utiliza as fontes locais de fallback.

## Funcionalidades

- Seleção de um serviço principal: Basic maintenance (£25), Full maintenance (£55) ou E-bike maintenance (£75).
- Extras opcionais: Tyre replacement (+£12) e Brake adjustment (+£18).
- Resumo e total atualizados automaticamente, com formatação GBP.
- Validação nativa que impede enviar o formulário sem serviço principal.
- Layout adaptado a computadores e celulares, campos acessíveis por teclado e anúncio das atualizações do orçamento para leitores de tela.

## Verificação manual

1. Sem selecionar serviço, clique em **Calculate estimate**: o navegador deve solicitar um serviço principal.
2. Marque apenas extras: o total deve continuar como `—`.
3. Selecione cada serviço sem extras: £25.00, £55.00 e £75.00.
4. Adicione os dois extras: os totais devem ser £55.00, £85.00 e £105.00, respectivamente.
5. Desmarque extras e troque o serviço: o resumo deve refletir exatamente a seleção atual.
6. Verifique a navegação por teclado e o layout em uma janela de celular e de computador.

Os valores são estimativas; a página informa que o preço final será confirmado após a inspeção da bicicleta.
