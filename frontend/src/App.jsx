import { useEffect } from "react";
import "./App.css";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000/blog`,
});

const add = axios.add({
  baseURL: `http://localhost:4000/add`,
});

const edit = axios.edit({
  baseURL: `http://localhost:4000/edit`,
});

const deleteItem = axios.delete({
  baseURL: `http://localhost:4000/delete`,
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
