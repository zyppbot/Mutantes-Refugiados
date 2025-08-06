
export const attributeNames = ['Agilidade', 'Esperteza', 'Espírito', 'Força', 'Vigor'] as const;
export type AttributeName = (typeof attributeNames)[number];

export interface Vantagem {
  name: string;
  description: string;
}

export interface Complicacao {
  name: string;
  description: string;
}

export interface Armamento {
  name: string;
  type: string;
  damage: string;
  weight: number;
  cost: string;
  notes: string;
}

export interface Armadura {
  name: string;
  type: string;
  bonus: number;
  weight: number;
  cost: string;
  notes: string;
}

export interface Poder {
  id: string;
  name: string;
  distance: string;
  damage: string;
  duration: string;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  weight: number;
}


export const vantagensList: Vantagem[] = [
    { name: "Ambidestro", description: "Ignora a penalidade de -2 para ações com a mão inábil." },
    { name: "Atraente", description: "Você é fisicamente atraente. Ganha +2 em testes de Persuasão se o alvo for suscetível ao seu charme." },
    { name: "Corajoso", description: "Você é mais resistente ao medo. Adiciona +2 a testes de Medo." },
    { name: "Cura Rápida", description: "Você se recupera de ferimentos mais rápido que o normal. Pode realizar testes de cura natural com mais frequência." },
    { name: "Furioso", description: "Pode entrar em um estado de fúria, ganhando bônus em Força e dano, mas com penalidades em ações que exigem concentração." },
    { name: "Ligeiro", description: "O custo para ativar um poder específico (escolhido ao pegar esta Vantagem) é reduzido, ou sua eficácia é aumentada." },
    { name: "Linguista", description: "Começa o jogo com um número de idiomas igual ao seu dado de Esperteza." },
    { name: "Musculoso", description: "Sua capacidade de carga é dobrada." },
    { name: "Nobre", description: "O personagem tem um título de nobreza, ganhando status e respeito, além de uma renda mensal." },
    { name: "Prontidão", description: "Você tem sentidos aguçados. Adiciona +2 em testes de Notar." },
    { name: "Rápido", description: "Você é veloz. Sua Movimentação base aumenta em +2m." },
    { name: "Sorte", description: "O herói tem mais Benes que o normal. Ele começa cada sessão de jogo com 4 Benes ao invés de 3." },
    { name: "Arma Predileta", description: "Ganha +1 para atacar e aparar com uma arma específica." },
    { name: "Artista Marcial Aprimorado", description: "Seus ataques desarmados causam +1 de dano e são considerados 'armados'." },
    { name: "Atacar Primeiro", description: "Saca uma carta de iniciativa adicional na primeira rodada de combate e escolhe a melhor." },
    { name: "Atirador", description: "Pode mirar como uma ação para ganhar +2 no tiro." },
    { name: "Bloquear Aprimorado", description: "Você é mestre na defesa. Adiciona +1 ao seu Aparar." },
    { name: "Brigão", description: "Adiciona +2 ao dano em ataques de Luta com os punhos." },
    { name: "Pugilista", description: "Seus socos são mais potentes. Adiciona +d4 ao dano de seus ataques desarmados." },
    { name: "Contra-Ataque", description: "Se um oponente errar um ataque corpo a corpo por 1, você pode atacá-lo imediatamente como uma ação livre." },
    { name: "Duro de Matar", description: "Sua Resistência aumenta em +1. Além disso, pode ignorar a penalidade de um nível de ferimento." },
    { name: "Esquiva", description: "Adiciona +1 de bônus para se mover e se defender de ataques." },
    { name: "Florentino", description: "Pode lutar com uma arma em cada mão, combinando as penalidades de multi-ação." },
    { name: "Focado", description: "Pode ignorar penalidades de distração ou atordoamento uma vez por sessão." },
    { name: "Frenesi", description: "Pode fazer um ataque adicional com a mesma arma, com penalidade de -2." },
    { name: "Impulso", description: "Ganha um movimento extra de 2m em combate." },
    { name: "Instinto assassino", description: "Adiciona +2 em testes de Intimidação e pode causar Medo em oponentes." },
    { name: "Lutador Improvisado", description: "Reduz as penalidades por usar armas improvisadas." },
    { name: "Lutar com duas mãos", description: "Reduz as penalidades ao usar duas armas em combate." },
    { name: "Mãos Firmes", description: "Ignora a penalidade por plataforma instável ao atirar." },
    { name: "Nervos de Aço", description: "Pode gastar um Bene para ignorar uma condição de Abalado." },
    { name: "Reflexos de Combate", description: "Saca duas cartas de iniciativa e escolhe a melhor." },
    { name: "Retirada", description: "Recebe +2 de bônus de cobertura ao se retirar do combate." },
    { name: "Saque Rápido", description: "Pode sacar uma arma como uma ação livre." },
    { name: "Sem Piedade", description: "Pode gastar um Bene para adicionar +d6 ao seu dano." },
    { name: "Varredura", description: "Pode atacar todos os inimigos adjacentes com uma única ação, com penalidade de -2." },
    { name: "Golpe Poderoso", description: "Adiciona +2 ao dano em um ataque corpo a corpo bem-sucedido com um Aumento." },
    { name: "Tiro Mortal", description: "Adiciona +2 ao dano em um ataque à distância bem-sucedido com um Aumento." },
    { name: "Surto Mutagênico", description: "Uma vez por sessão, pode ativar uma mutação temporária aleatória com efeitos poderosos." },
    { name: "Coragem Líquida", description: "Recebe um bônus em testes de Espírito e Medo ao consumir uma bebida alcoólica." },
    { name: "Curandeiro", description: "Adiciona +2 em testes de Curar em outros." },
    { name: "Elo Animal", description: "Tem uma forte conexão com um tipo de animal, podendo se comunicar e influenciá-los." },
    { name: "Noção do Perigo", description: "Faz um teste de Notar para sentir o perigo iminente, mesmo que não haja sinais óbvios." },
    { name: "Sucateiro", description: "Adiciona +2 em testes de Consertar e pode encontrar peças úteis em qualquer sucata." },
    { name: "Comando", description: "Sua presença inspira confiança, adicionando +1 nas rolagens de Moral para aliados sob seu comando." },
    { name: "Estrategista", description: "Pode dar um dado de bônus para um aliado em um teste de combate, uma vez por encontro." },
    { name: "Fervor", description: "Inspira aliados com um discurso, concedendo +1 em seus ataques e dano por um curto período." },
    { name: "Inspirar", description: "Gaste um Bene para permitir que um aliado refaça um teste de perícia falho." },
    { name: "Líder nato", description: "Aliados em seu campo de visão recebem +1 para se recuperar do estado Abalado." },
    { name: "Líder dos Homens", description: "Aumenta o número de aliados que pode liderar efetivamente." },
    { name: "Presença de Comando", description: "Aumenta o alcance de suas habilidades de liderança." },
    { name: "Nova mutação", description: "O personagem adquire uma nova mutação permanente." },
    { name: "Aprimorar Mutação", description: "Melhora uma mutação existente, tornando-a mais poderosa ou versátil." },
    { name: "Recarga Rápida", description: "Reduz o tempo necessário para recarregar armas de fogo ou de projéteis." },
    { name: "Acrobata", description: "Adiciona +2 em testes de Agilidade para feitos acrobáticos e equilíbrio." },
    { name: "Adepto", description: "Você não sofre penalidades por usar um poder sem treinamento. Você sofre um nível de Fadiga para cada ativação de poder." },
    { name: "Aprimoramento de Atributo (1 atributo)", description: "Aumenta um atributo em um tipo de dado." },
    { name: "Aprimoramento de Perícia (3 Perícias)", description: "Aumenta três perícias em um tipo de dado cada." },
    { name: "Conexões", description: "Tem contatos importantes em uma organização ou local específico." },
];

