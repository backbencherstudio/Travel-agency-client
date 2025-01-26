import { useContext, useState, useEffect } from 'react'
import AdminMembersAddTable from './AdminMembersAddTable'

import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import { getUsers } from '../../../Apis/CreateNewUser'
import Loading from '../../../Shared/Loading'

const Permission = () => {
  const [columns] = useState({
    memberId: true,
    name: true,
    email: true,
    memberImg: true,
    type: true
  })

  const { user } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      setData(response.data)
      setLoading(false)
    } catch (error) {
      setError('Failed to load user data. Please try again later.')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <AdminMembersAddTable title={user.type} data={data} columns={columns} />
      )}
    </div>
  )
}

export default Permission
