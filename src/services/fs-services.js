//For the API RAG system

import api from '../services/api';

export const askFairSayAI = async (query) => {
  try {
    const res = await api.post('/ai/chat', { message: query });
    return {
      answer: res.data.reply,
      links: []
    }; 
  } catch (err) {
    console.error("AI service failed", err);
    return { 
      answer: "I'm sorry, the FairSay AI is currently unavailable. Please check the Labour Act documentation directly.", 
      links: [] 
    };
  }
};



//For the complaint feedback form, using the linkvert scale

export const submitFeedback = (complaintId, feedbackData) => {
  const allFeedback = JSON.parse(localStorage.getItem('fs_feedback') || '[]');

  const newReport = {
    complaintId,
    ...feedbackData,
    submittedAt: new Date().toISOString(),
  }
  
localStorage.setItem('fs_feedback', JSON.stringify([newReport, ...allFeedback]));

return { success: true };

}; 