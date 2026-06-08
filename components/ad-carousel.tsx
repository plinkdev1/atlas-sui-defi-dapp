"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { FooterAd } from "@/lib/ads-data"

interface AdCarouselProps {
  ads?: FooterAd[]
}

export function AdCarousel({ ads: initialAds }: AdCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [ads, setAds] = useState<FooterAd[]>(initialAds || [])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/api/ads")
        if (response.ok) {
          const data = await response.json()
          setAds(
            data.ads.map((ad: FooterAd) => ({
              id: ad.id,
              title: ad.title,
              tagline: ad.tagline,
              imageUrl: ad.imageUrl,
              linkUrl: ad.linkUrl,
              ctaText: ad.ctaText,
              active: ad.active,
              createdAt: new Date(ad.createdAt),
            })),
          )
        }
      } catch (error) {
        console.error("[v0] Failed to fetch ads:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAds()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAds, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isAutoPlay || ads.length === 0) {
      return // explicitly return void
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay, ads.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  if (isLoading || !ads.length) return null

  const currentAd = ads[currentIndex]
  if (!currentAd) return null

  return (
    <div className="relative w-full">
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 backdrop-blur-sm border border-primary/30 dark:border-primary/20 h-[160px] md:h-[180px] group glass-card shadow-lg">
        {/* Background Image */}
        {currentAd.imageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentAd.imageUrl})` }}
          ></div>
        )}

        {/* Darkened overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/40 dark:from-black/65 dark:to-black/55"></div>

        {/* Ad Content */}
        <div className="relative z-10 flex w-full items-center justify-between px-6 md:px-10 gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-white truncate drop-shadow-md">{currentAd.title}</h3>
            <p className="text-sm md:text-base text-gray-100 truncate drop-shadow-sm mt-1">{currentAd.tagline}</p>
          </div>

          <a
            href={currentAd.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-sm md:text-base font-semibold rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            {currentAd.ctaText}
          </a>
        </div>
      </div>

      {/* Navigation Controls - Show only if multiple ads */}
      {ads.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous ad"
          >
            <ChevronLeft className="h-6 w-6 text-primary hover:text-accent transition-colors" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next ad"
          >
            <ChevronRight className="h-6 w-6 text-primary hover:text-accent transition-colors" />
          </button>

          {/* Dot Indicators */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-primary to-accent"
                    : "w-2 bg-muted hover:bg-primary/50"
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
