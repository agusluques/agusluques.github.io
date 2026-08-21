// Every user-facing string on the site. Keys are flat and namespaced by area.
//
// Two rules worth knowing before editing:
//   1. Strings rendered in the pixel font (the verdict, the zone crosshairs)
//      must stay ASCII. Press Start 2P has no accented glyphs and would draw
//      empty boxes.
//   2. A handful of strings carry <em>, <u> or <br> and are rendered as HTML.
//      They are authored here, never from user input.

export const DEFAULT_LANGUAGE = "en";

export const LANGUAGES = [
  { code: "en", short: "EN", label: "English" },
  { code: "es", short: "ES", label: "Español" },
  { code: "pt", short: "PT", label: "Português" },
];

export const translations = {
  en: {
    "document.title": "Agustin Luques",

    "header.language": "Language",
    "header.venue": "La Bombonera",

    "hero.eyebrow": "Penalty shootout",
    "hero.title": "Beat the keeper<br />to read my <em>CV</em>.",
    "hero.lede":
      "Pick a corner and shoot. You get <em>three attempts</em> to score.",
    "hero.skip": "Skip the game and read it anyway",

    "game.canvas": "A penalty kick. Boca Juniors shoots, River Plate keeps.",
    "game.pickZone": "Pick where to shoot",
    "game.attempt": "Attempt {n} of {max}",
    "game.lastAttempt": "Last attempt. No pressure.",
    "game.goal": "GOAL",
    "game.saved": "SAVED",

    "aim.tl": "Top left",
    "aim.tc": "Top centre",
    "aim.tr": "Top right",
    "aim.bl": "Bottom left",
    "aim.bc": "Bottom centre",
    "aim.br": "Bottom right",

    "stamp.goal": "Golazo. Unlocked.",
    "stamp.skipped": "Unlocked",

    "profile.role": "Software Engineer",
    "profile.about.title": "About me",
    "profile.skills.title": "What do I know?",
    "profile.skills.hint": "Tap any skill for the detail.",
    "profile.links.title": "Where to find me",
    "profile.cv": "Download the CV",

    "links.linkedin": "LinkedIn",
    "links.github": "GitHub",
    "links.email": "Email",
    "links.instagram": "Instagram",
    "links.x": "X (Twitter)",

    "about.items": [
      "Based in <u>Buenos Aires, Argentina</u>.",
      "Software engineering graduate from <u>University of Buenos Aires</u>.",
      "<u>Tech lead</u> at <a href='https://homevision.co' target='_blank'>HomeVision.co</a>.",
      "Passionate about <u>technology</u>, <u>AI</u> and <u>learning</u> new things.",
    ],

    "skill.info": {
      1: "4+ years of exp. My whole career.",
      2: "2+ years of exp. This page was made with React.",
      3: "2+ years of exp. Used for my personal projects.",
      4: "2+ years of exp. Did my university final work with Django.",
      5: "1+ year of exp.",
      6: "1+ year of exp. Love it.",
      7: "2+ years of exp. It's not my favourite.",
      8: "Since I started programming I've used git.",
      9: "2+ years of exp. Want to certificate in Microsoft Azure in the near future.",
      10: "Used it for tiny APIs.",
      11: "Design patterns are my passion.",
      12: "Interesting.",
      13: "Organized.",
      14: "Won't lie, nobody likes tests.",
      15: "It's all about it.",
      16: "All kind of SQL and NoSQL databases.",
      17: "I'm a fighter too.",
      18: "Kind of an expert.",
      19: "Containers everywhere.",
      20: "Same as Azure but with different names.",
      21: "Know the theory.",
      22: "Old school.",
      23: "Store as much as you can.",
    },
  },

  es: {
    "document.title": "Agustin Luques",

    "header.language": "Idioma",
    "header.venue": "La Bombonera",

    "hero.eyebrow": "Penal",
    "hero.title": "Superá al arquero<br />y leé mi <em>CV</em>.",
    "hero.lede":
      "Elegí un palo y pateá. Tenés <em>tres intentos</em> para marcar.",
    "hero.skip": "Saltear el juego y ver mi info",

    "game.canvas": "Un penal. Patea Boca Juniors, ataja River Plate.",
    "game.pickZone": "Elegí dónde patear",
    "game.attempt": "Intento {n} de {max}",
    "game.lastAttempt": "Último intento. Sin presión.",
    "game.goal": "GOL",
    "game.saved": "ATAJADA",

    "aim.tl": "Arriba a la izquierda",
    "aim.tc": "Arriba al medio",
    "aim.tr": "Arriba a la derecha",
    "aim.bl": "Abajo a la izquierda",
    "aim.bc": "Abajo al medio",
    "aim.br": "Abajo a la derecha",

    "stamp.goal": "Golazo. Desbloqueado.",
    "stamp.skipped": "Desbloqueado",

    "profile.role": "Ingeniero de Software",
    "profile.about.title": "Sobre mí",
    "profile.skills.title": "¿Qué sé hacer?",
    "profile.skills.hint": "Tocá cualquier tecnología para ver el detalle.",
    "profile.links.title": "Dónde encontrarme",
    "profile.cv": "Descargar el CV",

    "links.linkedin": "LinkedIn",
    "links.github": "GitHub",
    "links.email": "Correo",
    "links.instagram": "Instagram",
    "links.x": "X (Twitter)",

    "about.items": [
      "Vivo en <u>Buenos Aires, Argentina</u>.",
      "Ingeniero de software graduado de la <u>Universidad de Buenos Aires</u>.",
      "<u>Tech lead</u> en <a href='https://homevision.co' target='_blank'>HomeVision.co</a>.",
      "Apasionado por la <u>tecnología</u>, <u>IA</u> y <u>aprender</u> cosas nuevas.",
    ],

    "skill.info": {
      1: "+4 años de experiencia. Toda mi carrera.",
      2: "+2 años de experiencia. Esta página la hice con React.",
      3: "+2 años de experiencia. La uso en mis proyectos personales.",
      4: "+2 años de experiencia. Hice mi trabajo final de facultad con Django.",
      5: "+1 año de experiencia.",
      6: "+1 año de experiencia. Me encanta.",
      7: "+2 años de experiencia. No es mi favorito.",
      8: "Uso git desde que empecé a programar.",
      9: "+2 años de experiencia. Quiero certificarme en Microsoft Azure pronto.",
      10: "Lo usé para APIs chicas.",
      11: "Los patrones de diseño son mi pasión.",
      12: "Interesante.",
      13: "Ordenado.",
      14: "No voy a mentir: a nadie le gustan los tests.",
      15: "De eso se trata todo.",
      16: "Todo tipo de bases SQL y NoSQL.",
      17: "También la peleo.",
      18: "Medio experto.",
      19: "Contenedores por todos lados.",
      20: "Igual que Azure pero con otros nombres.",
      21: "Sé la teoría.",
      22: "De la vieja escuela.",
      23: "Guardá todo lo que puedas.",
    },
  },

  pt: {
    "document.title": "Agustin Luques",

    "header.language": "Idioma",
    "header.venue": "La Bombonera",

    "hero.eyebrow": "Pênalti",
    "hero.title": "Supere o goleiro<br />e leia meu <em>CV</em>.",
    "hero.lede":
      "Escolha um canto e chute. Você tem <em>três tentativas</em> para marcar.",
    "hero.skip": "Pular o jogo e ver mesmo assim",

    "game.canvas": "Um pênalti. O Boca Juniors cobra, o River Plate defende.",
    "game.pickZone": "Escolha onde chutar",
    "game.attempt": "Tentativa {n} de {max}",
    "game.lastAttempt": "Última tentativa. Sem pressão.",
    "game.goal": "GOL",
    "game.saved": "DEFENDEU",

    "aim.tl": "Em cima à esquerda",
    "aim.tc": "Em cima no meio",
    "aim.tr": "Em cima à direita",
    "aim.bl": "Embaixo à esquerda",
    "aim.bc": "Embaixo no meio",
    "aim.br": "Embaixo à direita",

    "stamp.goal": "Golaço. Desbloqueado.",
    "stamp.skipped": "Desbloqueado",

    "profile.role": "Engenheiro de Software",
    "profile.about.title": "Sobre mim",
    "profile.skills.title": "O que eu sei?",
    "profile.skills.hint": "Toque em qualquer tecnologia para ver o detalhe.",
    "profile.links.title": "Onde me encontrar",
    "profile.cv": "Baixar o CV",

    "links.linkedin": "LinkedIn",
    "links.github": "GitHub",
    "links.email": "E-mail",
    "links.instagram": "Instagram",
    "links.x": "X (Twitter)",

    "about.items": [
      "Morando em <u>Buenos Aires, Argentina</u>.",
      "Engenheiro de software graduado da <u>Universidade de Buenos Aires</u>.",
      "<u>Tech lead</u> em <a href='https://homevision.co' target='_blank'>HomeVision.co</a>.",
      "Apaixonado por <u>tecnologia</u>, <u>IA</u> e <u>aprender</u> coisas novas.",
    ],

    "skill.info": {
      1: "+4 anos de experiência. Toda a minha carreira.",
      2: "+2 anos de experiência. Esta página foi feita com React.",
      3: "+2 anos de experiência. Uso nos meus projetos pessoais.",
      4: "+2 anos de experiência. Fiz meu trabalho final da faculdade com Django.",
      5: "+1 ano de experiência.",
      6: "+1 ano de experiência. Amo.",
      7: "+2 anos de experiência. Não é o meu favorito.",
      8: "Uso git desde que comecei a programar.",
      9: "+2 anos de experiência. Quero me certificar em Microsoft Azure em breve.",
      10: "Usei para APIs pequenas.",
      11: "Padrões de projeto são a minha paixão.",
      12: "Interessante.",
      13: "Organizado.",
      14: "Não vou mentir: ninguém gosta de testes.",
      15: "É disso que se trata.",
      16: "Todo tipo de banco SQL e NoSQL.",
      17: "Também brigo por isso.",
      18: "Meio especialista.",
      19: "Contêineres por toda parte.",
      20: "Igual ao Azure mas com outros nomes.",
      21: "Sei a teoria.",
      22: "Da velha guarda.",
      23: "Guarde tudo o que puder.",
    },
  },
};
