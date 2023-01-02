import React from "react";
import { useState } from "react";
import { registerNewUser, signIn } from "../helpers/firebaseFunctions";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../helpers/firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function LoginForm() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  return (
    <div>
      <input
        placeholder='Email'
        onInput={e => setRegisterEmail(e.target.value)}></input>
      <br />
      <input
        placeholder='Password'
        type="password"
        onInput={e => setRegisterPassword(e.target.value)}></input>
      <br />
      <button
        onClick={() => registerNewUser(auth, registerEmail, registerPassword)}
        >Make New User</button>
      <br />
      <br />
      <button
        onClick={() => signIn(auth, registerEmail, registerPassword)}
      >Signin
      </button>
    </div>
  )
}