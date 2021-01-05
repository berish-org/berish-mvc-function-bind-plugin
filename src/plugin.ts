import { LifecyclePlugin } from '@berish/mvc-core';

import { getKeys } from './getKeys';
import { getDefaultParams, PluginParams } from './params';

export type FunctionBindPlugin = (params?: PluginParams) => LifecyclePlugin;

export const plugin: FunctionBindPlugin = (params) => {
  params = getDefaultParams(params);
  return {
    controller: params.controller && {
      upgradeInstance: (controllerInstance: any) => {
        const keys = getKeys(controllerInstance).ofType(Function, (m) => controllerInstance[m]);
        for (const key of keys) {
          if (controllerInstance[key] && controllerInstance[key].bind)
            controllerInstance[key] = controllerInstance[key].bind(controllerInstance);
        }
        return controllerInstance;
      },
    },
    model: params.model && {
      upgradeInstance: (modelInstance: any) => {
        const keys = getKeys(modelInstance).ofType(Function, (m) => modelInstance[m]);
        for (const key of keys) {
          if (modelInstance[key] && modelInstance[key].bind)
            modelInstance[key] = modelInstance[key].bind(modelInstance);
        }
        return modelInstance;
      },
    },
    view: params.view && {
      upgradeInstance: (viewInstance: any) => {
        const keys = getKeys(viewInstance).ofType(Function, (m) => viewInstance[m]);
        for (const key of keys) {
          if (viewInstance[key] && viewInstance[key].bind) viewInstance[key] = viewInstance[key].bind(viewInstance);
        }
        return viewInstance;
      },
    },
  };
};
