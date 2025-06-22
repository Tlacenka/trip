export const CITIES = [
  'brno',
  'olomouc',
  'ostrava',
  'pardubice',
  'praha',
] as const;

export type City = (typeof CITIES)[number];

export const FINAL_CITIES = ['brno', 'praha', 'ostrava'] as const;
export type FinalCity = (typeof FINAL_CITIES)[number];

export type Connection = {
  cities: [City, City];
  duration: number;
  price: number;
};

export type DiscountConnection = {
  cities: [FinalCity, FinalCity];
  duration: number;
  price: number;
};

export const DIRECT_CONNECTIONS: Connection[] = [
  { cities: ['praha', 'pardubice'], duration: 60, price: 200 },
  { cities: ['pardubice', 'brno'], duration: 90, price: 300 },
  { cities: ['pardubice', 'olomouc'], duration: 75, price: 300 },
  { cities: ['olomouc', 'ostrava'], duration: 45, price: 200 },
  { cities: ['brno', 'olomouc'], duration: 90, price: 200 },
];

export const SPECIAL_CONNECTIONS: DiscountConnection[] = [
  { cities: ['brno', 'praha'], duration: 150, price: 400 },
  { cities: ['ostrava', 'praha'], duration: 180, price: 600 },
  { cities: ['brno', 'ostrava'], duration: 135, price: 350 },
];

export type ConnectionStats = { duration: number; price: number | null };
