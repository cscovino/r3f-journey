import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export enum phase {
  READY = 'ready',
  PLAYING = 'playing',
  ENDED = 'ended',
}

export interface GameState {
  blocksCount: number;
  blocksSeed: number;
  phase: phase;
  startTime: number;
  endTime: number;
  start: () => void;
  restart: () => void;
  end: () => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      blocksSeed: 0,
      phase: phase.READY,
      startTime: 0,
      endTime: 0,
      start: () => {
        set((state) => {
          if (state.phase === phase.READY)
            return { phase: phase.PLAYING, startTime: Date.now(), blocksSeed: Math.random() };
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === phase.READY) return {};
          return { phase: phase.READY };
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === phase.PLAYING) return { phase: phase.ENDED, endTime: Date.now() };
          return {};
        });
      },
    };
  }),
);
