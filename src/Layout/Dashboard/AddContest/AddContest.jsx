import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
 import "./addcontest.css"

const AddContest = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const initialFormData = {
    contestName: "",
    image: "",
    contestDescription: "",
    contestPrice: "",
    prizeMoney: "",
    taskSubmissionInstruction: "",
    contestType: "",
    contestDeadline: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const myData = {
      ...formData,
    };

    // Add your logic for submitting contest data to the backend
    // ...

    // Example fetch request:
    // fetch("https://your-backend-url/addContest", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(myData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     // Handle success
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle error
    //   });

    // Display success message using SweetAlert2
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Contest details submitted successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    // Reset form data after submission
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5  ">
      <h1 className="text-2xl font-bold text-center">Add a Contest</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Name</label>
          <input
            type="text"
            name="contestName"
            value={formData.contestName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Image URL</label>
          <input
            required
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Description</label>
          <textarea
            required
            name="contestDescription"
            value={formData.contestDescription}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Price</label>
          <input
            required
            type="text"
            name="contestPrice"
            value={formData.contestPrice}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Prize Money</label>
          <input
            required
            type="text"
            name="prizeMoney"
            value={formData.prizeMoney}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">
            Task Submission Text Instruction
          </label>
          <textarea
            required
            name="taskSubmissionInstruction"
            value={formData.taskSubmissionInstruction}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Type/Tags</label>
          <select
            required
            name="contestType"
            value={formData.contestType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          >
            <option value="Business Contest">Business Contest</option>
            <option value="Medical Contest">Medical Contest</option>
            <option value="Article Writing">Article Writing</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Deadline</label>
          <input
            type="date"
            name="contestDeadline"
            value={formData.contestDeadline}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>

        <button
          type="submit"
          className="block w-full p-3 text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-primary"
        >
          Add Contest
        </button>
      </form>
    </div>
  );
};

export default AddContest;
