import React from 'react'
import { Outlet } from 'react-router-dom'


export default function PrimaryLayout() {
  return (
    <div className='main'>
        <Outlet />
    </div>
  )
}