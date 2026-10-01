export interface Faq { category: string; q: string; a: string; }

export const faqData: Faq[] = [
  { category: 'Starting out',   q: 'How do I know which class is right for me?', a: 'Take our short placement test or send us a message. We look at your level, your schedule, and what you actually want to do with the language.' },
  { category: 'Practicalities', q: 'Can I try a class before I commit?',         a: 'Yes. We can arrange a friendly first conversation with the teacher so you can feel the pace and meet the group.' },
  { category: 'Practicalities', q: 'What languages do you teach?',               a: 'We teach English, French, and Spanish, in small groups for school-age learners and adults.' },
  { category: 'Progress',       q: 'How often should I come?',                    a: 'Most learners come once a week. Exam groups and intensive goals can add a second session when it is useful.' },
  { category: 'Parents',        q: 'How do school parallel groups work?',        a: 'Groups follow the school year and support the curriculum, while building the speaking confidence that worksheets cannot provide.' },
  { category: 'Adults',         q: 'Do you have evening lessons?',               a: 'Our adult studio runs in the evening, with practical English, French, and Spanish groups around real working schedules.' },
  { category: 'Levels',         q: 'What does CEFR mean?',                       a: 'The Common European Framework is a shared map from A1 beginner to C2 mastery. It helps us talk clearly about your next step.' },
  { category: 'Contact',        q: 'Where are you located?',                     a: 'We are at 28 Ippokratous, Athens, a short walk from Panepistimio. Online sessions are also available.' },
];
