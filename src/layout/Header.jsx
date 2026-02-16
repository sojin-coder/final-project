import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Settings,
  Mail,
  Info,
  Menu,
  X,
  Search,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ESC Close + CTRL K
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSearchOpen(false);

      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const menus = [
    { name: "Home", to: "/", icon: <Home size={20} /> },
    { name: "About", to: "/about", icon: <User size={20} /> },
    { name: "Services", to: "/services", icon: <Settings size={20} /> },
    { name: "Contact", to: "/contact", icon: <Mail size={20} /> },
    { name: "Info", to: "/info", icon: <Info size={20} /> },
  ];

  const activeClass = ({ isActive }) =>
    `relative flex items-center gap-2 transition 
     after:content-[''] after:absolute after:left-0 after:-bottom-1 
     after:h-[2px] after:bg-amber-600 after:transition-all after:duration-300
     ${
       isActive
         ? "text-amber-600 after:w-full"
         : "text-slate-600 hover:text-amber-600 after:w-0 hover:after:w-full"
     }`;

  const mobileActiveClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-3 transition ${
      isActive
        ? "bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600"
        : "text-slate-600 hover:bg-blue-50"
    }`;

  return (
    <nav className="shadow-md bg-[#fafafad0] fixed w-full z-50 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-4">
        
        {/* LOGO */}
        <img
          src="https://i.pinimg.com/736x/ec/aa/6a/ecaa6ac4cbb715c055bd586316117d00.jpg"
          className="border border-gray-400 w-16 h-16 rounded-full"
          alt="Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          {menus.map((m) => (
            <li key={m.name}>
              <NavLink to={m.to} className={activeClass}>
                {m.icon}
                <span>{m.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ✅ Desktop Icons */}
        <div className="hidden md:flex gap-5">
          <Search
            size={22}
            className="cursor-pointer hover:text-amber-600 transition"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          <Link to="/signup">
            <User className="cursor-pointer hover:text-amber-600 transition" />
          </Link>
        </div>

        {/* ✅ Mobile Icons + Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Search */}
          <Search
            size={24}
            className="cursor-pointer text-slate-700"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          {/* User */}
          <Link to="/signup">
            <User
              size={24}
              className="cursor-pointer text-slate-700"
            />
          </Link>

          {/* Toggle */}
          <button
            className="text-slate-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t py-4 shadow-inner">
          {menus.map((m) => (
            <NavLink
              key={m.name}
              to={m.to}
              onClick={() => setOpen(false)}
              className={mobileActiveClass}
            >
              {m.icon} {m.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* SEARCH DROPDOWN */}
      {searchOpen && (
        <div className="absolute left-0 top-full w-full flex justify-center mt-4 px-4">
          <div
            className="relative w-full max-w-2xl 
            bg-white/90 backdrop-blur-xl 
            rounded-2xl shadow-2xl p-6 
            border"
          >
            <X
              className="absolute right-2 top-1 cursor-pointer hover:text-orange-500"
              onClick={() => setSearchOpen(false)}
            />

            <div className="flex gap-3">
              <input
                autoFocus
                type="text"
                placeholder="Enter what you search..."
                className="flex-1 px-4 py-3 rounded-xl outline-none border focus:border-amber-500"
              />

              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
