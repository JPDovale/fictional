import { BlockEditor } from '@components/BlockEditor';
import { useEditor } from '@hooks/useEditor';
import { useProjects } from '@store/Projects';
import { isEqual } from 'lodash';
import { useEffect, useRef } from 'react';

interface EditorStateRef {
  act1: string | null;
  act2: string | null;
  act3: string | null;
  id: string;
}

export function ThreeActsStructure() {
  const { currentProject, updateThreeActsStructure } = useProjects((state) => ({
    currentProject: state.currentProject,
    updateThreeActsStructure: state.updateThreeActsStructure,
  }));

  const editorStateRef = useRef<EditorStateRef>({
    act1: currentProject?.books[0].threeActsStructure?.act1
      ? currentProject?.books[0].threeActsStructure?.act1
      : '<p></p>',
    act2: currentProject?.books[0].threeActsStructure?.act2
      ? currentProject?.books[0].threeActsStructure?.act2
      : '<p></p>',
    act3: currentProject?.books[0].threeActsStructure?.act3
      ? currentProject?.books[0].threeActsStructure?.act3
      : '<p></p>',
    id: currentProject?.books[0].threeActsStructure?.id ?? '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const threeActsStructure = currentProject?.books[0].threeActsStructure;

      if (
        threeActsStructure &&
        !isEqual(threeActsStructure, editorStateRef.current)
      ) {
        updateThreeActsStructure({
          ...editorStateRef.current,
          bookId: currentProject.books[0].id,
        });
      }
    }, 1000 * 2);

    return () => clearInterval(interval);
  }, [currentProject?.books, updateThreeActsStructure]);

  function saveThreeActsStructure(text: string, id: 'act1' | 'act2' | 'act3') {
    editorStateRef.current[id] = text;
  }

  const { Editors } = useEditor({
    editors: [
      {
        id: 'act1',
        onUpdate: (value) => saveThreeActsStructure(value, 'act1'),
        preValue: editorStateRef.current.act1 ?? '',
        useProject: currentProject ? [currentProject] : [],
      },
      {
        id: 'act2',
        onUpdate: (value) => saveThreeActsStructure(value, 'act2'),
        preValue: editorStateRef.current.act2 ?? '',
        useProject: currentProject ? [currentProject] : [],
      },
      {
        id: 'act3',
        onUpdate: (value) => saveThreeActsStructure(value, 'act3'),
        preValue: editorStateRef.current.act3 ?? '',
        useProject: currentProject ? [currentProject] : [],
      },
    ],
  });

  return (
    <main className="flex-1 py-4 min-w-[45rem] mx-auto max-w-[45rem]">
      <h2 className="text-3xl font-bold mb-4">
        Você está usando a estrutura de 3 atos
      </h2>
      <span className="text-sm text-justify">
        A estrutura de três atos é uma forma narrativa amplamente utilizada no
        cinema, teatro, literatura e outras formas de storytelling. Essa
        estrutura é composta por três partes principais que ajudam a organizar e
        dar forma à história, permitindo uma progressão clara e cativante dos
        eventos. Cada ato tem um papel específico na evolução da trama e no
        desenvolvimento dos personagens.
      </span>

      {editorStateRef.current.act1 && (
        <BlockEditor
          title="Ato 1:"
          content="Primeiro Ato: O primeiro ato estabelece o cenário da história, apresenta os personagens principais e estabelece o conflito principal. É neste momento que o público se envolve na história e aprende o suficiente sobre os personagens e a trama para ficar interessado. O primeiro ato termina com um evento que coloca a história em movimento."
          editor={Editors.act1.editor}
        />
      )}

      {editorStateRef.current.act2 && (
        <BlockEditor
          title="Ato 2:"
          content="Segundo Ato: O segundo ato é a parte mais longa e complexa da estrutura de três atos. É nesta parte que a história se desenvolve, os personagens enfrentam obstáculos e se esforçam para superá-los. O protagonista geralmente enfrenta um ponto baixo, uma derrota ou um desafio aparentemente impossível de superar. O segundo ato termina com um evento dramático que prepara o palco para o clímax."
          editor={Editors.act2.editor}
        />
      )}

      {editorStateRef.current.act3 && (
        <BlockEditor
          title="Ato 3:"
          content=" Terceiro Ato: O terceiro ato é a conclusão da história. É nesta parte que a tensão aumenta e os personagens enfrentam o clímax. O protagonista supera o último obstáculo e resolve o conflito principal. O terceiro ato termina com uma resolução que fornece um senso de encerramento para a história."
          editor={Editors.act3.editor}
        />
      )}
    </main>
  );
}
