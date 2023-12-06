import { useState, useEffect } from 'react'
import { backendRoot } from '../AppConfig'
import Authentication from '../authentication/Authentication'
import './WishlistButton.css'

function AddToWishlistButton({ itemId, showWishlistLength }) {
  // States to hold wishlist information
  const [userIsInterested, setUserIsInterested] = useState(false)
  const [userWishlist, setUserWishlist] = useState([])

  const { token, userId } = Authentication.getSessionCredentials() || {
    token: null,
    userId: null,
  }

  useEffect(() => {
    if (Authentication.isLoggedIn()) {
      Authentication.getCurrentUser().then(({ wishlist }) => {
        setUserWishlist(wishlist)
        setUserIsInterested(wishlist.includes(itemId))
      })
    }
  }, [itemId])

  function toggleWishlist() {
    const endpoint = `${backendRoot}/users/${userId}/wishlist/${itemId}`
    const requestMethod = userIsInterested ? 'DELETE' : 'PUT'

    fetch(endpoint, {
      method: requestMethod,
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then(async (res) => {
        if (requestMethod === 'DELETE') {
          setUserWishlist(
            userWishlist.filter((wishlistItemId) => wishlistItemId !== itemId)
          )

          setUserIsInterested(false)
        } else {
          setUserWishlist(await res.json())
          setUserIsInterested(true)
        }
      })
      .catch((e) => console.log(e))
  }

  // Return nothing if the user is not logged in
  if (!Authentication.isLoggedIn()) {
    return <></>
  }

  return (
    <div>
      <button style={{}} onClick={toggleWishlist}>
        {userIsInterested ? 'Remove from Wishlist' : 'Add to Wishlist'}
        {showWishlistLength ? ` (${userWishlist.length} items)` : <></>}
      </button>
    </div>
  )
}

export default AddToWishlistButton
