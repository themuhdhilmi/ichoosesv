import { toast } from 'react-toastify'
import { create } from 'zustand'

enum SuccessState {
  NONE = 'NONE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type StudentStore = {
  loading: boolean
  data: any
  success: SuccessState
  sendData: (postData: any) => Promise<void>
}

export const useAddStudentMember = create<StudentStore>((set) => ({
  data: {},
  loading: false,
  success: SuccessState.NONE,
  sendData: async (postData) => {
    try {
      set({
        loading: true,
        success: SuccessState.NONE,
      })
      // Make your fetch API call here
      const response = await fetch('/api/v1/AUTH/manageUser/studentMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      const data = await response.json()

      // Update the state based on the fetched data
      if (response.ok) {
        toast.success('Sucessfully added student member', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        set((state) => ({
          data: data, // Adjust this based on your API response structure
          loading: false,
          success: SuccessState.SUCCESS,
        }))
      } else {
        toast.error('Failed add student member, ' + JSON.stringify(data), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        set((state) => ({
          data: data, // Adjust this based on your API response structure
          loading: false,
          success: SuccessState.ERROR,
        }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      set({
        loading: false,
        success: SuccessState.ERROR,
      })
    }
  },
}))
