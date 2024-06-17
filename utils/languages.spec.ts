import { describe, expect, it } from 'vitest'
import { langs, Direction } from './languages'
describe('Language', () => {
  it('should return the correct language code', () => {
    expect(langs[0].code).toBe('en');
    expect(langs[1].code).toBe('ar');
  });

  it('should return the correct language name', () => {
    expect(langs[0].name).toBe('English');
    expect(langs[1].name).toBe('Arabic');
  });

  it('should return the correct language direction', () => {
    expect(langs[0].dir).toBe(Direction.ltr);
    expect(langs[1].dir).toBe(Direction.rtl);
  });

  it('should have valid flag URLs', () => {
    expect(langs[0].flag).toMatch(/https:\/\/flagcdn\.com\/w40\/us\.png/);
    expect(langs[1].flag).toMatch(/https:\/\/flagcdn\.com\/w40\/sa\.png/);
  });

  it('should have valid file names', () => {
    expect(langs[0].file).toBe('en-US.json');
    expect(langs[1].file).toBe('ar-SA.json');
  });
});
