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
    note: `McConaughey's whole thing is playing yourself instead of some polished version of yourself. He calls it finding your character. Once you've got that, going with the flow isn't a cop-out, it's the strategy. You catch greenlights because you stop fighting the current. I reread it every couple years just to loosen my grip on things.`,
  },
  {
    rank: 2,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    year: 2021,
    genre: 'Fiction',
    spine: '#1a3a6b',
    cover: projectHailMaryCover,
    note: `The book I send to people who say they're not into sci-fi. Two beings from different planets, no shared language, no shared physics, and they figure out how to do science together because both of them want to know what's going on. Rocky lives in my head now.`,
  },
  {
    rank: 3,
    title: 'Who Is Michael Ovitz?',
    author: 'Michael Ovitz',
    year: 2018,
    genre: 'Memoir',
    spine: '#0f0f0f',
    cover: ovitzCover,
    note: `Ovitz built CAA by treating relationships like a craft. Not networking. Actually knowing people, what they want, what they're scared of, how to stay useful to them over decades. The drive is the other half. He worked the way most people only pretend to. I'd hand this to anyone who thinks "hard work" is a complete strategy. It isn't. The other half is who you do it with.`,
  },
  {
    rank: 4,
    title: 'Mastery',
    author: 'Robert Greene',
    year: 2012,
    genre: 'Strategy',
    spine: '#1f1c2c',
    cover: masteryCover,
    note: `The closest thing I've read to a career playbook. Greene's argument is that mastery comes in phases. First an apprenticeship. Then a long stretch of building your own creative point of view. Then mastery. It made me okay with the idea that I'm still in phase one. The chapters on Da Vinci, Coltrane, and Goethe make it land.`,
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
