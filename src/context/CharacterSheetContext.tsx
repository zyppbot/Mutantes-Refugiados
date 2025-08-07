'use client';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { AttributeName, Vantagem, Complicacao, Armamento, Armadura, Poder, Item } from '@/lib/savage-worlds-data';

// Types
export interface Skill {
  id: string;
  name: string;
  points: number;
  attribute: AttributeName;
}

export interface MutationDisadvantage {
  id: string;
  powerId: string;
  description: string;
}

export interface MutationEnhancement {
  id: string;
  powerId: string;
  description: string;
}

export interface Character {
  name: string;
  player: string;
  mutationType: string;
  stage: number;
  experience: number;
  money: number;
  attributes: Record<AttributeName, number>;
  skills: Skill[];
  vantagens: Vantagem[];
  complicacoes: Complicacao[];
  mutationDisadvantages: MutationDisadvantage[];
  mutationEnhancements: MutationEnhancement[];
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
  addMutationDisadvantage: () => void;
  updateMutationDisadvantage: (index: number, updatedDisadvantage: Partial<MutationDisadvantage>) => void;
  removeMutationDisadvantage: (id: string) => void;
  addMutationEnhancement: () => void;
  updateMutationEnhancement: (index: number, updatedEnhancement: Partial<MutationEnhancement>) => void;
  removeMutationEnhancement: (id: string) => void;
  addItem: (item: Omit<Item, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updatedItem: Partial<Omit<Item, 'id'>>) => void;
  addEquipment: (item: Armamento | Armadura, type: 'armamentos' | 'armaduras') => void;
  removeEquipment: (item: Armamento | Armadura, type: 'armamentos' | 'armaduras') => void;
  updatePower: (id: string, updatedPower: Partial<Poder>) => void;
}

// Initial State
const initialState: Character = {
  name: '',
  player: '',
  mutationType: '',
  stage: 0,
  experience: 0,
  money: 500,
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
  mutationDisadvantages: [],
  mutationEnhancements: [],
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

  const addMutationDisadvantage = () => {
    setCharacter((prev) => ({
        ...prev,
        mutationDisadvantages: [
            ...prev.mutationDisadvantages,
            { id: crypto.randomUUID(), powerId: '', description: '' },
        ],
    }));
  };

  const updateMutationDisadvantage = (index: number, updatedDisadvantage: Partial<MutationDisadvantage>) => {
      setCharacter((prev) => {
          const newDisadvantages = [...prev.mutationDisadvantages];
          newDisadvantages[index] = { ...newDisadvantages[index], ...updatedDisadvantage };
          return { ...prev, mutationDisadvantages: newDisadvantages };
      });
  };

  const removeMutationDisadvantage = (id: string) => {
      setCharacter((prev) => ({
          ...prev,
          mutationDisadvantages: prev.mutationDisadvantages.filter((d) => d.id !== id),
      }));
  };

  const addMutationEnhancement = () => {
    setCharacter((prev) => ({
        ...prev,
        mutationEnhancements: [
            ...prev.mutationEnhancements,
            { id: crypto.randomUUID(), powerId: '', description: '' },
        ],
    }));
  };

  const updateMutationEnhancement = (index: number, updatedEnhancement: Partial<MutationEnhancement>) => {
      setCharacter((prev) => {
          const newEnhancements = [...prev.mutationEnhancements];
          newEnhancements[index] = { ...newEnhancements[index], ...updatedEnhancement };
          return { ...prev, mutationEnhancements: newEnhancements };
      });
  };

  const removeMutationEnhancement = (id: string) => {
      setCharacter((prev) => ({
          ...prev,
          mutationEnhancements: prev.mutationEnhancements.filter((e) => e.id !== id),
      }));
  };
  
    const addItem = (item: Omit<Item, 'id'>) => {
    setCharacter((prev) => ({
      ...prev,
      inventario: [...prev.inventario, { ...item, id: crypto.randomUUID() }],
      money: prev.money - item.cost,
    }));
  };

  const removeItem = (id: string) => {
    setCharacter((prev) => {
      const itemToRemove = prev.inventario.find((i) => i.id === id);
      if (itemToRemove) {
        return {
          ...prev,
          inventario: prev.inventario.filter((i) => i.id !== id),
          money: prev.money + itemToRemove.cost,
        };
      }
      return prev;
    });
  };

  const updateItem = (id: string, updatedItem: Partial<Omit<Item, 'id'>>) => {
    setCharacter((prev) => {
      const originalItem = prev.inventario.find((item) => item.id === id);
      if (!originalItem) return prev;
      
      const costDifference = (updatedItem.cost ?? originalItem.cost) - originalItem.cost;

      return {
        ...prev,
        money: prev.money - costDifference,
        inventario: prev.inventario.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        ),
      };
    });
  };


  const addEquipment = (item: Armamento | Armadura, type: 'armamentos' | 'armaduras') => {
    setCharacter((prev) => {
        const cost = typeof item.cost === 'string' ? parseFloat(item.cost) : item.cost;
        return {
            ...prev,
            [type]: [...prev[type], item],
            money: prev.money - cost,
        };
    });
  };

  const removeEquipment = (item: Armamento | Armadura, type: 'armamentos' | 'armaduras') => {
    setCharacter((prev) => {
        const list = prev[type];
        const indexToRemove = list.findIndex((i: any) => i.name === item.name);

        if (indexToRemove > -1) {
            const newList = [...list];
            newList.splice(indexToRemove, 1);
            const cost = typeof item.cost === 'string' ? parseFloat(item.cost) : item.cost;

            return {
                ...prev,
                [type]: newList,
                money: prev.money + cost,
            };
        }
        return prev;
    });
  };

  const updatePower = (id: string, updatedPower: Partial<Poder>) => {
    setCharacter((prev) => ({
      ...prev,
      poderes: prev.poderes.map((power) =>
        power.id === id ? { ...power, ...updatedPower } : power
      ),
    }));
  };


  const value = {
    character,
    setCharacter,
    updateField,
    updateAttribute,
    addSkill,
    updateSkill,
    removeSkill,
    addMutationDisadvantage,
    updateMutationDisadvantage,
    removeMutationDisadvantage,
    addMutationEnhancement,
    updateMutationEnhancement,
    removeMutationEnhancement,
    addItem,
    removeItem,
    updateItem,
    addEquipment,
    removeEquipment,
    updatePower,
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
