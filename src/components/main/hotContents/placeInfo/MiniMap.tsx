import { GoogleMap } from '@react-google-maps/api';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { HotPostsType } from '../../../../model/interface';
import useMapStore from '../../../../store/location/googleMapStore';
import useThemeStore from '../../../../store/theme/themeStore';
import {
  darkMapTheme,
  lightMapTheme,
} from '../../../../pages/googleMap/map/maptheme';
import MiniLocationMarker from '../../../../pages/googleMap/marker/MiniLocationMarker';

interface Props {
  post: HotPostsType;
}

const MiniMap: React.FC<Props> = ({ post }) => {
  const { Location } = post;

  const { setMap, currentLocation, setCurrentLocation } = useMapStore();
  const { themeMode } = useThemeStore();

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // @ts-ignore
    const bounds = new window.google.maps.LatLngBounds({
      lat: Number(Location.latitude),
      lng: Number(Location.longitude),
    });
    setCurrentLocation({
      lat: Number(Location.latitude),
      lng: Number(Location.longitude),
    });

    map.fitBounds(bounds);
    setMap(map);
  }, []);

  return (
    <Base>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          borderRadius: '25px',
        }}
        center={{
          lat: currentLocation.lat!,
          lng: currentLocation.lng!,
        }}
        onLoad={onLoad}
        options={{
          gestureHandling: 'greedy',
          disableDefaultUI: true,
          panControl: false,
          minZoom: 13,
          maxZoom: 19,
          clickableIcons: false,
          styles: themeMode === 'LightMode' ? lightMapTheme : darkMapTheme,
          backgroundColor: 'transparent',
        }}
      >
        <MiniLocationMarker placeDb={post} />
      </GoogleMap>
    </Base>
  );
};

export default MiniMap;

const Base = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 55px;
`;
