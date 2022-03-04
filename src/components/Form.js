import React, { useState } from 'react';

export default function Form(props) {
    const [userName, setUserName] = useState('');
    const [logged, setLogged] = useState(localStorage.name);
    const [style, setStyle] = useState({ visibility: 'hidden' });

    function handleChange(e) {
        setUserName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!logged) {
            if (userName === '') {
                setStyle({ visibility: 'visible' });
            } else {
                localStorage.setItem('name', userName);
                props.nameCallback(userName);
                setLogged(true);
                setUserName('');
                setStyle({ visibility: 'hidden' });
            }
        } else {
            localStorage.removeItem('name');
            setUserName('');
            props.nameCallback(userName);
            setLogged(false);
        }
    }

    return (
        <form className="sign-in" onSubmit={handleSubmit}>
            <label htmlFor="user-name">
                {logged ? 'Forget me?' : 'Remember me?'}
            </label>
            <input
                type="text"
                id="user-name"
                onChange={handleChange}
                value={userName}
                style={logged ? { visibility: 'hidden', width: "0%" } : { visibility: 'visible' }}
            />
            <button className="log-in-button" type="submit">
                OK
      </button>
            <span
                className="alert"
                style={style}
            >Please type in a valid user name!</span>
        </form>
    );
}
