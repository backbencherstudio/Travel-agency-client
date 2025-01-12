import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import TinyMCE from '../../../Shared/TinyMCE'
import BlogApis from '../../../Apis/BlogApi'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'

const AddBlog = () => {
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)

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
      title: '',
      body: ''
    }
  })

  // Image upload handlers remain the same
  const onImageDrop = acceptedFiles => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
    setIsDragging(false)
  }

  const imageDropzone = useDropzone({
    onDrop: onImageDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: true,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  })

  const handleDeleteImage = index => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      if (prev[index]?.preview) {
        URL.revokeObjectURL(prev[index].preview)
      }
      return newImages
    })
  }

  // Modified editor change handler
  const handleEditorChange = newContent => {
    setBody(newContent)
    setValue('body', newContent)
    if (errors.body) {
      trigger('body')
    }
  }

  // Modified form submission handler
  const onSubmit = async data => {
    setLoading(true) // Start loading

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('body', data.body)

    images.forEach((image, index) => {
      if (image.file) {
        formData.append(`images`, image.file)
      }
    })

    try {
      const response = await BlogApis.createBlogPost(formData)

      if (response?.errors) {
        console.error('API Errors:', response.errors)
        toast.error(`Failed to submit the blog: ${response.message}`)
      } else {
        toast.success('Blog post created successfully!')
        handleFormReset()
      }
    } catch (error) {
      console.error('Error while submitting the blog:', error)
      toast.error('An unexpected error occurred while submitting the blog.')
    } finally {
      setLoading(false)
    }
  }

  // New function to handle form reset
  const handleFormReset = () => {
    reset({ title: '', body: '' })
    setBody('')
    setImages([])
    clearErrors()
  }

  useEffect(() => {
    // Modified registration with less strict validation
    register('body', {
      required: 'Content is required',
      validate: value => {
        if (!value) return 'Content is required'
        const textContent = value.replace(/<[^>]*>/g, '').trim()
        return textContent.length > 0 || 'Content cannot be empty'
      }
    })
  }, [register])

  // Cleanup effect remains the same
  useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview)
        }
      })
    }
  }, [])
  return (
    <div>
      <h1 className='text-[#0D0E0D] text-[20px] py-5'>Create your blog</h1>
      {/* Loading Overlay */}
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'>
          <CircularProgress size={50} style={{ color: '#EB5B2A' }} />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='bg-white p-5 rounded-lg'
      >
        {/* Title input */}
        <div>
          <label className='block mb-2 font-medium'>Title</label>
          <input
            type='text'
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters long'
              }
            })}
            placeholder='Enter your Title'
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && (
            <span className='text-red-500 text-sm'>{errors.title.message}</span>
          )}
        </div>

        {/* Image Upload Section */}
        <div className='w-full mt-6'>
          <h2 className='block mb-2 font-medium'>Upload Images</h2>
          <div
            {...imageDropzone.getRootProps()}
            className={`border border-dashed border-gray-400 bg-white flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${
              isDragging
                ? 'bg-purple-900/50 border-purple-600'
                : 'border-gray-200 hover:border-orange-500'
            }`}
          >
            <input {...imageDropzone.getInputProps()} />
            <svg
              className='w-10 h-10 mb-3 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            <p className='text-sm md:text-base text-black'>
              Drag & Drop or{' '}
              <span className='text-orange-500'>Choose Files</span>
            </p>
            <p className='mt-1 text-xs md:text-sm text-gray-400'>
              Supported formats: JPEG, PNG
            </p>
          </div>

          {/* Image Previews */}
          <div className='mt-4 flex flex-wrap gap-4'>
            {images.map((image, index) => (
              <div key={index} className='relative group'>
                <img
                  src={image.preview || image?.image_url}
                  alt={`Upload preview ${index + 1}`}
                  className='w-24 h-24 object-cover rounded-lg border border-gray-200'
                />
                <button
                  type='button'
                  onClick={() => handleDeleteImage(index)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TinyMCE Editor */}
        <div className='mt-4'>
          <label className='block mb-2 font-medium'>Content</label>
          <TinyMCE
            value={body}
            onChange={handleEditorChange}
            height={500}
            plugins={['lists', 'link', 'image', 'code']}
            toolbar='undo redo | bold italic | alignleft aligncenter | numlist bullist | link image'
          />
          {errors.body && (
            <span className='text-red-500 text-sm block mt-1'>
              {errors.body.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className='flex justify-end  mt-5'>
          <button
            type='submit'
            disabled={loading}
            className='bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-400'
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBlog
