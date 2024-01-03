import { ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NavItem = ({
  name,
  children,
  index,
}: {
  name: string;
  children: {
    name: string;
    link: string;
  }[];
  index: number;
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between gap-1 text-[0.9rem] hover:bg-[#E9E6D7FF] p-2 rounded-lg "
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
      >
        <p className="font-[300]">{name}</p>
        <ChevronDownIcon className="h-4" />
      </div>
      {showDropDown && (
        <div className="absolute bg-white rounded-[1rem] p-2 min-w-[210%] mt-2 cursor-pointer z-[10000] ">
          {children.map((elem, inx) => (
            <Link
              to={elem.link}
              key={inx}
              className="cursor-pointer hover:bg-[#f5f2ff] p-2 rounded-lg grid grid-cols-2 items-center"
            >
              <p className="font-[300] text-[0.85rem] text-left justify-self-start">{elem.name}</p>
              <ArrowRightIcon className="h-4 justify-self-end" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
