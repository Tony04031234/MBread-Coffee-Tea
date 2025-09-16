// Google Maps API utilities
declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export interface AddressSuggestion {
  id: string;
  address: string;
  fullAddress: string;
  placeId: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

class GoogleMapsService {
  private isLoaded = false;
  private autocompleteService: any = null;
  private placesService: any = null;
  private geocoder: any = null;

  constructor() {
    this.loadGoogleMapsScript();
  }

  private loadGoogleMapsScript(): void {
    if (typeof window === 'undefined') return;

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      this.initializeServices();
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for it to load
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkLoaded);
          this.initializeServices();
        }
      }, 100);
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    
    // Set up callback
    window.initGoogleMaps = () => {
      this.initializeServices();
    };

    document.head.appendChild(script);
  }

  private initializeServices(): void {
    if (!window.google || !window.google.maps) return;

    this.autocompleteService = new window.google.maps.places.AutocompleteService();
    this.placesService = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );
    this.geocoder = new window.google.maps.Geocoder();
    this.isLoaded = true;
  }

  public async searchAddresses(query: string): Promise<AddressSuggestion[]> {
    if (!this.isLoaded || !this.autocompleteService || query.length < 3) {
      return [];
    }

    return new Promise((resolve) => {
      this.autocompleteService.getPlacePredictions(
        {
          input: query,
          componentRestrictions: { country: 'vn' }, // Restrict to Vietnam
          types: ['address'],
        },
        (predictions: any[], status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            const suggestions = predictions.map((prediction, index) => ({
              id: `suggestion-${index}`,
              address: prediction.description,
              fullAddress: prediction.description,
              placeId: prediction.place_id,
            }));
            resolve(suggestions);
          } else {
            resolve([]);
          }
        }
      );
    });
  }

  public async getPlaceDetails(placeId: string): Promise<AddressSuggestion | null> {
    if (!this.isLoaded || !this.placesService) return null;

    return new Promise((resolve) => {
      this.placesService.getDetails(
        {
          placeId: placeId,
          fields: ['formatted_address', 'geometry', 'address_components'],
        },
        (place: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            resolve({
              id: placeId,
              address: place.formatted_address,
              fullAddress: place.formatted_address,
              placeId: placeId,
              coordinates: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
            });
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  public async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    if (!this.isLoaded || !this.geocoder) return null;

    return new Promise((resolve) => {
      this.geocoder.geocode(
        { location: { lat, lng } },
        (results: any[], status: any) => {
          if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
            resolve(results[0].formatted_address);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  public async getCurrentLocationAddress(): Promise<string | null> {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const address = await this.reverseGeocode(latitude, longitude);
            resolve(address);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  public isGoogleMapsLoaded(): boolean {
    return this.isLoaded;
  }
}

// Export singleton instance
export const googleMapsService = new GoogleMapsService();
