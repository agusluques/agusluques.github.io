// Only the things that do not change between languages live here. Every string
// a reader sees is in src/i18n/translations.js.

export const profile = {
  name: 'Agustin Luques',
  location: 'Buenos Aires, Argentina'
};

// Labels are product names, so they stay identical in all three languages.
// The blurb for each one is translated, keyed by id under 'skill.info'.
export const skills = [
  { id: 1, label: '.NET Framework/Core' },
  { id: 2, label: 'React' },
  { id: 3, label: 'Python' },
  { id: 4, label: 'Django' },
  { id: 5, label: 'Flask' },
  { id: 6, label: 'Django Rest Framework' },
  { id: 7, label: 'Angular' },
  { id: 8, label: 'Git / TFS' },
  { id: 9, label: 'Azure' },
  { id: 10, label: 'NodeJS' },
  { id: 11, label: 'MVC' },
  { id: 12, label: 'Vertical Slice Architecture' },
  { id: 13, label: 'CQRS' },
  { id: 14, label: 'Unit testing' },
  { id: 15, label: 'Microservices' },
  { id: 16, label: 'SQL / NoSQL' },
  { id: 17, label: 'HTML / CSS / Bootstrap' },
  { id: 18, label: 'OAuth / OpenId' },
  { id: 19, label: 'Docker' },
  { id: 20, label: 'AWS' },
  { id: 21, label: 'Machine Learning' },
  { id: 22, label: 'JQuery / Ajax' },
  { id: 23, label: 'Redux' }
];

export const links = [
  {
    id: 'linkedin',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/agustin-luques/',
    hint: 'agustin-luques'
  },
  {
    id: 'github',
    icon: 'github',
    href: 'https://github.com/agusluques',
    hint: 'agusluques'
  },
  {
    id: 'email',
    icon: 'email',
    href: 'mailto:luquesagustin@gmail.com',
    hint: 'luquesagustin@gmail.com'
  },
  {
    id: 'instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/aguusluques/',
    hint: '@aguusluques'
  },
  {
    id: 'x',
    icon: 'x',
    href: 'https://x.com/aguusluques',
    hint: '@aguusluques'
  }
];

export const cv = {
  href: '/cv/CV-AgustinLuques(English).pdf'
};
