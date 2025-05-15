import {
  CITIES,
  City,
  DIRECT_CONNECTIONS,
  FinalCity,
  SPECIAL_CONNECTIONS,
} from './constants';

export function capitalise<T extends string>(text: T): Capitalize<T> {
  return `${text.charAt(0).toLocaleUpperCase()}${text
    .slice(1)
    .toLowerCase()}` as Capitalize<T>;
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

export function calculateTicketStats(input: {
  from: City;
  to: City;
  age: number;
  luggage: boolean;
}) {
  const { from, to, age, luggage } = input;
  // TODO fix types for readonly type union -> Final city

  const { duration, price } =
    isFinal(input.from) && isFinal(input.to)
      ? getDiscountedPath(from as FinalCity, to as FinalCity)
      : getFastestPath(from, to);

  const finalPrice =
    includeDiscounts(price, age) + calculateLuggagePrice(luggage, from, to);

  return { duration, price: finalPrice };
}

function isFinal(city: City) {
  return ['brno', 'praha', 'ostrava'].includes(city);
}

export function getDiscountedPath(from: FinalCity, to: FinalCity) {
  if (from === to) {
    return { duration: 0, price: 0 };
  }

  const connection = SPECIAL_CONNECTIONS.find(
    ({ cities }) => cities.includes(from) && cities.includes(to)
  )!;

  return { duration: connection.duration, price: connection.price };
}

export function includeDiscounts(price: number, age: number) {
  if (age < 15) {
    return twoDecimals(price * 0.33);
  } else if (age >= 15 && age <= 26) {
    return twoDecimals(price * 0.75);
  } else if (age >= 75) {
    return 0;
  }
  return price;
}

function twoDecimals(value: number) {
  return Number((Math.round(value * 100) / 100).toFixed(2));
}

export function calculateLuggagePrice(luggage: boolean, from: City, to: City) {
  if (!luggage) {
    return 0;
  }

  return getNeighbours(from).includes(to) ? 50 : 100;
}

export function toFormattedDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours} hod ${minutes} min`;
}
