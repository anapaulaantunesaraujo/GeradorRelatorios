// Motor de IA Interna e Auto-Aprendizado do Zebra Print System
// Lê dinamicamente a tela atual do aplicativo + base de conhecimento interna
// para responder dúvidas de forma humanizada, clara e acessível para leigos.

const STORAGE_FEEDBACK_KEY = 'zebra_ai_learned_feedback';

// Normaliza texto em português (remove acentos, pontuação e converte para minúsculas)
function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Expansão de sinônimos comuns de usuários leigos
const SYNONYMS = {
  etiqueta: ['label', 'tag', 'adesivo', 'impressao', 'relatorio'],
  imprimir: ['print', 'bipe', 'bipar', 'emitir', 'tirar', 'gerar', 'impressora', 'zebra'],
  modelo: ['template', 'layout', 'desenho', 'molde', 'formato'],
  criar: ['novo', 'fazer', 'montar', 'cadastrar', 'adicionar', 'comecar'],
  editar: ['alterar', 'mudar', 'modificar', 'corrigir', 'arrumar', 'lapis'],
  excluir: ['deletar', 'apagar', 'remover', 'tirar', 'lixeira'],
  conexao: ['erp', 'banco', 'sql', 'postgres', 'mysql', 'oracle', 'servidor', 'dados', 'integracao'],
  foto: ['imagem', 'ia', 'inteligencia', 'artificial', 'upload', 'copiar', 'automatico'],
  codigo: ['barras', 'barcode', 'qrcode', 'qr', 'leitor'],
  guia: ['tour', 'tutorial', 'ajuda', 'ensinar', 'aprender', 'passo', 'instrucao', 'refazer'],
  tamanho: ['largura', 'altura', 'medida', 'cm', 'centimetro', 'margem', 'retrato', 'paisagem', 'orientacao'],
  filtro: ['input', 'campo', 'variavel', 'pedido', 'lote', 'cracha', 'operador'],
  condicional: ['opcional', 'regra', 'se', 'condicao']
};

function expandTokens(normalizedQuery) {
  const words = normalizedQuery.split(' ').filter(w => w.length > 1);
  const expanded = new Set(words);
  for (const w of words) {
    for (const [root, syns] of Object.entries(SYNONYMS)) {
      if (w === root || syns.includes(w)) {
        expanded.add(root);
        syns.forEach(s => expanded.add(s));
      }
    }
  }
  return Array.from(expanded);
}

// Base de conhecimento interna estruturada (escrita em linguagem simples e humanizada)
const KNOWLEDGE_BASE = [
  {
    id: 'visao-geral',
    tourId: 'visao-geral',
    tourTitle: 'Visão Geral - Zebra Print System',
    keywords: ['ajudar', 'funciona', 'sistema', 'app', 'zebra', 'print', 'serve', 'comecar', 'o que e', 'ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'menu', 'visao geral'],
    answer:
      'Olá! 😊 O **Zebra Print System** foi feito para facilitar a criação e impressão de etiquetas térmicas Zebra no seu dia a dia.\n\n' +
      'Ele é dividido em **3 áreas bem simples**:\n' +
      '• **Impressão Operacional:** onde você escolhe a etiqueta, bipa ou digita o código (como o número do pedido) e imprime na hora.\n' +
      '• **Dashboard (TI):** onde você vê, edita ou cria novos modelos de etiqueta no editor visual.\n' +
      '• **Conexões ERP:** onde ficam configurados os bancos de dados da empresa para puxar os dados automaticamente.\n\n' +
      'Se quiser, posso te mostrar tudo isso direto na tela com um tour rápido!'
  },
  {
    id: 'como-imprimir',
    tourId: 'imprimir-etiqueta',
    tourTitle: 'Como Imprimir uma Etiqueta',
    keywords: ['imprimir', 'etiqueta', 'impressao', 'operacional', 'bipar', 'bipe', 'pedido', 'lote', 'cracha', 'impressora', 'emitir', 'tirar'],
    answer:
      'Imprimir uma etiqueta é super rápido! Siga estes 3 passinhos:\n\n' +
      '1. Acesse **Impressão Operacional** no menu superior (é a tela inicial do sistema).\n' +
      '2. Em **Modelo de Etiqueta**, escolha qual etiqueta deseja imprimir (por exemplo, *Etiqueta de Expedição* ou *Etiqueta de Qualidade*).\n' +
      '3. Os campos necessários vão aparecer logo abaixo — basta **digitar ou bipar** com o leitor (ex: Número do Pedido) e clicar no botão **IMPRIMIR ETIQUETA**.\n\n' +
      'Logo em seguida, aparece um resumo da última impressão confirmando que tudo foi enviado para a impressora Zebra. ✅'
  },
  {
    id: 'criar-modelo',
    tourId: 'criar-modelo-editor',
    tourTitle: 'Criar um Novo Modelo de Etiqueta',
    keywords: ['criar', 'novo', 'modelo', 'template', 'editor', 'montar', 'desenhar', 'layout', 'canvas', 'arrastar', 'salvar'],
    answer:
      'Para criar um novo modelo de etiqueta do zero, é bem intuitivo:\n\n' +
      '1. Vá em **Dashboard (TI)** no menu superior e clique no botão **+ Novo Modelo**.\n' +
      '2. Na coluna da esquerda (**1. Configuração Geral**), dê um nome ao modelo e informe a largura, altura, orientação (Retrato ou Paisagem) e margem em centímetros.\n' +
      '3. Em **2. Inputs do Usuário**, adicione os campos que o operador vai digitar/bipar na hora da impressão.\n' +
      '4. Arraste **Texto**, **Barcode** ou **QR Code** para dentro da etiqueta branca no centro (Canvas).\n' +
      '5. Clique em qualquer elemento para ajustar fonte, tamanho ou coluna do banco na coluna **Propriedades** à direita e clique em **Salvar Modelo**! 🎨'
  },
  {
    id: 'ia-foto',
    tourId: 'gerar-com-ia-foto',
    tourTitle: 'Gerar Etiqueta com IA a partir de Foto',
    keywords: ['foto', 'imagem', 'ia', 'inteligencia', 'artificial', 'upload', 'copiar', 'automatico', 'escanear'],
    answer:
      'Sim! Você não precisa desenhar uma etiqueta parecida do zero. ✨\n\n' +
      'Dentro do **Editor de Modelos** (acesse **Dashboard (TI)** → **+ Novo Modelo**):\n' +
      '1. Na coluna da esquerda, procure a seção **✨ Inteligência Artificial**.\n' +
      '2. Clique em **🪄 Gerar Modelo a partir de Foto** e envie uma foto nítida da etiqueta física.\n' +
      '3. A IA analisa a imagem e monta os textos e códigos de barras automaticamente no Canvas!\n\n' +
      'Depois, você só confere as posições, ajusta o que quiser no painel de Propriedades e salva.'
  },
  {
    id: 'conexoes-erp',
    tourId: 'cadastrar-conexao-erp',
    tourTitle: 'Cadastrar Conexão com ERP',
    keywords: ['conexao', 'conexoes', 'erp', 'banco', 'dados', 'sql', 'postgres', 'postgresql', 'sqlserver', 'mysql', 'oracle', 'host', 'porta', 'integracao'],
    answer:
      'As **Conexões ERP** permitem que suas etiquetas busquem informações direto do banco de dados da empresa (como nome do cliente, produto e peso).\n\n' +
      'Para cadastrar uma nova conexão:\n' +
      '1. Clique em **Conexões ERP** no menu superior.\n' +
      '2. Clique no botão **+ Nova Conexão**.\n' +
      '3. Informe um apelido fácil de lembrar (ex: *ERP Principal*), escolha o tipo de banco (**PostgreSQL, SQL Server, MySQL ou Oracle**), preencha Host/IP, Porta, Usuário, Senha e Nome do Banco.\n' +
      '4. Clique em **Salvar Conexão**. Prontinho! Ela já ficará disponível para usar nas Queries do Editor.'
  },
  {
    id: 'editar-excluir-modelo',
    tourId: 'gerenciar-modelos',
    tourTitle: 'Gerenciar Modelos no Dashboard (TI)',
    keywords: ['editar', 'alterar', 'excluir', 'deletar', 'apagar', 'remover', 'dashboard', 'lista', 'lapis', 'lixeira'],
    answer:
      'Para editar ou excluir um modelo que já existe:\n\n' +
      '1. Clique em **Dashboard (TI)** no menu superior.\n' +
      '2. Na tabela de modelos, encontre a etiqueta desejada.\n' +
      '3. Clique no ícone de **lápis (✏️)** para abrir no editor e fazer alterações, ou na **lixeira (🗑️)** para excluir.\n\n' +
      '💡 *Fique tranquilo:* ao clicar na lixeira, o sistema sempre abre uma janela pedindo confirmação antes de apagar.'
  },
  {
    id: 'codigo-barras-qr',
    tourId: 'criar-modelo-editor',
    tourTitle: 'Criar um Novo Modelo de Etiqueta',
    keywords: ['codigo', 'barras', 'barcode', 'qrcode', 'qr', 'texto', 'ferramentas', 'arrastar', 'propriedades', 'fonte', 'condicional', 'opcional'],
    answer:
      'Adicionar **Texto**, **Código de Barras (Barcode)** ou **QR Code** na etiqueta é bem simples:\n\n' +
      '1. No **Editor de Modelos**, olhe na parte de baixo da coluna esquerda, em **Ferramentas (Arraste)**.\n' +
      '2. Clique, segure e arraste o item desejado para dentro da etiqueta branca no centro (respeitando a linha pontilhada vermelha da margem).\n' +
      '3. Clique no elemento já posicionado para abrir o painel **Propriedades** na direita: lá você muda a fonte, o tamanho, escolhe se o valor é **Texto Fixo** ou vem de uma **Query do banco**, e pode até marcar como **Campo Condicional (Opcional)** com uma regra de impressão.'
  },
  {
    id: 'tamanho-margem',
    tourId: 'criar-modelo-editor',
    tourTitle: 'Criar um Novo Modelo de Etiqueta',
    keywords: ['tamanho', 'largura', 'altura', 'medida', 'cm', 'centimetro', 'margem', 'retrato', 'paisagem', 'orientacao', 'corte', 'cortando'],
    answer:
      'Se a etiqueta estiver com tamanho diferente ou cortando nas bordas, ajuste no **Editor de Modelos**:\n\n' +
      '• Em **1. Configuração Geral**, preencha a **Largura (cm)** e **Altura (cm)** exatas do rolo de etiqueta Zebra.\n' +
      '• Escolha a **Orientação** (**Retrato** para etiqueta em pé, **Paisagem** para deitada).\n' +
      '• Defina a **Margem (cm)**: a linha pontilhada vermelha no Canvas mostra a área segura para nada sair cortado na impressão! 📏'
  },
  {
    id: 'refazer-guia',
    tourId: 'visao-geral',
    tourTitle: 'Visão Geral - Zebra Print System',
    keywords: ['guia', 'tour', 'tutorial', 'instrucao', 'guiada', 'refazer', 'aprender', 'ensinar', 'passo', 'apresentacao', 'onboarding'],
    answer:
      'Você pode iniciar ou refazer qualquer **Instrução Guiada** sempre que quiser! 🧭\n\n' +
      'Basta clicar na aba **Instruções Guiadas** aqui no topo desta janela e escolher o processo que deseja aprender. Eu vou colocar círculos luminosos na tela mostrando exatamente onde clicar, passo a passo!'
  }
];

// Leitor Dinâmico do App (Auto-aprendizado do contexto atual da tela)
export function scanLiveAppContext() {
  try {
    const pathname = window.location.pathname;
    const headings = Array.from(document.querySelectorAll('main h1, main h2'))
      .map(el => el.textContent?.trim())
      .filter(Boolean)
      .slice(0, 6);

    const buttons = Array.from(document.querySelectorAll('main button'))
      .map(el => el.textContent?.trim())
      .filter(t => t && t.length > 2 && t.length < 40)
      .slice(0, 6);

    const labels = Array.from(document.querySelectorAll('main label'))
      .map(el => el.textContent?.trim())
      .filter(Boolean)
      .slice(0, 8);

    let screenName = 'Impressão Operacional';
    if (pathname.startsWith('/admin')) screenName = 'Dashboard (TI) — Modelos de Etiqueta';
    else if (pathname.startsWith('/editor')) screenName = 'Editor Visual de Modelos';
    else if (pathname.startsWith('/conexoes')) screenName = 'Conexões de Banco de Dados (ERPs)';

    return { pathname, screenName, headings, buttons, labels };
  } catch {
    return { pathname: '/', screenName: 'Zebra Print System', headings: [], buttons: [], labels: [] };
  }
}

// Registra feedback do usuário (aprendizado local)
export function saveAnswerFeedback(question, articleId, helpful) {
  try {
    const raw = localStorage.getItem(STORAGE_FEEDBACK_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push({
      question: normalizeText(question),
      articleId,
      helpful,
      timestamp: Date.now()
    });
    localStorage.setItem(STORAGE_FEEDBACK_KEY, JSON.stringify(list.slice(-100)));
  } catch {
    // ignore storage errors
  }
}

// Gera a melhor resposta humanizada combinando Base Interna + Leitura ao Vivo do App
export function generateAssistantResponse(userQuestion) {
  const normalized = normalizeText(userQuestion);
  const tokens = expandTokens(normalized);
  const liveContext = scanLiveAppContext();

  // Pergunta sobre a tela atual ("onde estou", "essa tela", "aqui")
  if (
    normalized.includes('onde estou') ||
    normalized.includes('essa tela') ||
    normalized.includes('esta tela') ||
    normalized.includes('o que tem aqui') ||
    normalized.includes('tela atual')
  ) {
    const buttonsText = liveContext.buttons.length
      ? `\n\n**Principais ações disponíveis aqui:** ${liveContext.buttons.join(', ')}.`
      : '';
    const fieldsText = liveContext.labels.length
      ? `\n**Campos visíveis nesta tela:** ${liveContext.labels.slice(0, 5).join(', ')}.`
      : '';

    let suggestedTourId = 'visao-geral';
    let suggestedTourTitle = 'Visão Geral - Zebra Print System';
    if (liveContext.pathname === '/') {
      suggestedTourId = 'imprimir-etiqueta';
      suggestedTourTitle = 'Como Imprimir uma Etiqueta';
    } else if (liveContext.pathname.startsWith('/admin')) {
      suggestedTourId = 'gerenciar-modelos';
      suggestedTourTitle = 'Gerenciar Modelos no Dashboard (TI)';
    } else if (liveContext.pathname.startsWith('/editor')) {
      suggestedTourId = 'criar-modelo-editor';
      suggestedTourTitle = 'Criar um Novo Modelo de Etiqueta';
    } else if (liveContext.pathname.startsWith('/conexoes')) {
      suggestedTourId = 'cadastrar-conexao-erp';
      suggestedTourTitle = 'Cadastrar Conexão com ERP';
    }

    return {
      articleId: 'live-context',
      text: `Você está agora na tela **${liveContext.screenName}**. 👀${fieldsText}${buttonsText}\n\nQuer que eu te guie passo a passo por esta tela?`,
      tourId: suggestedTourId,
      tourTitle: suggestedTourTitle
    };
  }

  // Pontuação semântica contra a base de conhecimento
  let bestArticle = null;
  let bestScore = 0;

  for (const article of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of article.keywords) {
      const normKw = normalizeText(kw);
      if (normalized.includes(normKw)) {
        score += 3;
      } else if (tokens.includes(normKw)) {
        score += 2;
      } else {
        for (const t of tokens) {
          if (t.length >= 4 && (normKw.includes(t) || t.includes(normKw))) {
            score += 1;
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestArticle = article;
    }
  }

  if (bestArticle && bestScore >= 2) {
    return {
      articleId: bestArticle.id,
      text: bestArticle.answer,
      tourId: bestArticle.tourId,
      tourTitle: bestArticle.tourTitle
    };
  }

  // Fallback inteligente usando o que a IA leu da tela atual
  const dynamicHint = liveContext.headings.length
    ? `Vi que você está em **${liveContext.screenName}** (${liveContext.headings[0]}). `
    : '';

  return {
    articleId: 'fallback',
    text:
      `${dynamicHint}Ainda estou aprendendo sobre esse detalhe específico, mas posso te ajudar com qualquer um dos processos principais do sistema! 😊\n\n` +
      'Você pode me perguntar, por exemplo:\n' +
      '• *Como imprimir uma etiqueta?*\n' +
      '• *Como criar um novo modelo de etiqueta?*\n' +
      '• *Como gerar uma etiqueta usando foto com IA?*\n' +
      '• *Como cadastrar uma conexão com banco de dados ERP?*\n\n' +
      'Ou, se preferir, clique abaixo para iniciar uma instrução guiada na tela!',
    tourId: 'visao-geral',
    tourTitle: 'Visão Geral - Zebra Print System'
  };
}

export const QUICK_SUGGESTIONS = [
  'Em que o Zebra Print System pode me ajudar?',
  'Como imprimir uma etiqueta?',
  'Como criar um novo modelo de etiqueta?',
  'Como gerar etiqueta usando foto com IA?',
  'Como cadastrar uma conexão ERP?',
  'Como adicionar código de barras ou QR Code?',
  'Como editar ou excluir um modelo?',
  'O que posso fazer nesta tela atual?'
];
