'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { getNumericValueFromDice, getSkillDice, getDiceFromPoints } from '@/lib/savage-worlds-utils';

export default function DerivedStatsSection() {
  const { character } = useCharacterSheet();

  // Base values
  let movement = 6;
  let toughnessBonus = 0;
  let parryBonus = 0;

  // Check for advantages that modify derived stats
  if (character.vantagens.some(v => v.name === 'Rápido')) {
    movement += 2;
  }
  if (character.vantagens.some(v => v.name === 'Bloquear Aprimorado')) {
    parryBonus += 1;
  }
  if (character.vantagens.some(v => v.name === 'Duro de Matar')) {
    toughnessBonus += 1;
  }
  
  // Check for hindrances that modify derived stats
  if (character.complicacoes.some(c => c.name === 'Manco')) {
    movement -= 2;
  }
  
  // Aparar
  const lutaSkill = character.skills.find(s => s.name === 'Luta');
  const baseParry = lutaSkill ? Math.floor(getNumericValueFromDice(getSkillDice(lutaSkill, character.attributes)) / 2) + 2 : 2;
  const totalParry = baseParry + parryBonus;
  
  // Resistência
  const vigorDice = getDiceFromPoints(character.attributes.Vigor);
  let baseToughness = Math.floor(getNumericValueFromDice(vigorDice) / 2) + 2;

  // Hindrance 'Pequeno' modifies Toughness
  if(character.complicacoes.some(c => c.name === 'Pequeno')) {
    baseToughness -= 1;
  }

  const totalToughness = baseToughness + toughnessBonus;

  const stats = [
    { name: 'Movimentação', value: `${movement}m` },
    { name: 'Aparar', value: totalParry },
    { name: 'Resistência', value: totalToughness },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Estatísticas Derivadas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map(stat => (
            <div key={stat.name} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
              <span className="font-medium text-lg">{stat.name}</span>
              <span className="font-bold text-2xl text-accent">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
