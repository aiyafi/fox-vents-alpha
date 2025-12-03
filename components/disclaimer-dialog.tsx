"use client"

import { useState, useEffect } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "fox-thoughts-disclaimer-accepted"

export function DisclaimerDialog() {
  const [open, setOpen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem(STORAGE_KEY)
    if (!hasAccepted) {
      setOpen(true)
    }
  }, [])

  const handleAccept = () => {
    if (!dontShowAgain) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
      return
    }
    
    localStorage.setItem(STORAGE_KEY, "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg"
          )}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Before You Enter
            </DialogTitle>
            <DialogDescription className="text-left space-y-4 pt-4">
              <p className="text-foreground/90">
                This site is my off-record space.
                <br />
                Keep everything here inside this dimension.
              </p>
              
              <ul className="space-y-2 text-foreground/80 list-disc list-inside">
                <li>Don't bring anything from here into real life without my consent.</li>
                <li>Don't turn my posts into screenshots or gossip.</li>
                <li>Don't mix this space with who I am outside this page.</li>
              </ul>

              <p className="text-foreground/90 pt-2">
                If you continue, you're agreeing to keep this dimension separate.
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 pt-4">
            <div className={cn(
              "flex items-center space-x-2 transition-all duration-300",
              showWarning && "animate-pulse"
            )}>
              <Checkbox
                id="dont-show"
                checked={dontShowAgain}
                onCheckedChange={(checked) => {
                  setDontShowAgain(checked === true)
                  setShowWarning(false)
                }}
                className={cn(
                  showWarning && "border-destructive data-[state=unchecked]:border-destructive"
                )}
              />
              <label
                htmlFor="dont-show"
                className={cn(
                  "text-sm cursor-pointer select-none transition-colors",
                  showWarning ? "text-destructive" : "text-muted-foreground"
                )}
              >
                Don't show this again
              </label>
            </div>

            <Button onClick={handleAccept} className="w-full">
              Alright, let me in
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
