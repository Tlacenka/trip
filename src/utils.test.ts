import { describe, expect, it } from 'vitest';
import { City, FinalCity } from './constants';
import {
  calculateLuggagePrice,
  calculateTicketStats,
  capitalise,
  getDiscountedPathStats,
  getFastestPath,
  getNeighbours,
  includeDiscounts,
  isFinal,
  toFormattedDuration,
} from './utils';

describe('calculateTicketStats', () => {
  it('should calculate duration and base price for adult with no luggage', () => {
    expect(
      calculateTicketStats({
        from: 'olomouc',
        to: 'praha',
        age: 28,
        luggage: false,
      })
    ).toStrictEqual({ duration: 135, price: 500 });
  });

  it('should include discount when entered age < 15', () => {
    expect(
      calculateTicketStats({
        from: 'olomouc',
        to: 'ostrava',
        age: 10,
        luggage: false,
      })
    ).toStrictEqual({ duration: 45, price: 66 });
  });

  it('should include lugagge when entered', () => {
    expect(
      calculateTicketStats({
        from: 'olomouc',
        to: 'ostrava',
        age: 28,
        luggage: true,
      })
    ).toStrictEqual({ duration: 45, price: 250 });
  });

  it('should return special price for two final stops', () => {
    expect(
      calculateTicketStats({
        from: 'praha',
        to: 'ostrava',
        age: 28,
        luggage: false,
      })
    ).toStrictEqual({ duration: 180, price: 600 });
  });

  it('should return empty price when age is missing', () => {
    expect(
      calculateTicketStats({
        from: 'praha',
        to: 'ostrava',
        age: null,
        luggage: true,
      })
    ).toStrictEqual({ duration: 180, price: null });
  });

  it('should return zeros when entered cities are identical', () => {
    expect(
      calculateTicketStats({
        from: 'pardubice',
        to: 'pardubice',
        age: 28,
        luggage: true,
      })
    ).toStrictEqual({ duration: 0, price: 0 });
  });
});

describe('isFinal', () => {
  it.each(['brno', 'ostrava', 'praha'] satisfies FinalCity[])(
    'should classify %s as final stop',
    (city) => {
      expect(isFinal(city)).toBe(true);
    }
  );

  it.each(['pardubice', 'olomouc'] satisfies Exclude<City, FinalCity>[])(
    'should not classify %s as final stop',
    (city) => {
      expect(isFinal(city)).toBe(false);
    }
  );
});

describe('getDiscountedPathStat', () => {
  it('should get duration and price for connection between final stops', () => {
    expect(getDiscountedPathStats('brno', 'praha')).toStrictEqual({
      duration: 150,
      price: 400,
    });
  });

  it('should return zero for connection between final stops', () => {
    expect(getDiscountedPathStats('brno', 'brno')).toStrictEqual({
      duration: 0,
      price: 0,
    });
  });
});

describe('getFastestPath', () => {
  it('should return direct connection details for neighbouring Cities', () => {
    expect(getFastestPath('pardubice', 'olomouc')).toStrictEqual({
      duration: 75,
      price: 300,
    });
  });

  it('should return shortest connection details for cities with multiple paths', () => {
    expect(getFastestPath('praha', 'olomouc')).toStrictEqual({
      duration: 135,
      price: 500,
    });
  });

  it('should return zero if origin equals destination ', () => {
    expect(getFastestPath('brno', 'brno')).toStrictEqual({
      duration: 0,
      price: 0,
    });
  });
});

describe('getNeighbours', () => {
  it('should return single direct train connection for a city with one neighbour', () => {
    expect(getNeighbours('praha')).toStrictEqual(['pardubice']);
  });

  it('should return all direct train connections for a city with multiple neighbours', () => {
    expect(getNeighbours('pardubice')).toEqual(
      expect.arrayContaining(['olomouc', 'praha', 'brno'])
    );
  });
});

describe('includeDiscounts', () => {
  it.each([27, 50, 74])(
    'should return full price for adults of age %d',
    (age) => {
      expect(includeDiscounts(100, age)).toBe(100);
    }
  );

  it.each([15, 26])(
    'should return 25% discount for students of age %d',
    (age) => {
      expect(includeDiscounts(100, age)).toBe(75);
    }
  );

  it.each([0, 5, 14])(
    'should return 67% discount for children of age %d',
    (age) => {
      expect(includeDiscounts(100, age)).toBe(33);
    }
  );

  it.each([75, 100])('should return 0 for seniors of age %d', (age) => {
    expect(includeDiscounts(100, age)).toBe(0);
  });
  it('should return null for missing age', () => {
    expect(includeDiscounts(100, null)).toBe(null);
  });
});

describe('calculateLuggagePrice', () => {
  it('should return 50 when the cities are direct neighbours', () => {
    expect(calculateLuggagePrice('praha', 'pardubice')).toBe(50);
  });

  it('should return 10 when the cities are not direct neighbours', () => {
    expect(calculateLuggagePrice('praha', 'olomouc')).toBe(100);
  });

  it('should return 0 when entered cities are identical', () => {
    expect(calculateLuggagePrice('olomouc', 'olomouc')).toBe(0);
  });
});

describe('toFormattedDuration', () => {
  it('should return time in minutes formatted to a string with hours and minutes', () => {
    expect(toFormattedDuration(135)).toBe('2 hod 15 min');
  });

  it('should always include minutes even if the duration is exactly an hour', () => {
    expect(toFormattedDuration(60)).toBe('1 hod 0 min');
  });

  it('should omit hours when the duration is less than one hour', () => {
    expect(toFormattedDuration(20)).toBe('20 min');
  });

  it('should keep minutes when duration is 0', () => {
    expect(toFormattedDuration(0)).toBe('0 min');
  });
});

describe('capitalise', () => {
  it('should return string with first letter capitalised', () => {
    expect(capitalise('brno')).toBe('Brno');
  });

  it('should return te same string if the first letter is already capitalised', () => {
    expect(capitalise('Brno')).toBe('Brno');
  });

  it('should return empty string for empty input', () => {
    expect(capitalise('')).toBe('');
  });
});
