import React from 'react'

export default function page() {
  return (
    <div className='container  w-full h-full m-auto'>
         <table className="min-w-full   bg-[var(--bgSoft)] rounded-md my-6 bordered border-lime-50">
            <thead>
                <tr className="">
                    <th className="py-2 px-4 border-2 border-lime-50">Name</th>
                    <th className="py-2 px-4 border-2">Email</th>
                    <th className="py-2 px-4 border-2">created at</th>
                    <th className="py-2 px-4 border-2">Role</th>
                    <th className="py-2 px-4 border-2">Status</th>
                   
                </tr>
            </thead>
            <tbody>
            <tr className="">
                    <th className="py-2 px-4 ">Name</th>
                    <th className="py-2 px-4 ">Email</th>
                    <th className="py-2 px-4 ">created at</th>
                    <th className="py-2 px-4 ">Role</th>
                    <th className="py-2 px-4 ">Status</th>
                    <th className="py-2 px-4 ">Action</th>
                </tr>
            </tbody>
         </table>
    </div>
  )
}
