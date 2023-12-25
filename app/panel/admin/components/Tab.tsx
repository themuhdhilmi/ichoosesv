'use client'
import React from 'react'
import { Page } from '../page'


const Tab = (props : any) => {
  return (
    <div role="tablist" className="tabs tabs-bordered">
    <a onClick={() => props.setPage(Page.Admin)} role='tab' className={`tab ${props.page === Page.Admin ? "tab-active" : ""}`}>Admin</a>
    <a onClick={() => props.setPage(Page.Student)} role='tab' className={`tab ${props.page === Page.Student ? "tab-active" : ""}`}>Student</a>
    <a onClick={() => props.setPage(Page.Lecturer)} role='tab' className={`tab ${props.page === Page.Lecturer ? "tab-active" : ""}`}>Lecturer</a>
    <a onClick={() => props.setPage(Page.Global)} role='tab' className={`tab ${props.page === Page.Global ? "tab-active" : ""}`}>Global</a>
</div>
  )
}

export default Tab