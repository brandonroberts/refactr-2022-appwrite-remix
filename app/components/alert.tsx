import { useEffect, useState } from 'react';

export default function Alert({ message }: { message: string }) {
  const [showAlert, setShowAlert] = useState(true);
  const TIMEOUT = 3000;

  useEffect(() => {
    let timeout = setTimeout(() => setShowAlert(false), TIMEOUT);
    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  return (
    <>
      {showAlert && (
        <div
          className={`text-white px-6 py-4 border-0 rounded absolute right-0 mt-10 mr-10 bg-red-500`}
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle font-semibold mr-8">
            {message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => {
              setShowAlert(false);
            }}
          >
            <span>×</span>
          </button>
        </div>
      )}
    </>
  );
}
