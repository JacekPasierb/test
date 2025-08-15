declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  interface PWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    runtimeCaching?: any[];
    buildExcludes?: any[];
    fallbacks?: any;
    sw?: string;
    scope?: string;
    basePath?: string;
    reloadOnOnline?: boolean;
    cacheOnFrontEndNav?: boolean;
    dynamicStartUrl?: boolean;
    dynamicStartUrlRedirect?: boolean;
    disable?: boolean;
    maximumFileSizeToCacheInBytes?: number;
    sourcemap?: boolean;
    swcMinify?: boolean;
    workboxOptions?: any;
  }

  function withPWA(config?: PWAConfig): (nextConfig: NextConfig) => NextConfig;
  
  export default withPWA;
} 