import React, { useEffect, useState } from 'react';
import SocialMdiaTable from './SocialMdiaTable';
import { getSocialMediaData } from '../../../Apis/SocialMediaCreateAPi';

const SocialCopyRight = () => {
  const [columns] = useState({
    id: true,
    name: true,
    url: true,
    icon: true,
  });

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getSocialMediaData();
      setSocialMediaData(response.data);
    } catch (err) {
      setError('Failed to fetch social media data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDataUpdate = (newData) => {
    setSocialMediaData(newData);
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <SocialMdiaTable
         data={socialMediaData}
         columns={columns}
         onDataUpdate={handleDataUpdate}
         refreshData={fetchData}
      />
    </div>
  );
};

export default SocialCopyRight;
