import "./App.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie] = useCookies([`token`]);
  const [isValid, setValid] = useState(false);
  const [select, setSelect] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [isClicked, setClick] = useState(false);

  // Use effect for token verification to run once on mount
  useEffect(() => {
    async function verify() {
      if (cookies.token) {
        try {
          await axios.post(`https://authentication-gi50.onrender.com/check`, { token: cookies.token });
          setValid(true);
        } catch (e) {
          setValid(false);
        }
      } else {
        setValid(false);
      }
    }
    verify();
  }, [cookies.token]);

  // Redirect when token is valid
  useEffect(() => {
    if (isValid) {
      window.location.assign(`/send`);
    }
  }, [isValid]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = select.toLowerCase();
    setClick(true);

    if (url === `login`) {
      try {
        const res = await axios.post(`https://authentication-gi50.onrender.com/${url}`, { email, password });
        setCookie(`token`, res.data.token);
        setValid(true);
      } catch (e) {
        setClick(false);
        setValid(false);
        setErr("Login failed. Please check your credentials.");
      }
    } else {
      try {
        const res = await axios.post(`https://authentication-gi50.onrender.com/${url}`, { username, email, password });
        setCookie(`token`, res.data);
        setValid(true);
      } catch (e) {
        setClick(false);
        setValid(false);
        setErr("Registration failed. Please try again.");
      }
    }
  };

  const style = {
    input: {
      padding: "10px 1rem",
      borderRadius: "6px",
      border: "1px solid #000",
      fontSize: "1.1rem",
    },
    btn_primary: {
      padding: "10px",
      backgroundColor: "#5B95B7",
      border: "none",
      fontWeight: "bold",
      borderRadius: "6px",
      cursor: "pointer",
      color: "#fff",
      fontSize: "1.2rem",
    },
    btn_primary_diabled: {
      padding: "10px",
      backgroundColor: "#5E5E5E",
      border: "none",
      fontWeight: "bold",
      borderRadius: "6px",
      cursor: "pointer",
      color: "#fff",
      fontSize: "1.2rem",
    },
    btn_secondary: {
      width: "49%",
      border: "1px solid #000",
      padding: "8px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    btn_disabled: {
      width: "49%",
      backgroundColor: "#5E5E5E",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      padding: "8px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    form: {
      border: "1px solid #888",
      borderRadius: "12px",
      padding: "1rem 2rem",      
      width: "60%",
      height: "250px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxShadow: "0px 0px 32px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div className="App">
      <div className="main">
        <nav>
          <Link to="/" style={{ textDecoration: "none", color: "#5E5E5E" }}>FileNow</Link>
        </nav>
        <div className="main">
          <form style={style.form} onSubmit={handleFormSubmit}>
            {select === "Login" ? (
              <>
                <input style={style.input} placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                <div style={{ marginTop: `1rem` }}></div>
                <input style={style.input} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                <div style={{ marginTop: `1rem` }}></div>
                {
                  (isClicked)
                    ?<button style={style.btn_primary_diabled} disabled >Loading...</button>
                    :<button style={style.btn_primary} type="submit">Login</button>
                }
              </>
            ) : (
              <>
                <input style={style.input} placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} required />
                <div style={{ marginTop: `0.5rem` }}></div>
                <input style={style.input} placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
                <div style={{ marginTop: `0.5rem` }}></div>
                <input style={style.input} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                <div style={{ marginTop: `0.5rem` }}></div>
                {
                  (isClicked)
                    ?<button style={style.btn_primary_diabled} disabled >Loading...</button>
                    :<button style={style.btn_primary} type="submit">Register</button>
                }
              </>
            )}
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "1.2rem" }}>
              <button style={select === "Login" ? style.btn_disabled : style.btn_secondary} onClick={() => setSelect("Login")} disabled={select === "Login"}>Login</button>
              <button style={select === "Register" ? style.btn_disabled : style.btn_secondary} onClick={() => setSelect("Register")} disabled={select === "Register"}>Register</button>
            </div>
          </form>
          {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