export const complicacoesList: Complicacao[] = [
  { name: 'Analfabeto', description: 'O personagem não sabe ler ou escrever.' },
  { name: 'Anêmico', description: 'O personagem é fraco e suscetível a doenças. Sofre -2 em testes de Vigor para resistir a fadiga e doenças.' },
  { name: 'Arrogante', description: 'O personagem se considera superior aos outros e fará de tudo para provar isso.' },
  { name: 'Boca Grande', description: 'O personagem não consegue guardar um segredo para salvar a própria vida.' },
  { name: 'Cauteloso', description: 'O personagem planeja extensivamente e age com cuidado. Ele não age se não tiver certeza do sucesso.' },
  { name: 'Cego', description: 'O personagem é completamente cego. Sofre -6 em todas as tarefas que dependem da visão.' },
  { name: 'Código de Honra', description: 'O personagem segue um código de conduta estrito que o impede de mentir, trapacear ou roubar.' },
  { name: 'Covarde', description: 'O personagem teme a dor e o perigo. Sofre -2 em testes de Medo.' },
  { name: 'Curioso', description: 'O personagem tem uma curiosidade insaciável e muitas vezes se mete em problemas por causa disso.' },
  { name: 'Delirante', description: 'O personagem sofre de delírios e acredita em coisas que não são reais.' },
  { name: 'Desagradável', description: 'O personagem tem uma personalidade irritante. Sofre -2 em testes de Persuasão.' },
  { name: 'Desajeitado', description: 'O personagem é desastrado e propenso a acidentes. Falha em um teste de Agilidade com 1 em um d20, independentemente do resultado do dado.' },
  { name: 'Desejo de Morrer', description: 'O personagem busca ativamente o perigo e a morte.' },
  { name: 'Duro de Ouvido', description: 'O personagem tem dificuldade para ouvir. Sofre -4 em testes de Notar baseados na audição.' },
  { name: 'Excesso de Confiança', description: 'O personagem superestima suas habilidades e subestima seus oponentes.' },
  { name: 'Feio', description: 'O personagem é fisicamente repulsivo. Sofre -2 em testes de Persuasão.' },
  { name: 'Fobia', description: 'O personagem tem um medo irracional de algo específico.' },
  { name: 'Forasteiro', description: 'O personagem não é do local e é tratado com desconfiança. Sofre -2 em testes de Persuasão com os locais.' },
  { name: 'Ganancioso', description: 'O personagem fará qualquer coisa para ganhar um dinheirinho. Ele pode ser subornado e trai seus amigos por uma pilha de ouro.' },
  { name: 'Hábito', description: 'O personagem tem um tique ou compulsão irritante (roer unhas, estalar os dedos, etc.).' },
  { name: 'Heróico', description: 'O personagem sempre se sente compelido a ajudar os necessitados, mesmo que isso o coloque em perigo.' },
  { name: 'Inimigo', description: 'O personagem tem um inimigo poderoso que o persegue ativamente.' },
  { name: 'Leal', description: 'Este herói nunca deixará um amigo para trás.' },
  { name: 'Manco', description: 'A Movimentação do personagem é reduzida em 2 e ele não pode correr.' },
  { name: 'Má Sorte', description: 'O personagem começa cada sessão com apenas 1 Bene. Ele não pode pegar a Vantagem Sorte.' },
  { name: 'Olhos Ruins', description: 'O personagem tem problemas de visão. Sofre -2 em testes que dependem da visão à distância.' },
  { name: 'Pacifista', description: 'O personagem se recusa a lutar (Menor) ou a matar (Maior).' },
  { name: 'Peculiaridade', description: 'O personagem tem um comportamento estranho, mas inofensivo.' },
  { name: 'Pequeno', description: 'O personagem é menor que a média. Sua Resistência é reduzida em 1.' },
  { name: 'Procurado', description: 'O personagem é procurado pela lei e pode ser preso se for reconhecido.' },
  { name: 'Sanguinário', description: 'O personagem anseia por violência e sempre prefere a opção mais sangrenta.' },
  { name: 'Sem Noção', description: 'O personagem tem dificuldade em entender situações sociais. Sofre -2 em testes de Notar para perceber o humor e as intenções dos outros.' },
  { name: 'Teimoso', description: 'O personagem se recusa a admitir que está errado e raramente muda de ideia.' },
  { name: 'Sem Braço', description: 'O personagem perdeu um braço (ou nasceu sem ele). Tarefas com duas mãos são impossíveis.' },
  { name: 'Sem Perna', description: 'O personagem perdeu uma perna, afetando sua mobilidade e equilíbrio.' },
  { name: 'Vingativo', description: 'O personagem nunca esquece uma ofensa e fará de tudo para se vingar.' },
  { name: 'Voto', description: 'O personagem fez um juramento (pobreza, silêncio, etc.) que restringe suas ações.' }
];

