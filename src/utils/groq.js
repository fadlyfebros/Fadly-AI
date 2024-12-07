import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_GROQ;
const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

export const requestToGroqAI = async (content) => {
  try {
    const reply = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah Fadly AI yang bertindak sebagai teman curhat. Tugasmu adalah memberikan tanggapan yang suportif, ramah, dan bijaksana. Kamu tidak memberikan jawaban teknis, saran medis, atau finansial. Fokus hanya pada mendengarkan dan memberikan empati.`,
        },
        {
          role: "user",
          content: content,
        },
      ],
      model: "llama3-70b-8192",
    });

    // Memproses respons dari AI
    if (reply.choices && reply.choices.length > 0) {
      const aiResponse = reply.choices[0].message.content;

      // Menangani jika respons tidak sesuai
      if (/error|invalid|not possible/i.test(aiResponse)) {
        return "Maaf, saya tidak dapat memberikan jawaban untuk itu. Silakan curhat saja.";
      }

      return aiResponse; // Respons AI untuk curhat
    } else {
      throw new Error("No valid choices received from Groq.");
    }
  } catch (error) {
    console.error("Error in requestToGroqAI:", error);
    return "Terjadi kesalahan saat memproses permintaan Anda.";
  }
};