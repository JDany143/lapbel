import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { materi } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Materi yang harus digunakan:

${materi}

Tugas:
Buatkan 10 soal pilihan ganda yang HANYA berasal dari materi di atas.

Aturan:
- Jangan membuat soal dari mata pelajaran lain.
- Jika materi sejarah, buat soal sejarah.
- Jika materi PPKn, buat soal PPKn.
- Jika materi matematika, buat soal matematika.
- Jika materi fisika, buat soal fisika.
- Jika materi kimia, buat soal kimia.
- Jika materi biologi, buat soal biologi.

Balas HANYA JSON VALID.

Format:

[
  {
    "tipe": "text",
    "soal": "Apa isi pertanyaan?",
    "opsi": [
      "Pilihan A",
      "Pilihan B",
      "Pilihan C",
      "Pilihan D"
    ],
    "jawaban": "Pilihan A"
  }
]

Untuk soal matematika:

[
  {
    "tipe": "latex",
    "soal": "\\\\log_2 8 + \\\\log_3 9 = ?",
    "opsi": [
      "3",
      "4",
      "5",
      "6"
    ],
    "jawaban": "5"
  }
]

Penting:
- Jangan gunakan markdown
- Jangan gunakan \`\`\`
- Jangan gunakan kata "json"
- Jangan tambahkan penjelasan
- Output harus berupa array JSON saja
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);

      return NextResponse.json(
        {
          error: data,
        },
        {
          status: response.status,
        }
      );
    }

    const text =
   data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "[]";

    console.log("RAW GEMINI:");
    console.log(text);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const quiz = JSON.parse(cleaned);

      return NextResponse.json({
        success: true,
        quiz,
      });
    } catch (parseError) {
      console.error("JSON Parse Error:");
      console.error(parseError);

      return NextResponse.json(
        {
          success: false,
          error: "Format JSON Gemini tidak valid",
          raw: cleaned,
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}