export const armamentosList: Armamento[] = [
  // Armas Corpo a Corpo
  { name: "Faca", type: "Corpo a Corpo", damage: "For+d4", weight: 0.5, cost: "25", notes: "Pode ser arremessada." },
  { name: "Canivete", type: "Corpo a Corpo", damage: "For+d4", weight: 0.2, cost: "10", notes: "Fácil de esconder." },
  { name: "Soqueiras", type: "Corpo a Corpo", damage: "For+d4", weight: 0.5, cost: "20", notes: "Considerado ataque desarmado." },
  { name: "Cacetete", type: "Corpo a Corpo", damage: "For+d6", weight: 1, cost: "15", notes: "" },
  { name: "Porrete", type: "Corpo a Corpo", damage: "For+d6", weight: 2, cost: "10", notes: "Arma improvisada comum." },
  { name: "Bastão", type: "Corpo a Corpo", damage: "For+d6", weight: 2, cost: "20", notes: "Aparar +1, Alcance 1." },
  { name: "Chicote", type: "Corpo a Corpo", damage: "For+d4", weight: 1, cost: "30", notes: "Alcance 2, pode ser usado para manobras." },
  { name: "Corrente", type: "Corpo a Corpo", damage: "For+d6", weight: 2.5, cost: "20", notes: "Ignora bônus de escudo." },
  { name: "Bastão de Baseball", type: "Corpo a Corpo", damage: "For+d6", weight: 1.5, cost: "25", notes: "" },
  { name: "Martelo", type: "Corpo a Corpo", damage: "For+d8", weight: 3, cost: "50", notes: "PA 1 contra armadura rígida." },
  { name: "Espada", type: "Corpo a Corpo", damage: "For+d8", weight: 3, cost: "300", notes: "Aparar +1" },
  { name: "Machado", type: "Corpo a Corpo", damage: "For+d8", weight: 4, cost: "250", notes: "PA 1" },
  { name: "Mangual", type: "Corpo a Corpo", damage: "For+d8", weight: 4, cost: "200", notes: "Ignora bônus de Aparar de escudos." },
  { name: "Katana", type: "Corpo a Corpo", damage: "For+d10", weight: 3, cost: "1000", notes: "PA 2, requer duas mãos." },
  { name: "Marreta", type: "Corpo a Corpo", damage: "For+d10", weight: 10, cost: "150", notes: "PA 2, requer duas mãos, -1 Aparar." },
  { name: "Motossera", type: "Corpo a Corpo", damage: "2d8", weight: 10, cost: "400", notes: "Barulhenta, requer combustível." },
  
  // Armas de Longo Alcance
  { name: "Arco de Caça", type: "Longo Alcance", damage: "2d6", weight: 1.5, cost: "150", notes: "Alcance 15/30/60." },
  { name: "Pistola", type: "Longo Alcance", damage: "2d6", weight: 1, cost: "200", notes: "PA 1, Tiros 12, Alcance 12/24/48." },
  { name: "Magnum", type: "Longo Alcance", damage: "2d6+1", weight: 2, cost: "300", notes: "PA 1, Tiros 6, Alcance 12/24/48." },
  { name: "Carabina", type: "Longo Alcance", damage: "2d8-1", weight: 3, cost: "350", notes: "PA 2, Tiros 15, Alcance 20/40/80." },
  { name: "Rifle de Caça", type: "Longo Alcance", damage: "2d8", weight: 4, cost: "400", notes: "PA 2, Tiros 5, Alcance 24/48/96." },
  { name: "Espingarda", type: "Longo Alcance", damage: "1-3d6", weight: 4, cost: "300", notes: "Tiros 2, Alcance 12/24/48. +2 para acertar." },
  { name: "Escopeta", type: "Longo Alcance", damage: "1-3d6", weight: 5, cost: "350", notes: "Tiros 6, Alcance 12/24/48. +2 para acertar." },
  { name: "Submetralhadora", type: "Longo Alcance", damage: "2d6", weight: 3, cost: "500", notes: "PA 1, Tiros 30, Rajada, Alcance 12/24/48." },
  { name: "Rifle de Assalto", type: "Longo Alcance", damage: "2d8", weight: 4, cost: "600", notes: "PA 2, Tiros 30, Rajada, Alcance 24/48/96." },
  { name: "Rifle de Precisão", type: "Longo Alcance", damage: "2d10", weight: 6, cost: "1500", notes: "PA 4, Tiros 5, Alcance 50/100/200, Mira." },
  { name: "Metralhadora de Mão", type: "Longo Alcance", damage: "2d8+1", weight: 9, cost: "1200", notes: "PA 2, Tiros 50, Rajada, Alcance 30/60/120." },
  { name: "Metralhadora", type: "Longo Alcance", damage: "2d8+2", weight: 20, cost: "3000", notes: "PA 3, Tiros 200, Rajada, Montada, Alcance 50/100/200." },

  // Armas Especiais e Explosivos
  { name: "Lança-Chamas", type: "Especial", damage: "3d6", weight: 9, cost: "600", notes: "Modelo de Cone, Tiros 10." },
  { name: "Granada", type: "Explosivo", damage: "3d6", weight: 0.5, cost: "100", notes: "Área Média, Alcance For*2." },
  { name: "Minas", type: "Explosivo", damage: "4d6", weight: 2.5, cost: "250", notes: "PA 2, Área Média, acionada por pressão." },
  { name: "Bastão de Disparo", type: "Especial", damage: "2d10", weight: 5, cost: "2000", notes: "PA 4, Tiros 1, Alcance 18/36/72. Arma energética." },
  { name: "Canhão", type: "Pesado", damage: "5d8", weight: 200, cost: "10000", notes: "PA 10, Área Grande, requer montagem." },
];

