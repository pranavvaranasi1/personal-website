import greenlightsCover from '../assets/covers/greenlights.jpg'
import projectHailMaryCover from '../assets/covers/project-hail-mary.jpg'
import ovitzCover from '../assets/covers/ovitz.jpg'
import masteryCover from '../assets/covers/mastery.jpg'
import obstacleCover from '../assets/covers/obstacle-is-the-way.jpg'
import disciplineCover from '../assets/covers/discipline-is-destiny.jpg'
import strategiesCover from '../assets/covers/33-strategies-of-war.jpg'
import stillnessCover from '../assets/covers/stillness-is-the-key.jpg'
import deepMedicineCover from '../assets/covers/deep-medicine.jpg'

export interface Book {
  rank: number
  title: string
  author: string
  year: number
  /** category tag */
  genre: 'Memoir' | 'Fiction' | 'Business' | 'Philosophy' | 'Strategy' | 'Science' | 'Medicine'
  /** Hex spine color, fallback when no cover image is available */
  spine: string
  /** Imported cover image. Optional — falls back to typographic spine treatment. */
  cover?: string
  /** Why this book is on the shelf — first-person, not summary. */
  note: string
}

export const books: Book[] = [
  {
    rank: 1,
    title: 'Greenlights',
    author: 'Matthew McConaughey',
    year: 2020,
    genre: 'Memoir',
    spine: '#e8b833',
    cover: greenlightsCover,
    note: `My favorite memoir, easily. McConaughey calls it finding your character. Just being yourself, on purpose. I reread this every couple years when I'm gripping too tight.`,
  },
  {
    rank: 2,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    year: 2021,
    genre: 'Fiction',
    spine: '#1a3a6b',
    cover: projectHailMaryCover,
    note: `Send this to anyone who claims they don't do sci-fi. Trust me on it. Rocky is one of my favorite characters in any book.`,
  },
  {
    rank: 3,
    title: 'Who Is Michael Ovitz?',
    author: 'Michael Ovitz',
    year: 2018,
    genre: 'Memoir',
    spine: '#0f0f0f',
    cover: ovitzCover,
    note: `The best book I've read on power. Ovitz built CAA on relentless work and treating relationships like a craft, and he's honest about both. If you've ever been told to just "hustle harder", this is the better answer.`,
  },
  {
    rank: 4,
    title: 'Mastery',
    author: 'Robert Greene',
    year: 2012,
    genre: 'Strategy',
    spine: '#1f1c2c',
    cover: masteryCover,
    note: `Only career book I've kept. The big idea is you spend a long time being good at something before you have anything original to say about it. The Da Vinci chapter alone is worth it.`,
  },
  {
    rank: 5,
    title: 'Running Down a Dream',
    author: 'Bill Gurley',
    year: 2019,
    genre: 'Business',
    spine: '#c4322f',
    note: `A blog post that turned into a thesis statement for a life. The phrase "your work is the prayer" shows up in my head whenever I want to phone something in. I send this to anyone who's deciding whether to take a craft seriously or not.`,
  },
  {
    rank: 6,
    title: 'The Obstacle Is the Way',
    author: 'Ryan Holiday',
    year: 2014,
    genre: 'Philosophy',
    spine: '#3d3d3d',
    cover: obstacleCover,
    note: `My intro to Stoicism in college. I disagree with parts of it now but the core idea, that obstacles are not problems but raw material, is one I've never been able to unsee. Every time something breaks I run the same play.`,
  },
  {
    rank: 7,
    title: 'Discipline Is Destiny',
    author: 'Ryan Holiday',
    year: 2022,
    genre: 'Philosophy',
    spine: '#c8a04b',
    cover: disciplineCover,
    note: `Holiday's argument is that discipline is the master virtue. Without it courage gets reckless, ambition burns out. The book is mostly stories about people who chose restraint when they didn't have to. I open it on the days I'm trying to convince myself I deserve a shortcut.`,
  },
  {
    rank: 8,
    title: 'The 33 Strategies of War',
    author: 'Robert Greene',
    year: 2006,
    genre: 'Strategy',
    spine: '#3a0a0a',
    cover: strategiesCover,
    note: `Sold like Sun Tzu fan-fic but it's really a book about attention, framing, and momentum. The strategies translate cleanly to startups, negotiations, even arguments with people you love. I treat it more as a reference than a read-through.`,
  },
  {
    rank: 9,
    title: 'Stillness Is the Key',
    author: 'Ryan Holiday',
    year: 2019,
    genre: 'Philosophy',
    spine: '#7a7569',
    cover: stillnessCover,
    note: `The third in the trio and the one I return to most. Stillness as a practice, not a personality trait. If you're someone who feels guilty for slowing down, this book gives you permission and then explains why slowing down is how the good thinking actually happens.`,
  },
  {
    rank: 10,
    title: 'Deep Medicine',
    author: 'Eric Topol',
    year: 2019,
    genre: 'Medicine',
    spine: '#2d6e7e',
    cover: deepMedicineCover,
    note: `My dad gave me this book. Topol's argument is that AI's job in medicine isn't to replace doctors, it's to give them their humanity back. That sentence is the closest thing I've got to a thesis for my own work.`,
  },
]
