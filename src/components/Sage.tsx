/** Add fonts into your Next.js project:

import { Yeseva_One } from 'next/font/google'
import { Fraunces } from 'next/font/google'

yeseva_one({
  subsets: ['latin'],
  display: 'swap',
})

fraunces({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface anecdotes {
  title: string;
  date: string;
  content: string;
  key?: string;
}

export function Sage({
  anecdotes,
  setSelected,
}: {
  anecdotes: anecdotes[];
  setSelected: (anecdote: anecdotes | null) => void;
}) {
  const finalAnecdotes = anecdotes
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((anecdote) => {
      return {
        ...anecdote,
        key: crypto.randomUUID(),
        // The Title field contains Markdown Asterisks and the prefix `Title: `. We remove them.
        // We also remove the hash symbol and double quotes.
        title: anecdote.title.replaceAll(/[*#"]/g, '').replace('Title: ', ''),
      };
    });

  return (
    <div className='w-full'>
      <section className='w-full bg-primary py-20 px-4 sm:px-6 md:py-32 lg:px-8'>
        <div className='mx-auto max-w-6xl'>
          <h1 className='text-4xl font-bold tracking-[0.05em] text-primary-foreground sm:text-5xl lg:text-6xl'>
            Scrum Sage
          </h1>
          <p className='mt-6 text-xl text-primary-foreground'>
            Daily anecdotes about agile and scrum to inspire your team.
          </p>
        </div>
      </section>
      <div className='w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
          {finalAnecdotes.map((anecdote, index) => {
            const formattedContent = anecdote.content
              .split('\n')
              .map((line) => (
                <>
                  {line}
                  <br key={crypto.randomUUID()} />
                </>
              ));
            return (
              <Card
                onClick={() => setSelected(finalAnecdotes[index])}
                key={anecdote.key}
                className='w-full'
              >
                <CardHeader>
                  <CardTitle>{anecdote.title}</CardTitle>
                  <CardDescription>{anecdote.date}</CardDescription>
                </CardHeader>
                <CardContent className='text-muted-foreground'>
                  <p>{formattedContent}</p>
                </CardContent>
                <CardFooter className='flex justify-end'>
                  <Button variant='ghost' size='icon'>
                    <ShareIcon className='w-4 h-4' />
                    <span className='sr-only'>Share</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
      <polyline points='16 6 12 2 8 6' />
      <line x1='12' x2='12' y1='2' y2='15' />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
}
