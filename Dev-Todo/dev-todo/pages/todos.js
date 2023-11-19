import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let storedTodos = localStorage.getItem("todos");
    setTodos(JSON.parse(storedTodos));
  }, []);

  const deleteTodo = (title) => {
    const newTodos = todos.filter((item) => item.title !== title);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));

    toast.success("The todo is deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editTodo = (title) => {
    const newTitle = prompt("Enter new title:");
    const newDesc = prompt("Enter new description:");

    const editedTodo = todos.find((item) => item.title === title);

    if (editedTodo && newTitle !== null && newDesc !== null) {
      // Update only if the user entered new values
      if (newTitle.trim() === "") {
        // Show a warning toast if the new title is empty
        toast.warn("Title cannot be empty!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // Update the todo if the new title is not empty
        editedTodo.title = newTitle;
        editedTodo.desc = newDesc;
        setTodos([...todos]);
        localStorage.setItem("todos", JSON.stringify([...todos]));

        toast.success("The todo is edited successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto" bis_skin_checked="1">
        <div className="flex flex-col text-center w-full mb-20" bis_skin_checked="1">
          <h1 className="text-4xl font-medium title-font mb-4 text-gray-900">All Todos</h1>
          {todos.length === 0 && <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Your Todos will show up here. Please add a todo by going to the Homepage
          </p>}
        </div>
        <div className="flex flex-wrap -m-4" bis_skin_checked="1">
          {todos.map((item) => (
            <div className="p-4 lg:w-1/4 md:w-1/2" bis_skin_checked="1" key={item.title}>
              <div className="h-full flex flex-col items-center text-center" bis_skin_checked="1">
                <img alt="Img not found" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={`https://picsum.photos/600/900?a=${item.title}`} />
                <div className="w-full" bis_skin_checked="1">
                  <h2 className="title-font font-medium text-lg text-gray-900">{item.title}</h2>
                  <p className="mb-4">{item.desc}</p>
                  <span className="inline-flex">
                    <a className="text-gray-500 cursor-pointer" onClick={() => { deleteTodo(item.title) }}>
                      <svg x="0px" y="0px" width="30" height="28" viewBox="0 0 100 100">
                        <path fill="#f37e98" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"></path>
                        <path fill="#f15b6c" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"></path>
                        <path fill="#1f212b" d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500 cursor-pointer" onClick={() => { editTodo(item.title) }}>
                      <svg className="feather feather-edit" fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </a>

                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todos;
