/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const CardComponent = ({ blog }) => {
  const formatDate = dateString => {
    if (!dateString) return 'Unknown Date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const truncateHTML = (html, maxLength) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html 
    const plainText = tempDiv.textContent || tempDiv.innerText || ''
    return plainText.length > maxLength
      ? `${plainText.substring(0, maxLength)}...`
      : plainText
  }

  return (
    <div className='h-full'>
      <Link to={`/blogDetails/${blog.id}`}>
        <div className='relative flex flex-col group bg-white shadow-md hover:shadow-lg hover:border-orange-500 transform duration-300 border border-slate-200 rounded-xl h-full'>
          <div className='relative h-56 overflow-hidden text-white rounded-t-xl'>
            <img
              src={blog.image || 'https://via.placeholder.com/300x200'}
              alt='card-image'
              className='object-cover w-full h-full'
            />
            <div className='absolute top-0 left-0 bg-[#F5F7F9] text-[#323B47] px-3 pb-1 m-4 rounded-full text-xs font-bold'>
              Recently Added
            </div>
          </div>
          <div className='p-4 flex flex-col justify-between h-full'>
            <div>
              <div className='flex items-center gap-1'>
                <div className='mb-5 bg-[#E7ECF2] text-[#0E457D] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#0E457D]'>
                  <p>
                    {blog.readTime || '5'}
                    <span> mins read</span>
                  </p>
                </div>
                <div className='mb-5 bg-[#FDEFEA] text-[#EB5B2A] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#EB5B2A]'>
                  {formatDate(blog.createTime)}
                </div>
              </div>
              <h6 className='mb-2 text-slate-800 text-xl font-bold line-clamp-2 group-hover:text-blue-500 transform duration-300'>
                {blog.title || 'Untitled Blog'}
              </h6>
              <p
                className='text-[#65666b] leading-normal text-base font-light line-clamp-3'
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(blog.body, 80)
                }}
              ></p>
            </div>
            <div className='w-full flex items-center '>
              <div className='overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow'>
                <img
                  src={blog.user?.image || 'https://via.placeholder.com/40'}
                  alt=''
                  className='object-cover w-full h-full'
                />
              </div>
              <div className='flex-grow pl-3'>
                <h6 className='font-bold text-base uppercase text-black'>
                  {blog.user?.name || 'Anonymous'}
                </h6>
                <p className='text-sm text-[#899AB2]'>
                  {blog.user?.type || 'Anonymous'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CardComponent
