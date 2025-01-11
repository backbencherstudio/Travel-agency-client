import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

const Cancellation = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [policy, setPolicy] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    console.log('Saved Policy:', policy)
    setIsEditing(false)
  }

  const handlePolicyChange = e => {
    setPolicy(e.target.value)
    setCharCount(e.target.value.length)
  }

  return (
    <div className='p-4 sm:p-6'>
      {/* Header Section */}
      <div className='mb-6 grid grid-cols-1 sm:grid-cols-2 justify-between items-start sm:items-center gap-4'>
        <div>
          <h2 className='text-lg sm:text-xl font-semibold mb-2 text-[#080613]'>
            Manage Cancellation Policy
          </h2>
          <p className='text-[#687588] text-sm'>
            Admin can see all fields, edit all fields, and do everything the
            system offers.
          </p>
        </div>
        {!isEditing && (
          <div className='flex justify-start sm:justify-end items-end'>
            <button
              className='bg-[#061D35] rounded px-4 py-2 text-white text-sm sm:text-[14px] hover:bg-[#050b11] transform duration-300'
              onClick={handleEdit}
            >
              Add Policy
            </button>
          </div>
        )}
      </div>

      {/* Policy Section */}
      <div className='border rounded-xl p-4 sm:p-5'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-[#1D1F2C] text-base sm:text-[18px] font-medium'>
            Cancellation Policy
          </h2>
          {!isEditing && (
            <button
              className='bg-[#FDEFEA] p-2 sm:p-3 rounded-md text-[#475467]'
              onClick={handleEdit}
            >
              <FiEdit2 className='text-lg sm:text-xl' />
            </button>
          )}
        </div>

        {/* Editing View */}
        {isEditing ? (
          <div>
            <textarea
              value={policy}
              onChange={handlePolicyChange}
              placeholder='Write your cancellation policy here...'
              className='w-full h-28 sm:h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 resize-none'
            />
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2'>
              <span className='text-gray-500 text-sm'>{charCount} / 1000</span>
              <button
                onClick={handleSave}
                className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transform duration-300'
              >
                Save Policy
              </button>
            </div>
          </div>
        ) : (
          <p className='text-gray-500 text-sm sm:text-base text-wrap'>
            {policy || 'No cancellation policy set yet.'}
          </p>
        )}
      </div>
    </div>
  )
}

export default Cancellation
