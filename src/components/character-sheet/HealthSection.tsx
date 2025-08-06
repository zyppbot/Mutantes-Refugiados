'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { HealthIcon } from '../icons/HealthIcon';
import { FatigueIcon } from '../icons/FatigueIcon';

export default function HealthSection() {
  const { character, updateField } = useCharacterSheet();

  const handleWoundClick = (woundKey: keyof typeof character.wounds) => {
    updateField('wounds', { ...character.wounds, [woundKey]: character.wounds[woundKey] ? 0 : 1 });
  };

  const handleFatigueClick = (fatigueKey: keyof typeof character.fatigue) => {
    updateField('fatigue', { ...character.fatigue, [fatigueKey]: character.fatigue[fatigueKey] ? 0 : 1 });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Saúde</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Ferimentos</h3>
          <CardDescription className="mb-4">Clique nas espirais para marcar ferimentos.</CardDescription>
          <div className="flex justify-around items-center p-4 bg-muted/50 rounded-md">
            <button onClick={() => handleWoundClick('wound1')} aria-label="Marcar primeiro ferimento">
              <HealthIcon status={character.wounds.wound1} className="h-16 w-16" />
            </button>
            <button onClick={() => handleWoundClick('wound2')} aria-label="Marcar segundo ferimento">
              <HealthIcon status={character.wounds.wound2} className="h-16 w-16" />
            </button>
            <button onClick={() => handleWoundClick('wound3')} aria-label="Marcar terceiro ferimento">
              <HealthIcon status={character.wounds.wound3} className="h-16 w-16" />
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Fadiga</h3>
          <CardDescription className="mb-4">Clique nas espirais para marcar fadiga.</CardDescription>
          <div className="flex justify-around items-center p-4 bg-muted/50 rounded-md">
            <button onClick={() => handleFatigueClick('fatigue1')} aria-label="Marcar primeira fadiga">
              <FatigueIcon status={character.fatigue.fatigue1} className="h-16 w-16" />
            </button>
            <button onClick={() => handleFatigueClick('fatigue2')} aria-label="Marcar segunda fadiga">
              <FatigueIcon status={character.fatigue.fatigue2} className="h-16 w-16" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
