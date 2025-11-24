import React from 'react'
import Users1 from './Users1'
import GetAllUser from '../context/GetAllUser'

const User = () => {
  const [allUsers , loading] = GetAllUser();
  if (loading) {
    return <p className="text-gray-500 text-center">Loading users...</p>;
  }

  if (!allUsers || allUsers.length === 0) {
    return <p className="text-gray-500 text-center">No users found</p>;
  }
  return (
    <div style={{maxHeight:"calc(84vh - 1vh)"}} className=' py-1 flex-scroll overflow-y-auto'>
      <div className='flex flex-col'>
      {allUsers.map((user, index)=>{
        return <Users1 key={index} user={user}/>
      })}
      
      </div>
    </div>
  )
}

export default User
