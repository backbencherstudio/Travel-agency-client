import React, { createContext, useContext, useState, useEffect } from 'react';
import ClientDestinationApis from '../../Apis/clientApi/ClientDestinationApis';
import ClientCancellationPolicyApis from '../../Apis/clientApi/ClientCancellationPolicyApis';

const TravelDataContext = createContext();

export const TravelDataProvider = ({ children }) => {
    const [destinations, setDestinations] = useState([]);
    const [cancellationPolicies, setCancellationPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch destinations
                const destinationsResponse = await ClientDestinationApis.get();
                if (destinationsResponse.success) {
                    setDestinations(destinationsResponse.data);
                }

                // Fetch cancellation policies
                const policiesResponse = await ClientCancellationPolicyApis.get();
                if (policiesResponse.success) {
                    setCancellationPolicies(policiesResponse.data);
                }
            } catch (err) {
                setError('Failed to fetch travel data');
                console.error('Error fetching travel data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const value = {
        destinations,
        cancellationPolicies,
        loading,
        error
    };

    return (
        <TravelDataContext.Provider value={value}>
            {children}
        </TravelDataContext.Provider>
    );
};

// Custom hook for using the travel data context
export const useTravelData = () => {
    const context = useContext(TravelDataContext);
    if (!context) {
        throw new Error('useTravelData must be used within a TravelDataProvider');
    }
    return context;
}; 