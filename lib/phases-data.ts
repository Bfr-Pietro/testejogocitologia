import type { Phase, Block } from './minigame-types'

export const BLOCKS: Block[] = [
  {
    id: 1,
    name: 'Descoberta da Célula',
    theme: 'historia',
    description: 'A jornada dos cientistas que descobriram o mundo microscópico',
    icon: 'microscope',
    color: 'from-emerald-500 to-teal-500',
    phases: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Tipos de Célula',
    theme: 'tipos',
    description: 'Procariontes vs Eucariontes - as diferenças fundamentais',
    icon: 'cells',
    color: 'from-blue-500 to-cyan-500',
    phases: [4, 5, 6]
  },
  {
    id: 3,
    name: 'Organelas',
    theme: 'organelas',
    description: 'As pequenas fábricas dentro das células',
    icon: 'factory',
    color: 'from-purple-500 to-pink-500',
    phases: [7, 8, 9]
  },
  {
    id: 4,
    name: 'Animal vs Vegetal',
    theme: 'comparacao',
    description: 'As diferenças entre células animais e vegetais',
    icon: 'leaf',
    color: 'from-green-500 to-lime-500',
    phases: [10, 11, 12]
  },
  {
    id: 5,
    name: 'Membrana Plasmática',
    theme: 'membrana',
    description: 'A barreira que protege a célula',
    icon: 'shield',
    color: 'from-amber-500 to-orange-500',
    phases: [13, 14, 15, 16]
  },
  {
    id: 6,
    name: 'Transporte Celular',
    theme: 'transporte',
    description: 'Como as substâncias entram e saem das células',
    icon: 'truck',
    color: 'from-indigo-500 to-violet-500',
    phases: [17, 18, 19, 20]
  },
  {
    id: 7,
    name: 'Síntese de Proteínas',
    theme: 'sintese',
    description: 'A fábrica de proteínas da célula',
    icon: 'factory',
    color: 'from-rose-500 to-red-500',
    phases: [21, 22, 23, 24]
  },
  {
    id: 8,
    name: 'Energia Celular',
    theme: 'energia',
    description: 'Respiração celular e produção de ATP',
    icon: 'zap',
    color: 'from-yellow-500 to-amber-500',
    phases: [25, 26, 27]
  },
  {
    id: 9,
    name: 'Desafio Final',
    theme: 'boss',
    description: 'Enfrente o Fragmento e salve a célula!',
    icon: 'skull',
    color: 'from-slate-600 to-slate-800',
    phases: [28, 29, 30]
  }
]

export const PHASES: Phase[] = [
  // BLOCO 1 - Descoberta da Célula
  {
    id: 1,
    blockId: 1,
    blockName: 'Descoberta da Célula',
    title: 'Robert Hooke',
    theme: 'Hooke',
    description: 'O cientista que nomeou as células',
    icon: 'microscope',
    color: 'from-emerald-400 to-emerald-600',
    isUnlocked: true,
    educationalContent: {
      title: 'Robert Hooke (1665)',
      facts: [
        'Observou células de cortiça ao microscópio',
        'Foi o primeiro a usar o termo "célula"',
        'Publicou suas descobertas no livro Micrographia'
      ]
    },
    minigames: [
      { type: 'memory', title: 'Memória Científica', description: 'Combine cientistas com suas descobertas', timeLimit: 60, targetScore: 100, difficulty: 1 },
      { type: 'tap-correct', title: 'Clique Correto', description: 'Clique nos termos relacionados à citologia', timeLimit: 30, targetScore: 80, difficulty: 1 },
      { type: 'avoid-wrong', title: 'Desvie dos Erros', description: 'Clique nos termos corretos e evite os errados', timeLimit: 45, targetScore: 90, difficulty: 1 }
    ]
  },
  {
    id: 2,
    blockId: 1,
    blockName: 'Descoberta da Célula',
    title: 'Leeuwenhoek',
    theme: 'Leeuwenhoek',
    description: 'O pai da microbiologia',
    icon: 'eye',
    color: 'from-teal-400 to-teal-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Anton van Leeuwenhoek (1674)',
      facts: [
        'Construiu microscópios com lentes de alta qualidade',
        'Descobriu microorganismos que chamou de "animálculos"',
        'Primeiro a observar bactérias e protozoários'
      ]
    },
    minigames: [
      { type: 'catch-items', title: 'Caça ao Micróbio', description: 'Capture os microorganismos que aparecem', timeLimit: 45, targetScore: 100, difficulty: 1 },
      { type: 'zoom-match', title: 'Jogo do Zoom', description: 'Identifique a imagem ampliada correta', timeLimit: 30, targetScore: 80, difficulty: 1 },
      { type: 'reflex', title: 'Reflexo Microscópico', description: 'Clique rápido quando aparecer "célula"', timeLimit: 30, targetScore: 120, difficulty: 2 }
    ]
  },
  {
    id: 3,
    blockId: 1,
    blockName: 'Descoberta da Célula',
    title: 'Teoria Celular',
    theme: 'Teoria',
    description: 'Os três pilares da teoria celular',
    icon: 'book',
    color: 'from-cyan-400 to-cyan-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Teoria Celular',
      facts: [
        'Todos os seres vivos são formados por células',
        'A célula é a unidade básica da vida',
        'Toda célula se origina de outra célula pré-existente'
      ]
    },
    minigames: [
      { type: 'timeline', title: 'Linha do Tempo', description: 'Organize os eventos na ordem correta', timeLimit: 60, targetScore: 100, difficulty: 2 },
      { type: 'sequence', title: 'Sequência Rápida', description: 'Coloque na ordem certa contra o tempo', timeLimit: 45, targetScore: 90, difficulty: 2 },
      { type: 'speed-combo', title: 'Combo de Velocidade', description: 'Acerte 3 seguidos para pontuar!', timeLimit: 40, targetScore: 150, difficulty: 2 }
    ]
  },
  
  // BLOCO 2 - Tipos de Célula
  {
    id: 4,
    blockId: 2,
    blockName: 'Tipos de Célula',
    title: 'Procariontes',
    theme: 'Procariontes',
    description: 'Células simples sem núcleo definido',
    icon: 'circle',
    color: 'from-blue-400 to-blue-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Células Procariontes',
      facts: [
        'Não possuem núcleo organizado',
        'Material genético no citoplasma',
        'Bactérias e arqueias são procariontes'
      ]
    },
    minigames: [
      { type: 'drag-category', title: 'Categoria Rápida', description: 'Arraste os itens para a categoria correta', timeLimit: 45, targetScore: 100, difficulty: 2 },
      { type: 'tap-correct', title: 'Tap nos Procariontes', description: 'Clique só nas células procariontes', timeLimit: 30, targetScore: 80, difficulty: 2 },
      { type: 'avoid-wrong', title: 'Evite Eucariontes', description: 'Clique nos procariontes e evite eucariontes!', timeLimit: 40, targetScore: 100, difficulty: 2 }
    ]
  },
  {
    id: 5,
    blockId: 2,
    blockName: 'Tipos de Célula',
    title: 'Eucariontes',
    theme: 'Eucariontes',
    description: 'Células complexas com núcleo definido',
    icon: 'target',
    color: 'from-indigo-400 to-indigo-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Células Eucariontes',
      facts: [
        'Possuem núcleo organizado com membrana',
        'Têm diversas organelas membranosas',
        'Animais, plantas, fungos e protistas'
      ]
    },
    minigames: [
      { type: 'build-cell', title: 'Monte a Célula', description: 'Arraste as organelas para os lugares certos', timeLimit: 60, targetScore: 100, difficulty: 2 },
      { type: 'collect-falling', title: 'Colete Organelas', description: 'Pegue as organelas que caem', timeLimit: 45, targetScore: 120, difficulty: 2 },
      { type: 'match-pairs', title: 'Combine Partes', description: 'Junte as partes corretas da célula', timeLimit: 50, targetScore: 100, difficulty: 2 }
    ]
  },
  {
    id: 6,
    blockId: 2,
    blockName: 'Tipos de Célula',
    title: 'Diferenças',
    theme: 'Comparacao',
    description: 'Comparando procariontes e eucariontes',
    icon: 'split',
    color: 'from-violet-400 to-violet-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Diferenças Principais',
      facts: [
        'Tamanho: eucariontes são maiores',
        'Complexidade: eucariontes têm mais organelas',
        'Núcleo: ausente em procariontes'
      ]
    },
    minigames: [
      { type: 'who-am-i', title: 'Quem Sou Eu?', description: 'Identifique pela dica - clique rápido!', timeLimit: 40, targetScore: 100, difficulty: 2 },
      { type: 'spot-difference', title: 'Ache as Diferenças', description: 'Encontre as diferenças no tempo', timeLimit: 45, targetScore: 80, difficulty: 2 },
      { type: 'survival', title: 'Sobrevivência', description: 'Não erre 5 seguidos!', timeLimit: 60, targetScore: 150, difficulty: 3 }
    ]
  },
  
  // BLOCO 3 - Organelas
  {
    id: 7,
    blockId: 3,
    blockName: 'Organelas',
    title: 'Mitocôndria',
    theme: 'Mitocondria',
    description: 'A usina de energia da célula',
    icon: 'battery',
    color: 'from-orange-400 to-orange-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Mitocôndria',
      facts: [
        'Produz energia na forma de ATP',
        'Realiza a respiração celular',
        'Possui DNA próprio'
      ]
    },
    minigames: [
      { type: 'clicker', title: 'Clicker de Energia', description: 'Clique freneticamente para gerar ATP!', timeLimit: 30, targetScore: 200, difficulty: 2 },
      { type: 'target-moving', title: 'Alvo Móvel', description: 'Acerte a mitocôndria em movimento', timeLimit: 40, targetScore: 100, difficulty: 2 },
      { type: 'combo', title: 'Combo ATP', description: 'Mantenha a sequência de acertos', timeLimit: 45, targetScore: 150, difficulty: 2 }
    ]
  },
  {
    id: 8,
    blockId: 3,
    blockName: 'Organelas',
    title: 'Lisossomo',
    theme: 'Lisossomo',
    description: 'O sistema de reciclagem celular',
    icon: 'trash',
    color: 'from-red-400 to-red-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Lisossomo',
      facts: [
        'Contém enzimas digestivas',
        'Degrada moléculas e organelas danificadas',
        'Atua na defesa da célula'
      ]
    },
    minigames: [
      { type: 'destroy-trash', title: 'Destrua Resíduos', description: 'Clique rápido nos "lixos" celulares', timeLimit: 40, targetScore: 120, difficulty: 2 },
      { type: 'avoid-wrong', title: 'Proteja as Organelas', description: 'Clique nos resíduos e proteja as organelas!', timeLimit: 45, targetScore: 100, difficulty: 2 },
      { type: 'survival', title: 'Modo Sobrevivência', description: 'O tempo aumenta, aguente firme!', timeLimit: 60, targetScore: 180, difficulty: 3 }
    ]
  },
  {
    id: 9,
    blockId: 3,
    blockName: 'Organelas',
    title: 'Cloroplasto',
    theme: 'Cloroplasto',
    description: 'A fábrica de açúcar das plantas',
    icon: 'sun',
    color: 'from-green-400 to-green-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Cloroplasto',
      facts: [
        'Realiza a fotossíntese',
        'Contém clorofila (pigmento verde)',
        'Transforma luz em energia química'
      ]
    },
    minigames: [
      { type: 'puzzle', title: 'Monte o Cloroplasto', description: 'Monte a imagem do cloroplasto', timeLimit: 60, targetScore: 100, difficulty: 2 },
      { type: 'collect-falling', title: 'Colete Luz', description: 'Pegue os fótons de luz que caem', timeLimit: 45, targetScore: 150, difficulty: 2 },
      { type: 'timer-challenge', title: 'Desafio de Tempo', description: 'Produza glicose antes do tempo acabar', timeLimit: 30, targetScore: 100, difficulty: 3 }
    ]
  },
  
  // BLOCO 4 - Animal vs Vegetal
  {
    id: 10,
    blockId: 4,
    blockName: 'Animal vs Vegetal',
    title: 'Célula Animal',
    theme: 'Animal',
    description: 'Estrutura da célula animal',
    icon: 'heart',
    color: 'from-pink-400 to-pink-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Célula Animal',
      facts: [
        'Não possui parede celular',
        'Possui centríolos',
        'Vacúolos pequenos'
      ]
    },
    minigames: [
      { type: 'spot-difference', title: 'Ache as Diferenças', description: 'Compare célula animal vs vegetal', timeLimit: 45, targetScore: 80, difficulty: 2 },
      { type: 'tap-correct', title: 'Clique Rápido', description: 'Identifique estruturas da célula animal', timeLimit: 35, targetScore: 100, difficulty: 2 },
      { type: 'timer-challenge', title: 'Timer Hardcore', description: 'Identifique tudo antes do tempo acabar', timeLimit: 25, targetScore: 120, difficulty: 3 }
    ]
  },
  {
    id: 11,
    blockId: 4,
    blockName: 'Animal vs Vegetal',
    title: 'Célula Vegetal',
    theme: 'Vegetal',
    description: 'Estrutura da célula vegetal',
    icon: 'leaf',
    color: 'from-lime-400 to-lime-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Célula Vegetal',
      facts: [
        'Possui parede celular de celulose',
        'Possui cloroplastos',
        'Vacúolo central grande'
      ]
    },
    minigames: [
      { type: 'build-cell', title: 'Monte a Célula', description: 'Construa a célula vegetal completa', timeLimit: 60, targetScore: 100, difficulty: 2 },
      { type: 'drag-category', title: 'Arraste Correto', description: 'Coloque as estruturas nos lugares certos', timeLimit: 45, targetScore: 90, difficulty: 2 },
      { type: 'timer-challenge', title: 'Corrida Final', description: 'Monte antes que o tempo acabe!', timeLimit: 30, targetScore: 100, difficulty: 3 }
    ]
  },
  {
    id: 12,
    blockId: 4,
    blockName: 'Animal vs Vegetal',
    title: 'Comparação Final',
    theme: 'Comparacao',
    description: 'Animal vs Vegetal - duelo final',
    icon: 'swords',
    color: 'from-emerald-400 to-emerald-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Comparação Completa',
      facts: [
        'Ambas são eucariontes',
        'Vegetais: parede, cloroplasto, vacúolo grande',
        'Animais: centríolos, sem parede celular'
      ]
    },
    minigames: [
      { type: 'drag-category', title: 'Classificação Rápida', description: 'Classifique estruturas em animal ou vegetal', timeLimit: 40, targetScore: 120, difficulty: 2 },
      { type: 'combo', title: 'Combo de Acertos', description: 'Mantenha a sequência perfeita', timeLimit: 45, targetScore: 150, difficulty: 3 },
      { type: 'survival', title: 'Sobrevivência Total', description: 'O desafio final do bloco!', timeLimit: 60, targetScore: 200, difficulty: 3 }
    ]
  },
  
  // BLOCO 5 - Membrana Plasmática
  {
    id: 13,
    blockId: 5,
    blockName: 'Membrana Plasmática',
    title: 'Estrutura da Membrana',
    theme: 'Estrutura',
    description: 'Bicamada lipídica e proteínas',
    icon: 'layers',
    color: 'from-amber-400 to-amber-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Estrutura da Membrana',
      facts: [
        'Formada por bicamada de fosfolipídios',
        'Proteínas integrais e periféricas',
        'Modelo mosaico fluido'
      ]
    },
    minigames: [
      { type: 'build-cell', title: 'Monte a Membrana', description: 'Construa a estrutura da membrana', timeLimit: 60, targetScore: 100, difficulty: 2 },
      { type: 'tap-correct', title: 'Fosfolipídios Certos', description: 'Clique apenas nos fosfolipídios corretos', timeLimit: 35, targetScore: 90, difficulty: 2 },
      { type: 'avoid-wrong', title: 'Evite Erros', description: 'Clique nos corretos e evite estruturas erradas', timeLimit: 40, targetScore: 100, difficulty: 2 }
    ]
  },
  {
    id: 14,
    blockId: 5,
    blockName: 'Membrana Plasmática',
    title: 'Funções da Membrana',
    theme: 'Funcoes',
    description: 'Permeabilidade e comunicação',
    icon: 'radio',
    color: 'from-orange-400 to-orange-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Funções da Membrana',
      facts: [
        'Controla entrada e saída de substâncias',
        'Permite comunicação entre células',
        'Mantém a homeostase celular'
      ]
    },
    minigames: [
      { type: 'match-pairs', title: 'Ligue as Partes', description: 'Conecte funções com estruturas', timeLimit: 45, targetScore: 100, difficulty: 2 },
      { type: 'reflex', title: 'Reflexo Rápido', description: 'Clique na função correta rapidamente', timeLimit: 35, targetScore: 120, difficulty: 2 },
      { type: 'combo', title: 'Combo Membrana', description: 'Acerte em sequência para pontuar', timeLimit: 40, targetScore: 150, difficulty: 2 }
    ]
  },
  {
    id: 15,
    blockId: 5,
    blockName: 'Membrana Plasmática',
    title: 'Especializações',
    theme: 'Especializacoes',
    description: 'Microvilosidades e desmossomos',
    icon: 'puzzle',
    color: 'from-yellow-400 to-yellow-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Especializações da Membrana',
      facts: [
        'Microvilosidades aumentam absorção',
        'Desmossomos unem células',
        'Junções comunicantes permitem troca'
      ]
    },
    minigames: [
      { type: 'survival', title: 'Sobreviva!', description: 'Acerte a sequência sem errar', timeLimit: 50, targetScore: 100, difficulty: 2 },
      { type: 'tap-correct', title: 'Tap Rápido', description: 'Identifique especializações corretas', timeLimit: 30, targetScore: 90, difficulty: 3 },
      { type: 'timer-challenge', title: 'Timer Curto', description: 'Vença antes que acabe!', timeLimit: 25, targetScore: 100, difficulty: 3 }
    ]
  },
  {
    id: 16,
    blockId: 5,
    blockName: 'Membrana Plasmática',
    title: 'Desafio Membrana',
    theme: 'Desafio',
    description: 'Teste final sobre membrana',
    icon: 'trophy',
    color: 'from-red-400 to-red-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Revisão Completa',
      facts: [
        'A membrana é semipermeável',
        'Proteínas transportadoras facilitam passagem',
        'O glicocálix protege a célula'
      ]
    },
    minigames: [
      { type: 'timer-challenge', title: 'Desafio Extremo', description: 'Tempo curtíssimo - vá com tudo!', timeLimit: 20, targetScore: 100, difficulty: 3 },
      { type: 'quiz-arcade', title: 'Quiz Arcade', description: 'Responda rápido estilo arcade', timeLimit: 45, targetScore: 150, difficulty: 3 },
      { type: 'combo', title: 'Combo Máximo', description: 'Atinja o maior combo possível', timeLimit: 50, targetScore: 200, difficulty: 3 }
    ]
  },
  
  // BLOCO 6 - Transporte Celular
  {
    id: 17,
    blockId: 6,
    blockName: 'Transporte Celular',
    title: 'Difusão',
    theme: 'Difusao',
    description: 'Movimento passivo de moléculas',
    icon: 'move',
    color: 'from-indigo-400 to-indigo-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Difusão',
      facts: [
        'Movimento do mais concentrado para o menos',
        'Não gasta energia',
        'Oxigênio entra por difusão simples'
      ]
    },
    minigames: [
      { type: 'direction', title: 'Escolha a Direção', description: 'Para onde as moléculas vão?', timeLimit: 40, targetScore: 100, difficulty: 2 },
      { type: 'tap-correct', title: 'Tap Correto', description: 'Clique nas moléculas que difundem', timeLimit: 35, targetScore: 90, difficulty: 2 },
      { type: 'reflex', title: 'Reflexo Molecular', description: 'Reaja rápido à difusão!', timeLimit: 30, targetScore: 120, difficulty: 2 }
    ]
  },
  {
    id: 18,
    blockId: 6,
    blockName: 'Transporte Celular',
    title: 'Osmose',
    theme: 'Osmose',
    description: 'Transporte de água',
    icon: 'droplet',
    color: 'from-cyan-400 to-cyan-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Osmose',
      facts: [
        'Passagem de água pela membrana',
        'De hipotônico para hipertônico',
        'Regula volume da célula'
      ]
    },
    minigames: [
      { type: 'direction', title: 'Fluxo de Água', description: 'Simule o movimento da água', timeLimit: 45, targetScore: 100, difficulty: 2 },
      { type: 'tap-correct', title: 'Escolha Rápida', description: 'Identifique o sentido correto', timeLimit: 30, targetScore: 90, difficulty: 2 },
      { type: 'combo', title: 'Combo Osmótico', description: 'Acerte em sequência!', timeLimit: 40, targetScore: 150, difficulty: 2 }
    ]
  },
  {
    id: 19,
    blockId: 6,
    blockName: 'Transporte Celular',
    title: 'Transporte Ativo',
    theme: 'Ativo',
    description: 'Movimento com gasto de energia',
    icon: 'zap',
    color: 'from-purple-400 to-purple-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Transporte Ativo',
      facts: [
        'Gasta energia (ATP)',
        'Contra o gradiente de concentração',
        'Bomba de sódio-potássio'
      ]
    },
    minigames: [
      { type: 'energy-bar', title: 'Barra de Energia', description: 'Gerencie o ATP para transportar', timeLimit: 50, targetScore: 100, difficulty: 2 },
      { type: 'tap-correct', title: 'Gaste ATP Certo', description: 'Use energia no momento certo', timeLimit: 40, targetScore: 120, difficulty: 3 },
      { type: 'timer-challenge', title: 'Contra o Tempo', description: 'Transporte tudo antes de acabar!', timeLimit: 35, targetScore: 100, difficulty: 3 }
    ]
  },
  {
    id: 20,
    blockId: 6,
    blockName: 'Transporte Celular',
    title: 'Revisão Transporte',
    theme: 'Revisao',
    description: 'Todos os tipos de transporte',
    icon: 'truck',
    color: 'from-violet-400 to-violet-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Revisão de Transporte',
      facts: [
        'Passivo: difusão e osmose (sem ATP)',
        'Ativo: com gasto de ATP',
        'Endocitose e exocitose: transporte em massa'
      ]
    },
    minigames: [
      { type: 'drag-category', title: 'Mistura Geral', description: 'Classifique todos os tipos', timeLimit: 45, targetScore: 120, difficulty: 3 },
      { type: 'reflex', title: 'Decisão Rápida', description: 'Passivo ou ativo? Decida rápido!', timeLimit: 30, targetScore: 100, difficulty: 3 },
      { type: 'survival', title: 'Sobrevivência Final', description: 'Não erre nenhum!', timeLimit: 60, targetScore: 180, difficulty: 3 }
    ]
  },
  
  // BLOCO 7 - Síntese de Proteínas
  {
    id: 21,
    blockId: 7,
    blockName: 'Síntese de Proteínas',
    title: 'Transcrição',
    theme: 'Transcricao',
    description: 'Do DNA ao RNA',
    icon: 'file-text',
    color: 'from-rose-400 to-rose-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Transcrição',
      facts: [
        'Ocorre no núcleo',
        'DNA serve de molde para RNA',
        'RNA polimerase catalisa o processo'
      ]
    },
    minigames: [
      { type: 'sequence', title: 'Ordem Correta', description: 'Organize as etapas da transcrição', timeLimit: 50, targetScore: 100, difficulty: 2 },
      { type: 'drag-category', title: 'Arraste a Sequência', description: 'Monte a sequência de RNA', timeLimit: 45, targetScore: 90, difficulty: 2 },
      { type: 'timer-challenge', title: 'Contra o Tempo', description: 'Transcreva antes que acabe!', timeLimit: 35, targetScore: 100, difficulty: 3 }
    ]
  },
  {
    id: 22,
    blockId: 7,
    blockName: 'Síntese de Proteínas',
    title: 'Tradução',
    theme: 'Traducao',
    description: 'Do RNA à proteína',
    icon: 'repeat',
    color: 'from-pink-400 to-pink-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Tradução',
      facts: [
        'Ocorre nos ribossomos',
        'mRNA é lido em códons (3 bases)',
        'tRNA traz aminoácidos'
      ]
    },
    minigames: [
      { type: 'path-choice', title: 'Caminho do Códon', description: 'Escolha a rota correta do mRNA', timeLimit: 45, targetScore: 100, difficulty: 2 },
      { type: 'reflex', title: 'Reflexo Ribosomal', description: 'Associe códons rapidamente', timeLimit: 35, targetScore: 120, difficulty: 2 },
      { type: 'combo', title: 'Combo Proteico', description: 'Forme a proteína em sequência', timeLimit: 45, targetScore: 150, difficulty: 3 }
    ]
  },
  {
    id: 23,
    blockId: 7,
    blockName: 'Síntese de Proteínas',
    title: 'Golgi e RE',
    theme: 'Processamento',
    description: 'Processamento e empacotamento',
    icon: 'package',
    color: 'from-fuchsia-400 to-fuchsia-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Golgi e Retículo',
      facts: [
        'RE rugoso: síntese de proteínas de exportação',
        'Golgi: modifica, empacota e endereça',
        'Vesículas transportam os produtos'
      ]
    },
    minigames: [
      { type: 'pack-items', title: 'Empacote Itens', description: 'Coloque nas vesículas corretas', timeLimit: 50, targetScore: 100, difficulty: 2 },
      { type: 'drag-category', title: 'Arraste Rápido', description: 'Endereçe as proteínas rapidamente', timeLimit: 40, targetScore: 90, difficulty: 3 },
      { type: 'timer-challenge', title: 'Timer Apertado', description: 'Empacote tudo a tempo!', timeLimit: 30, targetScore: 100, difficulty: 3 }
    ]
  },
  {
    id: 24,
    blockId: 7,
    blockName: 'Síntese de Proteínas',
    title: 'Fluxo Completo',
    theme: 'Fluxo',
    description: 'Do gene à proteína final',
    icon: 'git-branch',
    color: 'from-red-400 to-red-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Fluxo de Informação',
      facts: [
        'DNA -> RNA -> Proteína',
        'Dogma central da biologia molecular',
        'Regulação em cada etapa'
      ]
    },
    minigames: [
      { type: 'sequence', title: 'Sequência Total', description: 'Monte o fluxo completo', timeLimit: 60, targetScore: 100, difficulty: 3 },
      { type: 'drag-category', title: 'Mistura Final', description: 'Organize todas as etapas', timeLimit: 50, targetScore: 120, difficulty: 3 },
      { type: 'survival', title: 'Desafio Final', description: 'Complete sem erros!', timeLimit: 60, targetScore: 180, difficulty: 3 }
    ]
  },
  
  // BLOCO 8 - Energia Celular
  {
    id: 25,
    blockId: 8,
    blockName: 'Energia Celular',
    title: 'Glicólise',
    theme: 'Glicolise',
    description: 'Primeira etapa da respiração',
    icon: 'flame',
    color: 'from-yellow-400 to-yellow-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Glicólise',
      facts: [
        'Ocorre no citoplasma',
        'Glicose vira piruvato',
        'Produz 2 ATPs e 2 NADHs'
      ]
    },
    minigames: [
      { type: 'clicker', title: 'Clicker Viciante', description: 'Clique para quebrar glicose!', timeLimit: 30, targetScore: 200, difficulty: 2 },
      { type: 'combo', title: 'Combo de Cliques', description: 'Mantenha o ritmo de produção', timeLimit: 40, targetScore: 150, difficulty: 2 },
      { type: 'energy-bar', title: 'Boost de Energia', description: 'Maximize a produção de ATP', timeLimit: 45, targetScore: 180, difficulty: 2 }
    ]
  },
  {
    id: 26,
    blockId: 8,
    blockName: 'Energia Celular',
    title: 'Ciclo de Krebs',
    theme: 'Krebs',
    description: 'O ciclo do ácido cítrico',
    icon: 'refresh-cw',
    color: 'from-amber-400 to-amber-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Ciclo de Krebs',
      facts: [
        'Ocorre na matriz mitocondrial',
        'Libera CO2 e produz NADH e FADH2',
        'Gera 2 ATPs por ciclo completo'
      ]
    },
    minigames: [
      { type: 'sequence', title: 'Sequência Respiratória', description: 'Monte o ciclo na ordem certa', timeLimit: 50, targetScore: 100, difficulty: 3 },
      { type: 'tap-correct', title: 'Tap Rápido', description: 'Identifique os produtos corretos', timeLimit: 35, targetScore: 120, difficulty: 3 },
      { type: 'timer-challenge', title: 'Tempo Curto', description: 'Complete o ciclo rapidamente', timeLimit: 30, targetScore: 100, difficulty: 3 }
    ]
  },
  {
    id: 27,
    blockId: 8,
    blockName: 'Energia Celular',
    title: 'Cadeia Respiratória',
    theme: 'Cadeia',
    description: 'Produção massiva de ATP',
    icon: 'activity',
    color: 'from-orange-400 to-orange-600',
    isUnlocked: false,
    educationalContent: {
      title: 'Cadeia Respiratória',
      facts: [
        'Ocorre nas cristas mitocondriais',
        'Usa NADH e FADH2 para produzir ATP',
        'Gera até 34 ATPs'
      ]
    },
    minigames: [
      { type: 'energy-bar', title: 'Desafio Energia', description: 'Gerencie a cadeia de elétrons', timeLimit: 50, targetScore: 150, difficulty: 3 },
      { type: 'survival', title: 'Sobrevivência', description: 'Mantenha a cadeia funcionando', timeLimit: 60, targetScore: 180, difficulty: 3 },
      { type: 'reflex', title: 'Reflexo ATP', description: 'Reaja aos elétrons rapidamente', timeLimit: 40, targetScore: 150, difficulty: 3 }
    ]
  },
  
  // BLOCO 9 - Desafio Final
  {
    id: 28,
    blockId: 9,
    blockName: 'Desafio Final',
    title: 'Revisão Geral',
    theme: 'Revisao',
    description: 'Teste seus conhecimentos',
    icon: 'brain',
    color: 'from-slate-500 to-slate-700',
    isUnlocked: false,
    educationalContent: {
      title: 'Revisão Completa',
      facts: [
        'Célula é a unidade da vida',
        'Procariontes vs Eucariontes',
        'Organelas e suas funções'
      ]
    },
    minigames: [
      { type: 'quiz-arcade', title: 'Quiz Arcade', description: 'Responda rápido estilo arcade', timeLimit: 60, targetScore: 150, difficulty: 3 },
      { type: 'reflex', title: 'Reflexo Total', description: 'Teste todos os reflexos', timeLimit: 45, targetScore: 180, difficulty: 3 },
      { type: 'timer-challenge', title: 'Tempo Limite', description: 'O tempo é seu inimigo!', timeLimit: 40, targetScore: 200, difficulty: 3 }
    ]
  },
  {
    id: 29,
    blockId: 9,
    blockName: 'Desafio Final',
    title: 'Maratona',
    theme: 'Maratona',
    description: 'Todos os minigames juntos',
    icon: 'trophy',
    color: 'from-gray-600 to-gray-800',
    isUnlocked: false,
    educationalContent: {
      title: 'Maratona Celular',
      facts: [
        'Teste todos os conhecimentos',
        'Combine habilidades',
        'Prepare-se para o boss!'
      ]
    },
    minigames: [
      { type: 'survival', title: 'Mix de Minigames', description: 'Todos os jogos misturados', timeLimit: 90, targetScore: 300, difficulty: 3 },
      { type: 'combo', title: 'Combo Gigante', description: 'Atinja o maior combo possível', timeLimit: 60, targetScore: 250, difficulty: 3 },
      { type: 'survival', title: 'Sobrevivência Final', description: 'A última prova antes do boss', timeLimit: 75, targetScore: 280, difficulty: 3 }
    ]
  },
  {
    id: 30,
    blockId: 9,
    blockName: 'Desafio Final',
    title: 'BOSS: Fragmento',
    theme: 'Boss',
    description: 'Enfrente o vilão final!',
    icon: 'skull',
    color: 'from-red-600 to-red-900',
    isUnlocked: false,
    educationalContent: {
      title: 'Batalha Final',
      facts: [
        'O Fragmento quer destruir a célula',
        'Use seu conhecimento como arma',
        'Cada acerto causa dano ao boss'
      ]
    },
    minigames: [
      { type: 'boss-battle', title: 'Fase 1: Despertar', description: 'O Fragmento desperta!', timeLimit: 120, targetScore: 100, difficulty: 3 },
      { type: 'boss-battle', title: 'Fase 2: Fúria', description: 'Ataques mais rápidos!', timeLimit: 120, targetScore: 150, difficulty: 3 },
      { type: 'boss-battle', title: 'Fase 3: Confronto', description: 'Derrote o Fragmento de vez!', timeLimit: 180, targetScore: 200, difficulty: 3 }
    ]
  }
]

export function getPhaseById(id: number): Phase | undefined {
  return PHASES.find(p => p.id === id)
}

export function getBlockById(id: number): Block | undefined {
  return BLOCKS.find(b => b.id === id)
}

export function getPhasesByBlock(blockId: number): Phase[] {
  return PHASES.filter(p => p.blockId === blockId)
}

export function getNextPhase(currentPhaseId: number): Phase | undefined {
  const currentIndex = PHASES.findIndex(p => p.id === currentPhaseId)
  if (currentIndex >= 0 && currentIndex < PHASES.length - 1) {
    return PHASES[currentIndex + 1]
  }
  return undefined
}
