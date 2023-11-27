import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useController = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isController, isPending: isControllerLoading } = useQuery({
    queryKey: [user?.email, "isController"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/controller/${user.email}`);
      // console.log(res.data);
      return res.data?.controller;
    },
  });
  return [isController, isControllerLoading];
};

export default useController;


