"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";

type QuizItem = {
  tipe: string;
  soal: string;
  opsi: string[];
  jawaban: string;
};

export default function QuizPage() {
  const [materi, setMateri] = useState("");
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  
  async function buatQuiz() {
    
    if (!materi) return;

    setLoading(true);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materi,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setQuiz(data.quiz);
        setCurrent(0);
        setScore(0);
        setSelected("");
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function nextQuestion() {
    const soal = quiz[current];

    if (selected === soal.jawaban) {
      setScore((s) => s + 1);
    }

    setSelected("");

    if (current < quiz.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setCurrent(quiz.length);
    }
  }

  if (quiz.length > 0 && current >= quiz.length) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
        <div className="bg-slate-900 rounded-3xl p-10 shadow-2xl text-center max-w-xl w-full">

          <h1 className="text-4xl font-bold mb-4">
            Quiz Selesai 🎉
          </h1>

          <h2 className="text-7xl font-black text-cyan-400">
            {Math.round(
              (score / quiz.length) * 100
            )}%
          </h2>

          <p className="text-xl mt-6 text-slate-300">
            {score} dari {quiz.length} jawaban benar
          </p>

          <button
            onClick={() => {
              setQuiz([]);
              setMateri("");
              setScore(0);
              setCurrent(0);
            }}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold transition"
          >
            Buat Quiz Baru
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black text-center mb-10">
          AI Quiz Generator
        </h1>

        {quiz.length === 0 && (
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl">

            <textarea
              value={materi}
              onChange={(e) =>
                setMateri(e.target.value)
              }
              className="w-full h-48 bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white"
              placeholder="Masukkan materi..."
            />

            <button
              onClick={buatQuiz}
              disabled={loading}
              className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold transition"
            >
              {loading
                ? "Membuat Quiz..."
                : "Buat Quiz"}
            </button>

          </div>
        )}

        {quiz.length > 0 && current < quiz.length && (
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl shadow-2xl p-8">

            <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${((current + 1) / quiz.length) * 100}%`,
                }}
              />
            </div>

            <div className="flex justify-between items-center mb-8">

              <div>
                <p className="text-slate-400">
                  Soal {current + 1} / {quiz.length}
                </p>
              </div>

              <div>
                <p className="text-cyan-400 font-bold">
                  Skor: {score}
                </p>
              </div>

            </div>

            <h2 className="text-3xl font-bold text-center mb-10">
              Pertanyaan
            </h2>

            <div className="bg-slate-800 rounded-2xl p-8 mb-10">

  <div className="min-h-[180px] flex items-center justify-center">

    {quiz[current].soal.includes("\\") ? (

      <div className="text-3xl overflow-x-auto">
        <BlockMath
          math={quiz[current].soal}
        />
      </div>

    ) : (

      <h2 className="text-2xl md:text-3xl font-bold text-center">
        {quiz[current].soal}
      </h2>

    )}

  </div>

</div>

            <div className="grid gap-4">

              {quiz[current].opsi.map(
                (opsi, index) => {
                  const labels = [
                    "A",
                    "B",
                    "C",
                    "D",
                  ];

                  return (
                    <button
                      key={opsi}
                      onClick={() =>
                        setSelected(opsi)
                      }
                      className={`w-full text-lg rounded-2xl p-5 text-left border-2 transition-all duration-200 ${
                        selected === opsi
                          ? "bg-blue-600 border-blue-500 text-white scale-[1.02]"
                          : "bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-blue-500"
                      }`}
                    >
                      <span className="font-bold mr-3">
                        {labels[index]}.
                      </span>

                      {opsi}
                    </button>
                  );
                }
              )}

            </div>

            <button
              onClick={nextQuestion}
              disabled={!selected}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 font-bold text-lg transition disabled:opacity-50"
            >
              Soal Berikutnya →
            </button>

          </div>
        )}

      </div>

    </main>
  );
}