export async function GET() {
  const res = await fetch(
    "https://literate-vulture-59.clerk.accounts.dev/v1/environment"
  );

  if (!res) {
    throw new Error("Failed to retrieve environment.");
  }

  const environment = await res.json();

  return Response.json(environment);
}
