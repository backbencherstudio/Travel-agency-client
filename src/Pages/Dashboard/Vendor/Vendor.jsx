import { useState, useEffect } from 'react';
import VendorManagemnetTable from '../../../Components/Dashboard/Vendor/VendorManagemnetTable';
import { Helmet } from 'react-helmet-async';
import { getUsers } from '../../../Apis/CreateNewUser';

const Vendor = () => {
  const [columns] = useState({
    id: true,
    name: true,
    date: true,
    travelerImg: true,
    phone: true,
    email: true,
    address: true,
    status: true,
  });

  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        // Filter only vendor type users
        const vendorUsers = response?.data?.filter(user => user.type === 'vendor') || [];
        setVendorData(vendorUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p>Error loading vendors: {error}</p>;

  return (
    <div className='overflow-y-auto'>
      <Helmet>
        <title>Around 360 - Vendor Management</title>
      </Helmet>
      <VendorManagemnetTable
        title={'Vendor Management'}
        data={vendorData}
        columns={columns}
      />
    </div>
  );
};

export default Vendor;