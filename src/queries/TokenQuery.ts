export function useTokenQuery(): string | null {
  return localStorage.getItem('token');
}
