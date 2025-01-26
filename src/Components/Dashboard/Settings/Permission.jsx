import { useContext, useState } from 'react'
import AdminMembersAddTable from './AdminMembersAddTable'
import { adminData } from '../../../data/PermissionDataAdmin'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'

const Permission = () => {
  const [columns] = useState({
    memberId: true,
    name: true,
    email: true,
    memberImg: true,
    status: true
  })
  const { user } = useContext(AuthContext)
  return (
    <div>
      <AdminMembersAddTable
        title={user.type}
        data={adminData}
        columns={columns}
      />
    </div>
  )
}

export default Permission
