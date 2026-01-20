import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const PDFParser = (await import('pdf2json')).default;
    
    const text = await new Promise<string>((resolve, reject) => {
      const pdfParser = new PDFParser();
      
      pdfParser.on('pdfParser_dataReady', (pdfData: { Pages: { Texts: { R: { T: string }[] }[] }[] }) => {
        let extractedText = '';
        pdfData.Pages.forEach((page, pageIndex) => {
          extractedText += `[Page ${pageIndex + 1}]\n`;
          page.Texts.forEach((textItem) => {
            textItem.R.forEach((run) => {
              extractedText += decodeURIComponent(run.T) + ' ';
            });
          });
          extractedText += '\n\n';
        });
        resolve(extractedText.trim());
      });

      pdfParser.on('pdfParser_dataError', (errData: { parserError: string }) => {
        reject(new Error(errData.parserError));
      });

      pdfParser.parseBuffer(buffer);
    });

    const pageCount = (text.match(/\[Page \d+\]/g) || []).length;

    if (!text || text.length === 0) {
      return NextResponse.json({ error: 'Could not extract text from PDF' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      text: text,
      pages: pageCount,
      fileName: file.name,
    });
  } catch (error) {
    console.error('PDF upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF. Please try a different file.' },
      { status: 500 }
    );
  }
}
