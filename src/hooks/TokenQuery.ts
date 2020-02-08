import { useState } from 'react';

export function useTokenQuery() {
  const [token] = useState<string | null>(localStorage.getItem('token'));

  return { token };
}
