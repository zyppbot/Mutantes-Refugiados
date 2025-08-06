'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCharacterSheet } from '@/context/CharacterSheetContext';

export default function InfoSection() {
  const { character, updateField } = useCharacterSheet();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Informações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="char-name">Nome do Personagem</Label>
            <Input id="char-name" value={character.name} onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="player-name">Nome do Jogador</Label>
            <Input id="player-name" value={character.player} onChange={(e) => updateField('player', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mutation-type">Tipo de Mutação</Label>
            <Input id="mutation-type" value={character.mutationType} onChange={(e) => updateField('mutationType', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stage">Estágio</Label>
            <Input id="stage" type="number" value={character.stage} onChange={(e) => updateField('stage', parseInt(e.target.value) || 0)} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="experience">Experiência</Label>
            <Input id="experience" type="number" value={character.experience} onChange={(e) => updateField('experience', parseInt(e.target.value) || 0)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
