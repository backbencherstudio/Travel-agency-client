import React, { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import TinyMCE from '../../../Shared/TinyMCE'
import { useForm } from 'react-hook-form'
import axiosClient from '../../../axiosClient'
import CancellationApi from '../../../Apis/CancellationApi'
import WebsiteInfoApis from '../../../Apis/WebsiteInfoApis'

const Cancellation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      body: ''
    }
  })
  const [body, setBody] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [policy, setPolicy] = useState('')
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    getCancellationData();
  }, [])

  const getCancellationData = async () => {
    const res = await CancellationApi.getAllCancellation();
    console.log('res', res)
    if (res.success) {
      setBody(res.data?.cancellation_policy)
    }
  }
  
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (data) => {
    console.log('Saved Policy:', data)
    const cancellation_policy = { cancellation_policy: data?.body };
    // console.log('Saved Policy:', policy)
    const res = await WebsiteInfoApis.save(cancellation_policy);
  }

  // const handlePolicyChange = e => {
  //   setPolicy(e.target.value)
  //   setCharCount(e.target.value.length)
  // }

  // Handle editor content changes
  const handleEditorChange = newContent => {
    const textContent = newContent.replace(/<[^>]*>/g, '').trim()
    setBody(newContent)
    setValue('body', newContent)
    if (!textContent) {
      trigger('body')
    } else {
      clearErrors('body')
    }
  }
  // console.log('body', body)
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
        {/* {!isEditing && (
          <div className='flex justify-start sm:justify-end items-end'>
            <button
              className='bg-[#061D35] rounded px-4 py-2 text-white text-sm sm:text-[14px] hover:bg-[#050b11] transform duration-300'
              onClick={handleEdit}
            >
              Add Policy
            </button>
          </div>
        )} */}
      </div>

      {/* Policy Section */}
      <div className='border rounded-xl p-4 sm:p-5'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-[#1D1F2C] text-base sm:text-[18px] font-medium'>
            Cancellation Policy
          </h2>
          {/* {!isEditing && (
            <button
              className='bg-[#FDEFEA] p-2 sm:p-3 rounded-md text-[#475467]'
              onClick={handleEdit}
            >
              <FiEdit2 className='text-lg sm:text-xl' />
            </button>
          )} */}
        </div>

        {/* Editing View */}
        {/* {body ? ( */}
          <div>
            <form onSubmit={handleSubmit(handleSave)}>
              {/* <textarea
                value={policy}
                onChange={handlePolicyChange}
                placeholder='Write your cancellation policy here...'
                className='w-full h-28 sm:h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 resize-none'
              /> */}
              <TinyMCE
                value={body}
                onChange={handleEditorChange}
                height={400}
                plugins={[
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount'
                ]}
                toolbar='undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
            />
            {errors.body && (
              <span className='text-red-500 text-sm block mt-1'>
                {errors.body.message}
              </span>
            )}
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2'>
                {/* <span className='text-gray-500 text-sm'>{charCount} / 1000</span> */}
                <span className='text-gray-500 text-sm'>Add or Update the Contents</span>
                <button
                  type='submit'
                  // onClick={handleSave}
                  className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transform duration-300'
                >
                  Save Policy
                </button>
              </div>
            </form>
          </div>
        {/* ) : ( */}
          {/* <p className='text-gray-500 text-sm sm:text-base text-wrap'>
            {policy || 'No cancellation policy set yet.'}
          </p> */}
        {/* )} */}
      </div>
    </div>
  )
}

export default Cancellation
