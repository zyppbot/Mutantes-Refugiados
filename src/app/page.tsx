
'use client';
import { useRef, useState, useEffect } from 'react';
import { CharacterSheetProvider, useCharacterSheet } from '@/context/CharacterSheetContext';
import InfoSection from '@/components/character-sheet/InfoSection';
import AttributesSection from '@/components/character-sheet/AttributesSection';
import SkillsSection from '@/components/character-sheet/SkillsSection';
import DerivedStatsSection from '@/components/character-sheet/DerivedStatsSection';
import HealthSection from '@/components/character-sheet/HealthSection';
import VantagesEComplicacoesSection from '@/components/character-sheet/VantagesEComplicacoesSection';
import EquipmentSection from '@/components/character-sheet/EquipmentSection';
import PowersSection from '@/components/character-sheet/PowersSection';
import InventorySection from '@/components/character-sheet/InventorySection';
import MutationDisadvantageSection from '@/components/character-sheet/MutationDisadvantageSection';
import EnhanceMutationSection from '@/components/character-sheet/EnhanceMutationSection';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import type { Character } from '@/context/CharacterSheetContext';

function CharacterSheetContent() {
  const { character, setCharacter } = useCharacterSheet();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSave = () => {
    try {
      const data = JSON.stringify(character, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const characterName = character.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      a.href = url;
      a.download = `${characterName || 'ficha'}_mutantes_refugiados.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Falha ao salvar a ficha:", error);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result;
          if (typeof text === 'string') {
            const loadedCharacter = JSON.parse(text) as Character;
            // TODO: Adicionar validação mais robusta do objeto carregado
            if (loadedCharacter && loadedCharacter.attributes && loadedCharacter.skills) {
              setCharacter(loadedCharacter);
            } else {
               throw new Error("Arquivo de ficha inválido.");
            }
          }
        } catch (error) {
          console.error("Falha ao carregar a ficha:", error);
          alert("Erro: O arquivo selecionado não é uma ficha de personagem válida.");
        }
      };
      reader.onerror = (e) => {
        console.error("Erro na leitura do arquivo:", reader.error);
        alert("Erro ao ler o arquivo.");
      }
      reader.readAsText(file);
    }
    // Limpa o valor para permitir o re-upload do mesmo arquivo
    if(event.target) {
        event.target.value = '';
    }
  };

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="relative mb-8 text-center">
        <h1 className="font-headline text-5xl font-bold text-primary">
          Mutantes Refugiados
        </h1>
        <p className="text-muted-foreground">Ficha de Personagem</p>
        <div className="absolute top-0 right-0 flex gap-2">
            <Button onClick={handleSave}>
                <Download className="mr-2 h-4 w-4" />
                Salvar
            </Button>
            <Button variant="outline" onClick={handleLoadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Carregar
            </Button>
            {isClient && (
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                accept="application/json"
                className="hidden" 
              />
            )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 */}
        <div className="lg:col-span-2 space-y-6">
          <InfoSection />
          <AttributesSection />
          <SkillsSection />
          <VantagesEComplicacoesSection />
          <EnhanceMutationSection />
          <MutationDisadvantageSection />
          <EquipmentSection />
          <PowersSection />
        </div>

        {/* Coluna 2 */}
        <div className="lg:col-span-1 space-y-6">
          <DerivedStatsSection />
          <HealthSection />
          <InventorySection />
        </div>
      </div>
    </main>
  );
}


export default function Home() {
  return (
    <CharacterSheetProvider>
      <CharacterSheetContent />
    </CharacterSheetProvider>
  );
}
