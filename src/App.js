
import { useEffect, useMemo, useState } from 'react';
import spinner from './assets/images/spinner.gif'
import './App.css';
import ContactCard from './components/Contacts/ContactCard'
import Contacts from './components/Contacts/Contacts';
import Favorites from './components/Favorites/Favorites';

function App() {

  const [loading, setLoading] = useState(false)
  const [inputText, setInputText] = useState('')
  const [contacts, setContacts] = useState([])
  const [favorite, setFavorite] = useState([])

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      const response = await fetch('https://reqres.in/api/users?page=1&delay=1')
      const data = await response.json()
      const contacts = data.data
      setContacts(contacts)
      setLoading(false)
    }
    loadUsers()
  }, [])

  const inputHandler = (e) => {
    setInputText(e.target.value)
  }

  const filteredData = useMemo(() => {
    return contacts.filter(item => {
      if (inputText === '') return item
      return item.email.toLowerCase().includes(inputText.toLocaleLowerCase())
    })
  }, [contacts, inputText])

  let total = filteredData.length

  const likeClickHandler = (id, like) => {
    let liked = !like


    if (liked) {
      let likedUser = contacts.find(item => item.id === id)
      let favoriteUsers = [...favorite, likedUser]
      setFavorite(favoriteUsers)
    } else {
      let filtered = favorite.filter(item => item.id !== id)
      setFavorite(filtered)
    }
    console.log('liked', id, liked)

  }

  const showMoreUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://reqres.in/api/users?page=2&delay=1')
      const users = await response.json()
      const data = users.data
      const result = [...filteredData, ...data]
      setContacts(result)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  console.log('render')
  return (

    < div className="App" >
      <h1 className='App_title'>My contacts</h1>

      <div className='App_searchBar'>
        <input type="text" placeholder='Search...' value={inputText} onChange={inputHandler} />
        <div>Total : {total}</div>
      </div>




      <div className='App_content'>
        <div className='Contacts'>
          {loading
            ? <img src={spinner} alt='spinner' />
            : <Contacts data={filteredData} likeClickHandler={likeClickHandler} />}

          <div className='App_button'>
            <button className={`${total === 12 || total < 6 ? 'hidden' : 'btn'}`} onClick={showMoreUsers}>Show more</button>
          </div>
        </div>

        <div className='Favorites'>
          <div> {(favorite.length > 0) && <h2 className='Favorites_title'>Favorite</h2>}</div>
          <Favorites data={favorite} likeClickHandler={likeClickHandler} />
        </div>
      </div>
    </div >
  );
}

export default App;
