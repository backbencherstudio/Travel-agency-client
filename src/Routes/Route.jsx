import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Home from '../Pages/Home/Home'
import Tours from '../Pages/Tours/Tours'
import Signup from '../Pages/Auth/Signup'
import Login from '../Pages/Auth/Login'
import ForgetPassword from '../Pages/Auth/ForgetPassword'
import Blogs from '../Pages/blogs/Blogs'
import SingleBlog from '../Pages/blogs/SingleBlog'
import TourDetails from '../Pages/Tours/TourDetails/TourDetails'
import ReviewPackage from '../Pages/ReviewPackage/ReviewPackage'
// import DashboardLayout from '../Layout/DashboardLayout'
import DashboardAnalysis from '../Components/Dashboard/Dashboard/DashboardAnalysis'
import Packages from '../Pages/Dashboard/Package/Packages'
import ChangePassword from '../Pages/Auth/ChangePassword'
import BlogDetails from '../Pages/blogs/BlogDetails'
import AddPackage from '../Pages/Dashboard/Package/AddPackage'
import PackageCategoryTag from '../Pages/Dashboard/Package/PackageCategoryTag'
import PackageDestinationPolicy from '../Pages/Dashboard/Package/PackageDestinationPolicy'
import PackageDetails from '../Components/Dashboard/Packages/PackageDetails'
import BookingManagement from '../Pages/Dashboard/Booking/BookingManagement'
import BookingRequestDetails from '../Pages/Dashboard/Booking/BookingRequestDetails'
import Vendor from '../Pages/Dashboard/Vendor/Vendor'
import VendorDetails from '../Pages/Dashboard/Vendor/VendorDetails'
import IndexDashboard from '../Pages/VendorDashboard/IndexDashboard'
import EditPackage from '../Pages/Dashboard/Package/EditPackage'
import EditTourPlan from '../Components/Dashboard/Packages/EditPackage/EditTourPlan'
import TourPlanForm from '../Components/Dashboard/Packages/EditPackage/TourPlanForm'
import MainLayout from '../Layout/VendorDashboardLayout/MainLayout'
import AdminLayout from '../Layout/AdminDashboardLayout/AdminLayout'
import VendorAddPackage from '../Pages/VendorDashboard/AddPackages/VendorAddPackage'
import VendorPackages from '../Components/VendorDashboard/Packages/VendorPackgaesTable'
import Payments from '../Pages/Dashboard/Payment/Payments'
import BlogsPost from '../Pages/Dashboard/Blogs/BlogsPost'
import Settings from '../Pages/Dashboard/Settings/Settings'
import PackageExtraService from '../Pages/Dashboard/Package/PackageExtraService'
import AddBlog from '../Pages/Dashboard/Blogs/AddBlog'
import AdminLogin from '../Pages/Auth/Admin/AdminLogin'
import Chat from "../Components/Dashboard/chat/Chat";
import Contacts from '../Pages/Contacts/Contacts'
import Cancellation from '../Pages/Contacts/Cancellation'
import PrivateRoute from './Private/PrivateRoute'
import Cruises from '../Pages/Cruises/Cruises'
import CruiseDetails from '../Pages/Cruises/CruiseDetails/CruiseDetails'
import Otp from '../Pages/Auth/Otp'
import Profile from '../Components/Home/Profile'
import ClientPackages from '../Pages/Package/Packages'
import ClientPackageDetails from '../Pages/Package/PackageDetails'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/tours',
        element: <Tours />
      },
      {
        path: '/blogs',
        element: <Blogs />
      },
      {
        path: '/blogDetails/:id',
        element: <SingleBlog />
      },
      {
        path: '/review_package',
        element: <ReviewPackage />
      }
    ]
  },
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'forget-password',
    element: <ForgetPassword />
  },
  {
    path: 'otp',
    element: <Otp />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/tours',
        element: <Tours />
      },
      {
        path: '/tours/:id',
        element: <TourDetails />
      },
      {
        path: '/cruises',
        element: <Cruises />
      },
      {
        path: '/cruises/:id',
        element: <CruiseDetails />
      },
      {
        path: '/packages',
        element: <ClientPackages />
      },
      {
        path: '/packages/:id',
        element: <ClientPackageDetails />
      },
      {
        path: '/booking/:id',
        element: <ReviewPackage />
      },
      {
        path: '/contacts',
        element: <Contacts />
      },
      {
        path: '/cancellation',
        element: <Cancellation />
      },
      {
        path: '/blogs',
        element: <Blogs />
      },
      {
        path: '/profile',
        element: <Profile />
      },
    ]
  },
  {
    path: '/dashboard',
    // element: <DashboardLayout />,
    element: <PrivateRoute role={["admin"]}><AdminLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardAnalysis />
      },
      {
        path: 'add-package',
        element: <AddPackage />
      },
      {
        path: "chat",
        element: <Chat/>,
      },
      {
        path: "chat/:conversationID?",
        element: <Chat/>,
      },
      { path: "edit-package/:id",
        element: <EditPackage />,
      },
      {
        path: "edit-package/:name/tour-plan/:id",
        element: <EditTourPlan />,
      },
      {
        path: "package/:packageId/tour-plan",
        element: <TourPlanForm />,
      },
      {
        path: "package/:packageId/tour-plan/:planId",
        element: <TourPlanForm />,
      },
      {
        path: "package-category-&-tag",
        element: <PackageCategoryTag />,
      },
      {
        path: 'package-destination-&-policy',
        element: <PackageDestinationPolicy />
      },
      {
        path: 'package-extra-service',
        element: <PackageExtraService />
      },
      {
        path: 'packages',
        element: <Packages />
      },
      {
        path: 'packages/:id',
        element: <PackageDetails />
      },
      {
        path: 'bookings',
        element: <BookingManagement />
      },
      {
        path: 'booking-request/:id',
        element: <BookingRequestDetails />
      },
      {
        path: 'vendor',
        element: <Vendor />
      },
      {
        path: 'vendor-details/:id',
        element: <VendorDetails />
      },
      {
        path: 'payment',
        element: <Payments />
      },
      {
        path: 'blog',
        element: <BlogsPost />
      },
      {
        path: 'add-blog/:id',
        element: <AddBlog/>
      },
      {
        path: 'add-blog',
        element: <AddBlog/>
      },
      {
        path: 'settings',
        element: <Settings/>
      }
    ],
  },
  {
    path: 'vendor/dashboard',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <IndexDashboard />
      },
      {
        path: 'add-package',
        element: <VendorAddPackage />
      },
      {
        path: 'packages',
        element: <VendorPackages />
      }
    ]
  },

  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'admin-login',
    element: <AdminLogin />
  },
  {
    path: 'forget-password',
    element: <ForgetPassword />
  },
  {
    path: 'otp/:email',
    element: <Otp />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/tours',
        element: <Tours />
      },
      {
        path: '/blogs',
        element: <Blogs />
      },
      {
        path: '/tour-details/:id',
        element: <TourDetails />
      },
      {
        path: '/blogDetails/:id',
        element: <SingleBlog />
      },
      {
        path: '/review_package',
        element: <ReviewPackage />
      },
      {
        path: '/blog-details/:id',
        element: <BlogDetails />
      }
    ]
  },
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'admin-login',
    element: <AdminLogin />
  },
  {
    path: 'forget-password',
    element: <ForgetPassword />
  },
  {
    path: 'otp',
    element: <Otp />
  },
  {
    path: 'change-password/:email/:otp',
    element: <ChangePassword />
  }
])
