"use client"

import type React from "react"

import { Search } from "lucide-react"

interface Article {
  id: number
  title: string
  description: string
  category: string
  date: string
  image: string
}

const articles: Article[] = [
  {
    id: 1,
    title: "Government Announces New Economic Policy",
    description: "Major reforms introduced to strengthen the economy and create new business opportunities.",
    category: "Politics",
    date: "January 10, 2025",
    image: "/government-building.jpg",
  },
  {
    id: 2,
    title: "Tech Startups Receive Record Funding",
    description: "Innovation sector sees unprecedented investment growth in 2025.",
    category: "Economy",
    date: "January 9, 2025",
    image: "/tech-startup.jpg",
  },
  {
    id: 3,
    title: "National Team Wins Championship",
    description: "Historic victory in international sports competition brings pride to the nation.",
    category: "Sport",
    date: "January 8, 2025",
    image: "/sports-celebration.jpg",
  },
  {
    id: 4,
    title: "Markets Rally on Positive Indicators",
    description: "Stock exchange reaches new highs as confidence returns to investors.",
    category: "Economy",
    date: "January 7, 2025",
    image: "/stock-market.jpg",
  },
  {
    id: 5,
    title: "Youth Sports Initiative Launched",
    description: "New program aims to develop young talent in competitive sports.",
    category: "Sport",
    date: "January 6, 2025",
    image: "/youth-sports.jpg",
  },
  {
    id: 6,
    title: "International Trade Agreement Signed",
    description: "New partnerships strengthen diplomatic and economic relations.",
    category: "Politics",
    date: "January 5, 2025",
    image: "/business-agreement.jpg",
  },
]

const featuredArticle = articles[0]
const gridArticles = articles.slice(1)

export default function NewsLanding() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality would go here
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">GAZETA</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden sm:flex items-center gap-8">
              <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Politics
              </a>
              <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Economy
              </a>
              <a href="#" className="text-sm font-medium hover:text-muted-foreground transition-colors">
                Sport
              </a>
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 pr-10 bg-secondary text-secondary-foreground placeholder:text-muted-foreground border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Featured Article */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Featured Image */}
            <div className="order-2 md:order-1">
              <img
                src={featuredArticle.image || "/placeholder.svg"}
                alt={featuredArticle.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>

            {/* Featured Content */}
            <div className="order-1 md:order-2">
              <span className="inline-block text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-4">
                {featuredArticle.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold leading-tight mb-4 text-pretty">{featuredArticle.title}</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                {featuredArticle.description}
              </p>
              <time className="text-sm text-muted-foreground">{featuredArticle.date}</time>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-border"></div>
        </div>

        {/* News Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-8">Latest News</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridArticles.map((article) => (
              <article key={article.id} className="group cursor-pointer">
                {/* Article Image */}
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Article Content */}
                <div className="space-y-3">
                  <span className="inline-block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {article.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold leading-snug text-pretty group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                  <time className="text-xs sm:text-sm text-muted-foreground">{article.date}</time>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About GAZETA</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted source for news and information.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Politics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Economy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Sport
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground">
                Email: info@gazeta.uz
                <br />
                Phone: +998 71 200 00 00
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 GAZETA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
