// themeStore.js
import { create } from 'zustand';
import { LocationType } from '../../model/interface';

interface PlaceStoreState {
  place: LocationType | null;
  setPlace: (place: LocationType | null) => void;
}

const usePlaceStore = create<PlaceStoreState>((set) => ({
  place: null,
  setPlace: (place: LocationType | null) => set(() => ({ place: place })),
}));

export default usePlaceStore;
