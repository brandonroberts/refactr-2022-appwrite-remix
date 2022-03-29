import { useNavigate } from 'remix';
import { FormEvent, useEffect, useState } from 'react';
import { Models } from 'appwrite';
import TodoItem from '~/components/todo-item';
import Alert from '~/components/alert';
import api from '~/api';

export default function Todos() {
  const [content, setContent] = useState<string>('')
  const [user, setUser] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [todos, setTodos] = useState<Models.Document[]>([]);
  const navigate = useNavigate();

  function loadTodos() {
    api.listDocuments('todos').then((data) => {
      setTodos(data.documents);
    });
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    // set user

  }, [])

  async function handleAdd(e: any) {
    e.preventDefault();
    try {
      // create document


      loadTodos();
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function handleComplete(
    e: FormEvent<EventTarget>,
    todo: Models.Document & { isComplete: boolean }
  ) {
    e.preventDefault();

    // update document


    loadTodos();
  }

  async function handleDelete(
    e: FormEvent<EventTarget>,
    item: Models.Document
  ) {
    e.preventDefault();

    // delete document

    loadTodos();
  }

  async function handleLogout() {
    try {
      // logout
      
    } catch (e) {

    }

    navigate('/login');
  }

  return (
    <>
      <section className="container h-screen max-h-screen px-3 max-w-xl mx-auto flex flex-col">
        {error && <Alert message="Something went wrong..." />}
        <div className="my-auto p-16 rounded-lg text-center">
          <div className="font-bold text-3xl md:text-5xl lg:text-6xl">
            📝 <br /> &nbsp; toTooooDoooos
          </div>

          <form onSubmit={handleAdd}>
            <input
              type="text"
              name="content"
              className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800 transition duration-200 ease-in-out transForm hover:-translate-y-1 hover:scale-110 hover:shadow-xl shadow-md"
              placeholder="🤔   What to do today?"
              required={true}
              onChange={(e) => setContent(e.target.value)}
            ></input>
          </form>

          <ul>
            {todos.map((item) => (
              <TodoItem
                key={item.$id}
                item={item}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8">
        <button
          onClick={handleLogout}
          className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none"
        >
          Logout 👋
        </button>
      </section>
    </>
  );
}
