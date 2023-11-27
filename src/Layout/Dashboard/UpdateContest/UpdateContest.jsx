import { Helmet } from "react-helmet";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const UpdateContest = () => {
  const singleData = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      contestName: e.target.contestName.value,
      image: e.target.image.value,
      contestType: e.target.contestType.value,
      prizeMoney: e.target.prizeMoney.value,
      contestPrice: e.target.contestPrice.value,
      email: singleData.email,
      taskSubmissionInstruction: e.target.taskSubmissionInstruction.value,
      contestDeadline: e.target.contestDeadline.value,
      shortDescription: e.target.shortDescription.value,
    };

    console.log(formData);
    try {
      const response = await fetch(
        `http://localhost:5000/contest/update/${singleData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Your food has been updated successfully.",
        });
        navigate(location?.state ? location.state : `/Dashboard/ManageContest`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "An error occurred while updating the food.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5 bg-base- ">
      <Helmet>
        <title>Contest hub || Update </title>
      </Helmet>
      <div className="  bg-opacity-20"></div>
      <h1 className="text-2xl font-bold text-center">Update a Contest</h1>
      <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
        <div className="space-y-1 text-sm">
          <label className="block  ">Contest Name</label>
          <input
            type="text"
            name="contestName"
            defaultValue={singleData?.contestName}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={singleData?.image}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700  focus:dark-border-violet-400"
          />
        </div>





        <div className="flex w-full gap-4">
          <div className="space-y-1 text-sm w-1/2">
            <label className="block dark-text-gray-400">Category</label>
            <select
              required
              name="contestType"
              defaultValue={singleData.contestType}
              className="w-full px-4 py-3 rounded-md  text-black    focus:dark-border-violet-400"
            >
              <option value="Business">Business Contest</option>
              <option value="Medical">Medical Contest</option>
              <option value="Article">Article Writing</option>
              <option value="Gaming">Gaming</option>
            </select>
          </div>

          <div className="space-y-1 text-sm w-1/2">
            <label className="block dark-text-gray-400">Prize Money</label>
            <input
              type="number"
              name="prizeMoney"
              defaultValue={singleData.prizeMoney}
              className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            ></input>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="space-y-1 text-sm w-1/2">
            <label className="block dark-text-gray-400">Contest Price</label>
            <input
              type="number"
              name="contestPrice"
              defaultValue={singleData?.contestPrice}
              className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm w-1/2">
            <label className="block dark-text-gray-400">Added by (email)</label>
            <input
              required
              type="text"
              name="email"
              disabled
              defaultValue={singleData.email}
              className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="space-y-1 text-sm w-1/2">
            <label className="block dark-text-gray-400">
              Task Submission Instruction
            </label>
            <input
              required
              type="text"
              name="taskSubmissionInstruction"
              defaultValue={singleData.taskSubmissionInstruction}
              className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
          </div>

          <div className="space-y-1 text-sm w-1/2">
            <label className="block dark-text-gray-400">Contest Deadline</label>
            <input
              required
              type="date"
              name="contestDeadline"
              defaultValue={singleData.contestDeadline}
              className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
          </div>
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Description</label>
          <textarea
            required
            name="shortDescription"
            defaultValue={singleData.contestDescription}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        <button
          type="submit"
          className="block w-full p-3 text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-primary"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateContest;
