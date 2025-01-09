import  { useState } from 'react'
import AdminMembersAddTable from './AdminMembersAddTable'
import { adminData } from '../../../data/PermissionDataAdmin'

const Permission = () => {
  const [columns] = useState({
    memberId: true,
    name: true,
    email: true,
    memberImg: true,
    status: true,
   
  })
  return (
    <div>
      <AdminMembersAddTable
        title={'Admin'}
        data={adminData}
        columns={columns}
      />
    </div>
  )
}

export default Permission
