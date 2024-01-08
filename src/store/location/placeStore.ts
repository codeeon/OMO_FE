// themeStore.js
import { create } from 'zustand';
import { SelectedPlaceType } from '../../model/interface';

interface PlaceStoreState {
  place: SelectedPlaceType | null;
  setPlace: (place: SelectedPlaceType | null) => void;
}

const usePlaceStore = create<PlaceStoreState>((set) => ({
  place: null,
  setPlace: (place: SelectedPlaceType | null) => set(() => ({ place: place })),
}));

export default usePlaceStore;
