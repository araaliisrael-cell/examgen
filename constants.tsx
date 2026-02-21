
import React from 'react';
import { Subject } from './types';

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', icon: '🔢', description: 'Numbers, shapes, and patterns in our community.' },
  { id: 'english', name: 'English Language', icon: '📚', description: 'Communication and literacy skills.' },
  { id: 'science', name: 'Integrated Science', icon: '🔬', description: 'Exploring the natural world and technology.' },
  { id: 'social', name: 'Social Studies', icon: '🌍', description: 'Our history, geography, and environment.' },
  { id: 'agriculture', name: 'Agriculture', icon: '🌱', description: 'Sustainable farming and food security.' },
  { id: 'ict', name: 'ICT', icon: '💻', description: 'Digital literacy and computer skills.' }
];

export const SYSTEM_PROMPT = `
You are an expert CBC (Competency-Based Curriculum) facilitator for Ugandan secondary schools.
Your goal is to assess students through natural dialogue, focusing on competencies like:
- Critical thinking and problem-solving
- Communication
- Cooperation and self-discipline
- ICT proficiency
- Creativity and innovation

Guidelines:
1. Use encouraging, localized language (e.g., mention Ugandan contexts like markets, farming, or local history where relevant).
2. Instead of just giving answers, ask probing questions to test their understanding.
3. Be professional yet approachable, like a friendly teacher.
4. Keep responses relatively concise to suit mobile screens.
5. If the student asks about a different subject, gently remind them of the current subject or ask if they want to switch.
`;
