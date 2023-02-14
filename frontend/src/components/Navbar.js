import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

function Navbar() {
  return (
    <>
      <div className="flex items-center bg-[#032538] p-5 justify-between">
        <div className="flex gap-10 items-center text-white/70">
          <Link to="/" className="text-xl font-bold text-white">
            RIM PORTAL
          </Link>
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <div className="dropdown group text-white/70 hover:text-white">
            <p className="cursor-pointer">Requests</p>

            <div className="dropdown-content z-10 absolute bg-[#032538] hidden group-hover:block shadow-xl">
              <Link to="/" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-[#217cb0]">
                Requests - Sent
              </Link>
              <Link to="/" className="block px-4 py-3 text-white/70 hover:text-white hover:bg-[#217cb0]">
                Requests - Received
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex">
            <input
              className="searchbar border-none outline-none text-sm px-5 py-2 w-72"
              type="text"
              placeholder="Search item"
            ></input>
            <div className="flex justify-center items-center bg-[#A2D5F2] px-4 cursor-pointer text-xl text-[#032538] hover:bg-[#52a6de]">
              <IoSearch />
            </div>
          </div>
          <button className="cursor-pointer flex justify-center items-center text-sm text-[#032538] font-medium bg-[#A2D5F2] hover:bg-[#52a6de] px-5">Add item +</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
