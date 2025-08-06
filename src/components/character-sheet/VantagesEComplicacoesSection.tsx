'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCharacterSheet } from '@/context/CharacterSheetContext';
import { vantagensList, complicacoesList } from '@/lib/savage-worlds-data';
import type { Vantagem, Complicacao } from '@/lib/savage-worlds-data';
import { PlusCircle } from 'lucide-react';

export default function VantagesEComplicacoesSection() {
  const { character, updateField } = useCharacterSheet();

  const handleSelect = (item: Vantagem | Complicacao, type: 'vantagens' | 'complicacoes') => {
    const currentList = character[type];
    if (!currentList.some(i => i.name === item.name)) {
      updateField(type, [...currentList, item as any]);
    }
  };
  
  const handleRemove = (item: Vantagem | Complicacao, type: 'vantagens' | 'complicacoes') => {
    updateField(type, character[type].filter(i => i.name !== item.name) as any);
  };

  const renderList = (items: (Vantagem | Complicacao)[], type: 'vantagens' | 'complicacoes') => (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
         <TooltipProvider key={item.name}>
          <Tooltip>
            <TooltipTrigger>
              <Badge 
                variant="secondary"
                className="text-base py-1 px-3 cursor-pointer hover:bg-primary/80"
                onClick={() => handleRemove(item, type)}
              >
                {item.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{item.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );

  const renderDialog = (list: (Vantagem | Complicacao)[], title: string, type: 'vantagens' | 'complicacoes') => (
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
                onClick={() => handleSelect(item, type)}
              >
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
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
        <CardTitle className="font-headline">Vantagens & Complicações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Vantagens</h3>
            {renderDialog(vantagensList, 'Vantagem', 'vantagens')}
          </div>
          {renderList(character.vantagens, 'vantagens')}
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Complicações</h3>
            {renderDialog(complicacoesList, 'Complicação', 'complicacoes')}
          </div>
          {renderList(character.complicacoes, 'complicacoes')}
        </div>
      </CardContent>
    </Card>
  );
}
