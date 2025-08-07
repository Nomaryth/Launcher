"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

const GameLogo = () => {
  const nomarythRef = useRef<HTMLHeadingElement>(null);
  const ordainRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrapLetters = (element: HTMLElement | null, className: string) => {
      if (element) {
        element.innerHTML = element.textContent!.replace(
          /\S/g,
          `<span class='${className}' style='display:inline-block; will-change: transform, opacity;'>$&</span>`
        );
      }
      return element?.querySelectorAll(`.${className}`);
    };

    const nomarythLetters = wrapLetters(nomarythRef.current, "nomaryth-letter");
    const ordainLetters = wrapLetters(ordainRef.current, "ordain-letter");

    const timeline = anime.timeline({
      easing: "easeOutExpo",
      duration: 1500,
    });

    if (nomarythLetters) {
      timeline.add({
        targets: nomarythLetters,
        translateY: [-50, 0],
        translateX: [0, 0],
        rotate: [45, 0],
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(50, { start: 200 }),
      });
    }

    if (ordainLetters) {
      timeline.add(
        {
          targets: ordainLetters,
          translateY: [-80, 0],
          rotate: [-20, 0],
          scale: [0.8, 1],
          opacity: [0, 1],
          delay: anime.stagger(80),
        },
        "-=1200"
      );
    }
  }, []);

  return (
    <div className="text-right mt-4 mr-2">
      <h3
        ref={nomarythRef}
        className="text-sm font-light tracking-[0.4em] text-white/80"
      >
        NOMARYTH
      </h3>
      <h1 ref={ordainRef} className="text-7xl font-black text-white -mt-1">
        ORDAIN
      </h1>
    </div>
  );
};

export default GameLogo;
