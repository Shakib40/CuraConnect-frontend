import Table from '../../components/common/Table';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
 
export default function Users() {
 
   const [usersList, setUsersList] = useState([]);

  const getUserList = async () => {
     try {
       const response = await axiosInstance.get('/user/users');
       setUsersList(response.data);
     } catch (error) {
       console.error(error);
     }
  };
  
  useEffect(() => {
    getUserList();
  }, []);

 

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Users</h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {/* Total: <span className="font-semibold">{usersList}</span> */}
        </div>
      </div>

      {usersList?.content?.length > 0 && <Table columns={columns} rows={usersList?.content} />}

       
    </div>
  );
}
