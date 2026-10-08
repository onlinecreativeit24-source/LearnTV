import React, {useState} from 'react';
import {
  BackHandler,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getTodayDailyQuestions,
  DailyQuestion,
} from './src/data/dailyQuestions';

type Screen =
  | 'home'
  | 'category'
  | 'learning'
  | 'lesson'
  | 'gk'
  | 'quiz'
  | 'result'
  | 'subject'
  | 'daily';

type Category = {
  title: string;
  subtitle: string;
  icon: string;
};

type Lesson = {
  title: string;
  subject: string;
  description: string;
  points: string[];
};

const dailyChallengeCategory: Category = {
  title: 'DAILY CHALLENGE',
  subtitle: '10 fresh questions every day',
  icon: '📅',
};

const categories: Category[] = [
  {title: 'LEARNING', subtitle: 'Short lessons & discoveries', icon: '📚'},
  {title: 'QUIZ', subtitle: 'Test what you know', icon: '🧠'},
  {title: 'GLOBAL GK', subtitle: 'World knowledge', icon: '🌍'},
  {title: 'SCIENCE', subtitle: 'Explore how things work', icon: '🔬'},
  {title: 'GEOGRAPHY', subtitle: 'Countries & our planet', icon: '🗺️'},
  {title: 'SPACE', subtitle: 'Stars, planets & beyond', icon: '🚀'},
  {title: 'HISTORY', subtitle: 'People, events & civilizations', icon: '🏛️'},
  {title: 'TECHNOLOGY', subtitle: 'Discover the digital world', icon: '💻'},
];

const lessons: Lesson[] = [
  {
    title: 'Our Solar System',
    subject: 'SPACE',
    description:
      'Discover the Sun, planets and other objects that make up our Solar System.',
    points: [
      'The Sun is the star at the center of our Solar System.',
      'There are eight recognized planets.',
      'Planets orbit the Sun because of gravity.',
    ],
  },
  {
    title: 'The Water Cycle',
    subject: 'SCIENCE',
    description:
      'Learn how water moves between Earth, the atmosphere and the oceans.',
    points: [
      'Evaporation changes liquid water into water vapor.',
      'Condensation forms clouds.',
      'Precipitation returns water to Earth.',
    ],
  },
  {
    title: 'Continents of Earth',
    subject: 'GEOGRAPHY',
    description:
      'Explore the seven continents and learn how Earth is divided into major land areas.',
    points: [
      'Earth has seven commonly recognized continents.',
      'Asia is the largest continent.',
      'Australia is the smallest continent.',
    ],
  },
  {
    title: 'How Plants Make Food',
    subject: 'SCIENCE',
    description:
      'Learn about photosynthesis and how green plants make their own food.',
    points: [
      'Plants use sunlight as an energy source.',
      'Leaves take in carbon dioxide from the air.',
      'Water is absorbed through the roots.',
    ],
  },
  {
    title: 'Amazing Oceans',
    subject: 'GLOBAL GK',
    description:
      'Take a quick journey through Earth’s huge oceans and discover why they matter.',
    points: [
      'The Pacific Ocean is the largest ocean.',
      'Oceans cover most of Earth’s surface.',
      'Marine ecosystems support enormous biodiversity.',
    ],
  },
  {
    title: 'The Moon',
    subject: 'SPACE',
    description:
      'Learn about Earth’s natural satellite and why we see different Moon phases.',
    points: [
      'The Moon orbits Earth.',
      'Moon phases happen as the Moon moves around Earth.',
      'The Moon reflects light from the Sun.',
    ],
  },
];

const quizQuestions = [
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
    answer: 0,
  },
  {
    question: 'Which is the largest ocean on Earth?',
    options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'],
    answer: 1,
  },
  {
    question: 'Which gas do humans need to breathe?',
    options: ['Oxygen', 'Helium', 'Hydrogen', 'Neon'],
    answer: 0,
  },
  {
    question: 'How many continents are commonly recognized?',
    options: ['5', '6', '7', '8'],
    answer: 2,
  },
  {
    question: 'Which is the largest planet?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
    answer: 2,
  },
  {
    question: 'What is the capital of France?',
    options: ['Rome', 'Madrid', 'Paris', 'Berlin'],
    answer: 2,
  },
  {
    question: 'Which is the largest land animal?',
    options: ['Giraffe', 'Elephant', 'Rhino', 'Hippo'],
    answer: 1,
  },
  {
    question: 'What is H2O commonly called?',
    options: ['Oxygen', 'Salt', 'Water', 'Hydrogen'],
    answer: 2,
  },
  {
    question: 'What is the closest star to Earth?',
    options: ['Sirius', 'Polaris', 'The Sun', 'Vega'],
    answer: 2,
  },
  {
    question: 'Which is the largest continent?',
    options: ['Africa', 'Asia', 'Europe', 'North America'],
    answer: 1,
  },
];

const globalGKQuestions = [
  {
    question: 'Which country is known as the Land of the Rising Sun?',
    options: ['China', 'Japan', 'Thailand', 'South Korea'],
    answer: 1,
    explanation: 'Japan is traditionally known as the Land of the Rising Sun.',
  },
  {
    question: 'Which is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    answer: 2,
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
  },
  {
    question: 'Which continent is the Sahara Desert located in?',
    options: ['Asia', 'Africa', 'Australia', 'South America'],
    answer: 1,
    explanation: 'The Sahara Desert stretches across much of North Africa.',
  },
  {
    question: 'Which country is famous for the Eiffel Tower?',
    options: ['Italy', 'France', 'Spain', 'Germany'],
    answer: 1,
    explanation: 'The Eiffel Tower is one of the most famous landmarks in Paris, France.',
  },
  {
    question: 'What is the capital city of Canada?',
    options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
    answer: 2,
    explanation: 'Ottawa is the capital city of Canada.',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    answer: 1,
    explanation: 'Mars appears reddish because of iron minerals on its surface.',
  },
  {
    question: 'Which is the largest continent?',
    options: ['Africa', 'Asia', 'Europe', 'North America'],
    answer: 1,
    explanation: 'Asia is the largest continent by both area and population.',
  },
  {
    question: 'Which animal is the largest living land animal?',
    options: ['Giraffe', 'African Elephant', 'Hippopotamus', 'Rhinoceros'],
    answer: 1,
    explanation: 'The African elephant is the largest living land animal.',
  },
  {
    question: 'Which language has the most native speakers worldwide?',
    options: ['English', 'Spanish', 'Mandarin Chinese', 'Arabic'],
    answer: 2,
    explanation: 'Mandarin Chinese has the largest number of native speakers.',
  },
  {
    question: 'Which country has the city of Cairo as its capital?',
    options: ['Egypt', 'Morocco', 'Turkey', 'Jordan'],
    answer: 0,
    explanation: 'Cairo is the capital and largest city of Egypt.',
  },
  {
    question: 'Which is the smallest continent by land area?',
    options: ['Europe', 'Australia', 'Antarctica', 'South America'],
    answer: 1,
    explanation: 'Australia is the smallest continent by land area.',
  },
  {
    question: 'Which ocean lies between Africa and Australia?',
    options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'],
    answer: 2,
    explanation: 'The Indian Ocean lies between Africa, Asia and Australia.',
  },
];


type SubjectQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const subjectQuestionBanks: Record<
  'SCIENCE' | 'GEOGRAPHY' | 'SPACE' | 'HISTORY' | 'TECHNOLOGY',
  SubjectQuestion[]
