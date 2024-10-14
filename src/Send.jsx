import "./App.scss";
import Left from "./components/Left";
import { MdOutlineFileUpload } from "react-icons/md";
import { LuFile } from "react-icons/lu";
import { RiUploadCloudLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Share from "./components/Share";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { TbFolderShare } from "react-icons/tb";
import { LuImport } from "react-icons/lu";

const Send = () => {
  const [cookies, setCookie] = useCookies([`token`]);
  const [select, setSelect] = useState(true);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("test");
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [upload, setUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [share, setShare] = useState(false);
  const [isValid, setValid] = useState(false);
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

  useEffect(() => {
    async function verify() {
      if (cookies.token) {
        try {
          const res = await axios.post(`https://authentication-gi50.onrender.com/check`, { token: cookies.token });
          setName(res.data.username)
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

  async function uploadFile(e) {
    e.preventDefault();
    setUpload(false);
    setUploading(true);

    const formData = new FormData();
    formData.append(`file`, file);

    try {
      const response = await axios.post("https://filenow.onrender.com/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setUrl(response.data["download_url"]);
      setUploading(false);
      setShare(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
    }
  }

  useEffect(() => {
    if (file) {
      setSelect(false);
      setUpload(true);
      setFilename(file.name);
    }
  }, [file]);

  function fileSetter(e) {
    setFile(e.target.files[0]);
  }

  if (isValid) {
    return (
      <div className="App">
        <Left active={"send"} name={name} />
        <form className="main">
          <nav>
            <Link to="/" style={{ textDecoration: `none`, color: `#5E5E5E` }}>FileNow</Link>
          </nav>
          {select ? (
            <div className="main">
              <input type="file" id="inp" onChange={fileSetter} hidden />
              <label htmlFor="inp" className="select">
                <div className="container">
                  <MdOutlineFileUpload id="send-icon" />
                  <p>Browse files for upload</p>
                  <label htmlFor="inp" className="button">Browse</label>
                </div>
              </label>
            </div>
          ) : null}
          {upload ? (
            <div className="main">
              <div className="upload">
                <div className="container">
                  <div className="file">
                    <LuFile id="file-icon" />
                    <p>{filename}</p>
                  </div>
                </div>
                <button onClick={uploadFile}>Upload</button>
              </div>
            </div>
          ) : null}
          {uploading ? (
            <div className="main">
              <div className="uploading">
                <RiUploadCloudLine id="uploading-icon" />
                <p>File is uploading</p>
                <div className="progress-div">
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : null}
          {share ? <Share url={url} /> : null}
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
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="main">
        <nav><Link to="/" style={{ textDecoration: `none`, color: `#5E5E5E` }}>FileNow</Link></nav>
        <div className="main">
          <div style={{width: `65%`, height: `300px`, border: `2px solid red`, borderRadius: `12px`, display: `flex`, flexDirection: `column`, justifyContent: `center`, alignItems: `center`, boxShadow: `0px 0px 32px 0px rgba(200, 0, 0, 0.25)`}}>
            <p style={{fontSize: `1.5rem`, fontWeight: `bold`}}>You are unautherized</p>
            <p style={{marginTop: `0.2rem`}}>You Need to Login</p>
            <Link to={`/`}><button style={{ padding: `0.2rem 1.8rem`, marginTop: `0.82rem`, cursor: `pointer`}}>Login</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Send;