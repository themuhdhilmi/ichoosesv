import { create } from 'zustand'

type SessionStore = {
  data: any
  loading: boolean
  fetchData: (id: string) => Promise<void>
}

export const useGetQuestionById = create<SessionStore>((set) => ({
  data: {},
  loading: false,
  fetchData: async (id) => {
    try {
      set({
        loading: true,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/QUIZ/question/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          cache : "no-store"
        },
      })
      const data = await response.json()

      if (response.ok) {
        // Update the state based on the fetched data
        set((state) => ({
          loading: false,
          data: data,
        }))
      } else {
        // Update the state based on the fetched data
        set((state) => ({
          loading: false,
        }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
      })
    }
  },
}))
