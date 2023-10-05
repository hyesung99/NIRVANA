import { getItem, setItem, deleteItem } from '@/core/localStorage';

interface Token {
  token: string;
}

const _NIRVANA_LOCAL_STORAGE_KEYS = {
  token: 'token',
  userData: 'userData'
};

type NirvanaStorageKeys = keyof typeof _NIRVANA_LOCAL_STORAGE_KEYS;

const NirvanaLocalStorage = {
  getToken: (key: NirvanaStorageKeys) => getItem<Token>(key),
  setToken: (key: NirvanaStorageKeys, value: unknown) => setItem(key, value),
  deleteToken: (key: NirvanaStorageKeys) => deleteItem(key)
};

export default NirvanaLocalStorage;