> = {
  SCIENCE: [
    {
      question: 'Which organ pumps blood around the human body?',
      options: ['Lungs', 'Heart', 'Brain', 'Stomach'],
      answer: 1,
      explanation: 'The heart is a muscular organ that pumps blood throughout the body.',
    },
    {
      question: 'What force pulls objects toward Earth?',
      options: ['Magnetism', 'Gravity', 'Friction', 'Electricity'],
      answer: 1,
      explanation: 'Gravity is the force that attracts objects toward Earth.',
    },
    {
      question: 'Which gas do plants take in during photosynthesis?',
      options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'],
      answer: 2,
      explanation: 'Plants use carbon dioxide, water and sunlight to make food during photosynthesis.',
    },
    {
      question: 'What is the boiling point of water at sea level?',
      options: ['50°C', '75°C', '100°C', '150°C'],
      answer: 2,
      explanation: 'Pure water boils at 100°C at standard atmospheric pressure.',
    },
    {
      question: 'Which part of a plant usually absorbs water from the soil?',
      options: ['Flower', 'Leaf', 'Root', 'Fruit'],
      answer: 2,
      explanation: 'Roots absorb water and minerals from the soil.',
    },
    {
      question: 'Which state of matter has a fixed shape and fixed volume?',
      options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
      answer: 0,
      explanation: 'A solid has both a definite shape and a definite volume.',
    },
    {
      question: 'What is the center of an atom called?',
      options: ['Electron', 'Nucleus', 'Molecule', 'Cell'],
      answer: 1,
      explanation: 'The nucleus is the dense central part of an atom containing protons and neutrons.',
    },
    {
      question: 'Which vitamin is commonly produced in the skin when exposed to sunlight?',
      options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
      answer: 3,
      explanation: 'Sunlight helps the skin produce vitamin D.',
    },
    {
      question: 'Which simple machine uses a wheel and a rope to lift objects?',
      options: ['Pulley', 'Wedge', 'Lever', 'Screw'],
      answer: 0,
      explanation: 'A pulley uses a wheel and rope or cable to help lift or move objects.',
    },
    {
      question: 'What is the basic unit of life?',
      options: ['Atom', 'Cell', 'Tissue', 'Organ'],
      answer: 1,
      explanation: 'The cell is the basic structural and functional unit of living organisms.',
    },
  ],

  GEOGRAPHY: [
    {
      question: 'Which country has the largest land area in the world?',
      options: ['Canada', 'China', 'Russia', 'United States'],
      answer: 2,
      explanation: 'Russia is the world’s largest country by land area.',
    },
    {
      question: 'Which is the longest river in South America?',
      options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
      answer: 0,
      explanation: 'The Amazon River is the largest river system in South America.',
    },
    {
      question: 'Which desert is the largest hot desert in the world?',
      options: ['Gobi', 'Sahara', 'Atacama', 'Kalahari'],
      answer: 1,
      explanation: 'The Sahara is the largest hot desert on Earth.',
    },
    {
      question: 'Which continent is Egypt mainly located in?',
      options: ['Asia', 'Europe', 'Africa', 'South America'],
      answer: 2,
      explanation: 'Most of Egypt lies in northeastern Africa, although the Sinai Peninsula is in Asia.',
    },
    {
      question: 'Which ocean lies between Africa and Australia?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      answer: 1,
      explanation: 'The Indian Ocean lies between Africa, Asia and Australia.',
    },
    {
      question: 'What is the capital of Japan?',
      options: ['Kyoto', 'Osaka', 'Tokyo', 'Hiroshima'],
      answer: 2,
      explanation: 'Tokyo is the capital city of Japan.',
    },
    {
      question: 'Which mountain is the highest above sea level?',
      options: ['K2', 'Mount Everest', 'Kangchenjunga', 'Mount Elbrus'],
      answer: 1,
      explanation: 'Mount Everest has the highest elevation above sea level at about 8,849 metres.',
    },
    {
      question: 'Which country is shaped like a boot?',
      options: ['Italy', 'Greece', 'Portugal', 'Norway'],
      answer: 0,
      explanation: 'Italy is famously described as having a boot-like shape.',
    },
    {
      question: 'Which continent has the most countries?',
      options: ['Europe', 'Africa', 'Asia', 'North America'],
      answer: 1,
      explanation: 'Africa has more sovereign countries than any other continent.',
    },
    {
      question: 'Which line divides Earth into the Northern and Southern Hemispheres?',
      options: ['Prime Meridian', 'Tropic of Cancer', 'Equator', 'International Date Line'],
      answer: 2,
      explanation: 'The Equator is the imaginary line at 0° latitude dividing Earth into two hemispheres.',
    },
  ],

  HISTORY: [
    {
      question: 'Which ancient civilization built the pyramids at Giza?',
      options: ['Romans', 'Ancient Egyptians', 'Vikings', 'Maya'],
      answer: 1,
      explanation: 'The pyramids at Giza were built in ancient Egypt.',
    },
    {
      question: 'Who was the first person to walk on the Moon?',
      options: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'John Glenn'],
      answer: 1,
      explanation: 'Neil Armstrong became the first person to walk on the Moon in 1969.',
    },
    {
      question: 'Which city was buried by Mount Vesuvius in AD 79?',
      options: ['Pompeii', 'Athens', 'Sparta', 'Carthage'],
      answer: 0,
      explanation: 'Pompeii was buried during the eruption of Mount Vesuvius.',
    },
    {
      question: 'The Renaissance began in which country?',
      options: ['France', 'Italy', 'Spain', 'Germany'],
      answer: 1,
      explanation: 'The Renaissance began in Italian city-states.',
    },
    {
      question: 'Which wall divided Berlin during the Cold War?',
      options: ['Great Wall', 'Berlin Wall', 'Hadrian’s Wall', 'Western Wall'],
      answer: 1,
      explanation: 'The Berlin Wall divided East and West Berlin.',
    },
    {
      question: 'Who became the first emperor of the Roman Empire?',
      options: ['Julius Caesar', 'Augustus', 'Nero', 'Constantine'],
      answer: 1,
      explanation: 'Augustus is traditionally regarded as the first Roman emperor.',
    },
    {
      question: 'Which famous ship sank on its maiden voyage in 1912?',
      options: ['Titanic', 'Mayflower', 'Santa Maria', 'Endeavour'],
      answer: 0,
      explanation: 'The RMS Titanic sank in the North Atlantic in April 1912.',
    },
    {
      question: 'The ancient Olympic Games began in which civilization?',
      options: ['Greek', 'Roman', 'Egyptian', 'Persian'],
      answer: 0,
      explanation: 'The ancient Olympic Games originated in ancient Greece.',
    },
    {
      question: 'Johannes Gutenberg is famous for improving which technology?',
      options: ['Steam engine', 'Printing press', 'Telephone', 'Compass'],
      answer: 1,
      explanation: 'Gutenberg is famous for his movable-type printing press.',
    },
    {
      question: 'Which event is traditionally associated with 1492?',
      options: [
        'First Moon landing',
        'Christopher Columbus reaching the Americas',
        'Fall of the Berlin Wall',
        'French Revolution',
      ],
      answer: 1,
      explanation: 'Christopher Columbus reached the Americas during his 1492 voyage.',
    },
  ],

  TECHNOLOGY: [
    {
      question: 'What does CPU stand for?',
      options: [
        'Central Processing Unit',
        'Computer Power Utility',
        'Central Program User',
        'Core Processing Utility',
      ],
      answer: 0,
      explanation: 'CPU stands for Central Processing Unit.',
    },
    {
      question: 'Which technology is commonly used for wireless internet access?',
      options: ['Wi-Fi', 'HDMI', 'USB', 'VGA'],
      answer: 0,
      explanation: 'Wi-Fi is a wireless networking technology.',
    },
    {
      question: 'What does HTML primarily define?',
      options: [
        'Web page structure',
        'Computer hardware',
        'Internet speed',
        'Battery capacity',
      ],
      answer: 0,
      explanation: 'HTML defines the structure and content of web pages.',
    },
    {
      question: 'Which device is mainly used to store data permanently?',
      options: ['SSD', 'Monitor', 'Keyboard', 'Microphone'],
      answer: 0,
      explanation: 'An SSD is a storage device used to store data.',
    },
    {
      question: 'What does URL stand for?',
      options: [
        'Uniform Resource Locator',
        'Universal Reading Link',
        'User Resource List',
        'Unified Routing Language',
      ],
      answer: 0,
      explanation: 'URL stands for Uniform Resource Locator.',
    },
    {
      question: 'Which language is commonly used to style web pages?',
      options: ['CSS', 'SQL', 'Python', 'Bash'],
      answer: 0,
      explanation: 'CSS controls the visual presentation of web pages.',
    },
    {
      question: 'Which company originally developed Android?',
      options: ['Android Inc.', 'IBM', 'Nokia', 'Adobe'],
      answer: 0,
      explanation: 'Android was originally developed by Android Inc.',
    },
    {
      question: 'What is cloud computing mainly about?',
      options: [
        'Using remote computing resources over networks',
        'Making computers physically smaller',
        'Increasing screen brightness',
        'Printing documents faster',
      ],
      answer: 0,
      explanation: 'Cloud computing provides remote computing resources over networks.',
    },
    {
      question: 'Which component is commonly responsible for rendering graphics?',
      options: ['GPU', 'RAM', 'Power supply', 'Keyboard'],
      answer: 0,
      explanation: 'A GPU is designed to process and render graphics.',
    },
    {
      question: 'What does AI stand for?',
      options: [
        'Artificial Intelligence',
        'Automated Internet',
        'Advanced Interface',
        'Applied Information',
      ],
      answer: 0,
      explanation: 'AI stands for Artificial Intelligence.',
    },
  ],

  SPACE: [
    {
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Earth', 'Mercury', 'Mars'],
      answer: 2,
      explanation: 'Mercury is the planet closest to the Sun.',
    },
    {
      question: 'Which planet is famous for its large ring system?',
      options: ['Mars', 'Saturn', 'Venus', 'Mercury'],
      answer: 1,
      explanation: 'Saturn has the most prominent and extensive ring system in the Solar System.',
    },
    {
      question: 'What is the name of our galaxy?',
      options: ['Andromeda', 'Milky Way', 'Whirlpool', 'Sombrero'],
      answer: 1,
      explanation: 'Earth and the Solar System are located in the Milky Way galaxy.',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Jupiter', 'Neptune', 'Venus'],
      answer: 0,
      explanation: 'Mars appears reddish because iron minerals on its surface have oxidized.',
    },
    {
      question: 'What is the natural satellite of Earth?',
      options: ['The Sun', 'Mars', 'The Moon', 'Venus'],
      answer: 2,
      explanation: 'The Moon is Earth’s natural satellite.',
    },
    {
      question: 'Which is the largest planet in our Solar System?',
      options: ['Saturn', 'Earth', 'Jupiter', 'Neptune'],
      answer: 2,
      explanation: 'Jupiter is the largest planet in the Solar System.',
    },
    {
      question: 'What is the Sun?',
      options: ['A planet', 'A moon', 'A star', 'An asteroid'],
      answer: 2,
      explanation: 'The Sun is a star at the center of our Solar System.',
    },
    {
      question: 'Which planet is famous for having a Great Red Spot?',
      options: ['Jupiter', 'Saturn', 'Mars', 'Uranus'],
      answer: 0,
      explanation: 'The Great Red Spot is a giant storm in Jupiter’s atmosphere.',
    },
    {
      question: 'Which planet is tilted so much that it rotates almost on its side?',
      options: ['Earth', 'Uranus', 'Mercury', 'Mars'],
      answer: 1,
      explanation: 'Uranus has an extreme axial tilt of about 98 degrees.',
    },
    {
      question: 'What is the name of the first human-made object to land on the Moon?',
      options: ['Apollo 11', 'Luna 2', 'Voyager 1', 'Hubble'],
      answer: 1,
      explanation: 'Luna 2, launched by the Soviet Union in 1959, was the first human-made object to reach the Moon’s surface.',
    },
  ],
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const [dailyQuestions, setDailyQuestions] = useState<DailyQuestion[]>([]);
  const [dailyQuestionIndex, setDailyQuestionIndex] = useState(0);
  const [dailySelectedAnswer, setDailySelectedAnswer] = useState<number | null>(null);
  const [dailyScore, setDailyScore] = useState(0);
  const [dailyFinished, setDailyFinished] = useState(false);

  const startDailyChallenge = () => {
    const questions = getTodayDailyQuestions();
    setDailyQuestions(questions);
    setDailyQuestionIndex(0);
    setDailySelectedAnswer(null);
    setDailyScore(0);
    setDailyFinished(false);
    setScreen('daily');
  };

  const answerDailyQuestion = (index: number) => {
    if (dailySelectedAnswer !== null) {
      return;
    }

    setDailySelectedAnswer(index);

    if (
      dailyQuestions.length > 0 &&
      index === dailyQuestions[dailyQuestionIndex].answer
    ) {
      setDailyScore(current => current + 1);
    }
  };

  const nextDailyQuestion = () => {
    if (dailyQuestions.length === 0) {
      return;
    }

    if (dailyQuestionIndex >= dailyQuestions.length - 1) {
      setDailyFinished(true);
      return;
    }

    setDailyQuestionIndex(current => current + 1);
    setDailySelectedAnswer(null);
  };

  const restartDailyChallenge = () => {
    const questions = getTodayDailyQuestions();

    setDailyQuestions(questions);
    setDailyQuestionIndex(0);
    setDailySelectedAnswer(null);
    setDailyScore(0);
    setDailyFinished(false);
  };


  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const [gkQuestions, setGkQuestions] = useState(globalGKQuestions);
  const [gkQuestionIndex, setGkQuestionIndex] = useState(0);
  const [gkSelectedAnswer, setGkSelectedAnswer] =
    useState<number | null>(null);
  const [gkScore, setGkScore] = useState(0);
  const [gkAnswered, setGkAnswered] = useState(false);
  const [gkFinished, setGkFinished] = useState(false);

  const startGK = () => {
    const shuffled = [...globalGKQuestions].sort(
      () => Math.random() - 0.5,
    );

    setGkQuestions(shuffled.slice(0, 10));
    setGkQuestionIndex(0);
    setGkSelectedAnswer(null);
    setGkScore(0);
    setGkAnswered(false);
    setGkFinished(false);
    setScreen('gk');
  };

  const answerGK = (index: number) => {
    if (gkAnswered || gkFinished) {
      return;
    }

    setGkSelectedAnswer(index);
    setGkAnswered(true);

    if (index === gkQuestions[gkQuestionIndex].answer) {
      setGkScore(current => current + 1);
    }
  };

  const nextGKQuestion = () => {
    if (gkQuestionIndex < gkQuestions.length - 1) {
      setGkQuestionIndex(current => current + 1);
      setGkSelectedAnswer(null);
      setGkAnswered(false);
    } else {
      setGkFinished(true);
    }
  };

  const restartGK = () => {
    startGK();
  };

  const [subjectName, setSubjectName] = useState<
    'SCIENCE' | 'GEOGRAPHY' | 'SPACE'
  >('SCIENCE');
  const [subjectQuestions, setSubjectQuestions] = useState<SubjectQuestion[]>([]);
  const [subjectQuestionIndex, setSubjectQuestionIndex] = useState(0);
  const [subjectSelectedAnswer, setSubjectSelectedAnswer] =
    useState<number | null>(null);
  const [subjectScore, setSubjectScore] = useState(0);
  const [subjectAnswered, setSubjectAnswered] = useState(false);
  const [subjectFinished, setSubjectFinished] = useState(false);

  const startSubjectChallenge = (
    subject: 'SCIENCE' | 'GEOGRAPHY' | 'SPACE',
  ) => {
    const bank = subjectQuestionBanks[subject];
    const shuffled = [...bank].sort(() => Math.random() - 0.5);

    setSubjectName(subject);
    setSubjectQuestions(shuffled.slice(0, 10));
    setSubjectQuestionIndex(0);
    setSubjectSelectedAnswer(null);
    setSubjectScore(0);
    setSubjectAnswered(false);
    setSubjectFinished(false);
    setScreen('subject');
  };

  const answerSubject = (index: number) => {
    if (subjectAnswered || subjectFinished) {
      return;
    }

    setSubjectSelectedAnswer(index);
    setSubjectAnswered(true);

    if (index === subjectQuestions[subjectQuestionIndex].answer) {
      setSubjectScore(current => current + 1);
    }
  };

  const nextSubjectQuestion = () => {
    if (subjectQuestionIndex < subjectQuestions.length - 1) {
      setSubjectQuestionIndex(current => current + 1);
      setSubjectSelectedAnswer(null);
      setSubjectAnswered(false);
    } else {
      setSubjectFinished(true);
    }
  };

  const restartSubject = () => {
    startSubjectChallenge(subjectName);
  };


  const openCategory = (category: Category) => {
    if (category.title === 'DAILY CHALLENGE') {
      startDailyChallenge();
      return;
    }

    setSelectedCategory(category);

    if (category.title === 'LEARNING') {
      setScreen('learning');
    } else if (category.title === 'GLOBAL GK') {
      startGK();
    } else if (
      category.title === 'SCIENCE' ||
      category.title === 'GEOGRAPHY' ||
      category.title === 'SPACE'
    ) {
      startSubjectChallenge(category.title);
    } else {
      setScreen('category');
    }
  };

  const openLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setScreen('lesson');
  };

  const startQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setScreen('quiz');
  };

  const chooseAnswer = (index: number) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);

    if (index === quizQuestions[questionIndex].answer) {
      setScore(current => current + 1);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex(current => current + 1);
      setSelectedAnswer(null);
    } else {
      setScreen('result');
    }
  };

  const goHome = () => {
    setScreen('home');
    setSelectedCategory(null);
    setSelectedLesson(null);
  };

  React.useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (screen === 'home') {
          return false;
        }

        if (screen === 'lesson') {
          setScreen('learning');
          return true;
        }

        if (
          screen === 'learning' ||
          screen === 'category' ||
          screen === 'gk' ||
          screen === 'subject'
        ) {
          setScreen('home');
          return true;
        }

        if (screen === 'quiz' || screen === 'result') {
          setScreen('home');
          return true;
        }

        if (screen === 'daily') {
          setScreen('home');
          return true;
        }

        return true;
      },
    );

    return () => subscription.remove();
  }, [screen]);

  if (screen === 'learning') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.topBar}>
            <Pressable
              focusable
              hasTVPreferredFocus
              onPress={goHome}
              style={({focused}) => [
                styles.backButton,
                focused && styles.focused,
              ]}>
              <Text style={styles.backText}>‹  HOME</Text>
            </Pressable>

            <Text style={styles.pageTitle}>LEARNING</Text>
          </View>

          <Text style={styles.pageSubtitle}>
            Choose a lesson and start exploring.
          </Text>

          <View style={styles.lessonGrid}>
            {lessons.map((lesson, index) => (
              <Pressable
                key={lesson.title}
                focusable
                hasTVPreferredFocus={index === 0}
                onPress={() => openLesson(lesson)}
                style={({focused}) => [
                  styles.lessonCard,
                  completedLessons.includes(lesson.title) &&
                    styles.lessonCompleted,
                  focused && styles.lessonFocused,
                ]}>
                <View style={styles.lessonNumber}>
                  <Text style={styles.lessonNumberText}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>

                <Text style={styles.lessonSubject}>{lesson.subject}</Text>

                <Text style={styles.lessonTitle}>{lesson.title}</Text>

                <Text style={styles.lessonDescription} numberOfLines={3}>
                  {lesson.description}
                </Text>

                {completedLessons.includes(lesson.title) ? (
                  <Text style={styles.completedBadge}>
                    ✓ COMPLETED
                  </Text>
                ) : (
                  <Text style={styles.openLesson}>OPEN LESSON  ›</Text>
                )}
              </Pressable>
            ))}
          </View>

          <Text style={styles.footerHint}>
            D-PAD to navigate  •  OK to open  •  BACK to return
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'lesson' && selectedLesson) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.lessonDetail}>
          <Pressable
            focusable
            hasTVPreferredFocus
            onPress={() => {
              if (
                selectedLesson &&
                !completedLessons.includes(selectedLesson.title)
              ) {
                setCompletedLessons(current => [
                  ...current,
                  selectedLesson.title,
                ]);
              }
              setScreen('learning');
            }}
            style={({focused}) => [
              styles.backButton,
              focused && styles.focused,
            ]}>
            <Text style={styles.backText}>‹  BACK TO LESSONS</Text>
          </Pressable>

          <Text style={styles.detailSubject}>{selectedLesson.subject}</Text>

          <Text style={styles.detailTitle}>{selectedLesson.title}</Text>

          <Text style={styles.detailDescription}>
            {selectedLesson.description}
          </Text>

          <View style={styles.whatYouLearn}>
            <Text style={styles.sectionTitle}>WHAT YOU'LL LEARN</Text>

            {selectedLesson.points.map((point, index) => (
              <View key={point} style={styles.pointRow}>
                <View style={styles.pointNumber}>
                  <Text style={styles.pointNumberText}>{index + 1}</Text>
                </View>

                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>

          <Pressable
            focusable
            onPress={() => setScreen('learning')}
            style={({focused}) => [
              styles.continueButton,
              focused && styles.buttonFocused,
            ]}>
            <Text style={styles.continueText}>✓  LESSON COMPLETE</Text>
          </Pressable>

          <Text style={styles.footerHint}>
            D-PAD to navigate  •  OK to select  •  BACK to return
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* DAILY_CHALLENGE_SCREEN */

  if (screen === 'daily') {
    const currentQuestion =
      dailyQuestions.length > 0
        ? dailyQuestions[dailyQuestionIndex]
        : null;

    if (dailyFinished) {
      const percentage =
        dailyQuestions.length > 0
          ? Math.round(
              (dailyScore / dailyQuestions.length) * 100,
            )
          : 0;

      return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.dailyContainer}>
            <Text style={styles.dailyTitle}>
              DAILY CHALLENGE
            </Text>

            <Text style={styles.dailyResultTitle}>
              Challenge Complete
            </Text>

            <Text style={styles.dailyScore}>
              {dailyScore} / {dailyQuestions.length}
            </Text>

            <Text style={styles.dailyPercentage}>
              {percentage}%
            </Text>

            <Text style={styles.dailyResultText}>
              Great work. Come back tomorrow for a new challenge.
            </Text>

            <Pressable
              focusable
              hasTVPreferredFocus
              onPress={restartDailyChallenge}
              style={({focused}) => [
                styles.primaryButton,
                focused && styles.focused,
              ]}>
              <Text style={styles.primaryButtonText}>
                PLAY AGAIN
              </Text>
            </Pressable>

            <Pressable
              focusable
              onPress={() => setScreen('home')}
              style={({focused}) => [
                styles.secondaryButton,
                focused && styles.focused,
              ]}>
              <Text style={styles.secondaryButtonText}>
                HOME
              </Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      );
    }

    if (!currentQuestion) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.dailyContainer}>
            <Text style={styles.dailyTitle}>
              DAILY CHALLENGE
            </Text>

            <Text style={styles.dailyResultText}>
              No questions available.
            </Text>

            <Pressable
              focusable
              hasTVPreferredFocus
              onPress={() => setScreen('home')}
              style={({focused}) => [
                styles.primaryButton,
                focused && styles.focused,
              ]}>
              <Text style={styles.primaryButtonText}>
                HOME
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    const selected = dailySelectedAnswer !== null;
    const correctAnswer = currentQuestion.answer;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.dailyContainer}>
          <Text style={styles.dailyTitle}>
            DAILY CHALLENGE
          </Text>

          <Text style={styles.dailyProgress}>
            Question {dailyQuestionIndex + 1} of {dailyQuestions.length}
          </Text>

          <Text style={styles.dailyQuestion}>
            {currentQuestion.question}
          </Text>

          {currentQuestion.options.map((option, index) => {
            const isSelected = dailySelectedAnswer === index;
            const isCorrect = index === correctAnswer;

            return (
              <Pressable
                key={option}
                focusable
                disabled={selected}
                hasTVPreferredFocus={index === 0}
                onPress={() => answerDailyQuestion(index)}
                style={({focused}) => [
                  styles.answerButton,
                  focused && styles.focused,
                  isSelected && styles.answerSelected,
                  selected && isCorrect && styles.answerCorrect,
                ]}>
                <Text style={styles.answerText}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </Pressable>
            );
          })}

          {selected && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>
                {dailySelectedAnswer === correctAnswer
                  ? 'Correct!'
                  : 'Not quite'}
              </Text>

              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            </View>
          )}

          {selected && (
            <Pressable
              focusable
              onPress={nextDailyQuestion}
              style={({focused}) => [
                styles.primaryButton,
                focused && styles.focused,
              ]}>
              <Text style={styles.primaryButtonText}>
                {dailyQuestionIndex >= dailyQuestions.length - 1
                  ? 'SEE RESULT'
                  : 'NEXT'}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'quiz') {
    const currentQuestion = quizQuestions[questionIndex];

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.quizContainer}>
          <View style={styles.quizHeader}>
            <Text style={styles.quizLabel}>GLOBAL QUIZ</Text>
            <Text style={styles.quizScore}>SCORE {score}</Text>
          </View>

          <Text style={styles.questionCount}>
            QUESTION {questionIndex + 1} / {quizQuestions.length}
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.learningProgressFill,
                {
                  width: `${
                    ((questionIndex + 1) / quizQuestions.length) * 100
                  }%`,
                },
              ]}
            />
          </View>

          <Text style={styles.question}>{currentQuestion.question}</Text>

          <View style={styles.answers}>
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.answer;
              const isSelected = index === selectedAnswer;

              return (
                <Pressable
                  key={option}
                  focusable
                  hasTVPreferredFocus={index === 0}
                  onPress={() => chooseAnswer(index)}
                  style={({focused}) => [
                    styles.answerButton,
                    focused && styles.buttonFocused,
                    isSelected &&
                      (isCorrect
                        ? styles.correctAnswer
                        : styles.wrongAnswer),
                  ]}>
                  <Text style={styles.answerLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>

                  <Text style={styles.answerText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          {selectedAnswer !== null && (
            <Pressable
              focusable
              hasTVPreferredFocus
              onPress={nextQuestion}
              style={({focused}) => [
                styles.nextButton,
                focused && styles.buttonFocused,
              ]}>
              <Text style={styles.nextText}>
                {questionIndex === quizQuestions.length - 1
                  ? 'SEE RESULT'
                  : 'NEXT QUESTION  ›'}
              </Text>
            </Pressable>
          )}

          <Text style={styles.footerHint}>
            D-PAD to choose  •  OK to answer  •  BACK for home
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'result') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>QUIZ COMPLETE</Text>

          <Text style={styles.resultTitle}>Great job!</Text>

          <Text style={styles.resultScore}>
            {score} / {quizQuestions.length}
          </Text>

          <Text style={styles.resultMessage}>
            {score >= 8
              ? 'Excellent knowledge!'
              : score >= 5
                ? 'Good work! Keep learning.'
                : 'Keep practicing and try again.'}
          </Text>

          <View style={styles.resultButtons}>
            <Pressable
              focusable
              hasTVPreferredFocus
              onPress={startQuiz}
              style={({focused}) => [
                styles.resultButton,
                focused && styles.buttonFocused,
              ]}>
              <Text style={styles.resultButtonText}>PLAY AGAIN</Text>
            </Pressable>

            <Pressable
              focusable
              onPress={goHome}
              style={({focused}) => [
                styles.resultButton,
                focused && styles.buttonFocused,
              ]}>
              <Text style={styles.resultButtonText}>HOME</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'gk') {
    if (gkFinished) {
      const percentage = Math.round(
        (gkScore / gkQuestions.length) * 100,
      );

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.gkContainer}>
            <Text style={styles.gkEyebrow}>GLOBAL GK</Text>
            <Text style={styles.gkTitle}>CHALLENGE COMPLETE</Text>

            <View style={styles.gkScoreCard}>
              <Text style={styles.gkScoreLabel}>YOUR SCORE</Text>
              <Text style={styles.gkScoreValue}>
                {gkScore} / {gkQuestions.length}
              </Text>
              <Text style={styles.gkPercentage}>{percentage}%</Text>

              <Text style={styles.gkMessage}>
                {percentage >= 80
                  ? 'Excellent! You know a lot about the world.'
                  : percentage >= 50
                  ? 'Good job! Keep learning and try again.'
                  : 'Keep learning! You can improve your score.'}
              </Text>
            </View>

            <View style={styles.gkButtonRow}>
              <Pressable
                focusable
                hasTVPreferredFocus
                onPress={restartGK}
                style={({focused}) => [
                  styles.gkButton,
                  focused && styles.gkButtonFocused,
                ]}>
                <Text style={styles.gkButtonText}>PLAY AGAIN</Text>
              </Pressable>

              <Pressable
                focusable
                onPress={goHome}
                style={({focused}) => [
                  styles.gkButtonSecondary,
                  focused && styles.gkButtonFocused,
                ]}>
                <Text style={styles.gkButtonText}>HOME</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    const currentGK = gkQuestions[gkQuestionIndex];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.gkContainer}>
          <View style={styles.gkHeader}>
            <View>
              <Text style={styles.gkEyebrow}>GLOBAL GK</Text>
              <Text style={styles.gkTitle}>WORLD KNOWLEDGE</Text>
            </View>

            <Text style={styles.gkCounter}>
              QUESTION {gkQuestionIndex + 1} / {gkQuestions.length}
            </Text>
          </View>

          <View style={styles.gkProgressBar}>
            <View
              style={[
                styles.gkProgressFill,
                {
                  width: `${((gkQuestionIndex + 1) /
                    gkQuestions.length) *
                    100}%`,
                },
              ]}
            />
          </View>

          <View style={styles.gkQuestionCard}>
            <Text style={styles.gkQuestion}>
              {currentGK.question}
            </Text>

            <View style={styles.gkOptions}>
              {currentGK.options.map((option, index) => {
                const isSelected = gkSelectedAnswer === index;
                const isCorrect = currentGK.answer === index;

                return (
                  <Pressable
                    key={option}
                    focusable
                    hasTVPreferredFocus={index === 0}
                    disabled={gkAnswered}
                    onPress={() => answerGK(index)}
                    style={({focused}) => [
                      styles.gkOption,
                      focused && styles.gkOptionFocused,
                      gkAnswered &&
                        isCorrect &&
                        styles.gkOptionCorrect,
                      gkAnswered &&
                        isSelected &&
                        !isCorrect &&
                        styles.gkOptionWrong,
                    ]}>
                    <Text style={styles.gkOptionLetter}>
                      {String.fromCharCode(65 + index)}
                    </Text>

                    <Text style={styles.gkOptionText}>
                      {option}
                    </Text>

                    {gkAnswered && isCorrect ? (
                      <Text style={styles.gkOptionResult}>✓</Text>
                    ) : null}

                    {gkAnswered &&
                    isSelected &&
                    !isCorrect ? (
                      <Text style={styles.gkOptionResult}>✕</Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {gkAnswered ? (
            <View style={styles.gkFeedback}>
              <Text
                style={[
                  styles.gkFeedbackTitle,
                  gkSelectedAnswer === currentGK.answer
                    ? styles.gkCorrectText
                    : styles.gkWrongText,
                ]}>
                {gkSelectedAnswer === currentGK.answer
                  ? '✓ CORRECT!'
                  : '✕ WRONG!'}
              </Text>

              {gkSelectedAnswer !== currentGK.answer ? (
                <Text style={styles.gkCorrectAnswer}>
                  Correct answer: {currentGK.options[currentGK.answer]}
                </Text>
              ) : null}

              <Text style={styles.gkExplanation}>
                {currentGK.explanation}
              </Text>

              <Pressable
                focusable
                hasTVPreferredFocus
                onPress={nextGKQuestion}
                style={({focused}) => [
                  styles.gkButton,
                  focused && styles.gkButtonFocused,
                ]}>
                <Text style={styles.gkButtonText}>
                  {gkQuestionIndex < gkQuestions.length - 1
                    ? 'NEXT QUESTION  ›'
                    : 'SEE FINAL SCORE  ›'}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.gkInstruction}>
              SELECT AN ANSWER WITH THE REMOTE
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }


  if (screen === 'subject') {
    if (subjectFinished) {
      const percentage = Math.round(
        (subjectScore / subjectQuestions.length) * 100,
      );

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.subjectContainer}>
            <Text style={styles.subjectEyebrow}>{subjectName}</Text>
            <Text style={styles.subjectTitle}>CHALLENGE COMPLETE</Text>

            <View style={styles.subjectScoreCard}>
              <Text style={styles.subjectScoreLabel}>YOUR SCORE</Text>

              <Text style={styles.subjectScoreValue}>
                {subjectScore} / {subjectQuestions.length}
              </Text>

              <Text style={styles.subjectPercentage}>
                {percentage}%
              </Text>

              <Text style={styles.subjectMessage}>
                {percentage >= 80
                  ? 'Excellent! You really know this subject.'
                  : percentage >= 50
                  ? 'Good job! Keep learning and try again.'
                  : 'Keep learning! Your next score can be better.'}
              </Text>
            </View>

            <View style={styles.subjectButtonRow}>
              <Pressable
                focusable
                hasTVPreferredFocus
                onPress={restartSubject}
                style={({focused}) => [
                  styles.subjectButton,
                  focused && styles.subjectButtonFocused,
                ]}>
                <Text style={styles.subjectButtonText}>
                  PLAY AGAIN
                </Text>
              </Pressable>

              <Pressable
                focusable
                onPress={goHome}
                style={({focused}) => [
                  styles.subjectButtonSecondary,
                  focused && styles.subjectButtonFocused,
                ]}>
                <Text style={styles.subjectButtonText}>
                  HOME
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    const currentSubject = subjectQuestions[subjectQuestionIndex];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subjectContainer}>
          <View style={styles.subjectHeader}>
            <View>
              <Text style={styles.subjectEyebrow}>
                {subjectName}
              </Text>

              <Text style={styles.subjectTitle}>
                KNOWLEDGE CHALLENGE
              </Text>
            </View>

            <Text style={styles.subjectCounter}>
              QUESTION {subjectQuestionIndex + 1} / {subjectQuestions.length}
            </Text>
          </View>

          <View style={styles.subjectProgressBar}>
            <View
              style={[
                styles.subjectProgressFill,
                {
                  width: `${((subjectQuestionIndex + 1) /
                    subjectQuestions.length) *
                    100}%`,
                },
              ]}
            />
          </View>

          <View style={styles.subjectQuestionCard}>
            <Text style={styles.subjectQuestion}>
              {currentSubject.question}
            </Text>

            <View style={styles.subjectOptions}>
              {currentSubject.options.map((option, index) => {
                const isSelected =
                  subjectSelectedAnswer === index;
                const isCorrect =
                  currentSubject.answer === index;

                return (
                  <Pressable
                    key={option}
                    focusable
                    hasTVPreferredFocus={index === 0}
                    disabled={subjectAnswered}
                    onPress={() => answerSubject(index)}
                    style={({focused}) => [
                      styles.subjectOption,
                      focused && styles.subjectOptionFocused,
                      subjectAnswered &&
                        isCorrect &&
                        styles.subjectOptionCorrect,
                      subjectAnswered &&
                        isSelected &&
                        !isCorrect &&
                        styles.subjectOptionWrong,
                    ]}>
                    <Text style={styles.subjectOptionLetter}>
                      {String.fromCharCode(65 + index)}
                    </Text>

                    <Text style={styles.subjectOptionText}>
                      {option}
                    </Text>

                    {subjectAnswered && isCorrect ? (
                      <Text style={styles.subjectOptionResult}>
                        ✓
                      </Text>
                    ) : null}

                    {subjectAnswered &&
                    isSelected &&
                    !isCorrect ? (
                      <Text style={styles.subjectOptionResult}>
                        ✕
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {subjectAnswered ? (
            <View style={styles.subjectFeedback}>
              <Text
                style={[
                  styles.subjectFeedbackTitle,
                  subjectSelectedAnswer === currentSubject.answer
                    ? styles.subjectCorrectText
                    : styles.subjectWrongText,
                ]}>
                {subjectSelectedAnswer === currentSubject.answer
                  ? '✓ CORRECT!'
                  : '✕ WRONG!'}
              </Text>

              {subjectSelectedAnswer !== currentSubject.answer ? (
                <Text style={styles.subjectCorrectAnswer}>
                  Correct answer: {currentSubject.options[currentSubject.answer]}
                </Text>
              ) : null}

              <Text style={styles.subjectExplanation}>
                {currentSubject.explanation}
              </Text>

              <Pressable
                focusable
                hasTVPreferredFocus
                onPress={nextSubjectQuestion}
                style={({focused}) => [
                  styles.subjectButton,
                  focused && styles.subjectButtonFocused,
                ]}>
                <Text style={styles.subjectButtonText}>
                  {subjectQuestionIndex < subjectQuestions.length - 1
                    ? 'NEXT QUESTION  ›'
                    : 'SEE FINAL SCORE  ›'}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.subjectInstruction}>
              SELECT AN ANSWER WITH THE REMOTE
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'category' && selectedCategory) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.categoryContainer}>
          <Pressable
            focusable
            hasTVPreferredFocus
            onPress={goHome}
            style={({focused}) => [
              styles.backButton,
              focused && styles.focused,
            ]}>
            <Text style={styles.backText}>‹  HOME</Text>
          </Pressable>

          <Text style={styles.categoryIcon}>{selectedCategory.icon}</Text>

          <Text style={styles.detailTitle}>{selectedCategory.title}</Text>

          <Text style={styles.detailDescription}>
            {selectedCategory.subtitle}
          </Text>

          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonTitle}>CONTENT COMING NEXT</Text>
            <Text style={styles.comingSoonText}>
              More {selectedCategory.title.toLowerCase()} content is being
              prepared for LearnTV.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.homeContent}>
        <View style={styles.brandRow}>
          <View>
            <Text style={styles.logo}>LearnTV</Text>
            <Text style={styles.tagline}>Learn. Play. Discover.</Text>
          </View>

          <Text style={styles.familyLabel}>FAMILY LEARNING & QUIZ</Text>
        </View>

        <View style={styles.hero}>
          <View>
            <Text style={styles.heroEyebrow}>WELCOME TO LEARNTV</Text>
            <Text style={styles.heroTitle}>Learn something{'\n'}new today.</Text>
            <Text style={styles.heroDescription}>
              Fun lessons, quizzes and discoveries designed for the whole
              family.
            </Text>
          </View>

          <View style={styles.quizBadge}>
            <Text style={styles.quizBadgeNumber}>10</Text>
            <Text style={styles.quizBadgeText}>QUIZ{'\n'}QUESTIONS</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>EXPLORE</Text>

        <View style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <Pressable
              key={category.title}
              focusable
              hasTVPreferredFocus={index === 0}
              onPress={() =>
                category.title === 'QUIZ'
                  ? startQuiz()
                  : openCategory(category)
              }
              style={({focused}) => [
                styles.categoryCard,
                focused && styles.categoryFocused,
              ]}>
              <Text style={styles.categoryCardIcon}>{category.icon}</Text>
              <Text style={styles.categoryCardTitle}>{category.title}</Text>
              <Text style={styles.categoryCardSubtitle}>
                {category.subtitle}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.footerHint}>
          D-PAD to navigate  •  OK to select  •  BACK to return
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10131A',
  },

  scrollContent: {
    paddingHorizontal: 70,
    paddingVertical: 42,
  },

  homeContent: {
    paddingHorizontal: 70,
    paddingVertical: 45,
    paddingBottom: 60,
  },

  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -2,
  },

  tagline: {
    color: '#8E9AAF',
    fontSize: 20,
    marginTop: 2,
  },

  familyLabel: {
    color: '#7ED6A5',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 14,
  },

  hero: {
    minHeight: 260,
    marginTop: 35,
    marginBottom: 38,
    paddingHorizontal: 40,
    paddingVertical: 35,
    borderRadius: 22,
    backgroundColor: '#1B2230',
    borderWidth: 1,
    borderColor: '#293244',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heroEyebrow: {
    color: '#7ED6A5',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 12,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 46,
    lineHeight: 54,
    fontWeight: '800',
  },

  heroDescription: {
    color: '#AAB4C5',
    fontSize: 20,
    lineHeight: 29,
    marginTop: 16,
    maxWidth: 620,
  },

  quizBadge: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#273248',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7ED6A5',
  },

  quizBadgeNumber: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '800',
  },

  quizBadgeText: {
    color: '#7ED6A5',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 18,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },

  categoryCard: {
    width: '31.5%',
    minHeight: 150,
    padding: 23,
    borderRadius: 16,
    backgroundColor: '#1A202C',
    borderWidth: 2,
    borderColor: '#252D3B',
  },

  categoryFocused: {
    borderColor: '#7ED6A5',
    backgroundColor: '#243228',
    transform: [{scale: 1.03}],
  },

  categoryCardIcon: {
    fontSize: 34,
    marginBottom: 13,
  },

  categoryCardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  categoryCardSubtitle: {
    color: '#8E9AAF',
    fontSize: 14,
    marginTop: 7,
  },

  footerHint: {
    color: '#657084',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 34,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2A3444',
    marginRight: 25,
  },

  focused: {
    borderColor: '#7ED6A5',
    backgroundColor: '#243228',
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  pageTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },

  pageSubtitle: {
    color: '#8E9AAF',
    fontSize: 19,
    marginBottom: 30,
  },

  lessonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  progressText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  progressPercent: {
    color: '#7DD3FC',
    fontSize: 22,
    fontWeight: '800',
  },

  progressBar: {
    height: 10,
    backgroundColor: '#2A303A',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 28,
  },

  learningProgressFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 5,
  },

  completedBadge: {
    color: '#86EFAC',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 6,
  },

  lessonCard: {
    width: '31.5%',
    minHeight: 285,
    padding: 24,
    borderRadius: 18,
    backgroundColor: '#1A202C',
    borderWidth: 2,
    borderColor: '#293244',
  },

  lessonFocused: {
    borderColor: '#7ED6A5',
    backgroundColor: '#243228',
    transform: [{scale: 1.025}],
  },

  lessonCompleted: {
    borderColor: '#4ADE80',
    backgroundColor: '#202D27',
  },

  lessonNumber: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#273248',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  lessonNumberText: {
    color: '#7ED6A5',
    fontSize: 16,
    fontWeight: '800',
  },

  lessonSubject: {
    color: '#7ED6A5',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.3,
  },

  lessonTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    marginTop: 8,
  },

  lessonDescription: {
    color: '#9AA5B7',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },

  openLesson: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 20,
  },

  lessonDetail: {
    paddingHorizontal: 80,
    paddingVertical: 42,
    paddingBottom: 70,
  },

  detailSubject: {
    color: '#7ED6A5',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 30,
  },

  detailTitle: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '800',
    marginTop: 10,
  },

  detailDescription: {
    color: '#AAB4C5',
    fontSize: 22,
    lineHeight: 32,
    maxWidth: 900,
    marginTop: 18,
  },

  whatYouLearn: {
    marginTop: 40,
    padding: 28,
    borderRadius: 18,
    backgroundColor: '#1A202C',
    borderWidth: 1,
    borderColor: '#293244',
    maxWidth: 1000,
  },

  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },

  pointNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#273248',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },

  pointNumberText: {
    color: '#7ED6A5',
    fontWeight: '800',
  },

  pointText: {
    flex: 1,
    color: '#D8DEE9',
    fontSize: 18,
    lineHeight: 27,
  },

  continueButton: {
    alignSelf: 'flex-start',
    marginTop: 30,
    paddingVertical: 17,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: '#273248',
    borderWidth: 2,
    borderColor: '#354158',
  },

  buttonFocused: {
    borderColor: '#7ED6A5',
    backgroundColor: '#314438',
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  categoryContainer: {
    flex: 1,
    padding: 70,
  },

  categoryIcon: {
    fontSize: 65,
    marginTop: 25,
  },

  comingSoon: {
    marginTop: 40,
    padding: 35,
    maxWidth: 800,
    borderRadius: 18,
    backgroundColor: '#1A202C',
    borderWidth: 1,
    borderColor: '#293244',
  },

  comingSoonTitle: {
    color: '#7ED6A5',
    fontSize: 22,
    fontWeight: '800',
  },

  comingSoonText: {
    color: '#9AA5B7',
    fontSize: 19,
    lineHeight: 28,
    marginTop: 12,
  },

  quizContainer: {
    paddingHorizontal: 100,
    paddingVertical: 55,
    paddingBottom: 70,
  },

  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  quizLabel: {
    color: '#7ED6A5',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  quizScore: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  questionCount: {
    color: '#8E9AAF',
    fontSize: 17,
    marginTop: 30,
  },

  progressTrack: {
    height: 8,
    backgroundColor: '#273248',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },

  progressFill: {
    height: 8,
    backgroundColor: '#7ED6A5',
  },

  question: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 45,
    fontWeight: '800',
    marginTop: 38,
    marginBottom: 28,
  },

  answers: {
    gap: 14,
  },

  answerButton: {
    minHeight: 65,
    borderRadius: 12,
    backgroundColor: '#1A202C',
    borderWidth: 2,
    borderColor: '#293244',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  answerLetter: {
    color: '#7ED6A5',
    fontSize: 19,
    fontWeight: '800',
    width: 40,
  },

  answerText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '600',
  },

  correctAnswer: {
    backgroundColor: '#21402E',
    borderColor: '#7ED6A5',
  },

  wrongAnswer: {
    backgroundColor: '#45252A',
    borderColor: '#D8757D',
  },

  nextButton: {
    alignSelf: 'flex-start',
    marginTop: 25,
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#273248',
    borderWidth: 2,
    borderColor: '#354158',
  },

  nextText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },

  resultLabel: {
    color: '#7ED6A5',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },

  resultTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '800',
    marginTop: 12,
  },

  resultScore: {
    color: '#7ED6A5',
    fontSize: 72,
    fontWeight: '900',
    marginTop: 12,
  },

  resultMessage: {
    color: '#AAB4C5',
    fontSize: 21,
    marginTop: 8,
  },

  resultButtons: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 35,
  },

  resultButton: {
    minWidth: 190,
    paddingVertical: 17,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: '#1A202C',
    borderWidth: 2,
    borderColor: '#293244',
    alignItems: 'center',
  },

  gkContainer: {
    flex: 1,
    paddingHorizontal: 70,
    paddingVertical: 42,
  },

  gkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 18,
  },

  gkEyebrow: {
    color: '#7DD3FC',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },

  gkTitle: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
  },

  gkCounter: {
    color: '#CBD5E1',
    fontSize: 22,
    fontWeight: '700',
  },

  gkProgressBar: {
    height: 9,
    backgroundColor: '#2A303A',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 24,
  },

  gkProgressFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 5,
  },

  gkQuestionCard: {
    backgroundColor: '#181D26',
    borderWidth: 1,
    borderColor: '#303846',
    borderRadius: 18,
    padding: 30,
    marginBottom: 18,
  },

  gkQuestion: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 42,
    marginBottom: 24,
  },

  gkOptions: {
    gap: 12,
  },

  gkOption: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222936',
    borderWidth: 2,
    borderColor: '#343D4B',
    borderRadius: 12,
    paddingHorizontal: 18,
  },

  gkOptionFocused: {
    borderColor: '#7DD3FC',
    backgroundColor: '#293847',
    transform: [{scale: 1.01}],
  },

  gkOptionCorrect: {
    borderColor: '#4ADE80',
    backgroundColor: '#20392C',
  },

  gkOptionWrong: {
    borderColor: '#F87171',
    backgroundColor: '#3B2428',
  },

  gkOptionLetter: {
    width: 38,
    color: '#7DD3FC',
    fontSize: 22,
    fontWeight: '900',
  },

  gkOptionText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '700',
  },

  gkOptionResult: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },

  gkFeedback: {
    backgroundColor: '#181D26',
    borderWidth: 1,
    borderColor: '#303846',
    borderRadius: 16,
    padding: 22,
  },

  gkFeedbackTitle: {
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 8,
  },

  gkCorrectText: {
    color: '#86EFAC',
  },

  gkWrongText: {
    color: '#FCA5A5',
  },

  gkCorrectAnswer: {
    color: '#FDE68A',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 7,
  },

  gkExplanation: {
    color: '#CBD5E1',
    fontSize: 19,
    lineHeight: 28,
    marginBottom: 16,
  },

  gkInstruction: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  gkButtonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 22,
  },

  gkButton: {
    minWidth: 220,
    minHeight: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 24,
  },

  gkButtonSecondary: {
    minWidth: 180,
    minHeight: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222936',
    borderWidth: 2,
    borderColor: '#343D4B',
    borderRadius: 12,
    paddingHorizontal: 24,
  },

  gkButtonFocused: {
    borderColor: '#FFFFFF',
    transform: [{scale: 1.03}],
  },

  gkButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },

  gkScoreCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181D26',
    borderWidth: 1,
    borderColor: '#303846',
    borderRadius: 20,
    paddingVertical: 42,
    paddingHorizontal: 50,
    marginTop: 25,
  },

  gkScoreLabel: {
    color: '#94A3B8',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },

  gkScoreValue: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '900',
    marginTop: 8,
  },

  gkPercentage: {
    color: '#7DD3FC',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },

  gkMessage: {
    color: '#CBD5E1',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
  },

  resultButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  subjectContainer: {
    flex: 1,
    paddingHorizontal: 70,
    paddingVertical: 42,
  },

  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 18,
  },

  subjectEyebrow: {
    color: '#7DD3FC',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },

  subjectTitle: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
  },

  subjectCounter: {
    color: '#CBD5E1',
    fontSize: 22,
    fontWeight: '700',
  },

  subjectProgressBar: {
    height: 9,
    backgroundColor: '#2A303A',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 24,
  },

  subjectProgressFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 5,
  },

  subjectQuestionCard: {
    backgroundColor: '#181D26',
    borderWidth: 1,
    borderColor: '#303846',
    borderRadius: 18,
    padding: 30,
    marginBottom: 18,
  },

  subjectQuestion: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 42,
    marginBottom: 24,
  },

  subjectOptions: {
    gap: 12,
  },

  subjectOption: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222936',
    borderWidth: 2,
    borderColor: '#343D4B',
    borderRadius: 12,
    paddingHorizontal: 18,
  },

  subjectOptionFocused: {
    borderColor: '#7DD3FC',
    backgroundColor: '#293847',
    transform: [{scale: 1.01}],
  },

  subjectOptionCorrect: {
    borderColor: '#4ADE80',
    backgroundColor: '#20392C',
  },

  subjectOptionWrong: {
    borderColor: '#F87171',
    backgroundColor: '#3B2428',
  },

  subjectOptionLetter: {
    width: 38,
    color: '#7DD3FC',
    fontSize: 22,
    fontWeight: '900',
  },

  subjectOptionText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '700',
  },

  subjectOptionResult: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },

  subjectFeedback: {
    backgroundColor: '#181D26',
    borderWidth: 1,
    borderColor: '#303846',
    borderRadius: 16,
    padding: 22,
  },

  subjectFeedbackTitle: {
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 8,
  },

  subjectCorrectText: {
    color: '#86EFAC',
  },

  subjectWrongText: {
    color: '#FCA5A5',
  },

  subjectCorrectAnswer: {
    color: '#FDE68A',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 7,
  },

  subjectExplanation: {
    color: '#CBD5E1',
    fontSize: 19,
    lineHeight: 28,
    marginBottom: 16,
  },

  subjectInstruction: {
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },

  subjectButtonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 22,
  },

  subjectButton: {
    minWidth: 220,
    minHeight: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 24,
  },

  subjectButtonSecondary: {
    minWidth: 180,
    minHeight: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222936',
    borderWidth: 2,
    borderColor: '#343D4B',
    borderRadius: 12,
    paddingHorizontal: 24,
  },

  subjectButtonFocused: {
    borderColor: '#FFFFFF',
    transform: [{scale: 1.03}],
  },

  subjectButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },

  subjectScoreCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181D26',
    borderWidth: 1,
    borderColor: '#303846',
    borderRadius: 20,
    paddingVertical: 42,
    paddingHorizontal: 50,
    marginTop: 25,
  },

  subjectScoreLabel: {
    color: '#94A3B8',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },

  subjectScoreValue: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '900',
    marginTop: 8,
  },

  subjectPercentage: {
    color: '#7DD3FC',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },

  subjectMessage: {
    color: '#CBD5E1',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
  },


  dailyContainer: {
    flexGrow: 1,
    padding: 40,
    justifyContent: 'center',
  },

  dailyTitle: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 12,
  },

  dailyProgress: {
    fontSize: 22,
    opacity: 0.7,
    marginBottom: 28,
  },

  dailyQuestion: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 44,
    marginBottom: 28,
  },

  dailyResultTitle: {
    fontSize: 34,
    fontWeight: '800',
    marginTop: 20,
  },

  dailyScore: {
    fontSize: 64,
    fontWeight: '900',
    marginTop: 24,
  },

  dailyPercentage: {
    fontSize: 36,
    fontWeight: '800',
    marginTop: 8,
  },

  dailyResultText: {
    fontSize: 22,
    lineHeight: 32,
    marginTop: 20,
  },

  explanationBox: {
    marginTop: 22,
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
  },

  explanationTitle: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },

  explanationText: {
    fontSize: 21,
    lineHeight: 30,
  },

  answerSelected: {
    borderWidth: 3,
  },

  answerCorrect: {
    borderWidth: 4,
  },

  primaryButton: {
    marginTop: 26,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
  },

  primaryButtonText: {
    fontSize: 22,
    fontWeight: '800',
  },

  secondaryButton: {
    marginTop: 14,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },

  secondaryButtonText: {
    fontSize: 20,
    fontWeight: '700',
  },

});
