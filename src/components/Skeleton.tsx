interface SkeletonBlockProps {
  className?: string;
}

/**
 * Lightweight botanical-shimmer skeleton block synced to Mawariduna Mustaqabana light/dark tokens.
 */
export function SkeletonBlock({ className = '' }: SkeletonBlockProps) {
  return <div aria-hidden="true" className={`skeleton-botanical rounded-[6px] ${className}`} />;
}

/**
 * Route-level fallback displayed while lazy-loaded page chunks stream in.
 * Keeps layout height stable and prevents cumulative layout shift (CLS).
 */
export function PageRouteSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading page content"
      className="min-h-[72vh] py-10 sm:py-14 lg:py-20 bg-[#F6F3EC] dark:bg-[#121813]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Hero text skeleton */}
        <div className="max-w-2xl space-y-3.5">
          <SkeletonBlock className="h-3.5 w-32" />
          <SkeletonBlock className="h-9 sm:h-11 w-4/5" />
          <SkeletonBlock className="h-4 w-full max-w-xl" />
          <SkeletonBlock className="h-4 w-3/4 max-w-md" />
        </div>

        {/* Two-column content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-7">
          <div className="md:col-span-5 space-y-3.5">
            <div className="rounded-[10px] border border-[#D8D0BE]/70 dark:border-[#2C352C] p-5 bg-[#FAF8F3]/70 dark:bg-[#182019]/70 space-y-3">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="w-9 h-9 rounded-[8px] shrink-0" />
                <SkeletonBlock className="h-4 w-1/2" />
              </div>
              <SkeletonBlock className="h-3.5 w-full" />
              <SkeletonBlock className="h-3.5 w-4/5" />
            </div>
            <div className="rounded-[10px] border border-[#D8D0BE]/70 dark:border-[#2C352C] p-5 bg-[#FAF8F3]/70 dark:bg-[#182019]/70 space-y-3">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="w-9 h-9 rounded-[8px] shrink-0" />
                <SkeletonBlock className="h-4 w-2/5" />
              </div>
              <SkeletonBlock className="h-3.5 w-11/12" />
              <SkeletonBlock className="h-3.5 w-2/3" />
            </div>
          </div>

          <div className="md:col-span-7">
            <SkeletonBlock className="w-full h-[260px] sm:h-[320px] rounded-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
