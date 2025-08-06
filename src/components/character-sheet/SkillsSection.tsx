'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import type { AttributeName } from '@/lib/savage-worlds-data';
import { attributeNames } from '@/lib/savage-worlds-data';
import { getSkillDice } from '@/lib/savage-worlds-utils';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SkillsSection() {
  const { character, addSkill, updateSkill, removeSkill } = useCharacterSheet();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Perícias</CardTitle>
        <CardDescription>Adicione e configure as perícias do seu personagem.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full space-y-2">
          {character.skills.map((skill, index) => (
            <AccordionItem value={skill.id} key={skill.id}>
              <AccordionTrigger className="flex justify-between items-center bg-muted/50 hover:bg-muted p-2 rounded-md">
                <div className="flex-1 text-left font-medium">
                  {skill.name || 'Nova Perícia'}
                </div>
                <div className="font-bold text-accent text-lg">
                  {getSkillDice(skill, character.attributes)}
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border border-t-0 rounded-b-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor={`skill-name-${index}`}>Nome</Label>
                    <Input
                      id={`skill-name-${index}`}
                      value={skill.name}
                      onChange={(e) => updateSkill(index, { name: e.target.value })}
                      disabled={index < 2} // Disable editing for Luta and Mutação
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`skill-points-${index}`}>Pontos</Label>
                    <Input
                      id={`skill-points-${index}`}
                      type="number"
                      value={skill.points}
                      onChange={(e) => updateSkill(index, { points: Math.max(0, parseInt(e.target.value) || 0) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`skill-attr-${index}`}>Atributo Associado</Label>
                    <Select
                      value={skill.attribute}
                      onValueChange={(value: AttributeName) => updateSkill(index, { attribute: value })}
                    >
                      <SelectTrigger id={`skill-attr-${index}`}>
                        <SelectValue placeholder="Selecione Atributo" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributeNames.map((attr) => (
                          <SelectItem key={attr} value={attr}>{attr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {index > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remover Perícia
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button onClick={addSkill} className="mt-4 w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Perícia
        </Button>
      </CardContent>
    </Card>
  );
}
