import {
  GoogleMap,
  InfoWindowF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  CurrentLocationType,
  LocationPostsType,
  LocationType,
  mapBoundsType,
} from '../../model/interface';
import { getCurrentCoords } from '../../function/kakao';
import { darkMapTheme, lightMapTheme } from './maptheme';
import CurrentLocationMarker from './marker/CurrentLocationMarker';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import LocationMarker from './marker/LocationMarker';
import ReSearchButton from './actionBtn/ReSearchButton';
import CurrentLocationButton from './actionBtn/CurrentLocationButton';
import useAlertModalCtr from '../../hooks/useAlertModalCtr';
import AlertModal from '../../components/Modal/AlertModal';
import LocationAlert from '../../components/share/alert/LocationAlert';
import LevelButton from './actionBtn/LevelButton';

interface Props {
  themeMode: string | null;
  mapBounds: mapBoundsType;
  setMapBounds: React.Dispatch<SetStateAction<mapBoundsType>>;
  placeDatas: LocationType[] | undefined;
  lookAroundRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<LocationType[], unknown>>;
  map: any;
  setMap: React.Dispatch<SetStateAction<any>>;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
  selectedPlace: LocationType | null;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentLocation: CurrentLocationType;
  setCurrentLocation: React.Dispatch<React.SetStateAction<CurrentLocationType>>;
}

const MapGoogle: React.FC<Props> = ({
  themeMode,
  mapBounds,
  setMapBounds,
  placeDatas,
  lookAroundRefetch,
  map,
  setMap,
  setSelectedPlace,
  selectedPlace,
  isListOpen,
  setIsListOpen,
  currentLocation,
  setCurrentLocation,
}) => {
  const containerStyle = {
    width:
      isListOpen && selectedPlace !== null
        ? 'calc(100% - 840px)'
        : isListOpen && selectedPlace === null
        ? 'calc(100% - 420px)'
        : '100%',
    height: 'calc(100vh - 60px)',
    marginLeft: 'auto',
    transition: 'all 300ms ease',
  };

  // 구글 맵 불러오기.
  const [isLoading, setIsLoading] = useState(false);
  const [isShowReasarchBtn, setIsShowReasearchBtn] = useState(false);
  const { isModalOpen, handleModalOpen, handleModalClose } = useAlertModalCtr();
  const [mapLevel, setMapLevel] = useState(15);

  const downMapLevelHandler = () => {
    const currentLevel = map.getZoom();
    setMapLevel(currentLevel - 1);
  };
  const upMapLevelHandler = () => {
    const currentLevel = map.getZoom();
    setMapLevel(currentLevel + 1);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP,
    language: 'ko',
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const getCurrentLocation = async () => {
      try {
        setIsLoading(true);
        handleModalOpen();

        const { latitude, longitude } = await getCurrentCoords();
        setCurrentLocation({ lat: latitude, lng: longitude });
        const bounds = new window.google.maps.LatLngBounds({
          lat: latitude,
          lng: longitude,
        });

        map.fitBounds(bounds);
        setMap(map);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentLocation();
  }, []);

  useEffect(() => {
    isLoading === false && handleModalOpen();
  }, [isLoading]);

  const onTileLoaded = () => {
    const bounds = map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    setMapBounds({
      initialLoad: true,
      northEast: { lat: northEast.lat(), lng: northEast.lng() },
      southWest: { lat: southWest.lat(), lng: southWest.lng() },
    });
  };

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return isLoaded ? (
    <CustomMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={mapLevel}
      onLoad={onLoad}
      onTilesLoaded={onTileLoaded}
      onDragEnd={() => setIsShowReasearchBtn(true)}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        panControl: false,
        minZoom: 13,
        maxZoom: 19,
        clickableIcons: false,
        styles: themeMode === 'LightMode' ? lightMapTheme : darkMapTheme,

        backgroundColor: 'transparent',
      }}
    >
      <OverlayView
        position={currentLocation}
        mapPaneName={OverlayView.OVERLAY_LAYER}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <CurrentLocationMarker />
      </OverlayView>
      {placeDatas?.map((db) => (
        <LocationMarker
          placeDb={db}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          isListOpen={isListOpen}
          setIsListOpen={setIsListOpen}
          setCurrentLocation={setCurrentLocation}
        />
      ))}
      {isShowReasarchBtn && (
        <ReSearchButton
          map={map}
          mapBounds={mapBounds}
          setMapBounds={setMapBounds}
          lookAroundRefetch={lookAroundRefetch}
          setIsShowReasearchBtn={setIsShowReasearchBtn}
        />
      )}

      <CurrentLocationButton setCurrentLocation={setCurrentLocation} />
      <LevelButton
        downMapLevelHandler={downMapLevelHandler}
        upMapLevelHandler={upMapLevelHandler}
      />
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        position="topRight"
        isLoading={isLoading}
      >
        <LocationAlert isLoading={isLoading} />
      </AlertModal>
    </CustomMap>
  ) : (
    <></>
  );
};

export default MapGoogle;

const CustomMap = styled(GoogleMap)`
  background: transparent;
`;
