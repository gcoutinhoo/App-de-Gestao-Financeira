import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // importantíssimo para React Native!
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://baadaiptimxjmnowrixq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhYWRhaXB0aW14am1ub3dyaXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDg0MTIsImV4cCI6MjA2NDIyNDQxMn0.hyxeebGXQ28KgYmmak_G7JKAZdBKLFPPyr0jimdnYE0';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // obrigatório para React Native
  },
  global: {
    realtime: { enabled: false }, // desativa WebSocket para evitar erro
  },
});
