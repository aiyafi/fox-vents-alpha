// Detect URLs and convert to clickable links
export function parseTextWithLinks(text: string): string {
  // Enhanced URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
  
  return text.replace(urlRegex, (url) => {
    let href = url;
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      href = `https://${url}`;
    }
    
    // Clean up URL (remove trailing punctuation)
    const cleanUrl = url.replace(/[.,;!?]+$/, '');
    const cleanHref = href.replace(/[.,;!?]+$/, '');
    
    return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 underline transition-colors" onclick="event.stopPropagation()">${cleanUrl}</a>`;
  });
}

// Alternative: Return array of text and link components for React
export function parseTextWithLinksReact(text: string): (string | { type: 'link'; url: string; text: string })[] {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
  const parts: (string | { type: 'link'; url: string; text: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    // Add the URL
    let href = match[0];
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
      href = `https://${href}`;
    }
    
    // Clean up URL
    const cleanUrl = match[0].replace(/[.,;!?]+$/, '');
    const cleanHref = href.replace(/[.,;!?]+$/, '');
    
    parts.push({
      type: 'link',
      url: cleanHref,
      text: cleanUrl
    });
    
    lastIndex = urlRegex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts;
}

export function parseTextWithLinksAdvanced(text: string): string {
  // More comprehensive URL detection
  const patterns = [
    // Full URLs with protocol
    /(https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*)?(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)/gi,
    
    // URLs starting with www
    /(www\.(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*)?(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)/gi,
    
    // Domain names with common TLDs
    /([a-zA-Z0-9-]+\.(?:com|org|net|edu|gov|mil|int|co|io|dev|app|life|tech|ai|xyz|me|us|uk|ca|de|fr|jp|cn|au|in|br|mx|es|it|nl|se|no|dk|fi|pl|ru|tr|ar|cl|pe|ve|uy|py|bo|ec|co|pa|cr|gt|hn|sv|ni|cu|do|ht|jm|bb|tt|gd|lc|vc|ag|kn|dm|bs|bz|sr|gy|fk|gl|fo|is|ie|mt|cy|bg|ro|hu|cz|sk|si|hr|ba|rs|me|mk|al|gr|md|ua|by|lt|lv|ee|fi|se|no|dk|pl|de|at|ch|li|lu|be|nl|fr|mc|ad|es|pt|it|sm|va|mt|cy|bg|ro|hu|cz|sk|si|hr|ba|rs|me|mk|al|gr|tr|ge|am|az|kg|kz|uz|tm|tj|af|pk|in|np|bt|bd|lk|mv|mm|th|la|kh|vn|my|sg|bn|id|tl|ph|tw|jp|kr|kp|mn|cn|hk|mo)(?:\/[^\s]*)?)/gi
  ];
  
  let result = text;
  
  patterns.forEach(pattern => {
    result = result.replace(pattern, (url) => {
      let href = url;
      
      // Add protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        href = `https://${url}`;
      }
      
      // Clean up URL
      const cleanUrl = url.replace(/[.,;!?]+$/, '');
      const cleanHref = href.replace(/[.,;!?]+$/, '');
      
      return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 underline transition-colors" onclick="event.stopPropagation()">${cleanUrl}</a>`;
    });
  });
  
  return result;
} 