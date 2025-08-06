'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Poder } from '@/lib/savage-worlds-data';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PowersSection() {
  const { character, updateField } = useCharacterSheet();
  const [newPower, setNewPower] = useState<Omit<Poder, 'id'>>({ name: '', distance: '', damage: '', duration: '', description: '' });
  const [isOpen, setIsOpen] = useState(false);

  const handleAddPower = () => {
    if (newPower.name) {
      const powerWithId = { ...newPower, id: crypto.randomUUID() };
      updateField('poderes', [...character.poderes, powerWithId]);
      setNewPower({ name: '', distance: '', damage: '', duration: '', description: '' });
      setIsOpen(false);
    }
  };
  
  const handleRemovePower = (id: string) => {
    updateField('poderes', character.poderes.filter(p => p.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">Poderes</CardTitle>
          <CardDescription>Adicione os poderes e habilidades especiais.</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Poder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Poder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="power-name" className="text-right">Nome</Label>
                <Input id="power-name" value={newPower.name} onChange={e => setNewPower({...newPower, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="power-dist" className="text-right">Distância/Área</Label>
                <Input id="power-dist" value={newPower.distance} onChange={e => setNewPower({...newPower, distance: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="power-dmg" className="text-right">Dano/Efeito</Label>
                <Input id="power-dmg" value={newPower.damage} onChange={e => setNewPower({...newPower, damage: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="power-dur" className="text-right">Duração</Label>
                <Input id="power-dur" value={newPower.duration} onChange={e => setNewPower({...newPower, duration: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="power-desc" className="text-right mt-2">Descrição</Label>
                <Textarea id="power-desc" value={newPower.description} onChange={e => setNewPower({...newPower, description: e.target.value})} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleAddPower}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full space-y-2">
            {character.poderes.map(power => (
                <AccordionItem value={power.id} key={power.id}>
                    <AccordionTrigger className="hover:bg-muted p-2 rounded-md">
                        <span className="font-medium flex-1 text-left">{power.name}</span>
                        <div
                          className="h-10 w-10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground mr-2"
                          onClick={(e) => {e.stopPropagation(); handleRemovePower(power.id)}}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 border border-t-0 rounded-b-md space-y-2">
                        <p><strong>Distância/Área:</strong> {power.distance}</p>
                        <p><strong>Dano/Efeito:</strong> {power.damage}</p>
                        <p><strong>Duração:</strong> {power.duration}</p>
                        <p><strong>Descrição:</strong> {power.description}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
