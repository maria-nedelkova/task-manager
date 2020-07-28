import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const AboutItem = ({ text }) => {
    return (
        <>
            <FontAwesomeIcon icon={faCheck} />
            <li>{text}</li>
        </>
    );
}