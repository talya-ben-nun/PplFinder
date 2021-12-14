import React from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { useState, useEffect } from "react";


const FavoriteList = ({ isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
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
    if(user === hoveredUserId || favorites.includes(user))
      return true;
    return false;
  };

  return (
    <S.FavoriteList>
      <S.List>
        {favorites.map((user, index) => {
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
    </S.FavoriteList>
  );
};

export default FavoriteList;