import axiosClient from "../../axiosClient";

const ClientPackageApis = {};

ClientPackageApis.all = async (type, filterParams = {}) => {
    try {
        // Build query parameters
        const queryParams = new URLSearchParams();
        
        // Add type parameter
        queryParams.append('type', type);

        // Add filter parameters if they exist
        if (filterParams.startDate) {
            queryParams.append('startDate', filterParams.startDate);
        }
        if (filterParams.endDate) {
            queryParams.append('endDate', filterParams.endDate);
        }
        if (filterParams.minPrice) {
            queryParams.append('minPrice', filterParams.minPrice);
        }
        if (filterParams.maxPrice) {
            queryParams.append('maxPrice', filterParams.maxPrice);
        }
        if (filterParams.rating?.length) {
            queryParams.append('rating', filterParams.rating.join(','));
        }
        if (filterParams.freeCancellation) {
            queryParams.append('freeCancellation', filterParams.freeCancellation);
        }
        if (filterParams.destinations?.length) {
            queryParams.append('destinations', filterParams.destinations.join(','));
        }
        if (filterParams.residences?.length) {
            queryParams.append('residences', filterParams.residences.join(','));
        }
        if (filterParams.mealPlans?.length) {
            queryParams.append('mealPlans', filterParams.mealPlans.join(','));
        }
        if (filterParams.popularAreas?.length) {
            queryParams.append('popularAreas', filterParams.popularAreas.join(','));
        }
        if (filterParams.searchQuery) {
            queryParams.append('search', filterParams.searchQuery);
        }

        const url = `/api/package?${queryParams.toString()}`;
        
        const res = await axiosClient.get(url)
            .then(response => response.data)
            .catch(error => {
                if (error.response) {
                    return {
                        errors: error.response.data.errors || null,
                        message: error.response.data.message || 'An error occurred on the server.'
                    }
                } else {
                    return { message: 'An error occurred while fetching packages.' }
                }
            });
        return res;
    } catch (error) {
        console.error('Error in ClientPackageApis.all:', error);
        throw error;
    }
}

ClientPackageApis.getOne = async (id) => {
    const url = `/api/package/${id}`
    const res = await axiosClient.get(url)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                return {
                    errors: error.response.data.errors || null,
                    message: error.response.data.message || 'An error occurred on the server.'
                }
            } else {
                return { message: 'An error occurred while fetching packages.' }
            }
        })
    return res
}

export default ClientPackageApis;