export type CountryKind = 'lived' | 'visited' | 'wanted'

export interface Country {
  /** Must match the `properties.name` field from world-atlas/countries-110m */
  name: string
  /** Display name if different from TopoJSON name */
  display?: string
  kind: CountryKind
  note?: string
}

export interface NationalPark {
  name: string
  state: string
  lat: number
  lon: number
  /** false = on the list, not yet visited */
  visited: boolean
  note?: string
}

export const countries: Country[] = [
  { name: 'United States of America', display: 'USA', kind: 'lived', note: 'Home base — Evanston now, Austin / NYC / Boston before.' },
  { name: 'Brazil', kind: 'visited' },
  { name: 'Canada', kind: 'visited' },
  { name: 'Colombia', kind: 'visited' },
  { name: 'Costa Rica', kind: 'visited' },
  { name: 'Ecuador', kind: 'visited' },
  { name: 'Estonia', kind: 'visited' },
  { name: 'Greece', kind: 'visited' },
  { name: 'India', kind: 'visited', note: 'Family origin. Hyderabad, Mumbai, Delhi.' },
  { name: 'Italy', kind: 'visited' },
  { name: 'Mexico', kind: 'visited' },
  { name: 'Peru', kind: 'visited' },
  { name: 'Spain', kind: 'visited' },
  { name: 'United Kingdom', display: 'UK', kind: 'visited', note: 'Studied abroad in London. Walked the Thames Path on a weekend.' },
]

export const nationalParks: NationalPark[] = [
  { name: 'Joshua Tree', state: 'CA', lat: 33.8734, lon: -115.9010, visited: true },
  { name: 'Big Bend', state: 'TX', lat: 29.1275, lon: -103.2425, visited: true },
  { name: 'Glacier', state: 'MT', lat: 48.7596, lon: -113.7870, visited: true },
  { name: 'Saguaro', state: 'AZ', lat: 32.2967, lon: -111.1665, visited: true },
  { name: 'Acadia', state: 'ME', lat: 44.3386, lon: -68.2733, visited: true, note: 'Sunrise from Cadillac Mountain.' },
  { name: 'Grand Canyon', state: 'AZ', lat: 36.1069, lon: -112.1129, visited: true },
  { name: 'Hawaii Volcanoes', state: 'HI', lat: 19.4194, lon: -155.2885, visited: true },
  { name: 'Mammoth Cave', state: 'KY', lat: 37.1869, lon: -86.1000, visited: true },
  { name: 'Rocky Mountain', state: 'CO', lat: 40.3428, lon: -105.6836, visited: true },
  { name: 'Yosemite', state: 'CA', lat: 37.8651, lon: -119.5383, visited: true, note: 'NP 1 of the lifetime list.' },
  { name: 'Sequoia', state: 'CA', lat: 36.4864, lon: -118.5658, visited: true },
]
