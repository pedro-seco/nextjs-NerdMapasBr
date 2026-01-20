import { Borders } from "../types/types";

export const POINT_DEFAULT_ZOOM = 16;
export const MAP_DEFAULT_ZOOM = 2;
export const LABEL_PIN_ZOOM_THRESHOLD = 14;

export const BRAZIL_DEFAULTS = {
  latitude: -10.3333333,
  longitude: -53.2000000,
  
  //["-33.8694284","5.2695808","-73.9830625","-28.6289646"] -> [South, North, West, East]
  borders: {
    sw: { 
      latitude: -33.8694284,  
      longitude: -73.9830625  
    },
    ne: { 
      latitude: 5.2695808,    
      longitude: -28.6289646  
    }
  } as Borders
};