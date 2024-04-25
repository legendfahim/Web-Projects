import shoe from "../assets/shoe.png";
import flipcart from "../assets/flip.png";
import amazon from "../assets/ama.png";
export const Home = () => {
  return (
    <>
      {/* this page is not responsive  */}
      <div className="hero w-[80%] mx-auto  h-[100vh] flex justify-flex-end">
        {/* Left side */}
        <div className="left w-1/2">
          {/* Left Top */}
          <div className="title h-[50%] font-bold">
            <h1 className="text-8xl">YOUR FEET DESERVE THE BEST</h1>
          </div>
          {/*Left Bottom*/}
          {/* Bottom text  */}
          <div className="pera w-[80%]">
            <p className=" text-gray-600 font-bold">
              YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
              SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH
              OUR SHOES.
            </p>
          </div>
          {/* Bottom buttons  */}
          <div className="btns my-5 ">
            <button className="px-3 py-1 bg-red-600 text-white font-bold text-xl mr-9">
              Shop Now
            </button>
            <button className="px-3 py-1 text-gray-600  border border-gray-600 font-bold text-xl">
              Category
            </button>
          </div>
          {/* Available text */}
          <div className="available py-3">
            <p>Also Available On</p>
          </div>

          <div className="images flex w-7">
            <img src={flipcart} alt="flipcart" />
            <img src={amazon} alt="amazon" className="mx-3" />
          </div>
        </div>
        {/* Right side  */}
        <div className="right w-[43rem]  absolute right-7 ">
          <img
            src={shoe}
            alt="Shoe image"
            className="shoe-img"
            style={{ filter: "drop-shadow(29px 25px 13px rgba(0, 0, 0, 0.4))" }}
          />
        </div>
      </div>
    </>
  );
};
