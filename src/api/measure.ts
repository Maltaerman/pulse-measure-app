import { type IMeasure } from '@/api'

const BASE_URL = import.meta.env.VITE_BASE_URL
const ENDPOINT = `${BASE_URL}/measures`

export const measureApi = {
  get: () => fetch(ENDPOINT).then((res) => res.json()),

  create: (data: IMeasure) =>
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  delete: (id: IMeasure['id']) => fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' }),
}
