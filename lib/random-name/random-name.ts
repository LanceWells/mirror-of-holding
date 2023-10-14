import { StateOptions } from '../store/user';

export function RandomUserDetails(): Extract<StateOptions, {type: 'anon'}> {
  const adjNum = Math.floor(Math.random() * adjectives.length);
  const adj = adjectives[adjNum];

  const classNum = Math.floor(Math.random() * userClass.length);
  const cla = userClass[classNum];

  const animalNum = Math.floor(Math.random() * animals.length);
  const ani = animals[animalNum];

  const randomNum = Math.round(Math.random() * 1000000);

  return {
    type: 'anon',
    id: `${adj}-${cla}-${ani}-${randomNum}`,
    name: `${adj} ${cla} ${ani}`,
  };
}

const adjectives = [
  'Adventurous',
  'Burning',
  'Chaotic',
  'Dark',
  'Elevated',
  'Enchanted',
  'Enlightened',
  'Fast',
  'Flaming',
  'Frozen',
  'Glowing',
  'Heavy',
  'Icy',
  'Justified',
  'Killer',
  'Lawful',
  'Light',
  'Lightning-struck',
  'Moonlit',
  'Nice',
  'Oiled',
  'Proud',
  'Quiet',
  'Radiant',
  'Round',
  'Shadowy',
  'Slow',
  'Small',
  'Square',
  'Tall',
  'Undulating',
  'Vicious',
  'Wicked',
  'Xenogenic',
  'Youthful',
  'Zany',
];

const userClass = [
  'Alchemist',
  'Animist',
  'Artificer',
  'Barbarian',
  'Bard',
  'Champion',
  'Cleric',
  'Druid',
  'Exemplar',
  'Fighter',
  'Gunslinger',
  'Inventor',
  'Investigator',
  'Kineticist',
  'Magus',
  'Monk',
  'Oracle',
  'Paladin',
  'Psychic',
  'Ranger',
  'Rogue',
  'Sorceror',
  'Summoner',
  'Swashbuckler',
  'Thaumaturge',
  'Warlock',
  'Witch',
  'Wizard',
];

const animals = [
  'Aardvark',
  'Badger',
  'Cat',
  'Dog',
  'Eagle',
  'Falcon',
  'Goose',
  'Hippo',
  'Iguana',
  'Jackalope',
  'Kangaroo',
  'Lion',
  'Macaque',
  'Nightingale',
  'Owl',
  'Pigeon',
  'Quail',
  'Rooster',
  'Shark',
  'Toucan',
  'Ultimate Shrew',
  'Vole',
  'Weasel',
  'Xenops',
  'Yak',
  'Zebra',
];
