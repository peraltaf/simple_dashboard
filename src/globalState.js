import { useState, useEffect } from 'react';
import MAINDATA from './assets/main_data.json';


export default function useGlobalState(globalState) {
  const [, set] = useState(globalState.get());
  const state = globalState.get();
  const reRender = () => set({});
  
  useEffect(() => {
    globalState.joinReRender(reRender);
    return () => {
      globalState.cancelReRender(reRender);
    };
  });

  function setState(newState) {
    globalState.set(newState);
  }

  return [state, setState];
}


function createGlobalState(initState = null) {
  const prototype = {
    data: { state: initState, reRenderFns: [] },

    get() {
      return this.data.state;
    },

    set(newState) {
      if (newState === this.data.state) return;
      this.data.state = newState;
      this.data.reRenderFns.forEach((reRender) => reRender());
      return this;
    },

    joinReRender(reRender) {
      if (this.data.reRenderFns.includes(reRender)) return;
      this.data.reRenderFns.push(reRender);
    },

    cancelReRender(reRender) {
      this.data.reRenderFns = this.data.reRenderFns.filter(
        (reRenderFn) => reRenderFn !== reRender
      );
    },
  };

  return Object.freeze(Object.create(prototype));
}


const initial_data = MAINDATA.filter(d =>
  ['Nintendo', 'Sega', 'Game Freak'].some(v => d.developers.includes(v))
    && ['Action', 'Role-Playing', 'Platformer'].some(v => d.genres.includes(v))
    && ['Switch','WIIU', 'WII'].includes(d.platform)
    && ['E', 'E10+', 'M', 'RP', 'T', 'Not Rated'].includes(d.esrb_rating)
);


export const sidebarState = createGlobalState(true);
export const MainData = createGlobalState(MAINDATA);
export const filteredData = createGlobalState(initial_data);
export const selectedDevs = createGlobalState(['Nintendo', 'Sega', 'Game Freak']);
export const selectedGenres = createGlobalState(['Action', 'Role-Playing', 'Platformer']);
export const selectedPlatforms = createGlobalState(['Switch','WIIU', 'WII']);
export const selectedRatings = createGlobalState(['E', 'E10+', 'M', 'RP', 'T', 'Not Rated']);