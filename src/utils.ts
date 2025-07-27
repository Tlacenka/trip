import {
  CITIES,
  City,
  DIRECT_CONNECTIONS,
  FinalCity,
  SPECIAL_CONNECTIONS,
} from './constants';

export function calculateTicketStats(input: {
  from: City;
  to: City;
  age: number | null;
  luggage: boolean;
}) {
  const { from, to, age, luggage } = input;

  const { duration, price } =
    isFinal(from) && isFinal(to)
      ? getDiscountedPathStats(from, to)
      : getFastestPath(from, to);

  const discountedPrice = includeDiscounts(price, age);
  const luggagePrice = luggage ? calculateLuggagePrice(from, to) : 0;
  const finalPrice =
    discountedPrice != null ? discountedPrice + luggagePrice : null;

  return { duration, price: finalPrice };
}

export function isFinal(city: City): city is FinalCity {
  return ['brno', 'praha', 'ostrava'].includes(city);
}

export function getDiscountedPathStats(from: FinalCity, to: FinalCity) {
  if (from === to) {
    return { duration: 0, price: 0 };
  }

  const connection = SPECIAL_CONNECTIONS.find(
    ({ cities }) => cities.includes(from) && cities.includes(to)
  )!;

  return { duration: connection.duration, price: connection.price };
}

type CityNode = {
  name: City;
  duration: number;
  price: number;
  previous: CityNode | undefined;
  visited: boolean;
};

/**
 *
 * @param from current city node
 * @param to destination city
 * @returns fastest path (duration) between cities using Djikstra's algorithm
 */
export function getFastestPath(from: City, to: City) {
  if (from === to) {
    return { duration: 0, price: 0 };
  }

  let nodes = CITIES.map<CityNode>((name) => ({
    name,
    duration: name === from ? 0 : Infinity,
    price: 0,
    previous: undefined,
    visited: false,
  }));

  while (nodes.some(({ visited }) => visited === false)) {
    // Set unvisited node with minimum distance from unvisited to current
    const current = nodes
      .filter(({ visited }) => visited === false)
      .sort((a, b) => a.duration - b.duration)
      .at(0)!;
    current.visited = true;

    // Go through its neighbours
    getNeighbours(current.name).forEach((neighbour) => {
      const neighbourConnection = DIRECT_CONNECTIONS.find(
        ({ cities }) =>
          cities.includes(neighbour) && cities.includes(current.name)
      )!;

      // If cummulated duration to current node + neighbour is lower than previously calculated distance to the neighbour, replace it
      const neighbourNode = nodes.find(({ name }) => name === neighbour)!;
      const newDist = current.duration + neighbourConnection.duration;
      if (newDist < neighbourNode.duration) {
        neighbourNode.duration = newDist;
        neighbourNode.previous = current;
        neighbourNode.price = current.price + neighbourConnection.price;
      }
    });
  }

  const destination = nodes.find((node) => node.name === to)!;
  return { duration: destination.duration, price: destination.price };
}

/**
 *
 * @param city current city node
 * @returns all direct neighbours of a given city
 */
export function getNeighbours(city: City) {
  return DIRECT_CONNECTIONS.filter(({ cities }) => cities.includes(city)).map(
    ({ cities: [city1, city2] }) => (city1 === city ? city2 : city1)
  );
}

export function includeDiscounts(price: number, age: number | null) {
  if (age == null || age < 0) {
    return null;
  }

  if (age > 0 && age < 12) {
    // BUG 11: Should be until 15 instead of 12
    return toTwoDecimals(price * 0.5); // BUG 2: should be 67% discount
    // } else if (age >= 15 && age <= 26) { // BUG 5: Student discount is missing
    //   return toTwoDecimals(price * 0.75);
  } else if (age > 75) {
    // BUG 12: Should include 75
    return 0;
  }

  return price;
}

function toTwoDecimals(value: number) {
  return Number((Math.round(value * 100) / 100).toFixed(2));
}

export function calculateLuggagePrice(from: City, to: City) {
  if (from === to) {
    return 0;
  }

  return 100; // BUG 1: should cost only 50 for one stop
  // return getNeighbours(from).includes(to) ? 50 : 100;
}

export function toFormattedDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours > 0 ? hours + ' hod ' : ''}${minutes} min`;
}

export function capitalise<T extends string>(text: T): Capitalize<T> {
  return `${text.charAt(0).toLocaleUpperCase()}${text
    .slice(1)
    .toLowerCase()}` as Capitalize<T>;
}
