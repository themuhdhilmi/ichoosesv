'use client'
import React, { useEffect, useState } from 'react'
import Tab from './components/Tab';
import Admin from './mainPage/Admin';
import Student from './mainPage/Student';
import Lecturer from './mainPage/Lecturer';
import Global from './mainPage/Global';


export enum Page {
    Admin,
    Student,
    Lecturer,
    Global
}

const page = () => {

    const [page, setPage] = useState(Page.Admin)

    return (
        <div className='p-5'>
            <Tab setPage={setPage} page={page} />
            <div className='p-5'>
            </div>

            {page === Page.Admin ? <Admin /> : null}
            {page === Page.Student ? <Student/> : null}
            {page === Page.Lecturer ? <Lecturer/> : null}
            {page === Page.Global ? <Global/> : null}

        </div>
    )
}

export default page