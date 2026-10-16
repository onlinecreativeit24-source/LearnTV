// LearnTV layout patch: phone + TV responsive layout
// Usage (inside ~/LearnTVExpo):  node patch-app.js
const fs = require('fs');

const FILE = 'App.tsx';
const BACKUP = 'App.tsx.before-layout';

if (!fs.existsSync(FILE)) {
  console.log('ERROR: App.tsx not found. Run this inside ~/LearnTVExpo');
  process.exit(1);
}

let src = fs.readFileSync(FILE, 'utf8');

if (src.includes('function buildStyles')) {
  console.log('Already patched. Nothing to do.');
  process.exit(0);
}

fs.writeFileSync(BACKUP, src);
console.log('Backup saved: ' + BACKUP);

function fail(msg) {
  console.log('ERROR: ' + msg);
  console.log('Nothing was changed (backup is ' + BACKUP + ').');
  process.exit(1);
}

function replaceOnce(find, repl, label) {
  const first = src.indexOf(find);
  if (first < 0) fail('could not find: ' + label);
  if (src.indexOf(find, first + 1) >= 0) fail('found more than once: ' + label);
  src = src.replace(find, () => repl);
  console.log('OK  ' + label);
}

// 0) undo the old "s()" scaling if it is present
if (/^import \{ s \} from '\.\/src\/scale';/m.test(src)) {
  src = src.replace(/^import \{ s \} from '\.\/src\/scale';\r?\n/m, '');
  src = src.replace(/: s\((\d+)\)/g, ': $1');
  console.log('OK  removed old s() scaling');
}

// 1) react import: add useMemo
if (!/import React,\s*\{[^}]*\buseMemo\b/.test(src)) {
  const re = /import React,\s*\{\s*useState\s*\}\s*from 'react';/;
  if (!re.test(src)) fail('react import line not recognised');
  src = src.replace(re, "import React, {useMemo, useState} from 'react';");
  console.log('OK  react import');
}

// 2) react-native import: add Platform, StatusBar, useWindowDimensions
{
  const re = /import \{([^}]*)\} from 'react-native';/;
  const m = src.match(re);
  if (!m) fail('react-native import not found');
  let names = m[1]
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  ['Platform', 'StatusBar', 'useWindowDimensions'].forEach(n => {
    if (!names.includes(n)) names.push(n);
  });
  src = src.replace(re, () => 'import {\n  ' + names.join(',\n  ') + ',\n} from \'react-native\';');
  console.log('OK  react-native import');
}

// 3) responsive styles inside App()
replaceOnce(
  'export default function App() {',
  'export default function App() {\n' +
    '  const {width: winWidth, height: winHeight} = useWindowDimensions();\n' +
    '  const styles = useMemo(\n' +
    '    () => buildStyles(baseStyles, winWidth, winHeight),\n' +
    '    [winWidth, winHeight],\n' +
    '  );\n',
  'App() responsive styles',
);

// 4) original stylesheet becomes baseStyles
replaceOnce(
  'const styles = StyleSheet.create({',
  'const baseStyles = StyleSheet.create({',
  'rename stylesheet to baseStyles',
);

// 5) SafeAreaView -> Screen (scrolls on phones)
{
  const open = (src.match(/<SafeAreaView/g) || []).length;
  const close = (src.match(/<\/SafeAreaView>/g) || []).length;
  if (open === 0 || open !== close) fail('SafeAreaView tags do not match');
  src = src.replace(/<SafeAreaView/g, '<Screen').replace(/<\/SafeAreaView>/g, '</Screen>');
  console.log('OK  ' + open + ' screens switched to <Screen>');
}

