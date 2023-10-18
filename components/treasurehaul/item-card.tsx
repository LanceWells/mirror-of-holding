'use client';

import { LoadImage } from '@/lib/canvas-processing';
import { RGBToHexString } from '@/lib/colors';
import {
  ItemEffectFlaming,
  ItemEffectOptions,
  ItemEffectUniformParticles,
  ItemToCardBack,
  TreasureHaulItem,
} from '@/lib/treasurehaul/treasure-haul-payload';
import { TrigOptimizer } from '@/lib/trigopt/trig-optimizer';
import clsx from 'clsx';
import { MedievalSharp } from 'next/font/google';
import { useCallback, useEffect, useRef, useState } from 'react';

export type ItemCardProps = {
  item: TreasureHaulItem;
  itemKey: string;
  className?: string;
  onClick?: (itemKey: string) => void;
}

type Emitter = {
  particles: {
    x0: number,
    y0: number,
    xv0: number,
    yv0: number,
    xAcc: number,
    yAcc: number,
    createdAt: number,
    rotation: number,
  }[]
}

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

export default function ItemCard(props: ItemCardProps) {
  const {
    item,
    itemKey,
    onClick,
    className,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgs, setImgs] = useState<{
    src?: HTMLImageElement,
    noise?: HTMLImageElement,
    patchyNoise?: HTMLImageElement,
    particle?: HTMLImageElement,
  }>({});

  useEffect(() => {
    if (
      !canvasRef || !canvasRef.current ||
      !imgs || !imgs.noise || !imgs.src || !imgs.particle
    ) {
      return;
    }

    // const ctx = null;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    const offscreenCtx = new OffscreenCanvas(128, 128).getContext('2d');
    if (!offscreenCtx) {
      return;
    }

    ctx.imageSmoothingEnabled = false;

    let animationFrameID: number | undefined = undefined;
    let lastTime: number | undefined;
    let emitter: Emitter = {
      particles: [],
    };

    const runWebGPUShaders = async () => {
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.debug('couldn\'t get the adapter, even though we support GPU!');
        return;
      }

      const device = await adapter.requestDevice();
      const context = canvasRef.current!.getContext('webgpu');
      if (!context) {
        console.debug('couldn\'t get the webGPU context for the canvas');
        return;
      }

      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({
        device,
        format,
        // Only saw this in MDN tutorial, not in the Chrome one.
        alphaMode: 'premultiplied',
      });

      const code = `
      @vertex fn vertexMain(
        @builtin(vertex_index) i: u32
      ) ->
        @builtin(position) vec4f {
        const pos = array(vec2f(0, 1), vec2f(-1, -1), vec2f(1, -1));
        return vec4f(pos[i], 0, 1);
      }
      
      @fragment fn fragmentMain() ->
        @location(0) vec4f {
        return vec4f(1, 0, 0, 1);
      }
      `;

      const code2 = `
      struct VertexOut {
        @builtin(position) position: vec4f,
        @location(0) color: vec4f
      }

      @vertex
      fn vertexMain(
        @location(0) position: vec4f,
        @location(1) color: vec4f
      ) -> VertexOut
      {
        var output: VertexOut;
        output.position = position;
        output.color = color;
        return output;
      }

      @fragment
      fn fragmentMain(fragData: VertexOut) ->
      @location(0) vec4f
      {
        return fragData.color;
      }
      `;

      // ---- Start of input param actions ----
      const code2Vertices = new Float32Array([
        -0.5, -0.5, +0.0, 1, 1, 0, 0, 1,
        +0.0, +0.4, +0.0, 1, 0, 1, 0, 1,
        +0.5, -0.5, +0.0, 1, 0, 0, 1, 1,
      ]);

      const code2VertexBuffer = device.createBuffer({
        size: code2Vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
      });

      device.queue.writeBuffer(
        code2VertexBuffer,
        0,
        code2Vertices,
        0,
        code2Vertices.length,
      );

      const code2VertexBuffers: GPURenderPipelineDescriptor['vertex']['buffers'] = [
        {
          attributes: [
            {
              shaderLocation: 0, // position
              offset: 0,
              format: 'float32x4',
            },
            {
              shaderLocation: 1, // color
              offset: 16,
              format: 'float32x4',
            },
          ],
          arrayStride: 32,
          stepMode: 'vertex',
        }
      ];

      const colorAttachments2: GPURenderPassDescriptor['colorAttachments'] = [
        {
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
          loadOp: 'clear',
          storeOp: 'store',
          view: context.getCurrentTexture().createView(),
        },
      ];
      // ---- End of input param actions ----

      const shaderModule = device.createShaderModule({
        code: code2,
      });

      const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: shaderModule,
          entryPoint: 'vertexMain',
          buffers: code2VertexBuffers,
        },
        fragment: {
          module: shaderModule,
          entryPoint: 'fragmentMain',
          targets: [{ format }]
        },
      });

      const commandEncoder = device.createCommandEncoder();
      const colorAttachments: GPURenderPassDescriptor['colorAttachments'] = [
        {
          view: context.getCurrentTexture().createView(),
          loadOp: 'clear',
          storeOp: 'store',
        },
      ];

      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: colorAttachments2,
      });
      passEncoder.setPipeline(pipeline);
      // --- more stuff for vars
      passEncoder.setVertexBuffer(0, code2VertexBuffer);
      // --- end more stuff for vars
      passEncoder.draw(3);
      passEncoder.end();
      device.queue.submit([commandEncoder.finish()]);
    };

    function animateCard(timestamp: number) {
      lastTime = lastTime || timestamp;

      Effects[item.effects.type]({
        ctx: ctx!,
        imgs: {
          noise: imgs.noise!,
          particle: imgs.particle!,
          patchyNoise: imgs.patchyNoise!,
          src: imgs.src!,
        },
        time: timestamp,
        delta: timestamp - lastTime,
        offscreenCtx: offscreenCtx!,
        effects: item.effects,
        emitter,
        webGPU: {

        },
      });

      lastTime = timestamp;
      animationFrameID = requestAnimationFrame(animateCard);
    }

    // if (navigator.gpu) {
    //   runWebGPUShaders();
    // } else {
    animationFrameID = requestAnimationFrame(animateCard);
    // }

    return (() => {
      cancelAnimationFrame(animationFrameID!);
    });
  }, [canvasRef, imgs, item, itemKey]);

  const loadImages = useCallback(async () => {
    const [src, noise, patchyNoise, particle] = await Promise.all([
      LoadImage(item.src),
      LoadImage('/noise.png'),
      LoadImage('/firenoise.png'),
      // TODO: load this from uniform.
      LoadImage('/particles/sparkle-gray.png'),
    ]);

    setImgs({
      src,
      noise,
      patchyNoise,
      particle,
    });
  }, [item.src]);


  useEffect(() => { loadImages(); }, [
    itemKey,
    item.src,
    loadImages,
  ]);

  const cardBack = ItemToCardBack[item.type];

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick(itemKey);
        }
      }}
      className={
        clsx(
          className,
          onClick
            ? ['dark:hover:border-cyan-100', 'hover:border-cyan-600']
            : ['pointer-events-none'],
          'drop-shadow-md',
          'transition-all',
          'rounded-xl',
          'border-4',
          'border-transparent',
          'w-[192px]',
          'h-[256px]',
          'grid',
          'grid-rows-[min-content_1fr]',
          'gap-y-6',
          'm-2',
          'bg-no-repeat',
          'bg-center',
          'bg-cover',
          'items-center',
        )}
      style={{
        backgroundImage: cardBack,
        animationFillMode: 'both',
      }}
    >
      <canvas
        className={clsx(
          'rounded-lg',
          'justify-self-center',
          'border-none',
          // The card border needs some small adjustments. The scaling makes
          // a precise CSS placement tough without these translations.
          'translate-y-[2px]',
        )}
        height={128}
        width={128}
        ref={canvasRef}
      />
      <h3 className={clsx(
        medievalSharp.className,
        'text-white',
        'border-none',
        'text-center',
        'drop-shadow-[0_1.2px_1.2px_rgb(0,0,0)]',
        'justify-self-center',
        'w-full',
        'align-bottom',
        'text-ellipsis',
        'z-10',
      )}>
        {item.itemName}
      </h3>
    </button>
  );
}

