import { useEffect } from "react";
import "./App.css";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000/blog`,
});

function App() {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/");
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  return <></>;
}

export default App;
