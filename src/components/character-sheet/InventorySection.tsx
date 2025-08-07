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
import { PlusCircle, Trash2, Wallet, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

function WalletSection() {
    const { character, updateField } = useCharacterSheet();

    const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Allows empty string for clearing the input, otherwise parse as float
        updateField('money', value === '' ? 0 : parseFloat(value) || 0);
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold flex items-center mb-2">
                <Wallet className="mr-2 h-5 w-5" />
                Carteira
            </h3>
            <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-md">
                <span className="font-bold text-lg">R$</span>
                <Input
                    type="number"
                    value={character.money}
                    onChange={handleMoneyChange}
                    className="w-full bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                    placeholder="0.00"
                />
            </div>
        </div>
    );
}


export default function InventorySection() {
  const { character, addItem, removeItem, updateItem } = useCharacterSheet();
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({ name: '', weight: 0, cost: 0 });
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleConfirmAddItem = () => {
    if (newItem.name) {
      addItem(newItem);
      setNewItem({ name: '', weight: 0, cost: 0 });
      setIsAddOpen(false);
    }
  };

  const handleEditItem = (item: Item) => {
    setEditingItem({ ...item });
  };
  
  const handleConfirmEditItem = () => {
    if (editingItem) {
      updateItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
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
        <CardTitle className="font-headline">Inventário & Carteira</CardTitle>
      </CardHeader>
      <CardContent>
        <WalletSection />
        <Separator className="mb-4" />
        <div className="flex justify-between items-center mb-4">
            <div className={cn("text-lg", isOverEncumbered && "text-destructive font-bold")}>
                Limite de Peso: {totalWeight.toFixed(1)}kg / {maxWeight.toFixed(1)}kg
            </div>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Adicionar Item</Button>
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-cost" className="text-right">Custo (R$)</Label>
                    <Input id="item-cost" type="number" value={newItem.cost} onChange={e => setNewItem({...newItem, cost: parseFloat(e.target.value) || 0})} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                  <Button onClick={handleConfirmAddItem}>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
        {isOverEncumbered && <p className="text-destructive text-sm mb-4">Você está sobrecarregado! Penalidade de -2 em testes de Força e Agilidade e suas perícias associadas. Sua Movimentação é reduzida para 1m.</p>}
        
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {character.inventario.length > 0 ? character.inventario.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-muted/50 p-2 rounded-md group">
                    <div>{item.name}</div>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">R${item.cost.toFixed(2)}</span>
                        <span className="text-muted-foreground text-xs">{item.weight}kg</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)} className="h-7 w-7">
                                <Pencil className="h-4 w-4 text-info" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-7 w-7">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    </div>
                </div>
            )) : (
                <p className="text-muted-foreground text-center py-4">Inventário vazio.</p>
            )}
        </div>

        <Dialog open={!!editingItem} onOpenChange={(isOpen) => !isOpen && setEditingItem(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Editar Item</DialogTitle></DialogHeader>
            {editingItem && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-item-name" className="text-right">Nome</Label>
                  <Input id="edit-item-name" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-item-weight" className="text-right">Peso (kg)</Label>
                  <Input id="edit-item-weight" type="number" value={editingItem.weight} onChange={e => setEditingItem({...editingItem, weight: parseFloat(e.target.value) || 0})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-item-cost" className="text-right">Custo (R$)</Label>
                  <Input id="edit-item-cost" type="number" value={editingItem.cost} onChange={e => setEditingItem({...editingItem, cost: parseFloat(e.target.value) || 0})} className="col-span-3" />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingItem(null)}>Cancelar</Button>
              <Button onClick={handleConfirmEditItem}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  );
}
