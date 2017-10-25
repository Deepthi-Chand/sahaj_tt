import { State } from './types';

const key = '__state';

export const loadState = (): State => {
  try {
    const serialized = localStorage.getItem(key);
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state: State) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.log('write to store failed...');
    // ignore write errors...
  }
}
