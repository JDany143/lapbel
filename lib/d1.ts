const ACCOUNT_ID =
  process.env.CLOUDFLARE_ACCOUNT_ID!;

const DATABASE_ID =
  process.env.CLOUDFLARE_DATABASE_ID!;

const API_TOKEN =
  process.env.CLOUDFLARE_API_TOKEN!;

export async function queryD1(sql: string) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sql,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(
      `D1 Error: ${res.status}`
    );
  }

  return await res.json();
}