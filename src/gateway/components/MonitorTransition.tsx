"use client";

import {
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import { useRouter } from "next/navigation";

type MonitorTransitionProps = {
  children: (refs: {
    journeyRef: MutableRefObject<HTMLElement | null>;
    stickyRef: MutableRefObject<HTMLDivElement | null>;
  }) => ReactNode;
};

function clamp(
  value: number,
  min = 0,
  max = 1
) {
  return Math.min(Math.max(value, min), max);
}

function rangeProgress(
  value: number,
  start: number,
  end: number
) {
  return clamp((value - start) / (end - start));
}

function lerp(
  start: number,
  end: number,
  progress: number
) {
  return start + (end - start) * progress;
}

export default function MonitorTransition({
  children,
}: MonitorTransitionProps) {
  const router = useRouter();

  const journeyRef =
    useRef<HTMLElement | null>(null);

  const stickyRef =
    useRef<HTMLDivElement | null>(null);

  const enteredRef = useRef(false);

  useEffect(() => {
    const journey = journeyRef.current;
    const sticky = stickyRef.current;

    if (!journey || !sticky) {
      return;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;

      const rect =
        journey.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const scrollDistance = Math.max(
        journey.offsetHeight -
          viewportHeight,
        1
      );

      const progress = clamp(
        -rect.top / scrollDistance
      );

      const isMobile =
        window.innerWidth <= 780;

      const cameraProgress =
        rangeProgress(
          progress,
          0.08,
          0.88
        );

      const finalScale =
        isMobile ? 2.7 : 3.35;

      const sceneScale = lerp(
        1,
        finalScale,
        cameraProgress
      );

      const finalX = isMobile
        ? -window.innerWidth * 0.19
        : -window.innerWidth * 0.27;

      const finalY = isMobile
        ? -window.innerHeight * 0.07
        : -window.innerHeight * 0.09;

      const sceneX = lerp(
        0,
        finalX,
        cameraProgress
      );

      const sceneY = lerp(
        0,
        finalY,
        cameraProgress
      );

      const identityFade =
        rangeProgress(
          progress,
          0.16,
          0.38
        );

      const hintFade =
        rangeProgress(
          progress,
          0.02,
          0.18
        );

      const portalProgress =
        rangeProgress(
          progress,
          0.68,
          1
        );

      const startTop =
        isMobile ? 48 : 37;

      const startLeft =
        isMobile ? 44 : 66;

      const startWidth =
        isMobile ? 48 : 26;

      const startHeight =
        isMobile ? 27 : 32;

      const portalTop = lerp(
        startTop,
        0,
        portalProgress
      );

      const portalLeft = lerp(
        startLeft,
        0,
        portalProgress
      );

      const portalWidth = lerp(
        startWidth,
        100,
        portalProgress
      );

      const portalHeight = lerp(
        startHeight,
        100,
        portalProgress
      );

      const roomFade =
        rangeProgress(
          progress,
          0.76,
          0.96
        );

      sticky.style.setProperty(
        "--scene-scale",
        sceneScale.toString()
      );

      sticky.style.setProperty(
        "--scene-x",
        `${sceneX}px`
      );

      sticky.style.setProperty(
        "--scene-y",
        `${sceneY}px`
      );

      sticky.style.setProperty(
        "--identity-opacity",
        (1 - identityFade).toString()
      );

      sticky.style.setProperty(
        "--hint-opacity",
        (1 - hintFade).toString()
      );

      sticky.style.setProperty(
        "--room-opacity",
        (1 - roomFade).toString()
      );

      sticky.style.setProperty(
        "--portal-top",
        `${portalTop}%`
      );

      sticky.style.setProperty(
        "--portal-left",
        `${portalLeft}%`
      );

      sticky.style.setProperty(
        "--portal-width",
        `${portalWidth}%`
      );

      sticky.style.setProperty(
        "--portal-height",
        `${portalHeight}%`
      );

      sticky.style.setProperty(
        "--portal-opacity",
        portalProgress.toString()
      );

      if (
        progress >= 0.985 &&
        !enteredRef.current
      ) {
        enteredRef.current = true;

        router.push("/bitandink/home");
      }
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId =
        window.requestAnimationFrame(
          update
        );
    };

    update();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (frameId) {
        window.cancelAnimationFrame(
          frameId
        );
      }
    };
  }, [router]);

  return children({
    journeyRef,
    stickyRef,
  });
}