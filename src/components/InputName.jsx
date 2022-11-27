import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { name } from '../store/slices/name.slice';
import trainer from '../images/trainer.png'

const InputName = () => {

  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const submit = (e) => {
    e.preventDefault();
    navigate("/pokedex");
    dispatch(name(userName))
  }

  return (
    <div className='section-input-name'>
      <img src={trainer} alt="trainer" />
      <h1>Hello! Trainer</h1>
      <h3>Give me your name to start</h3>

      <form action="" onSubmit={submit} className="form-input">
        <input
          type="text"
          name="userName" id="inputName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)} />
        <button className='send-button'>
          <span className="material-symbols-outlined">
            send
          </span>
        </button>
      </form>
      
      <footer>By Walter Tomás Castagno</footer>
    </div>
  );
};

export default InputName;