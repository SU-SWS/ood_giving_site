
export type ActiveEnv = 'development' | 'deploy-preview' | 'branch-deploy' | 'production';

export const getActiveEnv = () => {
  const activeEnv = (process.env.CONTEXT || 'development') as ActiveEnv;
  return activeEnv;
};

export const isActiveEnv = (env: ActiveEnv | ActiveEnv[]) => (
  Array.isArray(env) ? env.includes(getActiveEnv()) : env === getActiveEnv()
);

export const isProduction = () => isActiveEnv('production');
export const isPreview = () => isActiveEnv('deploy-preview');
export const isBranchDeploy = () => isActiveEnv('branch-deploy');
export const isDevelopment = () => isActiveEnv('development');
