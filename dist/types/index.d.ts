import 'regenerator-runtime/runtime';
import expressMiddleware from './express/middleware';
import {
  PyroscopeConfig,
  PyroscopeHeapConfig,
  PyroscopeWallConfig,
} from './pyroscope-config';
import { Logger } from './logger';
import { SourceMapper } from './sourcemapper';
export declare function init(config?: PyroscopeConfig): void;
declare function getWallLabels(): Record<string, number | string>;
declare function setWallLabels(labels: Record<string, number | string>): void;
declare function getLabels(): Record<string, number | string>;
declare function setLabels(labels: Record<string, number | string>): void;
export declare function wrapWithLabels(
  lbls: Record<string, string | number>,
  fn: () => void,
  ...args: unknown[]
): void;
declare function startWallProfiling(): void;
declare function startCpuProfiling(): void;
declare function stopWallProfiling(): Promise<void>;
declare function stopCpuProfiling(): Promise<void>;
declare function startHeapProfiling(): void;
declare function stopHeapProfiling(): Promise<void>;
export declare function start(): void;
export declare function stop(): Promise<void>;
export { PyroscopeConfig, PyroscopeHeapConfig, PyroscopeWallConfig };
declare function setLogger(logger: Logger): void;
declare const _default: {
  SourceMapper: typeof SourceMapper;
  expressMiddleware: typeof expressMiddleware;
  init: typeof init;
  getWallLabels: typeof getWallLabels;
  setWallLabels: typeof setWallLabels;
  getLabels: typeof getLabels;
  setLabels: typeof setLabels;
  wrapWithLabels: typeof wrapWithLabels;
  start: typeof start;
  startHeapProfiling: typeof startHeapProfiling;
  startWallProfiling: typeof startWallProfiling;
  startCpuProfiling: typeof startCpuProfiling;
  stop: typeof stop;
  stopHeapProfiling: typeof stopHeapProfiling;
  stopWallProfiling: typeof stopWallProfiling;
  stopCpuProfiling: typeof stopCpuProfiling;
  setLogger: typeof setLogger;
};
export default _default;
