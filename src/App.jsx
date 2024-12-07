import { useState } from "react";
import { requestToGroqAI } from "./utils/groq";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // State untuk animasi typing
  const [typingMessage, setTypingMessage] = useState(""); // Pesan yang sedang diketik

  // Fungsi untuk mengirim permintaan ke AI
  const handleSubmit = async () => {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Menambahkan pesan user
    setData((prevData) => [
      ...prevData,
      { sender: "user", message: input, time: currentTime },
    ]);

    setInput(""); // Clear input field after sending
    setIsTyping(true); // Menandakan bahwa AI sedang mengetik

    // Menampilkan pesan typing "AI is typing..." selama 2 detik
    setTimeout(() => {
      setTypingMessage("AI is typing...");
    }, 500);

    // Dapatkan respons AI dan tambahkan waktu
    const aiResponse = await requestToGroqAI(input);
    setTimeout(() => {
      const aiTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setIsTyping(false); // Matikan animasi typing setelah selesai
      setTypingMessage(""); // Clear typing message
      setData((prevData) => [
        ...prevData,
        { sender: "ai", message: aiResponse, time: aiTime },
      ]);
    }, 2500); // Menunggu sebelum menampilkan pesan penuh AI
  };

  // Fungsi untuk menangani event keypress
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Mencegah form submit secara default
      handleSubmit(); // Menjalankan handleSubmit jika Enter ditekan
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      {/* Card dengan lebar penuh */}
      <div className="card w-full max-w-screen-xl bg-base-200 shadow-xl p-6 h-full min-h-screen">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Fadly AI - Live Chat
        </h1>
        <div className="chat-box h-80 overflow-auto mb-4 p-6 pb-8 bg-base-100 rounded-lg flex-grow">
          {/* Menampilkan chat */}
          {data.length === 0 ? (
            <p className="text-gray-400">Mulai percakapan dengan AI...</p>
          ) : (
            data.map((message, index) => (
              <div
                key={index}
                className={`chat mt-4 mb-4 ${
                  message.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                {/* Nama (AI atau You) di atas bubble */}
                <div className="chat-header font-bold text-sm mb-1">
                  {message.sender === "user" ? "You" : "AI"}
                </div>
                {/* Bubble dengan pesan dan waktu di dalamnya */}
                <div className="chat-bubble relative text-left">
                  {message.message}
                  <span
                    className={`absolute text-xs text-gray-400 mt-10 ${
                      message.sender === "user" ? "bottom-0 right-2" : "bottom-0 left-2"
                    }`}
                    style={{ marginTop: "10px" }} 
                  >
                    {message.time}
                  </span>
                </div>
              </div>
            ))
          )}
          {/* Menampilkan animasi typing */}
          {isTyping && (
            <div className="chat mb-4 chat-start">
              <div className="chat-header font-bold text-sm mb-1">AI</div>
              <div className="chat-bubble">{typingMessage}</div>
            </div>
          )}
        </div>
        <form className="form-control gap-4 mt-8">
          <input
            id="content"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik permintaan disini..."
            className="input input-bordered input-primary w-full"
            onKeyPress={handleKeyPress} // Menambahkan event keypress pada input
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary hover:btn-accent w-full"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
