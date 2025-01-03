import './App.scss';
import Left from './components/Left';
import { FaLink } from "react-icons/fa6";
import { GoPaste } from "react-icons/go";
import axios from 'axios';
import { TbFolderShare } from "react-icons/tb";
import { LuImport } from "react-icons/lu";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Recieve = () => {
  const [url, setUrl] = useState('');
  const [cookies] = useCookies(['token']);
  const [name, setName] = useState("test");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Verify if user is authenticated
  useEffect(() => {
    async function verifyToken() {
      if (cookies.token) {
        try {
          const res = await axios.post(`https://authentication-gi50.onrender.com/check`, { token: cookies.token });
          setName(res.data.username)
          setAuthenticated(true);
        } catch (e) {
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    }
    verifyToken();
  }, [cookies.token]);

  function downloadFile() {
    const link = url.split('/').pop();
    window.open(`https://filenow-production.up.railway.app/download/${link}`, '_blank');
  }
  
  return (
      <div className='App'>
        <Left active={'recieve'} name={name}/>
        <div className='main'>
          <nav>
            <Link to='/' style={{ textDecoration: `none`, color: `#5E5E5E` }}>FileNow</Link>
          </nav>
          <div className='main'>
            <div className='share'>
              <p id="title">Share file</p>
              <p id="sub-title">Anyone can download a file by the link.</p>
              <div id="line"></div>
              <div className="link-div">
                <input
                  type='text'
                  placeholder='Paste your Link'
                  onChange={e => setUrl(e.target.value)}
                  style={{ border: "none", padding: `12px`, width: `100%`, fontWeight: `600` }}
                  className="link"
                />
              </div>
              <div><button onClick={downloadFile}>Download</button></div>
            </div>            
          </div>
          <div style={{display: `${(width<600) ?"flex" :"none"}`, justifyContent: `space-between`,  padding: `0.7rem 1.5rem`, boxShadow: `0px 0px 12px 0px rgba(0, 0, 0, 0.25)` }}>
            <button style={{width: `100%`, border: `none`, backgroundColor: `#F8F8F8`}}>
              <Link to={`/send`} style={{display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, textDecoration: `none`, color: `${(window.location.href === `http://localhost:5173/send`) ? "#538cad" :"#5E5E5E"}`}}>
                <TbFolderShare fontSize={`2rem`} style={{marginLeft: `2px`}}/>
                <p style={{fontSize: `0.7rem`, fontWeight: `bold`, marginTop: `2px`}}>Send</p>
              </Link>
            </button>
            <button style={{width: `100%`, border: `none`, backgroundColor: `#F8F8F8`}}>
              <Link to={`/recieve`} style={{display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, textDecoration: `none`, color: `${(window.location.href === `http://localhost:5173/recieve`) ? "#538cad" :"#5E5E5E"}`}}>
                <LuImport fontSize={`2rem`}/>
                <p style={{fontSize: `0.7rem`, fontWeight: `bold`, marginTop: `1px`}}>Recieve</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
}

export default Recieve;
