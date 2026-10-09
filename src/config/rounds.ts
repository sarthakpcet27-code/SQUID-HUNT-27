/**
 * Round Configuration
 * 
 * This file contains the configuration for all three challenge rounds.
 * Organizers can update mechanics, instructions, and content here.
 * 
 * IMPORTANT: Rounds 1 and 2 mechanics are placeholders.
 * Replace with actual challenge logic when finalized.
 */

export interface RoundConfig {
  id: number;
  name: string;
  path: string;
  symbol: 'circle' | 'triangle' | 'square';
  color: string;
  glowColor: string;
  backgroundColor: string;
  tagline: string;
  description: string;
  instructions: string[];
  // Placeholder for future mechanics
  mechanicsType?: 'pending' | 'interactive' | 'server-validated';
  // For Round 3: Will use Supabase for validation
  usesServerValidation?: boolean;
}

export const ROUNDS: RoundConfig[] = [
  {
    id: 1,
    name: 'The First Trial',
    path: '/round/1',
    symbol: 'circle',
    color: '#FF007F',
    glowColor: 'rgba(255, 0, 127, 0.4)',
    backgroundColor: '#060606',
    tagline: 'Precision under pressure',
    description: 'The elimination begins with observation and timing. Every detail matters. Every second counts.',
    instructions: [
      'Wait for the challenge to be revealed',
      'Follow the rules exactly as presented',
      'One mistake ends your run',
      'Complete within the time limit',
    ],
    mechanicsType: 'pending',
    usesServerValidation: false,
  },
  {
    id: 2,
    name: 'Red Light, Green Light',
    path: '/round/2',
    symbol: 'triangle',
    color: '#E60000',
    glowColor: 'rgba(230, 0, 0, 0.4)',
    backgroundColor: '#080404',
    tagline: 'Move or freeze',
    description: 'The classic test of discipline. Move when allowed. Stop when commanded. Hesitation is safe. Movement at the wrong time is fatal.',
    instructions: [
      'Wait for instructions to be announced',
      'React to signals with perfect timing',
      'Maintain absolute stillness when required',
      'Advance only when permitted',
    ],
    mechanicsType: 'pending',
    usesServerValidation: false,
  },
  {
    id: 3,
    name: 'The Ultimate Squid Challenge',
    path: '/round/3',
    symbol: 'square',
    color: '#FF007F',
    glowColor: 'rgba(255, 0, 127, 0.4)',
    backgroundColor: '#070707',
    tagline: 'Final question. Final answer.',
    description: 'Five accepted answers. One submission. The database holds the truth. Only precision survives.',
    instructions: [
      'Read the final challenge question carefully',
      'You have one submission attempt',
      'Answer validation happens server-side',
      'Five possible correct answers exist',
      'Case and spacing will be normalized',
    ],
    mechanicsType: 'server-validated',
    usesServerValidation: true,
  },
];

export function getRoundById(id: number): RoundConfig | undefined {
  return ROUNDS.find((round) => round.id === id);
}

export function getRoundByPath(path: string): RoundConfig | undefined {
  return ROUNDS.find((round) => round.path === path);
}
