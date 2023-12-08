import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'
import Authentication from './authentication/Authentication'

function UserSellingItems({ backendRoot }) {
  const [userItems, setUserItems] = useState([])
  const [user, setUser] = useState({ username: '' })

  let { userId } = useParams()

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}/items`)
      .then((res) => res.json())
      .then((data) => setUserItems(data))
      .catch((error) => console.error(error))
    fetch(`${backendRoot}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
  }, [userId, backendRoot])

  let newtitle = ''
  if (Authentication.getSessionCredentials().userId === user._id) {
    newtitle = `Items You are Giving Away`
  } else {
    newtitle = `Items ${user.username} Are Giving Away`
  }

  return <Item itemData={userItems} showSearchBar={false} title={newtitle} />
}

export default UserSellingItems
