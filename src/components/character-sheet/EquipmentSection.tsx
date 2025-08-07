'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { armamentosList, armadurasList } from '@/lib/savage-worlds-data';
import type { Armamento, Armadura } from '@/lib/savage-worlds-data';
import { PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function EquipmentSection() {
  const { character, addEquipment, removeEquipment } = useCharacterSheet();

  const renderArmamentos = (items: Armamento[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
         <TooltipProvider key={`${item.name}-${index}`}>
          <Tooltip>
            <TooltipTrigger>
              <Badge 
                variant="secondary"
                className="text-base py-1 px-3 cursor-pointer hover:bg-destructive/80"
                onClick={() => removeEquipment(item, 'armamentos')}
              >
                {item.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2 space-y-1 text-sm">
                <p><strong>Tipo:</strong> {item.type}</p>
                <p><strong>Dano:</strong> {item.damage}</p>
                <p><strong>Peso:</strong> {item.weight}kg</p>
                <p><strong>Custo:</strong> ${item.cost}</p>
                {item.notes && <p><strong>Notas:</strong> {item.notes}</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
  
  const renderArmaduras = (items: Armadura[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
         <TooltipProvider key={`${item.name}-${index}`}>
          <Tooltip>
            <TooltipTrigger>
              <Badge 
                variant="secondary"
                className="text-base py-1 px-3 cursor-pointer hover:bg-destructive/80"
                onClick={() => removeEquipment(item, 'armaduras')}
              >
                {item.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2 space-y-1 text-sm">
                 <p><strong>Tipo:</strong> {item.type}</p>
                <p><strong>Resistência:</strong> +{item.toughnessBonus}</p>
                <p><strong>Aparar:</strong> +{item.parryBonus}</p>
                <p><strong>Peso:</strong> {item.weight}kg</p>
                <p><strong>Custo:</strong> ${item.cost}</p>
                {item.notes && <p><strong>Notas:</strong> {item.notes}</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );

  const renderDialog = (list: (Armamento | Armadura)[], title: string, type: 'armamentos' | 'armaduras') => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Selecionar {title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72">
          <div className="space-y-2 p-4">
            {list.map((item) => (
              <div
                key={item.name}
                className="p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => addEquipment(item, type)}
              >
                <h4 className="font-semibold">{item.name}</h4>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Armamentos & Armaduras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Armamentos</h3>
            {renderDialog(armamentosList, 'Armamento', 'armamentos')}
          </div>
          {renderArmamentos(character.armamentos)}
        </div>
        <Separator />
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Armaduras</h3>
            {renderDialog(armadurasList, 'Armadura', 'armaduras')}
          </div>
          {renderArmaduras(character.armaduras)}
        </div>
      </CardContent>
    </Card>
  );
}
