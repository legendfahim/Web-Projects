import { Inter } from 'next/font/google';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import DOMPurify from 'dompurify';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [todo, settodo] = useState({ title: '', desc: '' });
  const [loading, setLoading] = useState(false);

  const addTodo = () => {
    // Check if title is empty or contains only spaces
    if (todo.title.trim() === '') {
      toast.error('Please enter a non-empty title.', {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    // Sanitize input using DOMPurify
    const sanitizedTodo = {
      title: DOMPurify.sanitize(todo.title),
      desc: DOMPurify.sanitize(todo.desc),
    };

    setLoading(true);

    // Simulate an asynchronous operation (e.g., API request)
    setTimeout(() => {
      setLoading(false);

      // Your existing addTodo logic here...
      let todos = localStorage.getItem('todos');

      if (todos) {
        // Parse the existing todos
        let todosJson = JSON.parse(todos);

        // Check if todosJson is an array, and if not, initialize it as an empty array
        if (!Array.isArray(todosJson)) {
          todosJson = [];
        }

        // Check if a todo with the same title already exists
        if (todosJson.some((value) => value.title === sanitizedTodo.title)) {
          toast.error('Todo with this title already exists.', {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        } else {
          // Add the new sanitized todo to the existing todos
          todosJson.push(sanitizedTodo);

          // Update the todos in local storage
          localStorage.setItem('todos', JSON.stringify(todosJson));

          // Set the toast message
          toast.success(`WoW, Todo is added!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        // If there are no existing todos, create a new array with the current sanitized todo
        localStorage.setItem('todos', JSON.stringify([sanitizedTodo]));

        // Set the toast message
        toast.success(`WoW, Todo is added!`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }

      // Clear the input fields after adding the todo
      settodo({ title: '', desc: '' });
    }, 2000); // Simulating a 2-second delay, replace with actual asynchronous logic
  };

  const onChange = (e) => {
    settodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="text-gray-600 body-font relative ">
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col m-auto w-full md:py-8 rounded-lg shadow-md p-8"> {/* Modified styles */}
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font"><strong>Add Your Task</strong></h2>
          <p className="leading-relaxed mb-5 text-gray-600">Master Your Day with Dev-Todo: The Ultimate To-Do App For Efficiency and Success!</p>
          <div className="relative mb-4" bis_skin_checked="1">
            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
            <input onChange={onChange} value={todo.title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4" bis_skin_checked="1">
            <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
            <textarea onChange={onChange} value={todo.desc} id="description" name="desc" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
          <button onClick={addTodo} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            {loading ? <BeatLoader size={8} color="#fff" /> : 'Add'}
          </button>
        </div>
      </section>
    </>
  );
}
