import React from 'react'
import UserList from './UserList.jsx'
import useGetAllUsers from '../../context/useGetAllUsers.jsx'

function Users() {


  const [allUsers,loading]=useGetAllUsers();
  console.log(allUsers);


  return (
    <div>
        <h1 className='px-8 py-3 text-white font-semibold bg-slate-800 rounded-md' >Messages</h1>
        <div className='py-2 flex-1 overflow-y-auto' style={{maxHeight:"calc(84vh - 10vh)"}}> 
          
          
{/* //mapping the users from backend data (it actually arrays ) */}

{allUsers.map((user,index)=>(
  <UserList key={index} user={user}/>
))}
        </div>

        </div>
  )
}

export default Users