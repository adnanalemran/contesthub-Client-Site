import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
// import { FaTrashAlt, Fauser } from "react-icons/fa";
const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest",{
        
      });
      return res.data;
    },
  });

  const handleDeleteContest = (contest) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contest/${contest._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="text-3xl py-2">
        <h2> Manage Contest</h2>
      </div>
      <hr className="w-1/2 mx-auto py-3" />
      <h4>Total Contest : {contests?.length}</h4>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-white text-xl">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contests?.map((contest, index) => (
              <tr key={contest._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={contest?.image} alt="Contest Image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{contest?.contestName}</div>
                    </div>
                  </div>
                </td>
                <td>{contest?.contestDescription}</td>
                <td>{contest?.contestType}</td>
                <td>{contest?.contestDeadline}</td>
                <td>
                 <div className="flex gap-4">  <button
                    onClick={() => handleDeleteContest(contest)}
                    className="btn btn-info"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleDeleteContest(contest)}
                    className="btn btn-error"
                  >
                    Delete
                  </button></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContest;
