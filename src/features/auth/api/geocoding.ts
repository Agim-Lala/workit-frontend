import { apiClient } from '@/lib/api-client'

export type AddressSuggestion = {
  address: string
  latitude: number
  longitude: number
}

// Mirrors the API's AutocompleteAddress.MinQueryLength; shorter queries are rejected with 400.
export const minAddressQueryLength = 3

export async function autocompleteAddress(
  query: string,
  signal?: AbortSignal,
): Promise<AddressSuggestion[]> {
  const response = await apiClient.get<AddressSuggestion[]>('/geocoding/autocomplete', {
    params: { q: query },
    signal,
  })

  return response.data
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<AddressSuggestion> {
  const response = await apiClient.get<AddressSuggestion>('/geocoding/reverse', {
    params: { lat: latitude, lon: longitude },
  })

  return response.data
}
