import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import "./addcontest.css";

const AddContest = () => {
  const { user } = useContext(AuthContext);
  const [dbuser, setDbuser] = useState(null);


  
  useEffect(() => {
    axios
      .get(
        ` https://b8a12-server-side-adnanalemran.vercel.app/user/${user?.uid}`
      )
      .then((res) => {
        setDbuser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.uid]);

  const createCount = dbuser?.createCount;
  console.log(createCount);

  const email = user?.email;

  const axiosSecure = useAxiosSecure();
  const status = "pending";
  const orderCount = 0;
  const winner = "running";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/contest");
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/contest", data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      console.log(res.data);

      const newCount = dbuser.createCount;
      axiosSecure
        .patch(`/user/Count/${dbuser._id}`, { createCount: newCount })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // Show success message
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Contest details submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Refetch the contests data after submission
      refetch();

      // Reset form values
      setValue("contestName", "");
      setValue("image", "");
      setValue("contestDescription", "");
      setValue("contestPrice", "");
      setValue("prizeMoney", "");
      setValue("taskSubmissionInstruction", "");
      setValue("contestType", "");
      setValue("contestDeadline", "");
    } catch (error) {
      console.error(error);
      // Handle error and show error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5">
      <h1 className="text-2xl font-bold text-center">Add a Contest</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Name</label>
          <input
            type="text"
            {...register("contestName", {
              required: "Contest Name is required",
            })}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
          {errors.contestName && (
            <p className="text-red-500">{errors.contestName.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">
            Contest Description
          </label>
          <textarea
            {...register("contestDescription", {
              required: "Contest Description is required",
            })}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
          {errors.contestDescription && (
            <p className="text-red-500">{errors.contestDescription.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Price</label>
          <input
            type="number"
            {...register("contestPrice", {
              required: "Contest Price is required",
            })}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
          {errors.contestPrice && (
            <p className="text-red-500">{errors.contestPrice.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Prize Money</label>
          <input
            type="number"
            {...register("prizeMoney", { required: "Prize Money is required" })}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
          {errors.prizeMoney && (
            <p className="text-red-500">{errors.prizeMoney.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">
            Task Submission Text Instruction
          </label>
          <textarea
            {...register("taskSubmissionInstruction", {
              required: "Task Submission Instruction is required",
            })}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
          {errors.taskSubmissionInstruction && (
            <p className="text-red-500">
              {errors.taskSubmissionInstruction.message}
            </p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Type/Tags</label>
          <select
            {...register("contestType", {
              required: "Contest Type is required",
            })}
            className="w-full px-4 py-3 rounded-md text-black"
          >
            <option value="Business">Business Contest</option>
            <option value="Medical">Medical Contest</option>
            <option value="Article">Article Writing</option>
            <option value="Gaming">Gaming</option>
          </select>
          {errors.contestType && (
            <p className="text-red-500">{errors.contestType.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Contest Deadline</label>
          <input
            type="date"
            {...register("contestDeadline", {
              required: "Contest Deadline is required",
            })}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
          {errors.contestDeadline && (
            <p className="text-red-500">{errors.contestDeadline.message}</p>
          )}
        </div>

        <div className="space-y-1 text-sm  hidden">
          <label className="block dark-text-gray-400">
            creator Contest email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Contest Deadline is required",
            })}
            value={email}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>

        <div className="space-y-1 text-sm hidden">
          <label className="block dark-text-gray-400">Contest Deadline</label>
          <input
            type="text"
            {...register("status", {
              required: "Contest Deadline is required",
            })}
            value={status}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>
        <div className="space-y-1 text-sm hidden">
          <label className="block dark-text-gray-400">Contest Deadline</label>
          <input
            type="number"
            {...register("orderCount", {
              required: "Contest Deadline is required",
            })}
            value={orderCount}
            className="w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
          />
        </div>
        <div className="space-y-1 text-sm hidden">
          <label className="block dark-text-gray-400">Contest Deadline</label>
          <input
            type="text"
            {...register("winner", {
              required: "Contest Deadline is required",
            })}
            value={winner}
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
