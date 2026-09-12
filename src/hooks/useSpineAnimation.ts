import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "@pixi-spine/all-3.8";

interface UseSpineOptions {
  jsonUrl: string;
  /** Key name for the loader — must be unique per component instance */
  assetKey: string;
  animationName: string;
  scale?: number;
  xRatio?: number;
  /** How far below canvas bottom to place character feet (positive = below canvas = character is taller, body is visible) */
  yOffset?: number;
  onLoad?: (charWrap: HTMLDivElement | null) => void;
  sectionRef?: React.RefObject<HTMLElement>;
}

/**
 * Mounts a Spine 3.8 WebGL animation into a container div.
 * Uses a FRESH PIXI.Loader per call so multiple components don't conflict.
 */
export function useSpineAnimation(
  containerRef: React.RefObject<HTMLDivElement>,
  options: UseSpineOptions
) {
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || appRef.current) return;

    const isMobile = window.innerWidth < 768;
    const canvasW = isMobile ? 600 : 1100;
    const canvasH = isMobile ? 600 : 900;

    const app = new PIXI.Application({
      width: canvasW,
      height: canvasH,
      transparent: true,
      resolution: 1,
      autoDensity: false,
    });
    appRef.current = app;
    container.appendChild(app.view);

    // ── FRESH loader per instance — avoids shared-loader conflict ──
    const loader = new PIXI.Loader();
    loader
      .add(options.assetKey, options.jsonUrl)
      .load((_l, resources) => {
        const spineData = resources[options.assetKey]?.spineData;
        if (!spineData) {
          console.error(`[Spine] spineData missing for key "${options.assetKey}"`);
          return;
        }

        const character = new Spine(spineData);

        const scale = options.scale ?? (isMobile ? 0.20 : 0.28);
        character.scale.set(scale);
        character.x = app.screen.width * (options.xRatio ?? 0.50);
        character.y = app.screen.height + (options.yOffset ?? (isMobile ? 0 : 50));

        character.state.setAnimation(0, options.animationName, true);
        app.stage.addChild(character);

        options.onLoad?.(null);
      });

    loader.onError.add((_err: any, _l: any, resource: any) => {
      console.error(`[Spine] Load error for "${options.assetKey}":`, resource?.url);
    });

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
