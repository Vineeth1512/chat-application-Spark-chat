import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../service/api";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/users/getUsers`, {
          withCredentials: true,
          // This ensures cookies are sent with the request
        });
        if (response.data.error) {
          console.log(response.data.message);

          throw new Error(response.data.error);
        }
        setConversations(response.data);
      } catch (error) {
        console.log(error.response);

        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
