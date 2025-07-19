// riffhi-smartsho/src/services/greenbitsService.ts
const API_BASE = 'http://localhost:5000/api';

export async function fetchGreenBits(userId: string) {
  const res = await fetch(`${API_BASE}/greenbits/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch GreenBits');
  return res.json();
}
