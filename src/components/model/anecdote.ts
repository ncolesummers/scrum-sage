import { z } from 'zod';

// Keys are used to identify the anecdotes. They are generated in the format `anecdote:YYYY-MM_DD`.
const keyRegex = /^anecdote:\d{4}-\d{2}-\d{2}$/;

export const Anecdote = z.object({
  key: z.string().regex(keyRegex, 'Invalid key'),
  content: z.string(),
  title: z.string(),
  date: z.string(),
});
