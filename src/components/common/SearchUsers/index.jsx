/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import "./index.scss";

export default function SearchUsers({setIsSearch, setSearchInput}) {
  return (
    <div className='search-users'>
      <input placeholder='Search Users..' onChange={(event) => setSearchInput(event.target.value)} />
      <AiOutlineClose className='close-icon' size={25} onClick={() => {
          setIsSearch(false)
          setSearchInput("")
        }} />
    </div>
  )
}
