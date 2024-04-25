import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Navbar = () => {
  return (
    <nav className="flex w-[92%] mx-auto p-3 justify-between  h-28">
      <div className="logo w-20 ">
        <Link to={"/"}>
          <img src={logo} alt="Logo Here" />
        </Link>
      </div>
      <div className="links w-[28%] h-2 font-bold text-sm p-[10px]">
        <ul className="flex justify-between">
          <li>
            <Link to={"/menu"}>MENU</Link>
          </li>
          <li>
            <Link to={"location"}>LOCATION</Link>
          </li>
          <li>
            <Link to={"about"}>ABOUT</Link>
          </li>
          <li>
            <Link to={"contact"}>CONTACT</Link>
          </li>
        </ul>
      </div>
      <div className="button">
        <button className="bg-red-600 text-white px-[14px] py-[2px] font-bold">
          <Link to={"login"}>Login</Link>
        </button>
      </div>
    </nav>
  );
};