export const armadurasList: Armadura[] = [
    { name: "Jaqueta de Couro", type: "Leve", bonus: 1, weight: 2, cost: "50", notes: "Cobre o torso." },
    { name: "Casaco de Couro Pesado", type: "Média", bonus: 2, weight: 8, cost: "150", notes: "Cobre o torso e braços." },
    { name: "Colete a Prova de Balas", type: "Média", bonus: 3, weight: 5, cost: "200", notes: "Proteção balística para o torso. PA contra balas." },
    { name: "Colete de Kevlar", type: "Média", bonus: 2, weight: 4, cost: "300", notes: "+4 vs balas, cobre o torso." },
    { name: "Colete de Kevlar com Placas", type: "Pesada", bonus: 3, weight: 7, cost: "500", notes: "+4 vs balas, cobre o torso. Penalidade de Agilidade de -1." },
    { name: "Roupa Anti-Corte", type: "Leve", bonus: 1, weight: 3, cost: "250", notes: "+2 contra ataques de corte e perfuração." },
    { name: "Colete Reflexivo", type: "Leve", bonus: 0, weight: 1, cost: "100", notes: "Bônus contra ataques baseados em luz/laser." },
    { name: "Capacete de Motociclista", type: "Capacete", bonus: 1, weight: 2, cost: "80", notes: "Protege contra dano na cabeça." },
    { name: "Capacete de Aço", type: "Capacete", bonus: 2, weight: 3, cost: "150", notes: "Proteção superior para a cabeça." },
    { name: "Escudo de Mão", type: "Escudo", bonus: 1, weight: 4, cost: "100", notes: "Concede +1 de Aparar." },
    { name: "Escudo Policial", type: "Escudo", bonus: 2, weight: 8, cost: "250", notes: "Concede +2 de Aparar e cobertura leve." },
];
