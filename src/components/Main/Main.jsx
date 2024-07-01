import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };
  return (
    <div className="main">
      <div className="nav">
        <p>Fadly AI</p>
        <img src={assets.user_icon} alt="User" className="user" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dlyy</span>
              </p>
              <p>ada yang bisa saya bantu hari ini?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Sarankan Beberapa Tempat Untuk Dikunjungi di Karachi")
                }
              >
                <p>Sarankan Beberapa Tempat Untuk Dikunjungi di Karachi</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Tulis Surat kepada atasan saya untuk cuti."
                  )
                }
              >
                <p>Tulis Surat kepada atasan saya untuk cuti.</p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Jelasin konsep AI Generatif ke anak 5 tahun.\nPakai gaya yang mudah dipahami dan kalimat sederhana.")
                }
              >
                <p>Konsep yang rumit</p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div
                className="card"
                onClick={() => {
                  handleCardClick(
                    "What is React JS and React Native"
                  );
                }}
              >
                <p>What is React JS and React Native</p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" className="user"/>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.fadly_icon} alt="Result" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSent();
                }
              }}
              value={input}
              type="text"
              placeholder="Enter a Prompt Here"
            />
            <div>
              <img className="btn" src={assets.gallery_icon} alt="Image" />
              <img className="btn" src={assets.mic_icon} alt="Mic" />
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={() => {
                  onSent();
                }} className="btn"
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
            Fadly AI may display inaccurate info, including about people, so double check the response. Your Privacy & Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
