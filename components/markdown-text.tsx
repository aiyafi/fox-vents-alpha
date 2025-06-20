"use client"

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownTextProps {
    children: string
    className?: string
}

export function MarkdownText({ children, className = "" }: MarkdownTextProps) {
    return (
        <div className={className}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Custom link styling that matches your current design
                    a: ({ href, children, ...props }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-500 hover:text-blue-600 underline transition-colors cursor-pointer"
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    // Prevent large headers in posts
                    h1: ({ children, ...props }) => (
                        <h3 className="text-lg font-semibold mt-3 mb-2" {...props}>{children}</h3>
                    ),
                    h2: ({ children, ...props }) => (
                        <h4 className="text-base font-medium mt-2 mb-1" {...props}>{children}</h4>
                    ),
                    // Style lists
                    ul: ({ children, ...props }) => (
                        <ul className="list-disc list-inside space-y-1 my-2" {...props}>{children}</ul>
                    ),
                    ol: ({ children, ...props }) => (
                        <ol className="list-decimal list-inside space-y-1 my-2" {...props}>{children}</ol>
                    ),
                    // Style code blocks
                    code: ({ children, className, ...props }) => {
                        const isInline = !className?.includes('language-')
                        return isInline ? (
                            <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className="block bg-muted p-3 rounded-md text-sm overflow-x-auto" {...props}>
                                {children}
                            </code>
                        )
                    },
                    // Style blockquotes
                    blockquote: ({ children, ...props }) => (
                        <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic my-3" {...props}>
                            {children}
                        </blockquote>
                    ),
                    // Keep paragraphs minimal
                    p: ({ children, ...props }) => (
                        <p className="mb-2 last:mb-0" {...props}>{children}</p>
                    ),
                }}
            >
                {children}
            </Markdown>
        </div>
    )
} 