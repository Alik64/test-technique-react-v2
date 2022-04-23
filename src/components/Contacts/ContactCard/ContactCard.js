import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Like } from '../../../assets/images/heart.svg'
import { ReactComponent as LikeFill } from '../../../assets/images/heart-fill.svg'

import s from './ContactCard.module.css'

const ContactCard = ({
    id,
    avatar,
    firstName,
    lastName,
    email,
    isLiked,
    onLikeClick }) => {

    const [like, setLike] = useState(false)

    const likeHandler = () => {
        setLike(!like)
        onLikeClick(id, like)
    }


    return (
        <div className={s.root}>
            <div className={s.content}>
                <div className={s.avatar}>
                    <img src={avatar} alt="user" />
                </div>
                <div className={s.info}>
                    <p className="info_name">{firstName} {lastName}</p>
                    <p className="info_email">{email}</p>
                </div>
            </div>
            <div onClick={likeHandler}>
                {like || isLiked ? <LikeFill /> : <Like />}
            </div>
        </div>
    )
}
ContactCard.defaultProps = {
    isLiked: false
}
ContactCard.propTypes = {
    id: PropTypes.number,
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    isLiked: PropTypes.bool,
    onLikeClick: PropTypes.func,
}

export default ContactCard