import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const groq = new OpenAI({
  apiKey: process.env.XAI_API_KEY!,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request: NextRequest) {
  try {
    const { message, pdfContent } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemPrompt = pdfContent
      ? `You are a helpful assistant that explains and answers questions about PDF documents. Here is the content of the PDF the user uploaded:

---
${pdfContent}
---

Answer the user's questions based on this PDF content. Be clear, concise, and helpful. When possible, cite page numbers from the document. If the question is not related to the PDF, you can still answer but mention that it's outside the document scope. If the information is not present in the document, clearly state that.`
      : `You are a helpful assistant. The user hasn't uploaded a PDF yet. Ask them to upload a PDF document so you can help explain and answer questions about it.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const responseText = completion.choices[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
