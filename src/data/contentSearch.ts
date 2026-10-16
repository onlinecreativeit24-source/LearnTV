export type LearnTVContent = {
  id: string;
  category: string;
  title: string;
  description: string;
  keywords: string[];
};

export const learnTVContent: LearnTVContent[] = [
  {
    id: 'space-solar-system',
    category: 'SPACE',
    title: 'Our Solar System',
    description:
      'Discover the Sun, eight planets, moons and other objects in our Solar System.',
    keywords: [
      'sun',
      'planets',
      'earth',
      'mars',
      'jupiter',
      'astronomy',
    ],
  },
  {
    id: 'science-water-cycle',
    category: 'SCIENCE',
    title: 'The Water Cycle',
    description:
      'Learn how evaporation, condensation and precipitation move water around Earth.',
    keywords: [
      'water',
      'evaporation',
      'clouds',
      'rain',
      'nature',
    ],
  },
  {
    id: 'geography-continents',
    category: 'GEOGRAPHY',
    title: 'Continents of Earth',
    description:
      'Explore the seven commonly recognized continents and their characteristics.',
    keywords: [
      'continents',
      'asia',
      'africa',
      'europe',
      'australia',
      'countries',
    ],
  },
  {
    id: 'science-plants',
    category: 'SCIENCE',
    title: 'How Plants Make Food',
    description:
      'Discover photosynthesis and how plants use sunlight, water and carbon dioxide.',
    keywords: [
      'plants',
      'leaves',
      'photosynthesis',
      'sunlight',
      'biology',
    ],
  },
  {
    id: 'global-gk-oceans',
    category: 'GLOBAL GK',
    title: 'Amazing Oceans',
    description:
      'Explore the oceans, marine ecosystems and the importance of ocean life.',
    keywords: [
      'ocean',
      'pacific',
      'marine',
      'sea',
      'animals',
      'environment',
    ],
  },
  {
    id: 'space-moon',
    category: 'SPACE',
    title: 'The Moon',
    description:
      'Learn about the Moon, its orbit around Earth and its changing phases.',
    keywords: [
      'moon',
      'earth',
      'orbit',
      'space',
      'lunar phases',
    ],
  },
  {
    id: 'arabic-letters',
    category: 'ARABIC LEARNING',
    title: 'Introduction to Arabic Letters',
    description:
      'Begin learning Arabic letters, their shapes and basic pronunciation.',
    keywords: [
      'arabic',
      'letters',
      'alphabet',
      'qaida',
      'pronunciation',
    ],
  },
  {
    id: 'children-alphabet',
    category: 'CHILDREN LEARNING',
    title: 'Learn the English Alphabet',
    description:
      'Practice recognizing letters and learning simple words for each letter.',
    keywords: [
      'children',
      'kids',
      'abc',
      'alphabet',
      'letters',
      'preschool',
    ],
  },
  {
    id: 'mother-baby-basics',
    category: 'MOTHER & BABY CARE',
    title: 'Baby Care Basics',
    description:
      'Explore general baby-care topics and learn when to seek professional medical advice.',
    keywords: [
      'mother',
      'baby',
      'care',
      'parenting',
      'newborn',
    ],
  },
  {
    id: 'fitness-stretching',
    category: 'DAILY FITNESS',
    title: 'Simple Daily Stretching',
    description:
      'Explore gentle stretching ideas for a daily movement routine.',
    keywords: [
      'fitness',
      'exercise',
      'stretching',
      'movement',
      'routine',
    ],
  },
  {
    id: 'healthy-sleep',
    category: 'HEALTHY LIVING',
    title: 'Understanding Healthy Sleep',
    description:
      'Learn about regular sleep routines and habits that support general wellbeing.',
    keywords: [
      'sleep',
      'rest',
      'health',
      'routine',
      'wellbeing',
    ],
  },
  {
    id: 'english-vocabulary',
    category: 'ENGLISH LEARNING',
    title: 'Everyday English Vocabulary',
    description:
      'Practice useful English words for common everyday situations.',
    keywords: [
      'english',
      'vocabulary',
      'words',
      'speaking',
      'language',
    ],
  },
  {
    id: 'digital-safety',
    category: 'DIGITAL SKILLS',
    title: 'Staying Safe Online',
    description:
      'Learn basic online safety, password protection and privacy awareness.',
    keywords: [
      'internet',
      'online',
      'safety',
      'passwords',
      'privacy',
      'computer',
    ],
  },
  {
    id: 'environment-nature',
    category: 'ENVIRONMENT & NATURE',
    title: 'Protecting Our Environment',
    description:
      'Discover practical ways to reduce waste and care for the natural world.',
    keywords: [
      'environment',
      'nature',
      'recycling',
      'pollution',
      'climate',
    ],
  },
];

export function searchLearnTVContent(
  query: string,
  category?: string,
): LearnTVContent[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategory = category?.trim().toLowerCase();

  if (!normalizedQuery && !normalizedCategory) {
    return [];
  }

  const terms = normalizedQuery
    .split(/\s+/)
    .filter(Boolean);

  return learnTVContent.filter(item => {
    const categoryMatches =
      !normalizedCategory ||
      item.category.toLowerCase() === normalizedCategory;

    if (!categoryMatches) {
      return false;
    }

    if (terms.length === 0) {
      return true;
    }

    const searchableText = [
      item.title,
      item.description,
      item.category,
      ...item.keywords,
    ]
      .join(' ')
      .toLowerCase();

    return terms.every(term => searchableText.includes(term));
  });
}
