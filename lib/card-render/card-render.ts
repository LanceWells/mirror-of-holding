import { MutableRefObject, RefObject } from 'react';
import { ItemEffectOptions, TreasureHaulItem } from '../treasurehaul/treasure-haul-payload';

export type Emitter = {
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

export type RenderImgs = {
  src?: HTMLImageElement,
  noise?: HTMLImageElement,
  patchyNoise?: HTMLImageElement,
  particle?: HTMLImageElement,
}

export type Effects = {
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
}

export function renderWithCanvasCtx(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  imgs: RenderImgs,
  item: TreasureHaulItem,
  effects: Effects,
) {
  if (
    !canvasRef || !canvasRef.current ||
    !imgs || !imgs.noise || !imgs.src || !imgs.particle
  ) {
    return;
  }

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

  function animateCard(timestamp: number) {
    lastTime = lastTime || timestamp;

    effects[item.effects.type]({
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

  // Commenting this out while I work on the PIXI JS implementation. If I decide to switch back to
  // canvas rendering, un-commenting this will re-enable that loop.
  // animationFrameID = requestAnimationFrame(animateCard);

  return (() => {
    cancelAnimationFrame(animationFrameID!);
  });
}

export function renderWithWebGPUCtx(
  canvasRef: MutableRefObject<HTMLCanvasElement>,
  imgs: RenderImgs,
  item: TreasureHaulItem,
  effects: Effects,
) {
  if (
    !canvasRef || !canvasRef.current ||
    !imgs || !imgs.noise || !imgs.src || !imgs.particle
  ) {
    return;
  }

  let animationFrameID: number | undefined = undefined;

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

  if (navigator.gpu) {
    runWebGPUShaders();
  }

  return (() => {
    cancelAnimationFrame(animationFrameID!);
  });
}

export function renderWithWebGL2Ctx(
  canvasRef: RefObject<HTMLCanvasElement>,
  imgs: RenderImgs,
  item: TreasureHaulItem,
  effects: Effects,
) {
  if (
    !canvasRef || !canvasRef.current ||
    !imgs || !imgs.noise || !imgs.src || !imgs.particle
  ) {
    return;
  }
}
