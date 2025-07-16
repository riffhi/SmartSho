// riffhi-smartsho/src/services/returnService.ts
const API_BASE = 'http://localhost:5000/api'; // adjust if using a different port

export async function createReturnRequest(data: any) {
  const res = await fetch(`${API_BASE}/returns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create return');
  return res.json();
}
