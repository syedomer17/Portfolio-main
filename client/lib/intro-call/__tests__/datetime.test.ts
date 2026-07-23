import { parseWallClockIso } from '../datetime';

describe('parseWallClockIso', () => {
  it('should parse valid ISO strings with seconds', () => {
    const result = parseWallClockIso('2023-10-25T14:30:45');
    expect(result).toEqual({
      year: 2023,
      monthIndex: 9,
      day: 25,
      hour: 14,
      minute: 30,
    });
  });

  it('should parse valid ISO strings without seconds', () => {
    const result = parseWallClockIso('2023-10-25T14:30');
    expect(result).toEqual({
      year: 2023,
      monthIndex: 9,
      day: 25,
      hour: 14,
      minute: 30,
    });
  });

  it('should return null for strings missing the T separator', () => {
    expect(parseWallClockIso('2023-10-25 14:30')).toBeNull();
  });

  it('should return null for malformed year', () => {
    expect(parseWallClockIso('23-10-25T14:30')).toBeNull();
    expect(parseWallClockIso('20023-10-25T14:30')).toBeNull();
  });

  it('should return null for malformed month', () => {
    expect(parseWallClockIso('2023-1-25T14:30')).toBeNull();
    expect(parseWallClockIso('2023-010-25T14:30')).toBeNull();
  });

  it('should return null for malformed day', () => {
    expect(parseWallClockIso('2023-10-5T14:30')).toBeNull();
    expect(parseWallClockIso('2023-10-025T14:30')).toBeNull();
  });

  it('should return null for malformed hour', () => {
    expect(parseWallClockIso('2023-10-25T4:30')).toBeNull();
    expect(parseWallClockIso('2023-10-25T014:30')).toBeNull();
  });

  it('should return null for malformed minute', () => {
    expect(parseWallClockIso('2023-10-25T14:3')).toBeNull();
    expect(parseWallClockIso('2023-10-25T14:030')).toBeNull();
  });

  it('should return null for malformed seconds', () => {
    expect(parseWallClockIso('2023-10-25T14:30:5')).toBeNull();
    expect(parseWallClockIso('2023-10-25T14:30:050')).toBeNull();
  });

  it('should return null for completely invalid strings', () => {
    expect(parseWallClockIso('invalid')).toBeNull();
    expect(parseWallClockIso('')).toBeNull();
    expect(parseWallClockIso('random string')).toBeNull();
  });

  it('should properly extract monthIndex as 0-indexed', () => {
    const result = parseWallClockIso('2023-01-25T14:30');
    expect(result?.monthIndex).toBe(0); // January

    const result2 = parseWallClockIso('2023-12-25T14:30');
    expect(result2?.monthIndex).toBe(11); // December
  });
});
