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
    const attrDice = getDiceFromPoints(attrPoints);
    const attrValue = getNumericValueFromDice(attrDice);
    const attrDiceValOnly = parseInt(attrDice.match(/1d(\d+)/)![1], 10);

    let currentDice = 4;
    let pointsSpent = 0;
    let pointsAvailable = skill.points;

    while (pointsAvailable > 0) {
        const cost = currentDice >= attrDiceValOnly ? 2 : 1;
        if (pointsAvailable >= cost) {
            currentDice += 2;
            pointsAvailable -= cost;
            pointsSpent += cost;
        } else {
            break;
        }
    }
    
    let diceString;
    if (currentDice <= 12) {
        diceString = `1d${currentDice}`;
    } else {
        const modifier = currentDice - 12;
        diceString = `1d12+${modifier}`;
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
