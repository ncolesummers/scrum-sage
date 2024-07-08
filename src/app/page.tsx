import { kv } from '@vercel/kv';
import { Sage } from '@/components/Sage';

interface Anecdote {
  title: string;
  date: string;
  content: string;
  key: string;
}

function getRecentDates(date: Date, numDays: number) {
  const dates = [];
  for (let i = 0; i < numDays; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

const sanitizeTitle = (title: string) =>
  title.replaceAll(/[*#]/g, '').replace('Title: ', '');

export default async function Home() {
  const date = new Date();
  const recentDates = getRecentDates(date, 10);

  const anecdotes: Anecdote[] = (
    await Promise.all(
      recentDates.map(async (date) => {
        const key = `anecdote:${date}`;
        const anecdote: string | null = await kv.get(key);
        if (anecdote !== null) {
          return {
            key,
            date,
            title: sanitizeTitle(anecdote?.split('\n')[0]) || 'Anecdote',
            content: anecdote?.split('\n').slice(1).join('\n'),
          };
        }
      })
    )
  ).filter((anecdote): anecdote is Anecdote => anecdote !== undefined);

  return (
    <main className='container'>
      <div>
        <h1 className='m-3'>Scrum Sage</h1>
      </div>
      <Sage anecdotes={anecdotes} />
    </main>
  );
}
