export enum Direction {
  ltr = 'ltr',
  rtl = 'rtl',
}

export interface Language {
  code: string;
  iso?: string;
  name: string;
  file?: string;
  dir: Direction;
  flag?: string;
}

export const langs: Language[] = [
  {
    code: 'en',
    iso: 'en-US',
    name: 'English',
    file: 'en-US.json',
    dir: Direction.ltr,
    flag: 'https://flagcdn.com/w40/us.png'
  },
  {
    code: 'ar',
    iso: 'ar-EG',
    name: 'Arabic',
    file: 'ar-SA.json',
    dir: Direction.rtl,
    flag: 'https://flagcdn.com/w40/sa.png'
  }
]
