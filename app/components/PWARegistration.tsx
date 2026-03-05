'use client';

import { useEffect } from 'react';

export default function PWARegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('STATMAX: System Link Established', registration.scope);
          },
          (err) => {
            console.log('STATMAX: System Link Failed', err);
          }
        );
      });
    }
  }, []);

  return null; // This component doesn't render anything UI-wise
}