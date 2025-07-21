"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function Select({ selected, setSelected, options }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const chooseOption = (value) => {
    setSelected(value)
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-40" ref={menuRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-sm border rounded-md bg-white shadow-sm text-gray-700"
      >
        {selected}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => chooseOption(option)}
              className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
