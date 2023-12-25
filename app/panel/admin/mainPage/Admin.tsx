'use client'
import { breakpoints } from '@/app/config/breakpoints'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { RxCross2 } from "react-icons/rx";
import EditTable from './Admin/EditTable';
import MainTable from './Admin/MainTable';
import AddTable from './Admin/AddTable';

export enum AdminTableList {
    EditTable,
    MainTable,
    AddTable
}

const Admin = () => {

    const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
    const [currentPage, setCurrentPage] = useState(AdminTableList.MainTable);
    const [editUserIndex, setEditUserIndex] = useState(-1);

    useEffect(() => {
        fetch('/api/v1/AUTH/manageUser/admin')
            .then((res) => res.json())
            .then((data) => {
                setAdminData(data)
                setLoading(false)
            })
    }, [])

    const [adminData, setAdminData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    if (isLoading) {
        return (
            <div className='p-5'>
            <div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        </div>
        )
    }


    if (!adminData) return <p>No profile data</p>

    return (
        <>
            {/* {isEditing ?
                <EditTable setIsEditing={setIsEditing} adminData={adminData} editUserIndex={editUserIndex}/>
                :
                <MainTable setIsEditing={setIsEditing} adminData={adminData} setEditUserIndex={setEditUserIndex}/>
            } */}

            {currentPage === AdminTableList.MainTable ? <MainTable setCurrentPage={setCurrentPage} adminData={adminData} setEditUserIndex={setEditUserIndex}/> : null}
            {currentPage === AdminTableList.EditTable ? <EditTable setCurrentPage={setCurrentPage} adminData={adminData} editUserIndex={editUserIndex}/> : null}
            {currentPage === AdminTableList.AddTable ?  <AddTable/> : null}
            
        </>
    )
}

export default Admin