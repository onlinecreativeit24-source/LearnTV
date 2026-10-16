import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../config/firebase';

export type LearnTVContent = {
  id: string;
  category: string;
  title: string;
  description: string;
  points: string[];
  language: string;
  published: boolean;
};

export async function getCategoryContent(
  category: string,
): Promise<LearnTVContent[]> {
  const contentQuery = query(
    collection(db, 'content'),
    where('category', '==', category),
    where('published', '==', true),
  );

  const snapshot = await getDocs(contentQuery);

  return snapshot.docs.map(document => ({
    id: document.id,
    ...(document.data() as Omit<LearnTVContent, 'id'>),
  }));
}
