"use client";

import react, { useContext } from 'react';
import CharacterCanvas from './character-canvas';
import { CharacterSelectionContext, CharacterSelectionDispatchContext } from '@/app/character-selection-context';

export default function PartGrid() {
  const dispatch = useContext(CharacterSelectionDispatchContext);

  return (
    <div className='bg-slate-100 p-12 shadow-xl ring-gray-800 rounded-lg'>
      <CharacterCanvas />
      <button onClick={() => {
        dispatch!({
          type: 'updateParts',
          parts: {
            Hair: {
              url: 'https://lh3.googleusercontent.com/pw/AIL4fc-N0-5JcUp57lmUnqf4RbO9VDSCcSzCLQr5wJ7LDgsaRn77LXeQZq6NkiPHYK-hLsgCq7KA9m-KSTzAPtpBI6VcJLM6EdS-65XpivuBVb4KzfNZu4BCRAZzBhkjwOwqxQRWfr-qabQpMCP6tWUEYUv9=w17-h13-s-no?authuser=0',
              anchorX: 0,
              anchorY: 0,
            }
          }
        })
      }}>Thingy</button>
      <button onClick={() => {
        dispatch!({
          type: 'updateParts',
          parts: {
            Hair: {
              url: 'https://lh3.googleusercontent.com/pw/AIL4fc8_QH36zXyeK_FQjqT6EQTExtobc7ybqiJeJqRCLuZjQFlYSrM2vwHQ5F3mi_96zvcZU-UK6_d1dIm2eU4ixQsKPpGLqNwewhenPQhhrU0elSD4Qq03qmjRsVlskUFTl8wTqIjVngriZ6_cpidkR07Q=w11-h10-s-no?authuser=0',
              anchorX: 1,
              anchorY: 1,
            }
          }
        })
      }}>Thingy</button>
    </div>
  );
}
