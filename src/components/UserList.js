import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const UserList = () => {

    const [userData, setUserData] = useState(null)

    //fetch user data
    const fetchUserData = async () => {
        const resp = await axios.get("/getUsers")
        console.log(resp)

        if(resp.data.users.length > 0){
            setUserData(resp.data.users)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [userData])

    //Edit
    const handleEdit = async (user) => {
        const userName = prompt("Enter your new name")
        const userEmail = prompt("Enter your new Email")

        if(!userName || !userEmail){
            alert("Please enter name and email both")
        }
        else{
            const resp = await axios.put(`/editUser/${user._id}`,{
                name: userName,
                email: userEmail
            })
            console.log(resp)
        }
    }

    //delete
    const handleDelete = async (userId) => {
        const resp = await axios.delete(`/deleteUser/${userId}`)
        console.log(resp)
    }

  return (
    <div style={{
         backgroundColor: '#843ba9'
    }}>
        <section className="text-white body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
             {userData && userData.map((user) => (
                 <tr>
                 <td className="px-4 py-3">{user.name}</td>
                 <td className="px-4 py-3">{user.email}</td>
                 <td className="px-4 py-3">
                   <img className='h-8 cursor-pointer' src={require("./images/edit.png")} onClick={() => handleEdit(user)} alt="react logo" />
                 </td>
                 <td className="px-4 py-3 text-lg text-gray-900">
                   {/* <button className="hover:text-red-500">Delete</button> */}
                   <img className='h-8 cursor-pointer' src={require("./images/delete.png")} onClick={() => handleDelete(user._id)} alt="react logo" />
                 </td>
               </tr>
             ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </div>
  )
}
