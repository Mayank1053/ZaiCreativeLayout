import { PageContainer } from '@/components/shared';

// Next.js special file: loading.tsx
// This will be shown instantly while the async ProjectsPage is fetching data,
// providing immediate feedback on click instead of a stalled UI.
export default function ProjectsLoading() {
  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-20 relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid-projects-loading" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-projects-loading)" />
        </svg>
      </div>
      
      <PageContainer>
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center mb-24 relative z-10">
          <div className="h-4 w-32 bg-slate-800/50 rounded animate-pulse mb-6" />
          <div className="h-16 w-80 md:w-96 bg-slate-800/50 rounded-lg animate-pulse mb-8" />
          <div className="h-6 w-full max-w-2xl bg-slate-800/50 rounded animate-pulse mb-2" />
          <div className="h-6 w-3/4 max-w-xl bg-slate-800/50 rounded animate-pulse" />
        </div>

        {/* Category Filters Skeleton */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-20">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 w-20 bg-slate-800/50 rounded animate-pulse" />
          ))}
        </div>

        {/* Projects Masonry Grid Skeleton */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className={`w-full bg-slate-800/30 rounded-xl animate-pulse ${
                i % 2 === 0 ? 'h-64' : 'h-96'
              }`}
            />
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
