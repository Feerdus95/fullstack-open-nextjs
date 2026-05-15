export interface Blog {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Understanding the React Server Components Model",
    author: "Dan Abramov",
    url: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023",
    likes: 1482,
  },
  {
    id: 2,
    title: "Why I Switched from Redux to Zustand",
    author: "Tanner Linsley",
    url: "https://tkdodo.eu/blog/zustand-and-react-context",
    likes: 874,
  },
  {
    id: 3,
    title: "The Art of Writing Clean TypeScript",
    author: "Matt Pocock",
    url: "https://www.totaltypescript.com/writing-cleaner-typescript",
    likes: 2103,
  },
  {
    id: 4,
    title: "Next.js App Router: A Complete Guide",
    author: "Lee Robinson",
    url: "https://nextjs.org/blog/next-13-4",
    likes: 3561,
  },
  {
    id: 5,
    title: "CSS Grid vs Flexbox: When to Use Which",
    author: "Ahmad Shadeed",
    url: "https://ishadeed.com/article/grid-layout-flexbox-components",
    likes: 995,
  },
]
