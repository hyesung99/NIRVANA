import { getItem, setItem, deleteItem } from '@/core/localStorage';

interface Token {
  token: string;
}

const _NIRVANA_LOCAL_STORAGE_KEYS = {
  token: 'token',
  userData: 'userData'
};

const NirvanaLocalStorage = {
  getToken: () => getItem<Token>(_NIRVANA_LOCAL_STORAGE_KEYS.token),
  setToken: (value: Token) => setItem(_NIRVANA_LOCAL_STORAGE_KEYS.token, value),
  deleteToken: () => deleteItem(_NIRVANA_LOCAL_STORAGE_KEYS.token)
};

export default NirvanaLocalStorage;
