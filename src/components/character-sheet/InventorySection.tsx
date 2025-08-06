'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Item } from '@/lib/savage-worlds-data';
import { getDiceFromPoints, getNumericValueFromDice } from '@/lib/savage-worlds-utils';
import { PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function InventorySection() {
  const { character, updateField } = useCharacterSheet();
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({ name: '', weight: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const handleAddItem = () => {
    if (newItem.name) {
      const itemWithId = { ...newItem, id: crypto.randomUUID() };
      updateField('inventario', [...character.inventario, itemWithId]);
      setNewItem({ name: '', weight: 0 });
      setIsOpen(false);
    }
  };

  const handleRemoveItem = (id: string) => {
    updateField('inventario', character.inventario.filter(i => i.id !== id));
  };
  
  const totalWeight = 
    character.inventario.reduce((sum, item) => sum + item.weight, 0) +
    character.armamentos.reduce((sum, item) => sum + item.weight, 0) +
    character.armaduras.reduce((sum, item) => sum + item.weight, 0);

  let carryMultiplier = 2.5;
  if(character.vantagens.some(v => v.name === 'Musculoso')) {
    carryMultiplier = 5;
  }
    
  const maxWeight = getNumericValueFromDice(getDiceFromPoints(character.attributes.Força)) * carryMultiplier;
  const isOverEncumbered = totalWeight > maxWeight;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Inventário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
            <div className={cn("text-lg", isOverEncumbered && "text-destructive font-bold")}>
                Limite de Peso: {totalWeight.toFixed(1)}kg / {maxWeight.toFixed(1)}kg
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Adicionar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Novo Item</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-name" className="text-right">Nome</Label>
                    <Input id="item-name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-weight" className="text-right">Peso (kg)</Label>
                    <Input id="item-weight" type="number" value={newItem.weight} onChange={e => setNewItem({...newItem, weight: parseFloat(e.target.value) || 0})} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                  <Button onClick={handleAddItem}>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
        {isOverEncumbered && <p className="text-destructive text-sm mb-4">Você está sobrecarregado! Penalidade de -2 em testes de Força e Agilidade e suas perícias associadas. Sua Movimentação é reduzida para 1m.</p>}
        <Separator className="mb-4" />
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {character.inventario.length > 0 ? character.inventario.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <div>{item.name}</div>
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{item.weight}kg</span>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="h-7 w-7">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
            )) : (
                <p className="text-muted-foreground text-center py-4">Inventário vazio.</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
