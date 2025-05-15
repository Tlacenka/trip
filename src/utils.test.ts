import { describe, expect, it } from 'vitest';
import { getFastestPath, getNeighbours, toFormattedDuration } from './utils';
describe('getNeighbours', () => {
  it('should return single direct train connection for a given city', () => {
    expect(getNeighbours('praha')).toStrictEqual(['pardubice']);
  });

  it('should return all direct train connections for a given city', () => {
    expect(getNeighbours('pardubice')).toEqual(
      expect.arrayContaining(['olomouc', 'praha', 'brno'])
    );
  });
});

describe('getFastestPathStats', () => {
  it('should return direct connection details for neighbouring Cities', () => {
    expect(getFastestPath('pardubice', 'olomouc')).toStrictEqual({
      duration: 1.25,
      price: 300,
    });
  });

  it('should return shortest connection details for cities with multiple paths', () => {
    expect(getFastestPath('praha', 'olomouc')).toStrictEqual({
      duration: 2.25,
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

describe('toFormattedDuration', () => {
  it('should return time in minutes formatted to a string with hours and minutes', () => {
    expect(toFormattedDuration(135)).toBe('2 hod 15 min');
  });
});
