import React, { useEffect, useState } from 'react';
import SocialMdiaTable from './SocialMdiaTable';
import { getSocialMediaData } from '../../../Apis/SocialMediaCreateAPi';
import { useForm } from 'react-hook-form';
import WebsiteInfoApis from '../../../Apis/WebsiteInfoApis';
import Loading from '../../../Shared/Loading';
import { Helmet } from 'react-helmet-async';

const SocialCopyRight = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
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
      const websiteInfoRes = await WebsiteInfoApis.get();
      // console.log('websiteInfoRes', websiteInfoRes)
      setValue('copyright', websiteInfoRes?.data?.copyright)
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

  const handleAddSocialMedia = (newData) => {
    setSocialMediaData((prevData) => [...prevData, newData]); 
    
  };
  
  const onSubmit = async (data) => {
    // console.log('data', data)
    const res = await WebsiteInfoApis.save(data);
    // console.log('res', res)
    fetchData()
    reset();
  }

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Helmet>
        <title>Around 360 - Social & Copyright</title>
      </Helmet>
      <div>
        <SocialMdiaTable
          data={socialMediaData}
          columns={columns}
          onAddSocialMedia={handleAddSocialMedia}
          fetchData={fetchData}
      />

      <form onSubmit={handleSubmit(onSubmit)} className='m-6 flex flex-col gap-4'>
        <h4 className='text-base font-medium'>Copyright Information</h4>
        <input type="text" className='px-5 py-3 border border-[#E9EAEC] rounded-[10px] text-sm font-normal text-[#475467] outline-none' placeholder='Copywrite Info' {...register('copyright', { required: 'Copywrite is required' })} />
        {errors.copywrite && (
          <span className='text-red-500 text-sm ml-2'>
            {errors.copywrite.message}
          </span>
        )}
        <button type='submit' className='px-5 py-3 bg-[#EB5B2A] w-fit text-xs text-white rounded'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default SocialCopyRight;