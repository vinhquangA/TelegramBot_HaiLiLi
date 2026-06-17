import 'dotenv/config'; // Thêm dòng này để đọc file .env
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || '',
    baseURL: 'https://api.groq.com/openai/v1',
});

async function test() {
    console.log('=== Test Groq API ===');
    try {
        const r = await client.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'Bạn là Hải, chàng trai Việt Nam sinh 2003. Nói chuyện thân thiện kiểu bạn bè Gen Z. Xưng tao gọi mày. Dùng emoji.' },
                { role: 'user', content: 'Xin chào' },
            ],
            max_tokens: 200,
        });
        console.log('✅ SUCCESS:', r.choices[0]?.message?.content);
        console.log('Model:', r.model);
    } catch (e: unknown) {
        const err = e as { status?: number; code?: string; message?: string };
        console.error(`❌ FAIL: [${err.status}] [${err.code}] ${err.message}`);
    }
}

test();
