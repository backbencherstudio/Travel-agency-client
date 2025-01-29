import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import FaqApis from '../../../Apis/FaqApi'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async';


const FaqAdded = () => {
  const [showForm, setShowForm] = useState(false)
  const [allFaqs, setAllFaqs] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [currentEditId, setCurrentEditId] = useState(null)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      faqs: [{ question: '', answer: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'faqs'
  })

  useEffect(() => {
    fetchAllFaqs()
  }, [])

  const fetchAllFaqs = async () => {
    try {
      const response = await FaqApis.getAllFaq()
      if (response && response.data) {
        setAllFaqs(response.data)
      } else {
        console.error('Failed to fetch FAQs:', response.message)
      }
    } catch (error) {
      console.error('Error while fetching FAQs:', error)
    }
  }

  const onSubmit = async data => {
    try {
      if (editMode && currentEditId !== null) {
        // Update a single FAQ
        const updatedFaqs = allFaqs.map(faq =>
          faq.id === currentEditId ? { ...faq, ...data.faqs[0] } : faq
        )
        await FaqApis.createFaq({ faqs: updatedFaqs })
        toast.success('FAQ updated successfully!')
      } else {
        // Add multiple FAQs
        const combinedFaqs = [...allFaqs, ...data.faqs]
        await FaqApis.createFaq({ faqs: combinedFaqs })
        toast.success('FAQs added successfully!')
      }

      reset()
      setShowForm(false)
      setEditMode(false)
      setCurrentEditId(null)
      fetchAllFaqs()
    } catch (error) {
      toast.error('Error submitting FAQs')
    }
  }

  const handleDeleteFaq = async id => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this FAQ?',
      text: 'You won’t be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        const response = await FaqApis.deleteFaq(id)
        if (response.errors) {
          await Swal.fire('Error', response.message, 'error')
        } else {
          await Swal.fire('Deleted!', 'Your FAQ has been deleted.', 'success')
          setAllFaqs(prevData => prevData.filter(item => item.id !== id))
        }
      } catch (error) {
        await Swal.fire('Error', 'An unexpected error occurred.', 'error')
        console.error(error)
      }
    }
  }

  const handleEditFaq = faq => {
    setShowForm(true)
    setEditMode(true)
    setCurrentEditId(faq.id)
    reset({
      faqs: [{ question: faq.question, answer: faq.answer }]
    })
  }

  return (
    <div className='p-4 sm:p-6'>
       <Helmet>
        <title>Around 360 - FAQ</title>
      </Helmet>
      <div className='mb-6 flex flex-col sm:flex-row justify-between items-center'>
        <div>
          <h2 className='text-xl font-semibold mb-2 text-[#080613]'>
            FAQ Management
          </h2>
          <p className='text-[#687588] text-sm'>
            Manage and organize your FAQs to provide quick answers and enhance
            user experience.
          </p>
        </div>

        {/* Conditional Button */}
        {!showForm ? (
          <button
            className='flex text-[14px] mt-5 sm:mt-0 items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg whitespace-nowrap'
            onClick={() => {
              setShowForm(true)
              setEditMode(false) // Open form for adding FAQs
              reset({ faqs: [{ question: '', answer: '' }] })
            }}
          >
            <FaRegSquarePlus className='text-white text-xl ' />
            Add FAQ
          </button>
        ) : (
          !editMode && (
            <button
              type='button'
              onClick={() => append({ question: '', answer: '' })} // Add another FAQ
              className='flex text-[14px] mt-5 sm:mt-0 items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg'
            >
              <FaRegSquarePlus className='text-white text-xl ' />
              Add Another FAQ
            </button>
          )
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
          {fields.map((item, index) => (
            <div key={item.id} className='mb-10 border-b pb-4'>
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-medium'>FAQ {index + 1}</h3>
                {fields.length > 1 && (
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='text-red-500 hover:text-red-700 font-semibold'
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className='mt-2'>
                <label className='block mb-1 font-medium'>Question</label>
                <input
                  {...register(`faqs.${index}.question`, {
                    required: 'Question is required.'
                  })}
                  type='text'
                  placeholder='Enter the FAQ question'
                  className={`w-full p-2 border rounded-md focus:outline-none ${
                    errors?.faqs?.[index]?.question
                      ? 'border-red-500'
                      : 'focus:border-orange-400'
                  }`}
                />
                {errors?.faqs?.[index]?.question && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.faqs[index].question.message}
                  </p>
                )}
              </div>

              <div className='mt-3'>
                <label className='block mb-1 font-medium'>Answer</label>
                <textarea
                  {...register(`faqs.${index}.answer`, {
                    required: 'Answer is required.'
                  })}
                  placeholder='Enter the FAQ answer'
                  className={`w-full p-2 border rounded-md focus:outline-none ${
                    errors?.faqs?.[index]?.answer
                      ? 'border-red-500'
                      : 'focus:border-orange-400'
                  }`}
                  rows='3'
                ></textarea>
                {errors?.faqs?.[index]?.answer && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.faqs[index].answer.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className='flex gap-4 justify-between items-center'>
            <button
              type='button'
              onClick={() => setShowForm(false)}
              className='px-4 text-[14px] py-2 text-white transform duration-300 bg-gray-500 rounded-md hover:bg-gray-600'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 text-[14px] transform duration-300 py-2 text-white bg-green-500 rounded-md hover:bg-green-600'
            >
              {editMode ? 'Update FAQ' : 'Submit FAQs'}
            </button>
          </div>
        </form>
      )}

      <div className='mt-6'>
        <h3 className='text-lg font-semibold'>Existing FAQs</h3>
        {allFaqs.length > 0 ? (
          <ul className='mt-4'>
            {allFaqs.map(faq => (
              <li
                key={faq.id}
                className='border-b py-2 flex justify-between items-center'
              >
                <div>
                  <p className='font-medium'>Q: {faq.question}</p>
                  <p className='text-gray-700'>A: {faq.answer}</p>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => handleEditFaq(faq)}
                    className='text-blue-500 hover:text-blue-700 font-semibold flex items-center'
                  >
                    <FaEdit className='mr-2' />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq.id)}
                    className='text-red-500 hover:text-red-700 font-semibold'
                  >
                    <LuTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500'>No FAQs available.</p>
        )}
      </div>
    </div>
  )
}

export default FaqAdded
