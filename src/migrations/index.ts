import * as migration_20260419_160433_init from './20260419_160433_init';

export const migrations = [
  {
    up: migration_20260419_160433_init.up,
    down: migration_20260419_160433_init.down,
    name: '20260419_160433_init'
  },
];
