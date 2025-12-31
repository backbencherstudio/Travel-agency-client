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
  const [pagination,setPagination] = useState({
    page:1,
    totalPages:1,
    limit:10,
    total:0,
    hasPreviousPage:false,
    hasNextPage:false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers({
          role: 'vendor',
          page: currentPage,
          limit: 10,
        });
        if(response?.success){
          setVendorData(response?.data || []);
          setPagination(response?.pagination || {});
        }else{
          setVendorData([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

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
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Vendor;