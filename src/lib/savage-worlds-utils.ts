import type { AttributeName, Skill } from './savage-worlds-data';
import type { Character } from '@/context/CharacterSheetContext';

export const getDiceFromPoints = (points: number): string => {
  if (points < 0) points = 0;
  if (points <= 4) {
    const diceValue = 4 + points * 2;
    return `1d${diceValue}`;
  } else {
    const modifier = (points - 4) * 2;
    return `1d12+${modifier}`;
  }
};

export const getNumericValueFromDice = (dice: string): number => {
  const match = dice.match(/1d(\d+)(?:\+(\d+))?/);
  if (!match) return 0;
  const base = parseInt(match[1], 10);
  const modifier = match[2] ? parseInt(match[2], 10) : 0;
  return base + modifier;
};

export const getSkillDice = (skill: Skill, attributes: Character['attributes']): string => {
    const attrPoints = attributes[skill.attribute];
    const attrDiceValue = getNumericValueFromDice(getDiceFromPoints(attrPoints));
    
    const skillSteps = Math.floor(skill.points / 2);
    let finalDiceValue = attrDiceValue;

    for (let i = 0; i < skillSteps; i++) {
        if (finalDiceValue < 12) {
            finalDiceValue += 2;
        }
    }
    
    let diceString = `1d${Math.min(finalDiceValue, 12)}`;
    
    if (finalDiceValue > 12) {
        const modifier = finalDiceValue - 12;
        diceString += `+${modifier}`;
    } else if (skillSteps > 0 && finalDiceValue === 12) {
        const remainingPoints = skill.points - ((12-attrDiceValue)/2) * 2;
        if (remainingPoints > 0) {
            const modifier = Math.floor(remainingPoints / 2) * 1; // Savage Worlds Adventurer's Edition rule is +1 per 2 points after d12
            if(modifier > 0) diceString += `+${modifier}`;
        }
    }


    const originalModifierMatch = getDiceFromPoints(attrPoints).match(/\+(\d+)/);
    if(originalModifierMatch) {
        const originalModifier = parseInt(originalModifierMatch[1], 10);
        const currentModifierMatch = diceString.match(/\+(\d+)/);
        const currentModifier = currentModifierMatch ? parseInt(currentModifierMatch[1], 10) : 0;
        const totalModifier = originalModifier + currentModifier;

        if (diceString.includes('+')) {
            diceString = diceString.replace(/\+\d+/, `+${totalModifier}`);
        } else {
            diceString += `+${totalModifier}`;
        }
    }


    return diceString;
};

export const rollDice = (dice: string): string => {
  const match = dice.match(/(\d+)d(\d+)(?:([+-])(\d+))?/);
  if (!match) return "Rolagem Inválida";

  const numDice = parseInt(match[1], 10);
  const diceValue = parseInt(match[2], 10);
  const operator = match[3];
  const modifier = match[4] ? parseInt(match[4], 10) : 0;

  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += Math.floor(Math.random() * diceValue) + 1;
  }

  if (operator === '+') total += modifier;
  if (operator === '-') total -= modifier;

  return `Resultado: ${total}`;
};
