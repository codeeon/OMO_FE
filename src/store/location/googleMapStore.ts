import { create } from 'zustand';
import { CurrentLocationType, mapBoundsType } from '../../model/interface';

interface MapStoreState {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  initializeMap: (currentLocation: google.maps.LatLngBounds) => void;
  setCurrentLocation: (location: CurrentLocationType) => void;
  currentLocation: CurrentLocationType;
  mapBounds: mapBoundsType | null;
  setMapBounds: (bounds: mapBoundsType | null) => void;

  setSelectedLocation: (location: CurrentLocationType) => void;
  selectedLocation: CurrentLocationType;
}

const useMapStore = create<MapStoreState>((set) => ({
  map: null,
  setMap: (map: google.maps.Map | null) => set({ map }),

  selectedLocation: { lat: 37.574187, lng: 126.976882 },
  setSelectedLocation: (location: CurrentLocationType) =>
    set(() => ({ selectedLocation: location })),

  currentLocation: { lat: 37.574187, lng: 126.976882 },
  setCurrentLocation: (location: CurrentLocationType) =>
    set(() => ({ currentLocation: location })),

  mapBounds: null,
  setMapBounds: (bounds: mapBoundsType | null) =>
    set(() => ({ mapBounds: bounds })),

  initializeMap: (centerLocation: google.maps.LatLngBounds) => {
    const container = document.createElement('div');

    container.id = 'map';
    container.style.minHeight = '0';

    document.body.appendChild(container);
    const bounds = new window.google.maps.LatLngBounds(centerLocation);

    const map = new window.google.maps.Map(container, {
      //@ts-ignore
      center: centerLocation,
    });

    map.fitBounds(bounds);
    set({ map });
  },
}));

export default useMapStore;
