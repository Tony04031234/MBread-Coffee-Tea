import { useState, useCallback } from 'react';
import { googleMapsService, AddressSuggestion } from '@/lib/googleMaps';

export const useAddress = () => {
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchAddress = useCallback(async (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const suggestions = await googleMapsService.searchAddresses(query);
      setAddressSuggestions(suggestions);
      setShowAddressSuggestions(suggestions.length > 0);
    } catch (error) {
      console.error('Error searching addresses:', error);
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const detectCurrentLocation = useCallback(async (): Promise<string | null> => {
    setIsDetectingLocation(true);
    try {
      const address = await googleMapsService.getCurrentLocationAddress();
      setShowAddressSuggestions(false);
      return address;
    } catch (error) {
      console.error('Error detecting location:', error);
      throw error;
    } finally {
      setIsDetectingLocation(false);
    }
  }, []);

  const getPlaceDetails = useCallback(async (placeId: string): Promise<AddressSuggestion | null> => {
    try {
      return await googleMapsService.getPlaceDetails(placeId);
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setAddressSuggestions([]);
    setShowAddressSuggestions(false);
  }, []);

  return {
    addressSuggestions,
    showAddressSuggestions,
    setShowAddressSuggestions,
    isDetectingLocation,
    isSearching,
    searchAddress,
    detectCurrentLocation,
    getPlaceDetails,
    clearSuggestions,
  };
};
