import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'
import Authentication from './authentication/Authentication'

function UserWishlist({ backendRoot }) {
  const [wishlistItems, setWishlistItems] = useState([])
  let { userId } = useParams()
  const [user, setUser] = useState({ username: '' })

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}/wishlist`)
      .then((res) => res.json())
      .then((data) => setWishlistItems(data))
      .catch((error) => console.error(error))
      fetch(`${backendRoot}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
  }, [userId, backendRoot])


  let newtitle = ''
  if (Authentication.getSessionCredentials().userId === user._id){
     newtitle= `Items You Have Wishlisted`
  }else{
     newtitle= `Items ${user.username} Have Wishlisted`
  }

  return (
    <Item
      itemData={wishlistItems}
      showSearchBar={false}
      title= {newtitle}
    />
  )
}

export default UserWishlist
