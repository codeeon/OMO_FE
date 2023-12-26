import { create } from 'zustand'; // create로 zustand를 불러옵니다.

const useMapStore = create((set) => ({
  bears: null,
}));

export default useMapStore;
