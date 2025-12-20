import { FaCheck, FaTimes } from 'react-icons/fa'
import { LuMailOpen } from 'react-icons/lu'
import { approveUser, rejectUser } from '../../../Apis/GetUserApis'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { updateVendorRequest } from '~/Apis/CreateNewUser';

export default function VendorRequestTable({ data = [] }) {
  const [requestsData, setRequestsData] = useState(data)

  console.log('Vendor request table data:', requestsData)

  // Approve User Function
  const handleApproveUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to approve this vendor request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, approve it!'
    })

    if (result.isConfirmed) {
      try {
        await updateVendorRequest(id)
        Swal.fire('Success!', 'Vendor request has been approved.', 'success')
        setRequestsData(prevData =>
          prevData.filter(item => item.id !== id)
        )
      } catch (error) {
        Swal.fire('Error!', 'Failed to approve vendor request.', 'error')
      }
    }
  }

  // Reject User Function
  const handleRejectUser = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to reject this vendor request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reject it!'
    })

    if (result.isConfirmed) {
      try {
        await updateVendorRequest(id)
        Swal.fire('Success!', 'Vendor request has been rejected.', 'success')
        setRequestsData(prevData =>
          prevData.filter(item => item.id !== id)
        )
      } catch (error) {
        Swal.fire('Error!', 'Failed to reject vendor request.', 'error')
      }
    }
  }

  return (
    <div className='w-full overflow-x-auto'>
      <table className='table-auto w-full'>
        <thead>
          <tr className='text-[#475467] text-[12px] bg-[#F9FAFB]'>
            <td className='px-4 text-nowrap py-3 rounded-md'>
              Vendor Name
            </td>
            <td className='px-4 text-nowrap'>
              Email
            </td>
            <td className='px-4 text-nowrap'>
              Phone Number
            </td>
            <td className='px-4 text-nowrap'>
              Request Date
            </td>
            <td className='px-4 text-nowrap text-center'>
              Action
            </td>
          </tr>
        </thead>

        <tbody className='text-nowrap'>
          {requestsData?.length > 0 ? (
            requestsData.map(item => (
              <tr
                className='text-[#1D1F2C] border-b border-[#EDEDED]'
                key={item?.id}
              >
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-3'>
                    {item.avatar ? (
                      <img
                        className='rounded-lg'
                        src={item.avatar}
                        alt={item.name}
                        style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className='w-[48px] h-[48px] rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md'>
                        <span className='text-white text-xl font-semibold'>
                          {item.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                        {item.name}
                      </p>
                      <p className='truncate text-[#757D83] text-[10px] font-medium flex items-center gap-1 mt-1'>
                        <span className='text-[#EB5B2A]'>{item.type}</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-4 text-[12px]'>
                  <p className='truncate text-[#475467] flex items-center gap-1'>
                    <LuMailOpen className='text-[#EB5B2A]' />
                    {item.email}
                  </p>
                </td>
                <td className='px-4 text-[12px]'>
                  <p className='truncate text-[#475467]'>
                    {item.phone_number ? item.phone_number : 'Not Available'}
                  </p>
                </td>
                <td className='px-4 text-[12px]'>
                  <p className='truncate text-[#475467]'>
                    {item.vendor_request_at
                      ? new Date(item.vendor_request_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                      : 'N/A'}
                  </p>
                </td>
                <td className='px-4'>
                  <div className='flex gap-3 justify-center'>
                    <button
                      onClick={() => handleApproveUser(item.id)}
                      className='bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-all duration-300'
                    >
                      <FaCheck className='text-sm' />
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectUser(item.id)}
                      className='bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 transition-all duration-300'
                    >
                      <FaTimes className='text-sm' />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan='5'
                align='center'
              >
                <p className='text-[#475467] font-medium py-6'>
                  No pending vendor requests
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}