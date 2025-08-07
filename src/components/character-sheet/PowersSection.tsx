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
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PowersSection() {
  const { character, updateField, updatePower } = useCharacterSheet();
  const [newPower, setNewPower] = useState<Omit<Poder, 'id'>>({ name: '', distance: '', damage: '', duration: '', description: '' });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPower, setEditingPower] = useState<Poder | null>(null);

  const handleAddPower = () => {
    if (newPower.name) {
      const powerWithId = { ...newPower, id: crypto.randomUUID() };
      updateField('poderes', [...character.poderes, powerWithId]);
      setNewPower({ name: '', distance: '', damage: '', duration: '', description: '' });
      setIsAddOpen(false);
    }
  };
  
  const handleRemovePower = (id: string) => {
    updateField('poderes', character.poderes.filter(p => p.id !== id));
  };

  const handleEditPower = (power: Poder) => {
    setEditingPower({ ...power });
  };

  const handleConfirmEditPower = () => {
    if (editingPower) {
      updatePower(editingPower.id, editingPower);
      setEditingPower(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">Poderes</CardTitle>
          <CardDescription>Adicione os poderes e habilidades especiais.</CardDescription>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
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
                <AccordionItem value={power.id} key={power.id} className="border-b-0">
                  <div className="flex items-center hover:bg-muted/50 p-2 rounded-md group">
                    <AccordionTrigger className="flex-1">
                        <span className="font-medium flex-1 text-left">{power.name}</span>
                    </AccordionTrigger>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={(e) => {e.stopPropagation(); handleEditPower(power)}}>
                          <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={(e) => {e.stopPropagation(); handleRemovePower(power.id)}}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="p-4 border rounded-b-md space-y-2 bg-muted/20">
                      <p><strong>Distância/Área:</strong> {power.distance}</p>
                      <p><strong>Dano/Efeito:</strong> {power.damage}</p>
                      <p><strong>Duração:</strong> {power.duration}</p>
                      <p><strong>Descrição:</strong> {power.description}</p>
                  </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

        {/* Edit Power Dialog */}
        <Dialog open={!!editingPower} onOpenChange={(isOpen) => !isOpen && setEditingPower(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Poder</DialogTitle>
                </DialogHeader>
                {editingPower && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-power-name" className="text-right">Nome</Label>
                            <Input id="edit-power-name" value={editingPower.name} onChange={e => setEditingPower({...editingPower, name: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-power-dist" className="text-right">Distância/Área</Label>
                            <Input id="edit-power-dist" value={editingPower.distance} onChange={e => setEditingPower({...editingPower, distance: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-power-dmg" className="text-right">Dano/Efeito</Label>
                            <Input id="edit-power-dmg" value={editingPower.damage} onChange={e => setEditingPower({...editingPower, damage: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-power-dur" className="text-right">Duração</Label>
                            <Input id="edit-power-dur" value={editingPower.duration} onChange={e => setEditingPower({...editingPower, duration: e.target.value})} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="edit-power-desc" className="text-right mt-2">Descrição</Label>
                            <Textarea id="edit-power-desc" value={editingPower.description} onChange={e => setEditingPower({...editingPower, description: e.target.value})} className="col-span-3" />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setEditingPower(null)}>Cancelar</Button>
                    <Button onClick={handleConfirmEditPower}>Salvar Alterações</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  );
}
