import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("user")).data.user;
  const { id } = useParams();

  return (
    <div className=" flex justify-center mt-8">
      <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome {userData.name}</h1>

        <p className="text-gray-800 mb-2">Name: {userData.name} </p>
        <p className="text-gray-800 mb-2">Email: {userData.email} </p>
        <p className="text-gray-800 mb-2">username: {userData.username} </p>

        <div className="flex justify-between mt-4">
          <Link to={`/edit/${id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </Link>

          <button
            // onClick={() => deleteUser(id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
