export const CITIES = [
  'brno',
  'olomouc',
  'ostrava',
  'pardubice',
  'praha',
  'jihlava', // BUG 9: There is an additional city
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
  // { cities: ['pardubice', 'brno'], duration: 90, price: 300 }, // BUG 4: Pardubice - Brno should have a direct connection, not via Olomouc
  { cities: ['pardubice', 'olomouc'], duration: 75, price: 300 },
  { cities: ['olomouc', 'ostrava'], duration: 45, price: 200 },
  { cities: ['brno', 'olomouc'], duration: 90, price: 200 },
  { cities: ['jihlava', 'pardubice'], duration: 0, price: 0 }, // BUG 9: there is also Jihlava which is routed same as Pardubice
];

export const SPECIAL_CONNECTIONS: DiscountConnection[] = [
  { cities: ['brno', 'praha'], duration: 150, price: 400 },
  { cities: ['ostrava', 'praha'], duration: 180, price: 600 },
  { cities: ['brno', 'ostrava'], duration: 135, price: 400 }, // BUG 3: Brno - Ostrava should get special price
];

export type ConnectionStats = { duration: number; price: number | null };
