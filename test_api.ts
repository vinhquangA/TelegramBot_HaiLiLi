import 'dotenv/config'; // Thêm dòng này để đọc file .env
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || '',
    baseURL: 'https://api.groq.com/openai/v1',
});

const MODELS = [
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'deepseek-r1-distill-llama-70b',
    'llama-3.2-3b-preview',
    'llama-3.2-1b-preview',
];

async function test() {
    console.log('=== Listing active Groq models ===');
    try {
        const list = await client.models.list();
        const activeModels = list.data.map(m => m.id).sort();
        console.log('Active models on Groq:', activeModels);
    } catch (e: any) {
        console.error('Error listing models:', e.message);
    }
}

test();
