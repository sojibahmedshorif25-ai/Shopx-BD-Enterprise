import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_BACKUP,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

const groqKeys = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_BACKUP,
].filter(Boolean) as string[];

// Call Groq Llama 3.3 70B (Fastest response, <300ms)
const callGroqAI = async (prompt: string, systemInstruction?: string): Promise<string | null> => {
  for (const apiKey of groqKeys) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content:
                systemInstruction ||
                'You are ShopX AI Assistant, an ultra-smart, polite, and helpful e-commerce shopping consultant for ShopX BD (Bangladesh). You fluently answer in Bengali (বাংলা) and English with product advice, recipes, pure food health benefits, and gadget comparisons.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as any;
        const content = data.choices?.[0]?.message?.content;
        if (content) return content;
      }
    } catch (err: any) {
      console.warn(`⚠️ [Groq AI Failover] Key issue: ${err.message}`);
    }
  }
  return null;
};

// Call Google Gemini 1.5 Flash
const callGeminiAI = async (prompt: string, systemInstruction?: string): Promise<string | null> => {
  for (const apiKey of geminiKeys) {
    try {
      const cleanKey = apiKey.startsWith('AIzaSy') ? apiKey : `AIzaSy${apiKey.replace(/^AQ\./, '')}`;
      const genAI = new GoogleGenerativeAI(cleanKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction:
          systemInstruction ||
          'You are ShopX AI Assistant, an ultra-smart, polite shopping consultant for ShopX BD. You speak fluent Bengali (বাংলা) and English.',
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err: any) {
      console.warn(`⚠️ [Gemini AI Failover] Key issue: ${err.message}`);
    }
  }
  return null;
};

export const generateAIResponse = async (
  prompt: string,
  systemInstruction?: string
): Promise<string> => {
  // Try Groq First for instant speed
  const groqRes = await callGroqAI(prompt, systemInstruction);
  if (groqRes) return groqRes;

  // Fallback to Google Gemini
  const geminiRes = await callGeminiAI(prompt, systemInstruction);
  if (geminiRes) return geminiRes;

  return `ShopX AI Assistant: আসসালামু আলাইকুম! আমাদের খাঁটি সুন্দরবনের মধু, গাওয়া ঘি, ঘানি ভাঙা সরিষার তেল ও লেটেস্ট গ্যাজেট সমূহে রয়েছে আকর্ষণীয় অফার ও ফ্রি ডেলিভারি। যেকোনো প্রয়োজনে আমাদের হটলাইনে 01942791004 যোগাযোগ করতে পারেন!`;
};

export const generateProductDescription = async ({
  title,
  category,
  features,
}: {
  title: string;
  category: string;
  features?: string;
}): Promise<{ shortDescription: string; fullDescription: string; tags: string[]; seoKeywords: string[] }> => {
  const prompt = `Generate a high-converting, SEO-optimized e-commerce product description in English and Bengali for:
Product Title: ${title}
Category: ${category}
Key Features: ${features || 'Premium quality, 100% verified authentic'}

Please return ONLY a valid JSON object matching this structure:
{
  "shortDescription": "2-sentence compelling summary with key highlights in Bengali",
  "fullDescription": "Rich description with bullet points of benefits, specs, and why to buy in Bengali & English",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoKeywords": ["keyword1", "keyword2", "keyword3"]
}`;

  try {
    const text = await generateAIResponse(
      prompt,
      'You are a world-class e-commerce copywriter for the Bangladesh market. Always return strict JSON.'
    );

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.warn('AI Description JSON parse fallback:', e);
  }

  return {
    shortDescription: `${title} — ShopX BD-এর ১০০% খাঁটি ও প্রিমিয়াম কোয়ালিটি পণ্য। দ্রুত হোম ডেলিভারি ও মানি-ব্যাক গ্যারান্টি।`,
    fullDescription: `${title} পণ্যটি বাজারের সেরা কোয়ালিটি নিশ্চিত করে তৈরি। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি এবং ৭ দিনের রিটার্ন পলিসি সুবিধা রয়েছে।`,
    tags: [category.toLowerCase(), 'shopx-bd', 'organic', 'authentic', 'bangladesh'],
    seoKeywords: [title, category, 'buy online bd', 'best price bangladesh'],
  };
};
