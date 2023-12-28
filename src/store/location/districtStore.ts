import { create } from 'zustand';

interface DistrictStoreState {
  district: string;
  setDistrict: (dist: string) => void;
}

const useDistrictStore = create<DistrictStoreState>((set) => ({
  district: '전체',
  setDistrict: (dist: string) => set(() => ({ district: dist })),
}));

export default useDistrictStore;
