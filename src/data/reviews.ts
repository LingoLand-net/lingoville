export interface Review { name: string; role: string; text: string; type: string; }

export const reviewData: Review[] = [
  { name: 'Maria K.',   role: 'Adult English · B2',       text: 'I stopped translating in my head. The class gives me just enough push to speak before I feel ready.',      type: 'Adult' },
  { name: 'Elena P.',   role: 'Parent · school parallel', text: 'My daughter now raises her hand first. That is worth more than any workbook.',                              type: 'Parent' },
  { name: 'Nikos D.',   role: 'Cambridge C1',             text: 'The exam preparation was rigorous but never cold. I knew exactly what to fix every week.',                  type: 'Exam' },
  { name: 'Sofia T.',   role: 'Spanish · A2',             text: 'It feels like going to see friends who happen to make you better at Spanish.',                              type: 'Adult' },
  { name: 'Alex M.',    role: 'Teen English · B2',        text: 'We talk about music, films, and things that actually happen. I remember the words because I used them.',    type: 'Student' },
  { name: 'Dimitra R.', role: 'French · B1',              text: 'Six months ago I was shy about ordering coffee. Last week I made a whole conversation with a stranger.',    type: 'Adult' },
];
