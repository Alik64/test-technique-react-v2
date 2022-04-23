import React from 'react'
import ContactCard from '../Contacts/ContactCard'
import PropTypes from 'prop-types'

const Favorites = ({ data, likeClickHandler }) => {
    return (
        <>
            {data.map(item => (
                <div key={item.id} className='Favorite_card'>
                    <ContactCard
                        isLiked
                        key={item.id}
                        id={item.id}
                        avatar={item.avatar}
                        firstName={item.first_name}
                        lastName={item.last_name}
                        email={item.email}
                        onLikeClick={likeClickHandler}
                    /></div>))}
        </>
    )
}
Favorites.propTypes = {
    likeClickHandler: PropTypes.func,
    data: PropTypes.array,
}
export default Favorites