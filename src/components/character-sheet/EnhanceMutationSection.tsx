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
import type { MutationEnhancement } from '@/context/CharacterSheetContext';

export default function EnhanceMutationSection() {
  const { character, addMutationEnhancement, updateMutationEnhancement, removeMutationEnhancement } = useCharacterSheet();
  const [editingEnhancement, setEditingEnhancement] = useState<MutationEnhancement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hasAdvantage = character.vantagens.some(v => v.name === 'Aprimorar Mutação');

  const handleEditClick = (enhancement: MutationEnhancement) => {
    setEditingEnhancement({ ...enhancement });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingEnhancement) {
      const index = character.mutationEnhancements.findIndex(e => e.id === editingEnhancement.id);
      if (index !== -1) {
        updateMutationEnhancement(index, editingEnhancement);
      }
      setEditingEnhancement(null);
      setIsDialogOpen(false);
    }
  };

  const handleValueChange = (field: keyof MutationEnhancement, value: string) => {
    if (editingEnhancement) {
      setEditingEnhancement(prev => prev ? { ...prev, [field]: value } : null);
    }
  };


  if (!hasAdvantage) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline">Aprimoramentos de Mutação</CardTitle>
            <CardDescription>Gerencie os aprimoramentos de suas mutações.</CardDescription>
        </div>
        <Button onClick={addMutationEnhancement}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Aprimoramento
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {character.mutationEnhancements.map((enhancement) => (
          <div key={enhancement.id} className="p-4 border rounded-lg space-y-4 relative group">
              <div className="space-y-2">
                <Label>Poder Afetado</Label>
                <p className="text-sm text-muted-foreground">{character.poderes.find(p => p.id === enhancement.powerId)?.name || 'Nenhum'}</p>
              </div>
              <div className="space-y-2">
                <Label>Descrição do Aprimoramento</Label>
                <p className="text-sm text-muted-foreground">{enhancement.description || 'Sem descrição'}</p>
              </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="icon" onClick={() => handleEditClick(enhancement)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => removeMutationEnhancement(enhancement.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
          </div>
        ))}
        {character.mutationEnhancements.length === 0 && (
            <p className="text-muted-foreground text-center py-4">Nenhum aprimoramento de mutação adicionado.</p>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Aprimoramento de Mutação</DialogTitle>
                </DialogHeader>
                {editingEnhancement && (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="power-select-enhancement-edit">Poder Afetado</Label>
                            <Select
                                value={editingEnhancement.powerId}
                                onValueChange={(value) => handleValueChange('powerId', value)}
                            >
                                <SelectTrigger id="power-select-enhancement-edit">
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
                            <Label htmlFor="enhancement-desc-edit">Descrição do Aprimoramento</Label>
                            <Textarea
                                id="enhancement-desc-edit"
                                value={editingEnhancement.description}
                                onChange={(e) => handleValueChange('description', e.target.value)}
                                placeholder="Descreva o aprimoramento..."
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
