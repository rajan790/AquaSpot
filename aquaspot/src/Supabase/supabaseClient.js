import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ziybbkykcbyeghsgbsqb.supabase.co'; // your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeWJia3lrY2J5ZWdoc2dic3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Njk2NjYsImV4cCI6MjA2NjQ0NTY2Nn0.kmr2G1IymnHOjupdWl9JZq3oy1euWLMw-qSYqvKCs-U'; // your anon public key
export const supabase = createClient(supabaseUrl, supabaseKey);
