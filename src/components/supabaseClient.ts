// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Supabase Client
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lbmwkajwrkcxdowsyotj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxibXdrYWp3cmtjeGRvd3N5b3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODk3NzYsImV4cCI6MjA4Nzk2NTc3Nn0.xoTj0IDL8E6WHNhAnyC8TKNMgIJx9WrfIM4t7vz0Coo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);