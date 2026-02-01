import { supabase } from "../lib/supabaseClient";

export async function getServerSideProps({ params, res }) {
  const { code } = params;

  const { data, error } = await supabase
    .from("urls")
    .select("long_url")
    .eq("short_code", code)
    .single();

  if (data) {
    res.writeHead(307, { Location: data.long_url });
    res.end();
  }

  return { props: {} };
}

export default function RedirectPage() {
  return <p>Redirecting...</p>;
}
