import axiosClient from '../../axiosClient'

export const getFaqs = async () => {
  try {
    const response = await axiosClient.get('/api/faq')
    return response.data
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    throw error
  }
}
