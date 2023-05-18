/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import BuildWithMeLogo from "../../../assets/build-with-me-logo.jpg"
import { FaHome } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { TbBriefcase, TbSearch, TbMessageDots,TbBellRingingFilled } from 'react-icons/tb'
import user from "../../../assets/user.png"
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';
import SearchUsers from '../SearchUsers';
import { getAllUsers } from '../../../api/FirestoreAPI';
import "./index.scss"


export default function Topbar() {
  let navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(""); 
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] =  useState([]);

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };
  console.log(users);

  const openUser = (user) => {
    navigate("/profile", {state : {
      id : user.id,
      email : user.email,
    }});
  }

  const handleSearch = () => {
    if(searchInput !== ""){
        const searched = users.filter((user) => {
        const userValues = Object.values(user).join("").toLowerCase();
        const searchKeywords = searchInput.toLowerCase().split(" ");
        return searchKeywords.every((keyword) => userValues.includes(keyword));
      });
      setFilteredUsers(searched);
    }else{
      setFilteredUsers(users);
    }
    
  }

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000)
    return () => clearTimeout(debounced);
  },[searchInput])

  useEffect(() => {
    getAllUsers(setUsers);
  },[])

  return (
    <div className='topbar-main'>
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <img src = {BuildWithMeLogo} alt ="logo" className='BuildWithMelogo' />
      {isSearch ? <SearchUsers 
        setIsSearch={setIsSearch} setSearchInput={setSearchInput}  
      /> : 
        <div className='react-icons'>
        
        <FaHome size = {30} className='react-icon' 
        onClick={ () => goToRoute("/home")} />

        <FiUsers size = {30} className='react-icon' 
          onClick={ () => goToRoute("/connections")} />

        <TbBriefcase size = {30} className='react-icon' />

        <TbSearch size = {30} className='react-icon' onClick={() => setIsSearch(true)} />

        <TbMessageDots size = {30} className='react-icon' />
        
        <TbBellRingingFilled size = {30} className='react-icon' />

        </div>  
      }

      

      <img src = {user} alt ="user-logo" className='user-logo' 
        onClick={displayPopup}
      />

      {searchInput.length === 0 ? <> </> : 
        <div className='search-results'>
          {filteredUsers.length === 0 ? <div className='search-inner'> No user found.. </div> : 
          filteredUsers.map((user) => (
            <div className='search-inner' onClick={() => openUser(user)}>
              <img src = {user.imageLink} />
              <span className='name'>{user.name}</span>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
