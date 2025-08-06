'use client';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';
import type { AttributeName, Vantagem, Complicacao, Armamento, Armadura, Poder, Item } from '@/lib/savage-worlds-data';

// Types
export interface Skill {
  id: string;
  name: string;
  points: number;
  attribute: AttributeName;
}

export interface Character {
  name: string;
  player: string;
  mutationType: string;
  stage: number;
  experience: number;
  attributes: Record<AttributeName, number>;
  skills: Skill[];
  vantagens: Vantagem[];
  complicacoes: Complicacao[];
  armamentos: Armamento[];
  armaduras: Armadura[];
  poderes: Poder[];
  inventario: Item[];
  wounds: {
    wound1: number;
    wound2: number;
    wound3: number;
  };
  fatigue: {
    fatigue1: number;
    fatigue2: number;
  };
}

// Context Type
interface CharacterSheetContextType {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character>>;
  updateField: <K extends keyof Character>(field: K, value: Character[K]) => void;
  updateAttribute: (attribute: AttributeName, value: number) => void;
  addSkill: () => void;
  updateSkill: (index: number, updatedSkill: Partial<Skill>) => void;
  removeSkill: (index: number) => void;
}

// Initial State
const initialState: Character = {
  name: '',
  player: '',
  mutationType: '',
  stage: 0,
  experience: 0,
  attributes: {
    Agilidade: 0,
    Esperteza: 0,
    Espírito: 0,
    Força: 0,
    Vigor: 0,
  },
  skills: [
    { id: 'luta', name: 'Luta', points: 0, attribute: 'Agilidade' },
    { id: 'mutacao', name: 'Mutação', points: 0, attribute: 'Espírito' },
  ],
  vantagens: [],
  complicacoes: [],
  armamentos: [],
  armaduras: [],
  poderes: [],
  inventario: [],
  wounds: { wound1: 0, wound2: 0, wound3: 0 },
  fatigue: { fatigue1: 0, fatigue2: 0 },
};

// Create Context
const CharacterSheetContext = createContext<CharacterSheetContextType | undefined>(undefined);

// Provider Component
export function CharacterSheetProvider({ children }: { children: ReactNode }) {
  const [character, setCharacter] = useState<Character>(initialState);

  const updateField = <K extends keyof Character>(field: K, value: Character[K]) => {
    setCharacter((prev) => ({ ...prev, [field]: value }));
  };

  const updateAttribute = (attribute: AttributeName, value: number) => {
    setCharacter((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [attribute]: Math.max(0, value) },
    }));
  };

  const addSkill = () => {
    setCharacter((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: crypto.randomUUID(), name: '', points: 0, attribute: 'Agilidade' }],
    }));
  };

  const updateSkill = (index: number, updatedSkill: Partial<Skill>) => {
    setCharacter((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], ...updatedSkill };
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkill = (index: number) => {
    setCharacter((prev) => {
      // Make sure we are not removing the first two skills
      if (index > 1) {
        const newSkills = prev.skills.filter((_, i) => i !== index);
        return { ...prev, skills: newSkills };
      }
      return prev;
    });
  };
  
  const value = {
    character,
    setCharacter,
    updateField,
    updateAttribute,
    addSkill,
    updateSkill,
    removeSkill,
  };

  return <CharacterSheetContext.Provider value={value}>{children}</CharacterSheetContext.Provider>;
}

// Hook to use context
export function useCharacterSheet() {
  const context = useContext(CharacterSheetContext);
  if (context === undefined) {
    throw new Error('useCharacterSheet must be used within a CharacterSheetProvider');
  }
  return context;
}
