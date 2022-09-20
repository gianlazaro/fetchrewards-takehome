import { useEffect, useState } from "react";
import axios from "axios";
import SelectList from "./SelectList";
import "../styles/Form.scss";
import SuccessNotification from "./SuccessNotification";

function Form() {
  const [states, setStates] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [user, setUser] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const defaultInput = "";

  useEffect(() => {
    axios
      .get("https://frontend-take-home.fetchrewards.com/form")
      .then(({ data: { occupations, states } }) => {
        setOccupations(occupations);
        setStates(states);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const { fullName: name, email, password, occupation, state } = user;

    if (name && email && password && occupation && state) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [user]);

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { fullName: name, email, password, occupation, state } = user;

    axios
      .post("https://frontend-take-home.fetchrewards.com/form", {
        name,
        email,
        password,
        occupation,
        state,
      })
      .then(() => setIsComplete(true))
      .catch((err) => console.error(err));
  }

  return (
    <main className="form-wrapper">
      {isComplete ? (
        <SuccessNotification setIsComplete={setIsComplete} />
      ) : (
        <>
          <h1>Create an account</h1>
          <span className="account-notice">
            Have an account already?
            <a href="#" aria-label="Login with your email and password">
              Login.
            </a>
          </span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="textbox"
              id="fullName"
              value={user.fullName || defaultInput}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={user.email || defaultInput}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={user.password || defaultInput}
              onChange={handleChange}
              required
            />
            <label htmlFor="occupation">Occupation</label>
            <SelectList
              list={occupations}
              listId="occupation"
              handleChange={handleChange}
              value={user.occupation}
            />
            <label htmlFor="state">State</label>
            <SelectList
              list={states}
              format={({ name }) => name}
              listId="state"
              handleChange={handleChange}
              value={user.state}
            />
            <input type="submit" disabled={isBtnDisabled}/>
          </form>
        </>
      )}
    </main>
  );
}

export default Form;
