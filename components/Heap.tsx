/* eslint-disable max-len */
'use client';
import Script from 'next/script';
import { isProduction } from '@/utilities/getActiveEnv';

/**
 *
 * @returns Heap script
 */
export const Heap = () => {
  const ID = '2306378928';
  const isProd = isProduction();

  if (isProd) {
    return (
      <Script id="heap-id" strategy="afterInteractive">
        {`
          window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
          heap.load(${ID});
      `}
      </Script>
    );
  }
  return null;
};
