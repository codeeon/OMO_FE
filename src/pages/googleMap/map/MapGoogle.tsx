import {
  GoogleMap,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { LocationType } from '../../../model/interface';
import { darkMapTheme, lightMapTheme } from './maptheme';
import CurrentLocationMarker from '../marker/CurrentLocationMarker';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import LocationMarker from '../marker/LocationMarker';
import ReSearchButton from '../actionBtn/ReSearchButton';
import CurrentLocationButton from '../actionBtn/CurrentLocationButton';
import LevelButton from '../actionBtn/LevelButton';
import useMapStore from '../../../store/location/googleMapStore';
import useThemeStore from '../../../store/theme/themeStore';
import usePlaceStore from '../../../store/location/placeStore';

interface Props {
  placeDatas: LocationType[] | undefined;
  lookAroundRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<LocationType[], unknown>>;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapGoogle: React.FC<Props> = ({
  placeDatas,
  lookAroundRefetch,
  isListOpen,
  setIsListOpen,
}) => {
  const [isShowReasarchBtn, setIsShowReasearchBtn] = useState(false);
  const [mapLevel, setMapLevel] = useState(17);
  const { place } = usePlaceStore();
  const { map, setMap, currentLocation, mapBounds, setMapBounds } =
    useMapStore();
  const { themeMode } = useThemeStore();

  const containerStyle = {
    width:
      isListOpen && place !== null
        ? 'calc(100% - 840px)'
        : isListOpen && place === null
        ? 'calc(100% - 420px)'
        : '100%',
    height: 'calc(100vh - 60px)',
    marginLeft: 'auto',
    transition: 'all 200ms ease',
  };

  const downMapLevelHandler = () => {
    const currentLevel = map?.getZoom();
    if (!currentLevel) return;
    setMapLevel(currentLevel - 1);
  };
  const upMapLevelHandler = () => {
    const currentLevel = map?.getZoom();
    if (!currentLevel) return;
    setMapLevel(currentLevel + 1);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP,
    language: 'ko',
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // @ts-ignore
    const bounds = new window.google.maps.LatLngBounds(currentLocation);

    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onTileLoaded = () => {
    const bounds = map?.getBounds();
    const northEast = bounds?.getNorthEast();
    const southWest = bounds?.getSouthWest();
    setMapBounds({
      initialLoad: true,
      northEast: { lat: northEast?.lat(), lng: northEast?.lng() },
      southWest: { lat: southWest?.lat(), lng: southWest?.lng() },
    });
  };

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <CustomMap
      mapContainerStyle={containerStyle}
      // @ts-ignore
      center={currentLocation}
      // zoom={mapLevel}
      onLoad={onLoad}
      onTilesLoaded={onTileLoaded}
      onUnmount={onUnmount}
      onDragEnd={() => setIsShowReasearchBtn(true)}
      options={{
        disableDefaultUI: true,
        panControl: false,
        minZoom: 13,
        maxZoom: 19,
        zoom: mapLevel,
        clickableIcons: false,
        styles: themeMode === 'LightMode' ? lightMapTheme : darkMapTheme,

        backgroundColor: 'transparent',
      }}
    >
      <OverlayViewF
        // @ts-ignore
        position={currentLocation}
        mapPaneName={OverlayView.OVERLAY_LAYER}
      >
        <CurrentLocationMarker />
      </OverlayViewF>
      {placeDatas?.map((db) => (
        <LocationMarker
          placeDb={db}
          isListOpen={isListOpen}
          setIsListOpen={setIsListOpen}
        />
      ))}
      {/* {isShowReasarchBtn && (
        <ReSearchButton
          lookAroundRefetch={lookAroundRefetch}
          setIsShowReasearchBtn={setIsShowReasearchBtn}
        />
      )} */}

      <CurrentLocationButton />
      <LevelButton
        downMapLevelHandler={downMapLevelHandler}
        upMapLevelHandler={upMapLevelHandler}
      />
    </CustomMap>
  ) : (
    <></>
  );
};

export default MapGoogle;

const CustomMap = styled(GoogleMap)``;
