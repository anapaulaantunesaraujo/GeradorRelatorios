// Catálogo completo de Instruções Guiadas (Tours Interativos) do Zebra Print System

export const TOUR_CATEGORIES = [
  'Todos',
  'Geral',
  'Impressão',
  'Modelos & Editor',
  'Inteligência Artificial',
  'Conexões ERP'
];

export const GUIDED_TOURS = [
  {
    id: 'visao-geral',
    category: 'Geral',
    title: 'Visão Geral - Zebra Print System',
    shortTitle: 'Visão Geral - Zebra Print System',
    description: 'Conheça rapidamente cada área do sistema: onde imprimir etiquetas, gerenciar modelos e conectar bancos de dados.',
    steps: [
      {
        target: '[data-tour="nav-brand"]',
        route: '/',
        title: 'Bem-vindo ao Zebra Print System!',
        actionText: 'Este é o seu sistema central para criar e imprimir etiquetas térmicas Zebra de forma rápida e sem complicação.',
        infoText: 'Vamos fazer um tour rápido de 1 minuto para você conhecer os 3 menus principais e saber exatamente onde clicar no dia a dia.',
        badgeText: 'BEM-VINDO!'
      },
      {
        target: '[data-tour="nav-print"]',
        route: '/',
        title: 'Impressão Operacional',
        actionText: 'No menu superior, clique em "Impressão Operacional" sempre que precisar imprimir etiquetas no dia a dia.',
        infoText: 'É a tela usada pela operação: basta escolher o modelo da etiqueta, bipar ou digitar o código (ex: número do pedido) e clicar em Imprimir.',
        badgeText: 'DIA A DIA'
      },
      {
        target: '[data-tour="nav-dashboard"]',
        route: '/',
        title: 'Dashboard (TI) — Modelos de Etiqueta',
        actionText: 'Para criar novos modelos de etiqueta ou editar layouts existentes, acesse "Dashboard (TI)".',
        infoText: 'Aqui ficam listados todos os modelos cadastrados. Você pode criar um do zero, editar ou usar a IA para desenhar a etiqueta a partir de uma foto.',
        badgeText: 'MODELOS'
      },
      {
        target: '[data-tour="nav-conexoes"]',
        route: '/',
        title: 'Conexões ERP (Bancos de Dados)',
        actionText: 'Clique em "Conexões ERP" quando precisar cadastrar ou ajustar o acesso ao banco de dados da empresa.',
        infoText: 'É graças a essas conexões que o sistema busca automaticamente o nome do cliente, produto, peso e destino na hora da impressão.',
        badgeText: 'INTEGRAÇÕES'
      },
      {
        target: '[data-tour="assistant-fab"]',
        route: '/',
        title: 'Sua Assistente Virtual está sempre aqui!',
        actionText: 'Sempre que tiver qualquer dúvida ou quiser refazer um guia passo a passo, clique neste botão azul no canto inferior direito.',
        infoText: 'Você pode conversar com a assistente em linguagem simples ou escolher qualquer instrução guiada na aba "Instruções Guiadas".',
        badgeText: 'AJUDA RÁPIDA'
      }
    ]
  },
  {
    id: 'imprimir-etiqueta',
    category: 'Impressão',
    title: 'Como Imprimir uma Etiqueta',
    shortTitle: 'Imprimir uma Etiqueta',
    description: 'Aprenda o passo a passo operacional: escolher o modelo, bipar ou digitar os dados e enviar para a impressora Zebra.',
    steps: [
      {
        target: '[data-tour="print-select-template"]',
        route: '/',
        title: 'Escolher o Modelo de Etiqueta',
        actionText: 'Clique na lista "Modelo de Etiqueta" e selecione qual etiqueta você precisa imprimir (ex: Etiqueta de Expedição).',
        infoText: 'Cada modelo já vem configurado com o tamanho certo e os dados que serão buscados automaticamente do sistema.',
        badgeText: 'CLIQUE AQUI!'
      },
      {
        target: '[data-tour="print-dynamic-inputs"]',
        route: '/',
        title: 'Bipar ou Digitar os Dados',
        actionText: 'Preencha os campos que aparecerem abaixo (como Número do Pedido, Crachá ou Lote) digitando ou usando o leitor de código de barras.',
        infoText: 'Assim que você escolher um modelo acima, os campos necessários aparecem automaticamente aqui para você preencher.',
        badgeText: 'PREENCHA AQUI'
      },
      {
        target: '[data-tour="nav-print"]',
        route: '/',
        title: 'Enviar para a Impressora Zebra',
        actionText: 'Com os campos preenchidos, clique no botão grande "IMPRIMIR ETIQUETA" que aparece logo abaixo do formulário.',
        infoText: 'O sistema consulta os dados no banco, mostra um resumo da última impressão na tela e envia a etiqueta direto para a impressora Zebra.',
        badgeText: 'PRONTO!'
      }
    ]
  },
  {
    id: 'gerenciar-modelos',
    category: 'Modelos & Editor',
    title: 'Gerenciar Modelos no Dashboard (TI)',
    shortTitle: 'Gerenciar Modelos (TI)',
    description: 'Veja como consultar todos os modelos de etiqueta existentes, editar layouts, excluir antigos ou iniciar um novo.',
    steps: [
      {
        target: '[data-tour="nav-dashboard"]',
        route: '/admin',
        title: 'Acessar o Dashboard (TI)',
        actionText: 'No menu superior, clique em "Dashboard (TI)" para abrir a central de modelos.',
        infoText: 'Esta área é voltada para quem configura e mantém os modelos de etiquetas da empresa.',
        badgeText: 'MENU TI'
      },
      {
        target: '[data-tour="dashboard-table"]',
        route: '/admin',
        title: 'Lista de Modelos Cadastrados',
        actionText: 'Nesta tabela você vê todos os modelos criados. Use o ícone de lápis (✏️) para editar ou a lixeira (🗑️) para excluir.',
        infoText: 'Ao clicar em excluir, o sistema sempre pede uma confirmação antes de apagar para evitar remoções acidentais.',
        badgeText: 'SEUS MODELOS'
      },
      {
        target: '[data-tour="dashboard-new-template"]',
        route: '/admin',
        title: 'Criar um Novo Modelo',
        actionText: 'Clique no botão "+ Novo Modelo" no canto superior direito para abrir o Editor Visual de Etiquetas.',
        infoText: 'No editor você poderá definir medidas em centímetros, arrastar textos, códigos de barras e QR Codes.',
        badgeText: 'CLIQUE AQUI!'
      }
    ]
  },
  {
    id: 'criar-modelo-editor',
    category: 'Modelos & Editor',
    title: 'Criar um Novo Modelo de Etiqueta',
    shortTitle: 'Criar Modelo no Editor',
    description: 'Passo a passo completo no Editor Visual: configurar tamanho, filtros, arrastar elementos no canvas e salvar.',
    steps: [
      {
        target: '[data-tour="editor-config-geral"]',
        route: '/editor',
        title: '1. Configuração Geral e Medidas',
        actionText: 'Defina o Nome do Template, a Largura, Altura, Orientação (Retrato ou Paisagem), Margem e as Queries SQL.',
        infoText: 'As medidas em centímetros ajustam automaticamente o tamanho da etiqueta branca no centro da tela.',
        badgeText: 'PASSO 1'
      },
      {
        target: '[data-tour="editor-inputs-section"]',
        route: '/editor',
        title: '2. Inputs do Usuário (Filtros)',
        actionText: 'Clique em "+ Adicionar Filtro" para criar os campos que o operador vai digitar ou bipar na tela de impressão.',
        infoText: 'Por exemplo: crie uma variável "numero_pedido" com o rótulo "Digite o Pedido" para filtrar os dados na hora de imprimir.',
        badgeText: 'PASSO 2'
      },
      {
        target: '[data-tour="editor-tools-section"]',
        route: '/editor',
        title: '3. Arrastar Ferramentas',
        actionText: 'Clique e arraste "Texto", "Barcode" (Código de Barras) ou "QR Code" para dentro da etiqueta branca ao lado.',
        infoText: 'Você pode adicionar quantos elementos quiser e posicioná-los exatamente onde devem sair impressos.',
        badgeText: 'ARRASTE DAQUI'
      },
      {
        target: '[data-tour="editor-canvas"]',
        route: '/editor',
        title: '4. Canvas da Etiqueta e Propriedades',
        actionText: 'Solte os elementos dentro da área pontilhada vermelha (margem segura) e clique em qualquer item para editar na coluna da direita.',
        infoText: 'Na coluna "Propriedades" à direita você escolhe a fonte, tamanho, se é texto fixo ou coluna do banco, e até regras condicionais.',
        badgeText: 'DESENHE AQUI'
      },
      {
        target: '[data-tour="editor-save-btn"]',
        route: '/editor',
        title: '5. Salvar o Modelo',
        actionText: 'Quando terminar de montar sua etiqueta, clique em "Salvar Modelo" no canto superior direito.',
        infoText: 'Assim que salvo, o modelo fica disponível para uso na tela de Impressão Operacional.',
        badgeText: 'SALVAR!'
      }
    ]
  },
  {
    id: 'gerar-com-ia-foto',
    category: 'Inteligência Artificial',
    title: 'Gerar Etiqueta com IA a partir de Foto',
    shortTitle: 'Gerar Etiqueta por Foto (IA)',
    description: 'Economize tempo! Envie a foto de uma etiqueta física e deixe a IA desenhar o layout automaticamente no canvas.',
    steps: [
      {
        target: '[data-tour="editor-ia-section"]',
        route: '/editor',
        title: 'Enviar Foto da Etiqueta',
        actionText: 'Clique no botão "🪄 Gerar Modelo a partir de Foto" e selecione uma imagem nítida da etiqueta que você quer copiar.',
        infoText: 'A Inteligência Artificial analisa a imagem e identifica automaticamente textos, posições e códigos de barras.',
        badgeText: 'CLIQUE AQUI!'
      },
      {
        target: '[data-tour="editor-canvas"]',
        route: '/editor',
        title: 'Conferir o Desenho Gerado',
        actionText: 'Aguarde alguns segundos e veja os elementos aparecerem automaticamente posicionados aqui no Canvas.',
        infoText: 'Você pode clicar em qualquer elemento gerado para ajustar o texto, tamanho ou vincular a uma coluna do banco de dados.',
        badgeText: 'RESULTADO AQUI'
      },
      {
        target: '[data-tour="editor-properties"]',
        route: '/editor',
        title: 'Ajustar Propriedades Finais',
        actionText: 'Com um elemento selecionado, use este painel lateral para trocar fonte, tamanho ou ligar o campo ao seu ERP.',
        infoText: 'Depois dos ajustes, basta clicar em "Salvar Modelo" no topo da tela.',
        badgeText: 'AJUSTES'
      }
    ]
  },
  {
    id: 'cadastrar-conexao-erp',
    category: 'Conexões ERP',
    title: 'Cadastrar Conexão com ERP',
    shortTitle: 'Cadastrar Conexão ERP',
    description: 'Aprenda a conectar bancos de dados (PostgreSQL, SQL Server, MySQL ou Oracle) para alimentar suas etiquetas.',
    steps: [
      {
        target: '[data-tour="nav-conexoes"]',
        route: '/conexoes',
        title: 'Acessar Conexões ERP',
        actionText: 'No menu superior, clique em "Conexões ERP" para gerenciar os bancos de dados integrados.',
        infoText: 'O sistema suporta múltiplos bancos de dados simultâneos (PostgreSQL, SQL Server, MySQL e Oracle).',
        badgeText: 'MENU ERP'
      },
      {
        target: '[data-tour="conexoes-table"]',
        route: '/conexoes',
        title: 'Conexões Já Configuradas',
        actionText: 'Aqui você visualiza todas as conexões ativas, com o tipo de banco, endereço (Host : Porta) e nome do Database.',
        infoText: 'Você pode editar ou remover conexões usando os botões de ação na última coluna.',
        badgeText: 'CONEXÕES'
      },
      {
        target: '[data-tour="conexoes-new-btn"]',
        route: '/conexoes',
        title: 'Adicionar Nova Conexão',
        actionText: 'Clique em "+ Nova Conexão", preencha o apelido, tipo de banco, IP/Host, porta, usuário, senha e clique em "Salvar Conexão".',
        infoText: 'Depois de salva, essa conexão já aparece como opção na hora de criar Queries no Editor de Modelos.',
        badgeText: 'CLIQUE AQUI!'
      }
    ]
  }
];
