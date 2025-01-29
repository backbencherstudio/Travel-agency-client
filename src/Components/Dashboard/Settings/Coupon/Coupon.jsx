import React, { useEffect, useState } from 'react'
import CouponTable from './CouponTable'
import CouponApis from '../../../../Apis/CouponApis'
import { Helmet } from 'react-helmet-async';

const Coupon = () => {
  const [columns] = useState({
      name: true,
      code: true,
      description: true,
      amountType: true,
      amount: true,
      starts_at: true,
      expires_at: true,
      status: true,
    })
  const [couponData, setCouponData] = useState([]);

  useEffect(() => {
    getCoupons();
  }, [])

  const getCoupons = async () => {
    const res = await CouponApis.get();
    if (res.success) {
      console.log('res', res.data)
      setCouponData(res.data);
    }

  }
  // console.log('couporData', couponData)
  return (
    <>
      <Helmet>
        <title>Around 360 - Coupon</title>
      </Helmet>
      <CouponTable
        title={'Coupon'}
        data={couponData}
        columns={columns}
        getCoupons={getCoupons}
      />
    </>
  )
}

export default Coupon