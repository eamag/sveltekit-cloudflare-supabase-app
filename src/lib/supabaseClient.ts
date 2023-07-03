import { createClient } from '@supabase/supabase-js'
let prod_anon = '<>'
export const supabase = createClient('<>', prod_anon)