'use client'
import React, { useEffect, useState } from 'react'
import UseGetStudents from './components/UseGetStudents'
import UseAddStudent from './components/UseAddStudent'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { breakpoints } from '@/app/config/breakpoints'
import { useMediaQuery } from 'usehooks-ts'
import UseGetStudent from '../../view/student/[email]/components/UseGetStudent'
import LoadingLeftBottom from '@/app/(mainLayout)/components/LoadingLeftBottom'

enum Drawer {
  NONE,
  ADD,
  ADD_BULK,
  VIEW,
}

const Page = () => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isMobileLandscape = useMediaQuery(`(max-width: ${breakpoints.mobileLandscape})`)
  const { data : sessions, loading, fetchData } = useGetsessions()
  const [selectedSession, setSelectedSession] = useState('')
  const [openDrawer, setOpenDrawer] = useState<Drawer>(Drawer.NONE)
  const [selectViewUser, setSelectViewUser] = useState<any>({})

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectedSession(sessions.sessionSelected?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions])

  const funcOpenAddStudent = () => {
    setOpenDrawer(Drawer.ADD)
  }

  const funcOpenBulkAddStudent = () => {
    setOpenDrawer(Drawer.ADD_BULK)
  }

  const funcCloseAll = () => {
    setOpenDrawer(Drawer.NONE)
  }

  const funcViewStudent = () => {
    setOpenDrawer(Drawer.VIEW)
  }

  if (loading) {
    return <LoadingLeftBottom />
  }

  return (
    <div className={`${!isDesktop ? 'px-24' : 'px-0'}`}>
      {openDrawer === Drawer.NONE ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-3">
            <UseGetStudents funcViewStudent={funcViewStudent} funcOpenAddStudent={funcOpenAddStudent} funcOpenBulkAddStudent={funcOpenBulkAddStudent} setSelectViewUser={setSelectViewUser} />
          </div>
        </div>
      ) : (
        ''
      )}

      {openDrawer === Drawer.ADD ? (
        <div className={`grid ${isDesktop ? 'grid-cols-1' : 'grid-cols-4 gap-4'}  `}>
          <div className="col-span-1">
            <UseAddStudent funcCloseAll={funcCloseAll} />
          </div>

          <div className={`${isDesktop ? '' : 'col-span-3'} `}>
            <UseGetStudents funcViewStudent={funcViewStudent} funcOpenAddStudent={funcOpenAddStudent} funcOpenBulkAddStudent={funcOpenBulkAddStudent} setSelectViewUser={setSelectViewUser} />
          </div>
        </div>
      ) : (
        ''
      )}

      {openDrawer === Drawer.VIEW ? (
        <div>
          <UseGetStudent selectViewUser={selectViewUser} funcCloseAll={funcCloseAll} />
        </div>
      ) : (
        ''
      )}

      {openDrawer === Drawer.ADD_BULK ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <UseAddStudent funcCloseAll={funcCloseAll} />
          </div>

          <div className="col-span-3">
            <UseGetStudents funcViewStudent={funcViewStudent} funcOpenAddStudent={funcOpenAddStudent} funcOpenBulkAddStudent={funcOpenBulkAddStudent} setSelectViewUser={setSelectViewUser} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Page