const Effects: {
  [P in ItemEffectOptions]: (params: {
    ctx: CanvasRenderingContext2D,
    imgs: {
      src: HTMLImageElement,
      noise: HTMLImageElement,
      patchyNoise: HTMLImageElement,
      particle: HTMLImageElement,
    },
    time: number,
    delta: number,
    offscreenCtx: OffscreenCanvasRenderingContext2D,
    effects: TreasureHaulItem['effects'],
    emitter: Emitter,
    webGPU: {

    },
  }) => void
} = {
  /**
   * This effect should emulate the enchanted Minecraft item style. Right now it achieves this by
   * slowly scrolling a parallaxing noise across the image, and performing a color-dodge on the
   * existing sprite.
   */
  enchanted: ({ ctx, imgs, time }) => {
    const timeIter = time * 0.035 % 128;
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);

    ctx.globalAlpha = 0.4;
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(imgs.noise, timeIter, 0, 128, 128);
    ctx.drawImage(imgs.noise, timeIter - 128, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'color-dodge';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
  },

  /**
   * This should look like the top portion of the sprite is on fire.
   * 
   * This is achieved by:
   * - Drawing the sprite, offset upwards by N pixels.
   * - Drawing the 'patchy' noise on top of this sprite. The patchy noise contains a lot of
   *   transparent space, so the flame effect will appear and disappear. We also draw this noise
   *   in two 'patches', so that we can move from one patch to the other without resetting the
   *   animation. Think a 64x128 patch where we always have more room above.
   * - Drawing a gradient over the noise, using the color uniform.
   * - Drawing the original image back on to the canvas.
   */
  flaming: ({ ctx, imgs, time, offscreenCtx, effects }) => {
    const timeIter = time * 0.035 % 128;
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, -8, 128, 128);

    offscreenCtx.clearRect(0, 0, 128, 128);
    offscreenCtx.drawImage(imgs.patchyNoise, 0, 128 - timeIter, 128, 128);
    offscreenCtx.drawImage(imgs.patchyNoise, 0, 0 - timeIter, 128, 128);

    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(offscreenCtx.canvas, 0, 0);

    const midTone = (effects as ItemEffectFlaming).uniforms.color ?? { r: 255, g: 0, b: 0 };
    const shade = {
      r: Math.floor(midTone.r / 2),
      g: Math.floor(midTone.r / 2),
      b: Math.floor(midTone.r / 2),
    };
    const tint = {
      r: Math.min(midTone.r * 1.25, 255),
      g: Math.min(midTone.r * 1.25, 255),
      b: Math.min(midTone.r * 1.25, 255),
    };

    const gradient = ctx.createLinearGradient(128, 128, 0, 0);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.5, `rgb(${tint.r}, ${tint.g}, ${tint.b})`);
    gradient.addColorStop(0.6, `rgb(${midTone.r}, ${midTone.g}, ${midTone.b})`);
    gradient.addColorStop(0.7, `rgb(${shade.r}, ${shade.g}, ${shade.b})`);
    gradient.addColorStop(0.9, 'black');

    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
  },

  /**
   * This was almost made by mistake. The goal was to create particle emission as a consequence of
   * time. Though, I abandoned that idea after recognizing that industry standard shader effects
   * actually persist state across frames. I also had to acknowledge that unless I calculate the
   * particle state as a direct consequence of time at which a frame elapsed, I wouldn't know how
   * to draw two frames with a particle in the exact same location.
   * 
   * Otherwise, this works by using a lot of sin/cos logic to make the sparkles move in a neat lil
   * pattern.
   */
  sparkles: ({ ctx, imgs, time, effects }) => {
    const theseEffects = effects.uniforms as ItemEffectUniformParticles;

    ctx.clearRect(0, 0, 128, 128);

    const particles: {
      x: number,
      y: number,
    }[] = [];

    const timeIter = time * 0.035 % 128;
    for (let i = 1; i <= theseEffects.particleFrequency; i++) {
      const radians = (2 * Math.PI / 128) * timeIter + (2 * Math.PI * i / theseEffects.particleFrequency);
      const distanceRadians = (2 * Math.PI / 128 * timeIter);

      const x = theseEffects.emitterX
        + (Math.cos(radians) * theseEffects.emitterRadius)
        * Math.sin(distanceRadians);

      const y = theseEffects.emitterY
        + (Math.sin(radians) * theseEffects.emitterRadius)
        * Math.sin(distanceRadians);

      particles.push({ x, y });
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
    particles.forEach((p) => {
      ctx.drawImage(imgs.particle, p.x, p.y, imgs.particle.width * 2, imgs.particle.height * 2);
    });
  },

  particles: ({ ctx, imgs, time, delta, effects, emitter, offscreenCtx }) => {
    const eff = effects.uniforms as ItemEffectUniformParticles;
    ctx.clearRect(0, 0, 128, 128);

    /**
     * position as a function of acc is:
     * p = a * (1/2)t^2 + s0 + (v0 * t)
     * 
     * this translates into:
     * xPos = xAcc * 0.5 * (time - createdAt) + x0 + (v0 * (time - createdAt))
     */

    emitter.particles = emitter.particles
      .filter((p) => (time - p.createdAt) < eff.particleLifetime);

    // pfreq = 10; 10 pps. Every 1000 / pfreq we should have 1.
    const t = 1000 / eff.particleFrequency;

    // particles now - particles then
    const particlesToCreate = Math.floor(time / t) - Math.floor((time - delta) / t);


    for (let i = 0; i < particlesToCreate; i++) {
      const dirVariance = (eff.emitterCone / 2) - (Math.random() * eff.emitterCone);
      const direction = eff.emitterDirection + dirVariance;

      const particle: Emitter['particles'][number] = {
        x0: (Math.random() - 0.5) * eff.emitterRadius + eff.emitterX,
        y0: (Math.random() - 0.5) * eff.emitterRadius + eff.emitterY,
        xv0: (TrigOptimizer.sin(direction) * eff.particleSpeed),
        yv0: (TrigOptimizer.cos(direction) * eff.particleSpeed),
        xAcc: 0,
        yAcc: 0,
        createdAt: (time - delta + (t * i)),
        rotation: direction,
      };

      emitter.particles.push(particle);
    }

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);

    emitter.particles.forEach((p) => {
      const elapsedTime = time - p.createdAt;
      const x = (p.xAcc * 0.5 * elapsedTime) + p.x0 + (p.xv0 * elapsedTime);
      const y = (p.yAcc * 0.5 * elapsedTime) + p.y0 + (p.yv0 * elapsedTime);

      const lifePercentage = elapsedTime / eff.particleLifetime;
      const scale = eff.startSize + (eff.endSize - eff.startSize) * lifePercentage;
      const color = {
        r: eff.startColor.r + (eff.endColor.r - eff.startColor.r) * lifePercentage,
        g: eff.startColor.g + (eff.endColor.g - eff.startColor.g) * lifePercentage,
        b: eff.startColor.b + (eff.endColor.b - eff.startColor.b) * lifePercentage,
        a: eff.startColor.a + (eff.endColor.a - eff.startColor.a) * lifePercentage,
      };

      const xCenter = x + (imgs.particle.width / 2);
      const yCenter = y + (imgs.particle.height / 2);
      ctx.globalCompositeOperation = 'source-over';
      offscreenCtx.translate(xCenter, yCenter);
      offscreenCtx.rotate(p.rotation);
      offscreenCtx.scale(scale, scale);
      offscreenCtx.translate(-xCenter, -yCenter);
      offscreenCtx.drawImage(imgs.particle, x, y, imgs.particle.width, imgs.particle.height);
      offscreenCtx.resetTransform();

      offscreenCtx.globalCompositeOperation = 'source-atop';
      // offscreenCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      offscreenCtx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      offscreenCtx.fillRect(0, 0, 128, 128);

      ctx.drawImage(offscreenCtx.canvas, 0, 0);
      offscreenCtx.globalCompositeOperation = 'source-over';
      offscreenCtx.clearRect(0, 0, 128, 128);
    });
  },

  none: ({ ctx, imgs }) => {
    ctx.clearRect(0, 0, 128, 128);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(imgs.src, 0, 0, 128, 128);
  },

  webgpu: () => {

  },
};
