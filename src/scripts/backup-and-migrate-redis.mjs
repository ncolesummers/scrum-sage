// import { createClient } from 'redis';
import { kv } from '@vercel/kv';
import { writeFileSync } from 'fs';
import slugify from 'slugify';
import dotenv from 'dotenv';
import backupData from '../../blog_backup.json' assert { type: 'json' };
dotenv.config();

async function backupBlogEntries() {
  // Step 1: Backup - Fetch all blog entries and save them to a JSON file
  // const keys = await new Promise((resolve, reject) => {
  //   redisClient.keys('anecdote:*');
  // });

  // KEYS are in the format anecdote:yyyy-mm-dd and start on July 4, 2024
  // Get a key for each day from July 4, 2024 to today
  const keys = [];
  const today = new Date();
  const start = new Date('2024-07-04');
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let current = new Date(start);
  while (current <= end) {
    const key = `anecdote:${current.toISOString().split('T')[0]}`;
    keys.push(key);
    current.setDate(current.getDate() + 1);
  }

  const bak = {};

  for (const key of keys) {
    const entry = await kv.get(key);
    console.info(`Backing up ${key}`);
    bak[key] = entry;
  }

  writeFileSync('blog_backup.json', JSON.stringify(bak, null, 2));
  console.log('Backup completed. Data saved to blog_backup.json');
}

async function modifyBlogEntries() {
  // Step 2: Migrate - Read the JSON file and modify the data
  // Map over the old data. For each entry, we want to pull out the title, date, and content
  const mapped = Object.entries(backupData).map(([key, value]) => {
    const date = key.split(':')[1];
    const [title, ...rest] = value.split('\n\n');
    return {
      // Strip the asterisks from the title
      title: title.replace(/\*/g, ''),
      date,
      content: rest.join('\n'),
      model: 'chatGPT4o',
    };
  });

  console.log(JSON.stringify(mapped, null, 2));
  // backupData.forEach(async (entry) => {
  //   // The date is in the key. The key is in the form anecdote:yyyy-mm-dd
  //   const date = entry.key.split(':')[1];
  //   // The title is the first line of the content
  //   const content = entry.value;
  //   const [title, ...rest] = content.split('\n\n');
  //   const newEntry = {
  //     title,
  //     date,
  //     content: rest.join('\n'),
  //   };
  //   console.log(JSON.stringify(newEntry, null, 2));
  // });
}

// backupBlogEntries();
modifyBlogEntries();
