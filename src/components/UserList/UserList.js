import React from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { useState, useEffect } from "react";


const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkedCountry, setCheckedCountry] = useState({BR: false, AU: false,CA: false, DE: false, NO: false});
  const [country, setCountry] = useState({Brazil: "BR", Australia: "AU", Canada: "CA", Germany: "DE", Norway : "NO"});
  const [check,setCheck]=useState(0);
  const [favorites, setFavorites] = useState([]);
  
  

  useEffect(() => { 
    setFavorites(JSON.parse(localStorage.getItem("favorites")))
  },[]);
    
  useEffect(() => { 
    localStorage.setItem("favorites",JSON.stringify(favorites)) 
  } ,[favorites]);


   const handleMouseClick = (user) => {
    let ind = favorites.indexOf(user);
    if(ind> -1)
    {
      setFavorites(favorites.slice(0,ind).concat(favorites.slice(ind+1)));
    }
    else
    {
      //localStorage.setItem("favorites",JSON.stringify(favorites));
      setFavorites([...favorites, user]);
    }
  };

  const handleMouseEnter = (user) => {
    setHoveredUserId(user);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const getIsVisible=(user)=>
  {
    if(favorites){
      if(user === hoveredUserId || favorites.includes(user))
        return true;
    }
    return false;
  };

  const handleChange =(value) =>
  {
    if(checkedCountry[value])
    {
      setCheck(check-1);
    }
    else
    {
      setCheck(check+1);
    }
    setCheckedCountry({...checkedCountry, [value]: !checkedCountry[value]});
  }; 
 
  const getUser=(user)=>
  {
    if(check===0)
      return true;
    if(checkedCountry[country[user.location.country]]== true )
    {
      return true;
    }
    return false;
  };


  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleChange} isChecked={checkedCountry.BR} />
        <CheckBox value="AU" label="Australia" onChange={handleChange} isChecked={checkedCountry.AU}/>
        <CheckBox value="CA" label="Canada" onChange={handleChange} isChecked={checkedCountry.CA}/>
        <CheckBox value="DE" label="Germany" onChange={handleChange} isChecked={checkedCountry.DE}/>
        <CheckBox value="NO" label="Norway" onChange={handleChange} isChecked={checkedCountry.NO}/>
      </S.Filters>
      <S.List>
        {users.filter(getUser).map((user, index) => {
            return (
              <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(user)}
                onClick={( )=> handleMouseClick(user)}
                onMouseLeave={handleMouseLeave}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper isVisible={getIsVisible(user)}>
                  <IconButton>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
            })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;