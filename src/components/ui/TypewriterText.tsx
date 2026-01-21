import React, { useState, useEffect, useCallback, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // milliseconds per character
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  speed = 30,
  className = "",
  onComplete,
  startDelay = 0,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      setIsTyping(false);
      setHasStarted(false);
      return;
    }

    // Reset when text changes
    if (text !== displayedText && !isTyping) {
      setDisplayedText("");
      setHasStarted(false);
    }

    // Start delay
    if (!hasStarted && startDelay > 0) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(delayTimer);
    }

    // Typewriter effect
    if (hasStarted && displayedText.length < text.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else if (hasStarted && displayedText.length === text.length && isTyping) {
      setIsTyping(false);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    } else if (!hasStarted && startDelay === 0) {
      // If no delay, start immediately
      setHasStarted(true);
    }
  }, [text, displayedText, speed, isTyping, hasStarted, startDelay]);

  // If text is empty or same, show immediately
  if (!text || displayedText === text) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayedText}
      {showCursor && isTyping && (
        <span className="animate-pulse text-blue-500">|</span>
      )}
    </span>
  );
}


