import { breakpoints } from '@/app/config/breakpoints';
import React from 'react'
import { useMediaQuery } from 'usehooks-ts';
import { AdminTableList } from '../Admin';

const MainTable = (props: any) => {
    const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

    return (
        <>
            <div className='flex pb-2'>
                <div className='flex-auto w-fit pt-2 '>
                    Admin List
                </div>
                <button onClick={() => props.setCurrentPage(AdminTableList.AddTable)} className=" btn  btn-sm btn-neutral m-1">
                    ADD
                </button>
            </div>

            <div className='bg-white bg-opacity-70 shadow-lg rounded-lg'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>

                                    </label>
                                </th>
                                <th>Name</th>
                                {
                                    !isTablet ? <th>Role</th> : null
                                }
                                <th></th>
                            </tr>
                        </thead>

                        {props.adminData.admin.map((item: string, index: number) => {
                            return (
                                <tbody>
                                    <tr>
                                        <th>
                                            <label>
                                                {index + 1}
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src="https://picsum.photos/200" alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <article>
                                                        <div className="font-bold break-all"><p>{item.name}</p></div>
                                                        <div className="text-sm opacity-50 break-all"><p>{item.email}</p>
                                                        </div>
                                                    </article>
                                                </div>
                                            </div>
                                        </td>

                                        {
                                            !isTablet ? <td>ADMIN</td> : null
                                        }

                                        <th>
                                            <button onClick={() => {
                                                props.setEditUserIndex(index);
                                                props.setCurrentPage(AdminTableList.EditTable);
                                                }} className="btn btn-ghost btn-xs">EDIT</button>
                                        </th>
                                    </tr>
                                </tbody>
                            )
                        })}

                    </table>
                </div>
            </div></>
    )
}

export default MainTable