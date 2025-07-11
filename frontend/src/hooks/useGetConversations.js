import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/users');
                const data = await res.json();

                // console.log("API response:", data); 
                if (data.error) {
                    throw new Error(data.error);
                }

                if (!Array.isArray(data.users)) {
                    console.error("Unexpected data format:", data);
                    return;
                }

                setConversations(data.users);
                // console.log("Updated conversations state:", data.users);

            } catch (error) {
                console.error("Fetch error:", error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;
