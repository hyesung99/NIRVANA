import { getItem, setItem, deleteItem } from '@/core/localStorage';

const _NIRVANA_LOCAL_STORAGE_KEYS = {
  token: 'token',
  userData: 'userData'
};

type NirvanaStorageKeys = keyof typeof _NIRVANA_LOCAL_STORAGE_KEYS;

const NirvanaLocalStorage = {
  getItem: (key: NirvanaStorageKeys) => getItem(key),
  setItem: (key: NirvanaStorageKeys, value: unknown) => setItem(key, value),
  deleteItem: (key: NirvanaStorageKeys) => deleteItem(key)
};

export default NirvanaLocalStorage;
