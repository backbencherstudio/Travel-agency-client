import React, { useEffect, useState } from 'react'
import CouponTable from './CouponTable'
import CouponApis from '../../../../Apis/CouponApis'

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
    <div>
      <CouponTable
        title={'Coupon'}
        data={couponData}
        columns={columns}
        getCoupons={getCoupons}
      />
    </div>
  )
}

export default Coupon