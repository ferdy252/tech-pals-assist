import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

// Get environment variables with fallback for safety
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sldrxhkkoykvadgwqmuo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZHJ4aGtrb3lrdmFkZ3dxbXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MzY0MjIsImV4cCI6MjA1ODAxMjQyMn0.kdKpmNnAYjCEBqNI3WPPXhQPRP_1d679pbINIc8EChY'

// Log which values we're using (for debugging)
console.log('Using Supabase URL:', supabaseUrl)

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
