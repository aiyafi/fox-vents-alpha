"use client"

import { parseTextWithLinksReact } from "@/lib/url-utils"

interface LinkTextProps {
  text: string
  className?: string
}

export function LinkText({ text, className = "" }: LinkTextProps) {
  const parts = parseTextWithLinksReact(text)
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return <span key={index}>{part}</span>
        } else {
          return (
            <a
              key={index}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-500 hover:text-blue-600 underline transition-colors cursor-pointer"
            >
              {part.text}
            </a>
          )
        }
      })}
    </span>
  )
} 