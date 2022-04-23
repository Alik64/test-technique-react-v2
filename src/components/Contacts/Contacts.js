import React from 'react'
import ContactCard from './ContactCard'
import PropTypes from 'prop-types'


const Contacts = ({ likeClickHandler, data }) => {
    return (
        <>{data.map(item => (
            <ContactCard
                key={item.id}
                id={item.id}
                avatar={item.avatar}
                firstName={item.first_name}
                lastName={item.last_name}
                email={item.email}
                onLikeClick={likeClickHandler}
            />))}</>
    )
}
Contacts.propTypes = {
    likeClickHandler: PropTypes.func,
    data: PropTypes.array,
}
export default Contacts