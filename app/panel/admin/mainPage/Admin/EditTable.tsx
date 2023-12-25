'use client'

import { breakpoints } from '@/app/config/breakpoints';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from 'usehooks-ts';
import { AdminTableList } from '../Admin';

const EditTable = (props: any) => {
    const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

    return (
        <div className='  bg-white bg-opacity-70 shadow-lg rounded-lg p-5 m-5'>
            <div className='flex '>
                <div className='flex-auto w-fit '>
                    Edit Details
                </div>
                <div className="tooltip" data-tip="cancel">
                    <button onClick={() => props.setCurrentPage(AdminTableList.MainTable)} className="btn btn-circle btn-outline">
                        <RxCross2 />
                    </button>
                </div>
            </div>
            <div className='flex flex-wrap'>
                <div className='flex-auto w-fit px-2 '>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <div className='flex'>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                            <button className="btn btn-square mx-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </label>
                </div>
                <div className='flex-auto w-fit  px-2'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                            {/* <span className="label-text-alt">User Password</span> */}
                        </div>
                        <div className='flex'>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                            <button className="btn btn-square mx-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </label>
                </div>
                <div className='flex-auto w-fit  px-2'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                            {/* <span className="label-text-alt">User Name</span> */}
                        </div>
                        <div className='flex'>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" disabled />
                            <button className="btn btn-square mx-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </label>
                </div>
                <div className='flex-auto w-fit  px-2'>
                    <div className="label">
                        <span className="label-text"><br></br></span>
                        {/* <span className="label-text-alt">User Name</span> */}
                    </div>
                    <button className="btn btn-wide w-full">Apply</button>
                </div>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        {!isTablet ? <th>
                            <label>
                            </label>
                        </th> : null}
                        <th>Name</th>
                        {!isTablet ? <th>Role</th> : null}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {!isTablet ? <th>
                            <label>
                                SELECTED
                            </label>
                        </th> : null}

                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="https://picsum.photos/200" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className=''>
                                        <article>
                                            <div className="font-bold break-all"><p>{props.adminData.admin[props.editUserIndex].name}</p></div>
                                            <div className="text-sm opacity-50 break-all"><p>{props.adminData.admin[props.editUserIndex].email}</p></div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </td>
                        {!isTablet ? <td>ADMIN</td> : null}
                    </tr>
                </tbody>
            </table>
            <div className='p-5'>
                <button className="btn btn-block btn-error btn-outline">DELETE</button>
            </div>
        </div>
    )
}

export default EditTable