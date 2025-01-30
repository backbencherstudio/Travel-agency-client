import { useContext, useState, useEffect } from 'react'
import AdminMembersAddTable from './AdminMembersAddTable'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import { getUsers } from '../../../Apis/CreateNewUser'
import Loading from '../../../Shared/Loading'
import { Helmet } from 'react-helmet-async'

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

  const handleDataUpdate = () => {
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <Helmet>
        <title>Around 360 - Permission</title>
      </Helmet>
      <div>
        {loading ? (
          <p>
            <Loading />
          </p>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <AdminMembersAddTable
            title={user.type}
            data={data}
            columns={columns}
            onDataUpdate={handleDataUpdate}
          />
        )}
      </div>
    </>
  )
}

export default Permission
