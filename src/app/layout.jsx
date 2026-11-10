import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: "Qamra Ariva (Riva) — Web3 Developer",
  description:
    "Professional portfolio of Qamra Ariva (Riva), Web3 developer building websites, wallet-connected applications, and smart-contract interfaces.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark;
                  if (stored === 'dark') {
                    isDark = true;
                  } else if (stored === 'light') {
                    isDark = false;
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                  window.addEventListener('DOMContentLoaded', function() {
                    requestAnimationFrame(function() {
                      document.documentElement.classList.add('theme-transitions');
                    });
                  });
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  window.addEventListener('DOMContentLoaded', function() {
                    requestAnimationFrame(function() {
                      document.documentElement.classList.add('theme-transitions');
                    });
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-[#245BDB]/20 selection:text-[#245BDB] dark:selection:bg-[#4F7CFF]/25 dark:selection:text-[#6890FF]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-lg focus:bg-[#245BDB] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none dark:focus:bg-[#4F7CFF] dark:focus:text-slate-950"
        >
          Skip to main content
        </a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
