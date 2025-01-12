import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import TinyMCE from '../../../Shared/TinyMCE'
import BlogApis from '../../../Apis/BlogApi'

const AddBlog = () => {
  const { id } = useParams()

  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [blogData, setBlogData] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)
  
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

  // Fetch blog data when editing
  useEffect(() => {
    const fetchBlogById = async () => {
      if (!id) return

      setLoading(true)

      try {
        const response = await BlogApis.getBlogPost(id)

        if (response?.errors) {
          toast.error(`Error: ${response.message}`)
          return
        }

        if (response?.data) {
          setBlogData(response.data)
          const { title, body: blogBody, blog_images } = response.data

          // Set form data
          reset({
            title: title || '',
            body: blogBody || ''
          })

          setBody(blogBody || '')

          // Handle existing images
          if (Array.isArray(blog_images) && blog_images.length) {
            const existingImages = blog_images.map(img => ({
              image_url: img.image_url,
              image: img.image,
              isExisting: true
            }))
            setImages(existingImages)
          }
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
        toast.error('Failed to load blog data')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogById()
  }, [id, reset])

  // Dropzone configuration
  const onImageDrop = acceptedFiles => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true
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

  // Handle image deletion
  const handleDeleteImage = index => {
    setImages(prev => {
      const newImages = [...prev]
      if (newImages[index]?.preview) {
        URL.revokeObjectURL(newImages[index].preview)
      }
      newImages.splice(index, 1)
      return newImages
    })
  }

  // Register body field for validation
  useEffect(() => {
    register('body', {
      required: 'Content is required',
      validate: value => {
        const textContent = value.replace(/<[^>]*>/g, '').trim()
        return textContent.length > 0 || 'Content cannot be empty'
      }
    })
  }, [register])

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

  // Form submission
  const onSubmit = async formData => {
    setLoading(true)

    try {
      const reqData = new FormData()
      reqData.append('title', formData.title)
      reqData.append('body', formData.body)

      // Handle images - separate new and existing images
      const newImages = images.filter(img => img.isNew)
      const existingImages = images.filter(img => img.isExisting)

      // Append new images
      newImages.forEach(img => {
        if (img.file) {
          reqData.append('images', img.file)
        }
      })

      // Append existing images
      existingImages.forEach(img => {
        reqData.append('existingImages', img.image)
      })

      const response = id
        ? await BlogApis.updateBlogPost(id, reqData)
        : await BlogApis.createBlogPost(reqData)

      if (response?.errors) {
        toast.error(`Failed: ${response.message}`)
      } else {
        toast.success(
          id ? 'Blog updated successfully!' : 'Blog created successfully!'
        )

        if (response?.data?.updated_at) {
          setUpdatedAt(response.data.updated_at)
        }

        if (!id) {
          reset({ title: '', body: '' })
          setBody('')
          setImages([])
          clearErrors()
        }
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Form reset handler
  const handleFormReset = () => {
    reset({ title: '', body: '' })
    setBody('')
    setImages([])
    clearErrors()
  }

  // Cleanup image previews
  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview)
        }
      })
    }
  }, [images])

  return (
    <div className='mx-auto'>
      <h1 className='text-[#0D0E0D] text-[20px] py-5'>
        {id ? 'Update Blog' : 'Create New Blog'}
      </h1>

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
        {/* Title Input */}
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
            placeholder='Enter blog title'
            className={`w-full p-2 border rounded-md focus:outline-none focus:border-orange-400 
              ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && (
            <span className='text-red-500 text-sm'>{errors.title.message}</span>
          )}
        </div>

        {/* Image Upload */}
        <div className='mt-6'>
          <h2 className='block mb-2 font-medium'>Upload Images</h2>
          <div
            {...imageDropzone.getRootProps()}
            className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer
              ${
                isDragging
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-orange-400'
              }`}
          >
            <input {...imageDropzone.getInputProps()} />
            <div className='space-y-2'>
              <svg
                className='mx-auto h-12 w-12 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 48 48'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 14v20c0 4.418 7.163 8 16 8s16-3.582 16-8V14'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M24 14c8.837 0 16-3.582 16-8s-7.163-8-16-8S8 2.582 8 6s7.163 8 16 8z'
                />
              </svg>
              <p className='text-sm text-gray-600'>
                Drop images here or click to upload
              </p>
            </div>
          </div>

          {/* Image Previews */}
          <div className='mt-4 flex flex-wrap gap-4'>
            {images.map((image, index) => (
              <div
                key={index}
                className='relative w-28 h-24 rounded-lg overflow-hidden group'
              >
                <img
                  src={image.preview || image.image_url}
                  alt={`Preview ${index + 1}`}
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  onClick={() => handleDeleteImage(index)}
                  className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6
                           flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TinyMCE Editor */}
        <div className='mt-6'>
          <label className='block mb-2 font-medium'>Content</label>
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
        </div>

        {/* Submit Button */}
        <div className='flex justify-end gap-4 mt-6'>
          <button
            type='button'
            onClick={handleFormReset}
            className='px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50'
          >
            Reset
          </button>
          <button
            type='submit'
            disabled={loading}
            className='px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600
              disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {loading ? 'Saving...' : id ? 'Update Blog' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBlog