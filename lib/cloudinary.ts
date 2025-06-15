import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary (you'll need to set these in your environment variables)
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Image optimization configurations
export const imageConfigs = {
    // Post feed - smaller, optimized for fast loading
    feed: {
        width: 600,
        height: 400,
        crop: 'fill',
        gravity: 'auto',
        quality: 'auto',
        format: 'auto',
        dpr: 'auto',
        fetch_format: 'auto',
    },
    // Post detail - larger, better quality
    detail: {
        width: 800,
        height: 600,
        crop: 'limit',
        quality: 'auto',
        format: 'auto',
        dpr: 'auto',
        fetch_format: 'auto',
    },
    // Thumbnail for loading states
    thumbnail: {
        width: 300,
        height: 200,
        crop: 'fill',
        gravity: 'auto',
        quality: 'auto:low',
        format: 'auto',
        blur: '300',
    },
}

// Video optimization configurations
export const videoConfigs = {
    // Post feed - compressed for fast loading
    feed: {
        width: 600,
        height: 400,
        crop: 'fill',
        gravity: 'auto',
        quality: 'auto',
        format: 'mp4',
        video_codec: 'h264',
        audio_codec: 'aac',
        bit_rate: '1m',
    },
    // Post detail - higher quality
    detail: {
        width: 800,
        height: 600,
        crop: 'limit',
        quality: 'auto',
        format: 'mp4',
        video_codec: 'h264',
        audio_codec: 'aac',
        bit_rate: '2m',
    },
    // Poster/thumbnail
    poster: {
        resource_type: 'video',
        format: 'jpg',
        transformation: [
            { width: 600, height: 400, crop: 'fill', gravity: 'auto' },
            { quality: 'auto', format: 'auto' }
        ]
    }
}

// Generate optimized Cloudinary URL
export function generateCloudinaryUrl(
    publicId: string,
    type: 'image' | 'video',
    variant: 'feed' | 'detail' | 'thumbnail' | 'poster' = 'feed'
): string {
    if (!publicId) return ''

    try {
        if (type === 'image') {
            return cloudinary.url(publicId, {
                resource_type: 'image',
                ...imageConfigs[variant as keyof typeof imageConfigs],
            })
        } else if (type === 'video') {
            return cloudinary.url(publicId, {
                resource_type: 'video',
                ...videoConfigs[variant as keyof typeof videoConfigs],
            })
        }
        return ''
    } catch (error) {
        console.error('Error generating Cloudinary URL:', error)
        return publicId // Return original URL as fallback
    }
}

// Extract public ID from Cloudinary URL
export function extractPublicId(cloudinaryUrl: string): string {
    if (!cloudinaryUrl) return ''

    try {
        // Handle both secure and non-secure URLs
        const regex = /(?:cloudinary\.com\/[^\/]+\/(?:image|video)\/upload\/(?:v\d+\/)?)(.*?)(?:\.[^.]+)?$/
        const match = cloudinaryUrl.match(regex)
        return match ? match[1] : cloudinaryUrl
    } catch (error) {
        console.error('Error extracting public ID:', error)
        return cloudinaryUrl
    }
}

// Generate responsive image srcset
export function generateResponsiveSrcSet(publicId: string, type: 'image' | 'video' = 'image'): string {
    if (!publicId) return ''

    const sizes = [400, 600, 800, 1200]

    return sizes
        .map(size => {
            const url = cloudinary.url(publicId, {
                resource_type: type,
                width: size,
                crop: 'limit',
                quality: 'auto',
                format: 'auto',
                dpr: 'auto',
            })
            return `${url} ${size}w`
        })
        .join(', ')
}

// Generate sizes attribute for responsive images
export function generateSizesAttribute(): string {
    return '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px'
}

// Audio optimization for video content
export function generateAudioOptimizedUrl(publicId: string): string {
    return cloudinary.url(publicId, {
        resource_type: 'video',
        format: 'mp3',
        quality: 'auto',
    })
}

export default cloudinary
