const { initializeApp, cert, getApps, deleteApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const keyPath =
  process.env.HOME + '/LearnTV-secrets/serviceAccountKey.json';

const serviceAccount = require(keyPath);

if (serviceAccount.project_id !== 'learntv-9ad49') {
  throw new Error('Wrong Firebase project. Upload cancelled.');
}

const app = getApps().length
  ? getApps()[0]
  : initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore(app);

const lessons = [
  {
    category: 'LEARNING',
    title: 'How to Become a Better Learner',
    description: 'Discover practical habits that make learning easier and more effective.',
    points: [
      'Set a clear learning goal before you begin.',
      'Study in short sessions with regular breaks.',
      'Explain new ideas in your own words.',
      'Review important information regularly.',
      'Use mistakes as opportunities to improve.',
    ],
  },
  {
    category: 'LEARNING',
    title: 'The Power of Curiosity',
    description: 'Curiosity helps learners explore ideas and develop deeper understanding.',
    points: [
      'Ask questions about things you do not understand.',
      'Look for reliable answers from different sources.',
      'Connect new information to what you already know.',
      'Explore unfamiliar subjects with an open mind.',
    ],
  },
  {
    category: 'QUIZ',
    title: 'Science Knowledge Quiz',
    description: 'Test your understanding of basic science facts.',
    points: [
      'Earth revolves around the Sun.',
      'Water is made of hydrogen and oxygen.',
      'Plants use sunlight during photosynthesis.',
      'Sound travels through a medium.',
      'The heart pumps blood around the body.',
    ],
  },
  {
    category: 'QUIZ',
    title: 'Everyday Knowledge Challenge',
    description: 'Explore useful facts about the world around you.',
    points: [
      'A week contains seven days.',
      'A triangle has three sides.',
      'The Pacific is the largest ocean.',
      'Bees help pollinate many flowering plants.',
      'A thermometer measures temperature.',
    ],
  },
  {
    category: 'GLOBAL GK',
    title: 'Our Amazing Planet',
    description: 'Learn essential facts about Earth and its global environment.',
    points: [
      'Earth is the third planet from the Sun.',
      'The Pacific Ocean is the largest ocean.',
      'Antarctica is the coldest continent.',
      'The equator divides Earth into northern and southern halves.',
      'Earth has one natural moon.',
    ],
  },
  {
    category: 'GLOBAL GK',
    title: 'World Landmarks',
    description: 'Discover famous landmarks and their cultural significance.',
    points: [
      'The Eiffel Tower is in Paris, France.',
      'The Great Wall is in China.',
      'The Taj Mahal is in Agra, India.',
      'The Colosseum is in Rome, Italy.',
      'Machu Picchu is in Peru.',
    ],
  },
  {
    category: 'SCIENCE',
    title: 'Understanding the Water Cycle',
    description: 'Water moves continuously between the surface of Earth and the atmosphere.',
    points: [
      'Evaporation changes liquid water into water vapour.',
      'Condensation forms tiny droplets in clouds.',
      'Precipitation brings rain, snow or other forms of water.',
      'Collection gathers water in rivers, lakes and oceans.',
      'The Sun provides energy that drives the water cycle.',
    ],
  },
  {
    category: 'SCIENCE',
    title: 'Matter and Its States',
    description: 'Matter is anything that has mass and occupies space.',
    points: [
      'Solids generally keep their shape.',
      'Liquids flow and take the shape of their container.',
      'Gases spread to fill available space.',
      'Heating can change a solid into a liquid.',
      'Cooling can change water vapour into liquid water.',
    ],
  },
  {
    category: 'GEOGRAPHY',
    title: 'The Seven Continents',
    description: 'Explore the major land divisions of our planet.',
    points: [
      'Asia is the largest continent by area.',
      'Africa contains a wide range of climates and ecosystems.',
      'North America and South America are connected by Central America.',
      'Antarctica surrounds the South Pole.',
      'Europe and Asia form part of the larger landmass called Eurasia.',
    ],
  },
  {
    category: 'GEOGRAPHY',
    title: 'Mountains, Rivers and Valleys',
    description: 'Learn how major landforms shape landscapes and human life.',
    points: [
      'Mountains are elevated areas of land.',
      'Rivers transport water across landscapes.',
      'Valleys are low areas between hills or mountains.',
      'Erosion gradually changes the shape of land.',
      'Landforms influence settlement, farming and transport.',
    ],
  },
  {
    category: 'SPACE',
    title: 'Our Solar System',
    description: 'Our solar system contains the Sun, eight planets and many smaller objects.',
    points: [
      'The Sun is the star at the centre of our solar system.',
      'Mercury is the closest planet to the Sun.',
      'Earth is the only planet currently known to support life.',
      'Jupiter is the largest planet in the solar system.',
      'Neptune is the farthest of the eight recognised planets from the Sun.',
    ],
  },
  {
    category: 'SPACE',
    title: 'Stars and Galaxies',
    description: 'Discover the enormous structures that exist throughout the universe.',
    points: [
      'Stars produce energy through nuclear fusion.',
      'The Sun is a star.',
      'A galaxy contains stars, gas, dust and dark matter.',
      'Our solar system is part of the Milky Way galaxy.',
      'Light from distant stars can take years to reach Earth.',
    ],
  },
  {
    category: 'HISTORY',
    title: 'How Ancient Civilisations Lived',
    description: 'Early civilisations developed agriculture, cities and systems of government.',
    points: [
      'Agriculture helped many communities settle in one place.',
      'Rivers provided water for farming and transport.',
      'Writing helped societies record information.',
      'Trade connected people across distant regions.',
      'Archaeology studies material evidence from the past.',
    ],
  },
  {
    category: 'HISTORY',
    title: 'Understanding Historical Sources',
    description: 'Historians use evidence to investigate and interpret the past.',
    points: [
      'Primary sources come directly from the period being studied.',
      'Letters and diaries can reveal personal experiences.',
      'Artifacts provide evidence about past societies.',
      'Different sources may present different perspectives.',
      'Historians compare evidence before drawing conclusions.',
    ],
  },
  {
    category: 'TECHNOLOGY',
    title: 'How Computers Work',
    description: 'Computers process instructions and information using electronic components.',
    points: [
      'The CPU executes program instructions.',
      'RAM temporarily stores information in active use.',
      'Storage devices keep files and programs.',
      'Software tells hardware what tasks to perform.',
      'Input and output devices help people interact with computers.',
    ],
  },
  {
    category: 'TECHNOLOGY',
    title: 'Using the Internet Safely',
    description: 'Learn practical habits for safer online activities.',
    points: [
      'Use strong, unique passwords for important accounts.',
      'Never share verification codes with strangers.',
      'Check website addresses before entering sensitive information.',
      'Avoid suspicious links and unexpected attachments.',
      'Keep devices and applications updated.',
    ],
  },
  {
    category: 'ARABIC LEARNING',
    title: 'Arabic Greetings',
    description: 'Learn useful Arabic greetings and their English meanings.',
    points: [
      'السلام عليكم — As-salamu alaykum — Peace be upon you.',
      'وعليكم السلام — Wa alaykum as-salam — And peace be upon you.',
      'مرحبا — Marhaban — Hello.',
      'شكرا — Shukran — Thank you.',
      'مع السلامة — Ma as-salama — Goodbye.',
    ],
  },
  {
    category: 'ARABIC LEARNING',
    title: 'Basic Arabic Words',
    description: 'Practise common Arabic words used in everyday communication.',
    points: [
      'نعم — Naam — Yes.',
      'لا — La — No.',
      'كتاب — Kitab — Book.',
      'ماء — Maa — Water.',
      'بيت — Bayt — House.',
    ],
  },
  {
    category: 'CHILDREN LEARNING',
    title: 'Colours Around Us',
    description: 'Help children recognise colours in everyday objects.',
    points: [
      'The sky often appears blue during a clear day.',
      'Grass is commonly green.',
      'Many ripe strawberries are red.',
      'A lemon is usually yellow.',
      'Mixing certain colours creates new colours.',
    ],
  },
  {
    category: 'CHILDREN LEARNING',
    title: 'Numbers and Counting',
    description: 'Build early numeracy skills through counting and simple patterns.',
    points: [
      'Count objects one at a time.',
      'Numbers represent quantities.',
      'Two plus three equals five.',
      'A triangle has three sides.',
      'Practise counting forwards and backwards.',
    ],
  },
  {
    category: 'MOTHER & BABY CARE',
    title: 'Safe Sleep for Babies',
    description: 'Learn general safe-sleep practices recommended for infants.',
    points: [
      'Place babies on their backs for every sleep.',
      'Use a firm, flat sleep surface designed for infants.',
      'Keep pillows, loose blankets and soft toys out of the sleep area.',
      'Avoid overheating the baby during sleep.',
      'Ask a qualified healthcare professional about individual concerns.',
    ],
  },
  {
    category: 'MOTHER & BABY CARE',
    title: 'Supporting Early Development',
    description: 'Responsive care and interaction support a young child’s development.',
    points: [
      'Talk and sing to your baby regularly.',
      'Respond to a baby’s cues with care and attention.',
      'Provide age-appropriate, supervised play.',
      'Follow recommended vaccination and health visits.',
      'Discuss developmental concerns with a healthcare professional.',
    ],
  },
  {
    category: 'DAILY FITNESS',
    title: 'Building an Exercise Habit',
    description: 'Regular physical activity can support fitness and everyday wellbeing.',
    points: [
      'Start at a level suitable for your current ability.',
      'Warm up before vigorous exercise.',
      'Include walking or other activities you enjoy.',
      'Increase activity gradually.',
      'Stop and seek medical advice if exercise causes concerning symptoms.',
    ],
  },
  {
    category: 'DAILY FITNESS',
    title: 'Stretching and Mobility',
    description: 'Gentle movement can help maintain flexibility and comfortable mobility.',
    points: [
      'Move slowly and avoid bouncing during stretches.',
      'Stretch within a comfortable range.',
      'Breathe normally throughout each movement.',
      'Avoid forcing a joint beyond its natural range.',
      'Choose exercises appropriate for your health and ability.',
    ],
  },
  {
    category: 'HEALTHY LIVING',
    title: 'Balanced Everyday Nutrition',
    description: 'A varied diet can provide nutrients needed for normal body functions.',
    points: [
      'Eat a variety of vegetables and fruits.',
      'Include suitable sources of protein.',
      'Choose whole grains when available.',
      'Drink water regularly.',
      'Consider individual dietary needs and professional advice when necessary.',
    ],
  },
  {
    category: 'HEALTHY LIVING',
    title: 'The Importance of Sleep',
    description: 'Consistent, sufficient sleep supports attention, mood and general health.',
    points: [
      'Maintain a regular sleep and wake schedule.',
      'Create a quiet and comfortable sleeping environment.',
      'Reduce stimulating activities before bedtime.',
      'Avoid excessive caffeine late in the day.',
      'Seek professional advice for persistent sleep difficulties.',
    ],
  },
  {
    category: 'MENTAL WELLNESS',
    title: 'Understanding Everyday Stress',
    description: 'Stress is a common response to demands, change or uncertainty.',
    points: [
      'Notice situations that tend to increase your stress.',
      'Try slow, comfortable breathing.',
      'Break large tasks into manageable steps.',
      'Make time for rest and supportive relationships.',
      'Seek professional support when distress persists or becomes overwhelming.',
    ],
  },
  {
    category: 'MENTAL WELLNESS',
    title: 'Mindful Attention',
    description: 'Mindfulness involves paying attention to the present moment without harsh judgement.',
    points: [
      'Notice your breathing for a short period.',
      'Pay attention to sounds around you.',
      'Recognise thoughts without needing to act on every thought.',
      'Return your attention gently when it wanders.',
      'Practise in a way that feels comfortable and appropriate for you.',
    ],
  },
  {
    category: 'ENGLISH LEARNING',
    title: 'Everyday English Sentences',
    description: 'Practise simple English sentences used in common situations.',
    points: [
      'Good morning. How are you?',
      'Could you please help me?',
      'I would like a glass of water.',
      'Could you repeat that, please?',
      'Thank you for your time.',
    ],
  },
  {
    category: 'ENGLISH LEARNING',
    title: 'Building Vocabulary',
    description: 'Learn ways to remember and use new English words.',
    points: [
      'Learn new words in meaningful sentences.',
      'Write down definitions in simple English.',
      'Practise pronunciation aloud.',
      'Review words at regular intervals.',
      'Use new vocabulary in conversation and writing.',
    ],
  },
  {
    category: 'DIGITAL SKILLS',
    title: 'Managing Files and Folders',
    description: 'Organise digital information so it is easier to find and maintain.',
    points: [
      'Use clear names for files and folders.',
      'Group related documents together.',
      'Keep backup copies of important files.',
      'Check file extensions before opening unfamiliar files.',
      'Delete sensitive information securely when appropriate.',
    ],
  },
  {
    category: 'DIGITAL SKILLS',
    title: 'Recognising Online Scams',
    description: 'Learn warning signs that may indicate a fraudulent message or website.',
    points: [
      'Be cautious of urgent demands for money.',
      'Verify unexpected messages using a trusted contact method.',
      'Never reveal passwords or one-time verification codes.',
      'Check payment requests before sending money.',
      'Report suspicious activity to the relevant service.',
    ],
  },
  {
    category: 'ENVIRONMENT & NATURE',
    title: 'Protecting Biodiversity',
    description: 'Biodiversity includes the variety of living things and the ecosystems they form.',
    points: [
      'Habitats provide food, shelter and breeding areas.',
      'Pollinators support many flowering plants and crops.',
      'Pollution can harm wildlife and ecosystems.',
      'Protecting habitats helps conserve species.',
      'Responsible resource use can reduce environmental pressure.',
    ],
  },
  {
    category: 'ENVIRONMENT & NATURE',
    title: 'Reducing Household Waste',
    description: 'Simple choices can help reduce the amount of waste sent to landfill.',
    points: [
      'Choose reusable items when practical.',
      'Separate recyclable materials according to local rules.',
      'Avoid unnecessary packaging when possible.',
      'Compost suitable food scraps where facilities exist.',
      'Repair and reuse items before replacing them.',
    ],
  },
  {
    category: 'FAMILY QUIZ',
    title: 'Family Nature Challenge',
    description: 'Use these prompts to start a friendly nature quiz for the whole family.',
    points: [
      'Which star is closest to Earth? Answer: The Sun.',
      'What do bees collect from flowers? Answer: Nectar and pollen.',
      'What process helps plants make food using sunlight? Answer: Photosynthesis.',
      'What is a baby frog called? Answer: A tadpole.',
      'Which planet is known for its prominent rings? Answer: Saturn.',
    ],
  },
  {
    category: 'FAMILY QUIZ',
    title: 'Family World Knowledge',
    description: 'Explore geography, science and everyday facts together.',
    points: [
      'What is the largest ocean? Answer: The Pacific Ocean.',
      'How many sides does a hexagon have? Answer: Six.',
      'Which planet is known as the Red Planet? Answer: Mars.',
      'Which organ pumps blood? Answer: The heart.',
      'What language is primarily spoken in Brazil? Answer: Portuguese.',
    ],
  },
  {
    category: 'DAILY CHALLENGE',
    title: 'Daily Challenge: Science and Nature',
    description: 'A short daily learning challenge covering science and the natural world.',
    points: [
      'Question: Which gas do plants absorb during photosynthesis? Answer: Carbon dioxide.',
      'Question: What force pulls objects toward Earth? Answer: Gravity.',
      'Question: What is the boiling point of water at standard atmospheric pressure? Answer: 100°C.',
      'Question: Which organ helps humans breathe by exchanging gases? Answer: The lungs.',
      'Question: What is the centre of an atom called? Answer: The nucleus.',
    ],
  },
  {
    category: 'DAILY CHALLENGE',
    title: 'Daily Challenge: Geography and Space',
    description: 'Challenge your knowledge of Earth, geography and the solar system.',
    points: [
      'Question: Which is the largest continent? Answer: Asia.',
      'Question: Which planet is closest to the Sun? Answer: Mercury.',
      'Question: What is Earth’s natural satellite? Answer: The Moon.',
      'Question: Which ocean lies between Africa and Australia? Answer: The Indian Ocean.',
      'Question: What is the name of our galaxy? Answer: The Milky Way.',
    ],
  },
];

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

async function main() {
  const batch = db.batch();

  for (const lesson of lessons) {
    const id = `${slug(lesson.category)}_${slug(lesson.title)}`;
    const ref = db.collection('content').doc(id);

    batch.set(ref, {
      ...lesson,
      language: 'en',
      published: true,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  }

  await batch.commit();

  console.log(`Successfully uploaded ${lessons.length} lessons.`);
  console.log('Firebase project:', serviceAccount.project_id);
  console.log('Collection: content');
  console.log('Categories covered:', [...new Set(lessons.map(x => x.category))].length);
}

main()
  .catch(error => {
    console.error('Firestore upload failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await deleteApp(app);
  });
