'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { attributeNames } from '@/lib/savage-worlds-data';
import { getDiceFromPoints } from '@/lib/savage-worlds-utils';
import { Minus, Plus } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { ChartConfig } from '@/components/ui/chart';

export default function AttributesSection() {
  const { character, updateAttribute } = useCharacterSheet();

  const chartData = attributeNames.map((name) => ({
    attribute: name,
    value: character.attributes[name] + 1, // Add 1 to each value to create the base pentagon
  }));
  
  const chartConfig = {
    value: {
      label: "Pontos",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Atributos</CardTitle>
        <CardDescription>Distribua os pontos nos seus atributos.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {attributeNames.map((name) => (
            <div key={name} className="flex items-center justify-between">
              <span className="font-medium text-lg">{name}</span>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => updateAttribute(name, character.attributes[name] - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center text-lg font-bold text-accent">{getDiceFromPoints(character.attributes[name])}</span>
                <Button size="icon" variant="outline" onClick={() => updateAttribute(name, character.attributes[name] + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
                    <span className="text-lg font-bold text-foreground">{character.attributes[name]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} startAngle={90 + 36} endAngle={90 + 36 + 360}>
              <PolarGrid />
              <PolarAngleAxis dataKey="attribute" tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
              <Radar name="Attributes" dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