// 6) append helpers
src += `

/* ===== LAYOUT PATCH: responsive phone + TV ===== */

function isPhoneSize(width: number, height: number): boolean {
  return !Platform.isTV && Math.min(width, height) < 480;
}

function Screen({style, children}: {style?: any; children?: React.ReactNode}) {
  const {width, height} = useWindowDimensions();

  if (!isPhoneSize(width, height)) {
    return <SafeAreaView style={style}>{children}</SafeAreaView>;
  }

  return (
    <SafeAreaView style={style}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const dailyColors: Record<string, any> = {
  dailyTitle: {color: '#FFFFFF'},
  dailyProgress: {color: '#8E9AAF'},
  dailyQuestion: {color: '#FFFFFF'},
  dailyResultTitle: {color: '#FFFFFF'},
  dailyScore: {color: '#7ED6A5'},
  dailyPercentage: {color: '#7DD3FC'},
  dailyResultText: {color: '#CBD5E1'},
  explanationBox: {backgroundColor: '#181D26', borderColor: '#303846'},
  explanationTitle: {color: '#FFFFFF'},
  explanationText: {color: '#CBD5E1'},
  answerSelected: {borderColor: '#7DD3FC'},
  answerCorrect: {borderColor: '#4ADE80', backgroundColor: '#20392C'},
  primaryButton: {backgroundColor: '#2563EB', borderColor: '#2563EB'},
  primaryButtonText: {color: '#FFFFFF'},
  secondaryButton: {backgroundColor: '#222936', borderColor: '#343D4B'},
  secondaryButtonText: {color: '#FFFFFF'},
};

const phoneOverrides: Record<string, any> = {
  container: {paddingBottom: 28},
  scrollContent: {paddingHorizontal: 18, paddingVertical: 14},
  homeContent: {paddingHorizontal: 18, paddingVertical: 14, paddingBottom: 24},
  lessonDetail: {paddingHorizontal: 18, paddingVertical: 14, paddingBottom: 24},
  quizContainer: {paddingHorizontal: 18, paddingVertical: 14, paddingBottom: 24},
  gkContainer: {paddingHorizontal: 18, paddingVertical: 14},
  subjectContainer: {paddingHorizontal: 18, paddingVertical: 14},
  categoryContainer: {padding: 18},
  resultContainer: {padding: 20},
  dailyContainer: {padding: 18, justifyContent: 'flex-start'},

  brandRow: {flexDirection: 'column'},
  logo: {fontSize: 38},
  familyLabel: {marginTop: 8, fontSize: 12},
  hero: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 0,
    padding: 20,
    marginTop: 18,
    marginBottom: 22,
  },
  heroTitle: {fontSize: 30, lineHeight: 38},
  heroDescription: {maxWidth: '100%', fontSize: 15, lineHeight: 22},
  quizBadge: {display: 'none'},

  categoryCard: {width: '48%', minHeight: 118, padding: 14},
  categoryCardIcon: {fontSize: 28, marginBottom: 8},
  categoryCardTitle: {fontSize: 15},
  categoryCardSubtitle: {fontSize: 12},

  footerHint: {display: 'none'},
  gkInstruction: {display: 'none'},
  subjectInstruction: {display: 'none'},

  topBar: {flexDirection: 'column', alignItems: 'flex-start'},
  backButton: {
    alignSelf: 'flex-start',
    marginRight: 0,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  pageTitle: {fontSize: 28},
  pageSubtitle: {fontSize: 15, marginBottom: 18},
  lessonGrid: {gap: 12},
  lessonCard: {width: '100%', minHeight: 0, padding: 18},
  lessonTitle: {fontSize: 21},
  lessonDescription: {fontSize: 15, lineHeight: 21},

  detailTitle: {fontSize: 32},
  detailDescription: {fontSize: 16, lineHeight: 24},
  whatYouLearn: {padding: 18, marginTop: 24},
  pointText: {fontSize: 15, lineHeight: 22},

  question: {fontSize: 22, lineHeight: 30, marginTop: 24, marginBottom: 18},

  gkHeader: {flexDirection: 'column', alignItems: 'flex-start'},
  subjectHeader: {flexDirection: 'column', alignItems: 'flex-start'},
  gkTitle: {fontSize: 24},
  subjectTitle: {fontSize: 24},
  gkCounter: {fontSize: 14, marginTop: 6},
  subjectCounter: {fontSize: 14, marginTop: 6},
  gkQuestionCard: {padding: 16},
  subjectQuestionCard: {padding: 16},
  gkQuestion: {fontSize: 20, lineHeight: 28, marginBottom: 16},
  subjectQuestion: {fontSize: 20, lineHeight: 28, marginBottom: 16},
};

const SPACE_KEYS = [
  'padding',
  'paddingHorizontal',
  'paddingVertical',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'gap',
];

const SIZE_KEYS = [
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'borderRadius',
];

function buildStyles(
  base: typeof baseStyles,
  width: number,
  height: number,
): typeof baseStyles {
  const phone = isPhoneSize(width, height);
  const topInset = StatusBar.currentHeight || 0;
  const merged: Record<string, any> = {};

  Object.keys(base).forEach(name => {
    merged[name] = {
      ...(base as Record<string, any>)[name],
      ...(dailyColors[name] || {}),
    };
  });

  if (!phone) {
    merged.container = {...merged.container, paddingTop: topInset};
    return StyleSheet.create(merged as any) as unknown as typeof baseStyles;
  }

  const out: Record<string, any> = {};

  Object.keys(merged).forEach(name => {
    const src = merged[name];
    const dst: Record<string, any> = {};

    Object.keys(src).forEach(key => {
      const value = src[key];

      if (typeof value !== 'number') {
        dst[key] = value;
      } else if (key === 'fontSize') {
        dst[key] = Math.max(12, Math.round(value * 0.7));
      } else if (key === 'lineHeight') {
        dst[key] = Math.round(value * 0.7);
      } else if (SPACE_KEYS.indexOf(key) >= 0) {
        dst[key] = Math.round(value * 0.5);
      } else if (SIZE_KEYS.indexOf(key) >= 0) {
        dst[key] = value <= 12 ? value : Math.round(value * 0.7);
      } else {
        dst[key] = value;
      }
    });

    if (typeof src.fontSize === 'number' && typeof src.lineHeight === 'number') {
      dst.lineHeight = Math.round(dst.fontSize * (src.lineHeight / src.fontSize));
    }

    out[name] = {...dst, ...(phoneOverrides[name] || {})};
  });

  out.container = {...out.container, paddingTop: topInset + 6};

  return StyleSheet.create(out as any) as unknown as typeof baseStyles;
}
`;

fs.writeFileSync(FILE, src);
console.log('');
console.log('DONE. Now run:  npx tsc --noEmit');
console.log('To undo:        cp ' + BACKUP + ' App.tsx');
