import React from 'react'
import {
    Dialog,
    DialogContent
  } from '@mui/material'

const AddEditModal = ({ mode, openModal, handleCloseModal, handleSubmit, onSubmit, register, errors, loading }) => {
  return (
    <div>
        <Dialog open={openModal} onClose={handleCloseModal}>
            <h1 className="text-center text-[#080613] text-lg font-semibold my-4">
                {mode === 'edit' ? 'Edit Coupon' : 'Add Coupon'}
            </h1>
            <DialogContent className="transition-all">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Discount Name */}
                <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Enter discount name"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                        errors.name ? 'border-red-500' : ''
                    }`}
                    />
                    {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Enter description"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                        errors.description ? 'border-red-500' : ''
                    }`}
                    />
                    {errors.description && (
                    <span className="text-red-500 text-sm">
                        {errors.description.message}
                    </span>
                    )}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-4'>
                    {/* Amount Type */}
                    <div>
                        <label className="block mb-2 font-medium">Amount Type</label>
                        <select
                        {...register('amount_type', { required: 'Amount Type is required' })}
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                            errors.amount_type ? 'border-red-500' : ''
                        }`}
                        >
                        <option value="">Select Type</option>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed</option>
                        </select>
                        {errors.amount_type && (
                        <span className="text-red-500 text-sm">
                            {errors.amount_type.message}
                        </span>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block mb-2 font-medium">Amount</label>
                        <input
                        type="number"
                        {...register('amount', { required: 'Amount is required', valueAsNumber: true, })}
                        placeholder="Enter amount"
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                            errors.amount ? 'border-red-500' : ''
                        }`}
                        />
                        {errors.amount && (
                        <span className="text-red-500 text-sm">{errors.amount.message}</span>
                        )}
                    </div>

                    {/* Max Uses */}
                    <div>
                        <label className="block mb-2 font-medium">Max Uses</label>
                        <input
                        type="number"
                        {...register('max_uses', { required: 'Max uses is required', valueAsNumber: true, })}
                        placeholder="Enter max uses"
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                            errors.max_uses ? 'border-red-500' : ''
                        }`}
                        />
                        {errors.max_uses && (
                        <span className="text-red-500 text-sm">{errors.max_uses.message}</span>
                        )}
                    </div>

                    {/* Max Uses Per User */}
                    <div>
                        <label className="block mb-2 font-medium">Max Uses Per User</label>
                        <input
                        type="number"
                        {...register('max_uses_per_user', {
                            required: 'Max uses per user is required', valueAsNumber: true,
                        })}
                        placeholder="Enter max uses per user"
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                            errors.max_uses_per_user ? 'border-red-500' : ''
                        }`}
                        />
                        {errors.max_uses_per_user && (
                        <span className="text-red-500 text-sm">
                            {errors.max_uses_per_user.message}
                        </span>
                        )}
                    </div>
                </div>
                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block mb-2 font-medium">Starts At</label>
                    <input
                        type="date"
                        {...register('starts_at', { required: 'Start date is required' })}
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                        errors.starts_at ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.starts_at && (
                        <span className="text-red-500 text-sm">
                        {errors.starts_at.message}
                        </span>
                    )}
                    </div>
                    <div>
                    <label className="block mb-2 font-medium">Expires At</label>
                    <input
                        type="date"
                        {...register('expires_at', { required: 'Expiry date is required' })}
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                        errors.expires_at ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.expires_at && (
                        <span className="text-red-500 text-sm">
                        {errors.expires_at.message}
                        </span>
                    )}
                    </div>
                </div>
                {/* Minimums */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Min Type</label>
                        <select
                            {...register('min_type', { required: 'Min type is required' })}
                            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                            errors.min_type ? 'border-red-500' : ''
                            }`}
                        >
                            <option value="">Select Type</option>
                            <option value="amount">Amount</option>
                            <option value="quantity">Quantity</option>
                        </select>
                        {errors.min_type && (
                            <span className="text-red-500 text-sm">
                            {errors.min_type.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Min Amount</label>
                        <input
                            type="number"
                            {...register('min_amount', { required: 'Min amount is required', valueAsNumber: true, })}
                            placeholder="Enter min amount"
                            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                            errors.min_amount ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.min_amount && (
                            <span className="text-red-500 text-sm">
                            {errors.min_amount.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Min Quantity</label>
                        <input
                            type="number"
                            {...register('min_quantity', { required: 'Min amount is required', valueAsNumber: true, })}
                            placeholder="Enter min quantity"
                            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                            errors.min_quantity ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.min_quantity && (
                            <span className="text-red-500 text-sm">
                            {errors.min_quantity.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end items-center gap-4">
                    <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-[#EB5B2A] transform duration-300 hover:text-white hover:border-[#EB5B2A]"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="bg-[#EB5B2A] text-md px-4 py-2 text-white rounded-lg"
                    >
                        {loading ? `${mode === 'edit' ? 'Updating...' : ' Saving...'}` : `${mode === 'edit' ? 'Update' : ' Save'}`}
                    </button>
                </div>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddEditModal