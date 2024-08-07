'use client'
import { useGetStudents } from '@/app/utilities/storage/student/useGetStudents'
import React, { useEffect } from 'react'
import { useGetsessions } from '@/app/utilities/storage/user/useGetSessions'
import { useMediaQuery } from 'usehooks-ts'
import { breakpoints } from '@/app/config/breakpoints'
import { FaEye } from 'react-icons/fa'
import UseDeleteStudent from './UseDeleteStudent'
import Link from 'next/link'
import HereIsEmpty from '@/app/(mainLayout)/components/HereIsEmpty'
import { useDeleteStudent } from '@/app/utilities/storage/student/useDeleteStudent'

const UseGetStudents = (props: any) => {
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`)
  const isMobileLandscape = useMediaQuery(`(max-width: ${breakpoints.mobileLandscape})`)
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile})`)
  const { data: students, fetchData } = useGetStudents()
  const { data: sessions } = useGetsessions()
  const { loading: loadingUseDeleteStudent } = useDeleteStudent()

  useEffect(() => {
    fetchData(sessions.sessionSelected?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, loadingUseDeleteStudent])

  return (
    <div>
      <div className="stats shadow"></div>
      <div className="justify-center px-4  border rounded-lg  bg-white shadow-lg">
        <div className="overflow-x-auto">
          <div className="flex flex-row py-5">
            <div className="w-1/2 font-medium ">
              <p className="underline decoration-1">Students Manager</p>
            </div>
            <div className="flex gap-2 py-1 flex-row-reverse w-1/2">
              <button onClick={props.funcOpenAddStudent} className="btn btn-sm bg-red-600 rounded-lg hover:bg-red-800 text-white">
                Add Student
              </button>
            </div>
          </div>
          {students?.students?.length === 0 ? (
            <div className="py-6">
              <HereIsEmpty />
            </div>
          ) : (
            <table className="table table-xs">
              <thead>
                <tr>
                  {isMobileLandscape ? '' : <th></th>}
                  {isMobileLandscape ? '' : <th>Name</th>}
                  <th>Matric Number</th>
                  {isMobile ? '' : <th>Completion Status</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students?.students?.map((item: any, index: number) => {
                  const studentProgress = {
                    memberQuota: item?.studentInformation?.memberQuota ?? item?.studentInformation?.SessionYear?.globalMemberQuota ?? 0,
                    titleQuota: item?.studentInformation?.titleQuota ?? item?.studentInformation?.SessionYear?.globalTitleQuota ?? 0,
                    currentMemberQuota: item?.studentInformation?.Member?.length,
                    currentTitleQuota: item?.studentInformation?.ProjectTitle?.length,
                    isMemberCompleted: (item?.studentInformation?.memberQuota ?? item?.studentInformation?.SessionYear?.globalMemberQuota ?? 0) <= item?.studentInformation?.Member?.length,
                    isTitleCompleted: (item?.studentInformation?.titleQuota ?? item?.studentInformation?.SessionYear?.globalTitleQuota ?? 0) <= item?.studentInformation?.ProjectTitle?.length,
                    supervisorStatus: item?.studentInformation?.lecturerAcceptedStudent,
                  }

                  return (
                    <tr key={index}>
                      {isMobileLandscape ? '' : <th>{index + 1}</th>}
                      {isMobileLandscape ? '' : <td>{item.name.toUpperCase()}</td>}
                      <td>{item.studentInformation?.matricNumber}</td>
                      {isMobile ? (
                        ''
                      ) : (
                        <td>
                          {studentProgress.supervisorStatus === 'DECLINED' ? (
                            <p className="badge bg-yellow-500 text-white">2/4</p>
                          ) : studentProgress.supervisorStatus === 'ACCEPTED' ? (
                            <p className="badge bg-green-600 text-white">4/4 ✓</p>
                          ) : studentProgress.supervisorStatus === 'REQUESTED' ? (
                            <p className="badge bg-yellow-500 text-white">3/4</p>
                          ) : studentProgress.isTitleCompleted ? (
                            <p className="badge bg-red-600 text-white">2/4</p>
                          ) : studentProgress.isMemberCompleted ? (
                            <p className="badge bg-red-600 text-white">1/4</p>
                          ) : (
                            <p className="badge bg-red-600 text-white">0/4</p>
                          )}
                        </td>
                      )}

                      <td>
                        <div className="flex flex-row-reverse w-full">
                          <div className={`${isMobile ? 'flex flex-col max-w-min gap-2' : 'flex flex-row max-w-min gap-2'} `}>
                            <Link href={`/dashboard/view/student/${item?.email}`}>
                              <button className="btn rounded-lg py-1 btn-sm bg-slate-600 hover:bg-slate-800 text-white">
                                <FaEye />
                              </button>
                            </Link>
                            <UseDeleteStudent email={item?.email} id={item?.studentInformation?.id} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  {isMobileLandscape ? '' : <th></th>}
                  {isMobileLandscape ? '' : <th>Name</th>}
                  {isMobile ? '' : <th>Matric Number</th>}
                  <th>Completion Status</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default UseGetStudents
