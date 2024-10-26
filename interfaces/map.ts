interface BookmarkPlace {
  bookmarkId: number;
  name: string;
  displayName: string;
  px: number;
  py: number;
  type: string;
  useTime: number;
  lastUpdateTime: number;
  creationTime: number;
  order: number;
  sid: string;
  address: string;
  memo: string;
  url: string;
  mcid: string;
  mcidName: string;
  rcode: string;
  cidPath: string[];
  available: boolean;
  folderMappings?: any;
  placeInfo?: PlaceInfo;
  isIndoor: boolean;
}
interface PlaceInfo {
  streetPanorama: StreetPanorama;
  thumbnailUrls: string[];
  category: string;
}
interface StreetPanorama {
  id: string;
  pan: string;
  tilt: string;
  lng: string;
  lat: string;
  fov: string;
}

export { BookmarkPlace, PlaceInfo, StreetPanorama }
