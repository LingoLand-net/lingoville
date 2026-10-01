export interface Level { code: string; name: string; desc: string; width: string; }

export const levels: Level[] = [
  { code: 'A1', name: 'Beginner',           desc: 'You can introduce yourself, ask simple questions, and make it through a first conversation.',          width: '17%' },
  { code: 'A2', name: 'Elementary',         desc: 'You can handle familiar situations and talk about the things that make up your everyday life.',         width: '32%' },
  { code: 'B1', name: 'Intermediate',       desc: 'You can travel, tell stories, and explain what you think — even when the words take a moment.',         width: '50%' },
  { code: 'B2', name: 'Upper intermediate', desc: 'You can hold your own in most rooms, understand the main ideas, and express a clear point of view.',     width: '67%' },
  { code: 'C1', name: 'Advanced',           desc: 'You can move comfortably between contexts, use nuance, and make the language sound like yours.',        width: '84%' },
  { code: 'C2', name: 'Mastery',            desc: 'You can understand almost everything and make precise, elegant choices in your own voice.',             width: '100%' },
];
