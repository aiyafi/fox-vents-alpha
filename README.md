# 🦊 Fox Vents Alpha

**Fox Vents** is a minimalist, anonymous post viewer — built for personal venting (K9Fox), reflection, or just dropping crumbs of thought. No likes, no comments, no judgment.

---

## ✨ What It Is

A two-part app:

- **Viewer** → Public, read-only post feed
- **Dashboard** → Private, authenticated space for creating posts (only accessible to K9Fox)

Each post can contain text + optional media (image or video). Every post has its own unique link for sharing.

---

## 🔧 Tech Stack

- **Next.js** (App Router)
- **React + TypeScript**
- **TailwindCSS + ShadCN UI**
- **Firebase** (Firestore for data)
- **Cloudinary** (media upload)
- **Vercel** (deployment)

---

## 📁 Folder Overview

```
fox-vents-alpha/
├─ app/ # Next.js App Router structure
│ └─ post/[id]/ # Individual post route
├─ components/ # UI & logic components (Feed, Navbar, Theme, etc.)
├─ lib/ # Cloudinary, Firebase, Firestore utilities
├─ public/ # Static assets & placeholders
├─ styles/ # Global Tailwind styles
```


---

## 🚀 How to Run

```bash
# Install dependencies
pnpm install

# Set up environment variables in `.env.local`
# (Firebase + Cloudinary credentials)

# Start the dev server
pnpm dev
```

---

## 🌐 Live

* Viewer: [https://thoughts.yafff.tech](https://thoughts.yafff.tech)

---

## 🧠 Why This Exists

Just a quiet corner of the web for me (K9Fox) to offload thoughts.
Not a social platform. Not a blog. Just crumbs.
*Rather than i post on my whatsapp status lol*

---

MIT License
© 2025 K9Fox

```

Let me know if you want a separate section for environment variables or a version for the **dashboard repo** too.
```
