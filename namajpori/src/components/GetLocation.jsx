export const GetLocation = () => {
    const shareLocation = () => {
      alert(
        "To enable location access, please go to your browser settings and allow location access for this site."
      );
    };
  return (
    <>
      <div className="msg">
        <h1 className="text-center text-xl text-white font-bold sm:text-2xl">
          Ops! Your Location Not Found.
        </h1>
      </div>
      <div className="btn justify-center flex sm:mt-2">
        <button className="bg-gradient-to-tr from-blue-500 to-red-500 hover:bg-gradient-to-r  duration-1000  hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-s-3xl rounded-e-md my-4 sm:text-xl  "
         onClick={shareLocation}>
          Share Location
        </button>
      </div>
    </>
  );
};
