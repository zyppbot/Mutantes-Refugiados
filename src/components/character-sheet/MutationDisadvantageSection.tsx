'use client';
import { useState } from 'react';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import type { MutationDisadvantage } from '@/context/CharacterSheetContext';

export default function MutationDisadvantageSection() {
  const { character, addMutationDisadvantage, updateMutationDisadvantage, removeMutationDisadvantage } = useCharacterSheet();
  const [editingDisadvantage, setEditingDisadvantage] = useState<MutationDisadvantage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasDisadvantage = character.complicacoes.some(c => c.name === 'Desvantagem de Mutação');

  const handleEditClick = (disadvantage: MutationDisadvantage) => {
    setEditingDisadvantage({ ...disadvantage });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingDisadvantage) {
      const index = character.mutationDisadvantages.findIndex(d => d.id === editingDisadvantage.id);
      if (index !== -1) {
        updateMutationDisadvantage(index, editingDisadvantage);
      }
      setEditingDisadvantage(null);
      setIsDialogOpen(false);
    }
  };

  const handleValueChange = (field: keyof MutationDisadvantage, value: string) => {
    if (editingDisadvantage) {
      setEditingDisadvantage(prev => prev ? { ...prev, [field]: value } : null);
    }
  };


  if (!hasDisadvantage) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline">Desvantagens de Mutação</CardTitle>
            <CardDescription>Gerencie as desvantagens de suas mutações.</CardDescription>
        </div>
        <Button onClick={addMutationDisadvantage}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Desvantagem
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {character.mutationDisadvantages.map((disadvantage) => (
          <div key={disadvantage.id} className="p-4 border rounded-lg space-y-4 relative group">
             <div className="space-y-2">
                <Label>Poder Afetado</Label>
                <p className="text-sm text-muted-foreground">{character.poderes.find(p => p.id === disadvantage.powerId)?.name || 'Nenhum'}</p>
              </div>
              <div className="space-y-2">
                <Label>Descrição da Desvantagem</Label>
                <p className="text-sm text-muted-foreground">{disadvantage.description || 'Sem descrição'}</p>
              </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="icon" onClick={() => handleEditClick(disadvantage)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => removeMutationDisadvantage(disadvantage.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
          </div>
        ))}
        {character.mutationDisadvantages.length === 0 && (
            <p className="text-muted-foreground text-center py-4">Nenhuma desvantagem de mutação adicionada.</p>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Desvantagem de Mutação</DialogTitle>
                </DialogHeader>
                {editingDisadvantage && (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor={`power-select-edit`}>Poder Afetado</Label>
                      <Select
                        value={editingDisadvantage.powerId}
                        onValueChange={(value) => handleValueChange('powerId', value)}
                      >
                        <SelectTrigger id={`power-select-edit`}>
                          <SelectValue placeholder="Selecione um Poder" />
                        </SelectTrigger>
                        <SelectContent>
                          {character.poderes.map((power) => (
                            <SelectItem key={power.id} value={power.id}>
                              {power.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`disadvantage-desc-edit`}>Descrição da Desvantagem</Label>
                      <Textarea
                        id={`disadvantage-desc-edit`}
                        value={editingDisadvantage.description}
                        onChange={(e) => handleValueChange('description', e.target.value)}
                        placeholder="Descreva a desvantagem..."
                      />
                    </div>
                  </div>
                )}
                 <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button onClick={handleSave}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
