import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const supaConfigured = Boolean(url && anon);
export const supa = supaConfigured ? createClient(url!, anon!) : null;
