import {
  ItemEffectOptions,
  ItemEffectUniformParticles,
  TreasureHaulItem,
} from '../treasurehaul/treasure-haul-payload';
import * as PIXI from 'pixi.js';
import { TrigOptimizer } from '../trigopt/trig-optimizer';

export type ParticleState = {
  // container: PIXI.ParticleContainer,
  sprites: {
    sprite: PIXI.Sprite,
    createdAt: number,
    x0: number,
    y0: number,
    xv0: number,
    yv0: number,
    xAcc: number,
    yAcc: number,
  }[],
};

export type PixiEffects = {
  [P in ItemEffectOptions]: (params: {
    imgs: {
      src: PIXI.SpriteSource,
      noise: PIXI.SpriteSource,
      patchyNoise: PIXI.SpriteSource,
      particle: PIXI.SpriteSource,
    },
    delta: number,
    time: number,
    particles: ParticleState,
    effects: TreasureHaulItem['effects'],
    container: PIXI.Container,
  }) => void
}

function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a);
}

export const PixiEffects: PixiEffects = {
  enchanted: () => { },
  flaming: () => { },
  none: () => { },
  sparkles: () => { },
  webgl2: () => { },
  particles: ({
    imgs,
    delta,
    effects,
    particles,
    time,
    container,
  }) => {
    const eff = effects.uniforms as ItemEffectUniformParticles;

    // TODO: Consolidate these.
    particles.sprites.forEach((p, i) => {
      if ((time - p.createdAt) > eff.particleLifetime) {
        container.removeChild(p.sprite);
        particles.sprites.splice(i, 1);
      }
    });

    const particlesToCreate = (delta * eff.particleFrequency) / 100;

    for (let i = 0; i < particlesToCreate; i++) {
      const dirVariance = (eff.emitterCone / 2) - (Math.random() * eff.emitterCone);
      const direction = eff.emitterDirection + dirVariance;

      const particle = PIXI.Sprite.from(imgs.particle, {
        width: 16,
        height: 16,
        scaleMode: PIXI.SCALE_MODES.NEAREST,
      });

      particle.x = (Math.random() - 0.5) * eff.emitterRadius + eff.emitterX;
      particle.y = (Math.random() - 0.5) * eff.emitterRadius + eff.emitterY;
      particle.rotation = direction;

      container.addChild(particle);
      particles.sprites.push({
        sprite: particle,
        createdAt: time,
        x0: particle.x,
        y0: particle.y,
        xv0: TrigOptimizer.sin(direction) * eff.particleSpeed,
        yv0: TrigOptimizer.cos(direction) * eff.particleSpeed,
        xAcc: 0,
        yAcc: 0,
      });
    }

    particles.sprites.forEach((p) => {
      const elapsedTime = time - p.createdAt;
      const x = (p.xAcc * 0.5 * elapsedTime) + p.x0 + (p.xv0 * elapsedTime);
      const y = (p.yAcc * 0.5 * elapsedTime) + p.y0 + (p.yv0 * elapsedTime);

      const lifePercentage = elapsedTime / eff.particleLifetime;

      const scale = lerp(eff.startSize, eff.endSize, lifePercentage);
      p.sprite.scale.set(scale);
      p.sprite.position.set(x, y);
    });
  },
};
