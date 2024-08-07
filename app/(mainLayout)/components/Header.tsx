'use client'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '../../config/breakpoints'
import { SiHtmlacademy } from 'react-icons/si'
import Image from 'next/image'
import Countdown from 'react-countdown'
import { useSession } from 'next-auth/react'
import { useUserInformation } from '../../utilities/storage/user/useUserInformation'
import AdminMenu from './HeaderComponents/AdminMenu'
import Link from 'next/link'
import Loading from './LoadingFullScreen'
import GuestMenu from './HeaderComponents/GuestMenu'
import { useGetsessions } from '../../utilities/storage/user/useGetSessions'
import LoadingLeftBottom from './LoadingLeftBottom'
import ToastSuccess from './ToastSuccess'
import StudentMenu from './HeaderComponents/StudentMenu'
import LecturerMenu from './HeaderComponents/LecturerMenu'
import NotifyUser from './HeaderComponents/NotifyUser'
import { OneTimePassword } from './HeaderComponents/OneTimePassword'
import { useUpdatePassword } from '../../utilities/storage/user/useUpdatePassword'
import { usePathname } from 'next/navigation'
const Header = () => {
  const session = useSession()
  const { data: sessions, fetchData: fetchSession } = useGetsessions()
  const { fetchData, name, role, email } = useUserInformation()
  const {  data : updatePasswordData } = useUpdatePassword()
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`)
  const pathname = usePathname()
  
  useEffect(() => {
    fetchSession()
    fetchData()
    checkIfUserLoggedIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, updatePasswordData])
  function checkIfUserLoggedIn()  {
    if (session.status === 'unauthenticated') {
      return false
    }

    if (role === 'GUEST') {
      return false
    }

    return true
  }

  if (session.status === 'loading') {
    return <Loading /> // You can also render a loading indicator here if needed
  }

  const renderer = ({ days }: any) => {
    // Render a countdown
    return <span>{days}</span>
  }


  if(pathname.includes('/dashboard/view/summary/'))
  {
    return(<></>)
  }

  return (
    <div className="static">
      <LoadingLeftBottom />
      <ToastSuccess />
      <NotifyUser />
      <OneTimePassword />
      {checkIfUserLoggedIn()  ? <div className={`-z-50 absolute bg-gradient-to-r from-red-600 to-red-800 ${isDesktop ? 'min-h-screen' : 'min-h-96'} min-w-full px-5 py-2`} /> : <div className={`-z-50 absolute bg-gradient-to-r from-red-600 to-red-800 ${isTablet ? 'min-h-52' : isDesktop ? 'min-h-52' : 'min-h-52'} min-w-full px-5 py-2`} />}

      <div className={`bg-none ${!isDesktop ? 'px-24' : 'px-0'}  py-2`}>
        {!isDesktop ? (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white ">
              <Link href={'/'} className="btn btn-ghost text-white text-xl rounded-lg">
                <SiHtmlacademy />
                iChooseSV [{role}]
              </Link>
            </div>
            <div className="navbar-center">
              <div className="badge badge-neutral">Final presentation</div>
              <div className="badge ">
                {/* {JSON.stringify(sessions?.sessionSelected?.finalPresentationDate)} */}
                <Countdown date={sessions?.sessionSelected?.finalPresentationDate ?? '2025-02-01T01:02:03'} renderer={renderer} />
              </div>
              <div className="ml-2 badge badge-neutral">Session</div>
              <div className="badge ">
                {sessions?.sessionSelected?.number} {sessions?.sessionSelected?.yearOne}/{sessions?.sessionSelected?.yearTwo}
              </div>
            </div>

            {checkIfUserLoggedIn()  ? (
              <div className="navbar-end">
                <button className="btn rounded-lg min-h-fit border-red-700 bg-red-700 text-white hover:bg-red-900 hover:border-red-700">
                  <div className="avatar">
                    <div className="w-10 mask mask-hexagon">
                      <Image alt="" width={500} height={500} src="/images/profile.jpg" />
                    </div>
                  </div>
                  <Link href={`/dashboard/view/profileSettings`} className="text-ellipsis">
                    {name}
                  </Link>
                </button>
              </div>
            ) : (
              <div className="navbar-end">
                <Link href={'/auth/signin'} className="btn rounded-lg min-h-fit border-red-700 bg-red-700 text-white hover:bg-red-900 hover:border-red-700">
                  <p className="text-ellipsis">Login</p>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar rounded-lg p-0 ">
            <div className="navbar-start text-white ">
              <Link href={'/'} className="btn btn-ghost text-white text-xl rounded-lg">
                <SiHtmlacademy />
                iChooseSV
              </Link>
            </div>

            {checkIfUserLoggedIn()  ? (
              ''
            ) : (
              <Link href={'/auth/signin'} className="navbar-end text-white">
                Login
              </Link>
            )}
            <div className="navbar-center"></div>
          </div>
        )}

        {role === 'ADMIN' ? <AdminMenu renderer={renderer} name={name} /> : ''}
        {role === 'STUDENT' ? <StudentMenu renderer={renderer} name={name} email={email} /> : ''}
        {role === 'LECTURER' ? <LecturerMenu renderer={renderer} name={name} email={email} /> : ''}
        {role === 'GUEST' ? <GuestMenu renderer={renderer} /> : ''}
      </div>
    </div>
  )
}

export default Header
