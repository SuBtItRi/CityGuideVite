// Работа с достопримечательностями

export const fetchLandmark = async (id) => {
  const response = await fetch(`https://6728a8d3270bd0b97556a70f.mockapi.io/catalog/filters/${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const addLandmark = async (postData) => {
  const response = await fetch(`https://6728a8d3270bd0b97556a70f.mockapi.io/catalog/filters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json()
}
export const delLandmark = async (landmarkID) => {
  const response = await fetch(
    `https://6728a8d3270bd0b97556a70f.mockapi.io/catalog/filters/${landmarkID}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json()
}

export const updateGrades = async (grades, id) => {
  const response = await fetch(
    `https://6728a8d3270bd0b97556a70f.mockapi.io/catalog/filters/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grade: grades }),
    }
  )
  if (!response.ok) {
    throw new Error('Ошибка отправки данных')
  }
}

// Работа с каталогом

export const fetchCatalog = async (filter, searchterm, sortBy = '', currentPage) => {
  const response = await fetch(
    `https://6728a8d3270bd0b97556a70f.mockapi.io/catalog/filters?filter=${filter}&page=${currentPage}&limit=6${searchterm == '' ? '' : `&title=${searchterm}`}&sortBy=${sortBy}`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const fetchCatalogLength = async (filter, searchterm) => {
  const response = await fetch(
    `https://6728a8d3270bd0b97556a70f.mockapi.io/catalog/filters?filter=${filter}${searchterm == '' ? '' : `&title=${searchterm}`}`
  )
  const data = await response.json()
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return Math.ceil(data.length / 6)
}

// Работа с отзывами

export const fetchReviews = async (landmarkID) => {
  const response = await fetch(
    `https://6751eebad1983b9597b4dc21.mockapi.io/reviews?currentLandmarkID=${landmarkID}`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const postReview = async (postData) => {
  const response = await fetch(`https://6751eebad1983b9597b4dc21.mockapi.io/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json()
}

export const delReview = async (reviewID) => {
  const response = await fetch(`https://6751eebad1983b9597b4dc21.mockapi.io/reviews/${reviewID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json()
}

export const fetchUserReviews = async (userID) => {
  const response = await fetch(
    `https://6751eebad1983b9597b4dc21.mockapi.io/reviews?currentUserID=${userID}`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

// Работа с пользователями

export const fetchUser = async (userID) => {
  const response = await fetch(`https://6751eebad1983b9597b4dc21.mockapi.io/users/${userID}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const fetchUserData = async (username) => {
  if (username == '') {
    return []
  }
  const response = await fetch(
    `https://6751eebad1983b9597b4dc21.mockapi.io/users?username=${username}`
  )
  if (!response.ok) {
    return []
  }
  return await response.json()
}

export const addUser = async (postData) => {
  const response = await fetch('https://6751eebad1983b9597b4dc21.mockapi.io/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  if (!response.ok) {
    throw new Error('response not ok')
  }
  return await response.json()
}

export const changeUserAvatar = async (userID, avatar) => {
  const response = await fetch(`https://6751eebad1983b9597b4dc21.mockapi.io/users/${userID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ avatar: avatar }),
  })
  if (!response.ok) {
    throw new Error('response not ok')
  }
  return await response.json()
}

export const changeUserPassword = async (userID, password) => {
  const response = await fetch(`https://6751eebad1983b9597b4dc21.mockapi.io/users/${userID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password }),
  })
  if (!response.ok) {
    throw new Error('response not ok')
  }
  return await response.json()
}

export const delUser = async (userID) => {
  const response = await fetch(`https://6751eebad1983b9597b4dc21.mockapi.io/users/${userID}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return await response.json()
}
