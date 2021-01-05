import LINQ from '@berish/linq';
import { ControllerClass } from '@berish/mvc-core';

export type Router5ControllerMapType = [(string | number)[], ControllerClass][];

export interface PluginParams {
  model?: boolean;
  view?: boolean;
  controller?: boolean;
}

const defaultParams: PluginParams = {
  model: true,
  view: true,
  controller: true,
};

export function getDefaultParams(params?: PluginParams) {
  params = params || defaultParams;
  if (params !== defaultParams) {
    LINQ.from(Object.keys(defaultParams))
      .except(Object.keys(params))
      .forEach((key: string) => {
        (params as any)[key] = (defaultParams as any)[key];
      });
  }
  return params;
}
