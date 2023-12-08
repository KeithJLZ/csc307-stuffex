import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'
import Authentication from './authentication/Authentication'

function UserBoughtItems({ backendRoot }) {
  const [boughtItems, setBoughtItems] = useState([])
  let { userId } = useParams()
  const [user, setUser] = useState({ username: '' })

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}/items-bought`)
      .then((res) => res.json())
      .then((data) => setBoughtItems(data))
      .catch((error) => console.error(error))
    fetch(`${backendRoot}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
  }, [userId, backendRoot])

  let newtitle = ''
  if (Authentication.getSessionCredentials().userId === user._id) {
    newtitle = `Items You Have Bought`
  } else {
    newtitle = `Items ${user.username} Have Bought`
  }

  return <Item itemData={boughtItems} showSearchBar={false} title={newtitle} />
}

export default UserBoughtItems
