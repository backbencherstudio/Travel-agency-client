import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentErros = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 border-4 border-red-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-red-500">✕</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-3">Payment Failed</h1>
                    <p className="text-gray-600 mb-6">
                        Oops! Something went wrong with your payment. Please try again or contact support if the problem persists.
                    </p>
                </div>
                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentErros;