'use client'

import { breakpoints } from '@/app/config/breakpoints';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from 'usehooks-ts';

const AddTable = (props: any) => {
    const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);

    return (
        <>
        </>
    )
}

export default AddTable