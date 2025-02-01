import axiosClient from '../axiosClient'

// Function to post social media data
export const postSocialMediaData = async socialMediaData => {
  try {
    const response = await axiosClient.post(
      '/api/admin/social-media',
      socialMediaData
    )
    console.log('Success:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Error posting social media data:',
      error.response?.data || error.message
    )
    throw error
  }
}

// Function to get social media data
export const getSocialMediaData = async () => {
  try {
    const response = await axiosClient.get('/api/admin/social-media')
    // console.log('Fetched Social Media Data:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Error fetching social media data:',
      error.response?.data || error.message
    )
    throw error
  }
}

// Function to update social media data
export const updateSocialMediaData = async (id, updatedData) => {
  try {
    const response = await axiosClient.patch(
      `/api/admin/social-media/${id}`,
      updatedData
    )
    console.log('Successfully updated social media data:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Error updating social media data:',
      error.response?.data || error.message
    )
    throw error
  }
}


// Function to delete social media data
export const deleteSocialMediaData = async (id) => {
    try {
      const response = await axiosClient.delete(`/api/admin/social-media/${id}`);
      console.log('Successfully deleted social media data:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error deleting social media data:',
        error.response?.data || error.message
      );
      throw error;
    }
  };
  
