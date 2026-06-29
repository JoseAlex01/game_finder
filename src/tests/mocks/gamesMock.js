export const gamesMock = [
  {
    id: 1,
    title: 'Mock Shooter',
    thumbnail: 'https://example.com/mock-shooter.jpg',
    short_description: 'A mocked shooter game.',
    game_url: 'https://example.com/mock-shooter',
    genre: 'Shooter',
    platform: 'Windows',
    publisher: 'Mock Publisher',
    developer: 'Mock Studio',
    release_date: '2026-01-15',
  },
  {
    id: 2,
    title: 'Mock Strategy',
    thumbnail: 'https://example.com/mock-strategy.jpg',
    short_description: 'A mocked strategy game.',
    game_url: 'https://example.com/mock-strategy',
    genre: 'Strategy',
    platform: 'Web Browser',
    publisher: 'Mock Publisher',
    developer: 'Mock Lab',
    release_date: '2025-08-20',
  },
];

export const gameDetailMock = {
  ...gamesMock[0],
  description: 'Detailed mocked game description.',
  screenshots: [
    {
      id: 11,
      image: 'https://example.com/mock-screenshot-1.jpg',
    },
  ],
};
