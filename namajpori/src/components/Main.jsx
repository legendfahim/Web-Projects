import PropTypes from "prop-types";
export const Main = (props) => {
  const { city, country, fajr, dhuhr, asr, maghrib, isha } = props;
  return (
    <>
      <div className="top flex justify-center  text-white">
        <h1 className="sm:text-xl">
          <span className="font-bold ">Location:</span> {city}, {country}
        </h1>
      </div>
      <div className="data text-white w-[83%] sm:w-[35%] mt-3 mx-auto">
        {/* For Fajr  */}
        <div className="fajr flex mb-3 border-2 border-gray-500 rounded-md px-2 text-xl font-bold sm:text-2xl sm:py-3">
          <h1 className=" w-2/3 ">Fajr</h1>
          <h1 className="time w-1/3  text-[#65f3ff] text-center">{fajr}</h1>
        </div>
        {/* for Dhuhr  */}
        <div className="Dhuhr flex mb-3 border-2 border-gray-500 rounded-md px-2 text-xl font-bold sm:text-2xl sm:py-3">
          <h1 className="w-2/3 ">Dhuhr</h1>
          <h1 className="time w-1/3 text-[#65f3ff] text-center">{dhuhr}</h1>
        </div>
        {/* For Asr  */}
        <div className="Asr flex mb-3 border-2 border-gray-500 rounded-md px-2 text-xl font-bold sm:text-2xl sm:py-3">
          <h1 className=" w-2/3 ">Asr</h1>
          <h1 className="time w-1/3 text-[#65f3ff] text-center">{asr}</h1>
        </div>
        {/* For Maghrib  */}
        <div className="Maghrib flex mb-3 border-2 border-gray-500 rounded-md px-2 text-xl font-bold sm:text-2xl sm:py-3">
          <h1 className=" w-2/3 ">Maghrib</h1>
          <h1 className="time w-1/3 text-[#65f3ff] text-center">{maghrib}</h1>
        </div>
        {/* for Isha  */}
        <div className="Isha flex border-2 border-gray-500 rounded-md px-2 text-xl font-bold sm:text-2xl sm:py-3">
          <h1 className=" w-2/3 ">Isha</h1>
          <h1 className="time w-1/3 text-[#65f3ff] text-center">{isha}</h1>
        </div>
      </div>
    </>
  );
};

Main.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  fajr: PropTypes.string.isRequired,
  dhuhr: PropTypes.string.isRequired,
  asr: PropTypes.string.isRequired,
  maghrib: PropTypes.string.isRequired,
  isha: PropTypes.string.isRequired,
};
