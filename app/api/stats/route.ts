import { NextResponse } from "next/server";
import { queryD1 } from "@/lib/d1";

type AbsensiItem = {
  id: number;
  tanggal: string;
  status: string;
};

type QuizItem = {
  id: number;
  score: number;
  total: number;
};

export async function GET() {
  const absensi = await queryD1(
    "SELECT * FROM absensi"
  );

  const quiz = await queryD1(
    "SELECT * FROM quiz_history"
  );

  const absensiData: AbsensiItem[] =
    absensi.result?.[0]?.results || [];

  const quizData: QuizItem[] =
    quiz.result?.[0]?.results || [];

  const hadir = absensiData.filter(
    (a: AbsensiItem) =>
      a.status.toLowerCase() === "hadir"
  ).length;

  const totalAbsen =
    absensiData.length;

  const quizBenar = quizData.reduce(
    (
      sum: number,
      q: QuizItem
    ) => sum + Number(q.score),
    0
  );

  const quizSoal = quizData.reduce(
    (
      sum: number,
      q: QuizItem
    ) => sum + Number(q.total),
    0
  );

  return NextResponse.json({
    attendance: {
      hadir,
      total: totalAbsen,
      percent:
        totalAbsen > 0
          ? Math.round(
              (hadir / totalAbsen) * 100
            )
          : 0,
    },

    quiz: {
      benar: quizBenar,
      total: quizSoal,
      percent:
        quizSoal > 0
          ? Math.round(
              (quizBenar / quizSoal) * 100
            )
          : 0,
    },
  });
}