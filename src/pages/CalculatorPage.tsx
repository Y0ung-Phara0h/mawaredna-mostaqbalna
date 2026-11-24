import { useApp } from '../context/AppContext';
import { CompostCalculatorWidget } from '../components/CompostCalculatorWidget';

export function CalculatorPage() {
  const { t } = useApp();

  return (
    <div className="min-h-[70vh] py-8 sm:py-12 md:py-16 lg:py-20 bg-[#F6F3EC] text-[#1F2720] dark:bg-[#121813] dark:text-[#F4F1E8] transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <p className="text-[11px] sm:text-xs md:text-sm font-bold mb-1.5 sm:mb-2 text-[#286631] dark:text-[#7AB34C]">
            {t.calculator.pageEyebrow}
          </p>
          <h1 className="font-bold-display text-[24px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-bold leading-[1.14] tracking-tight text-[#1F2720] dark:text-[#F4F1E8]">
            {t.calculator.pageTitle}
          </h1>
          <p className="mt-2.5 sm:mt-3 text-[13.5px] sm:text-[15px] lg:text-base leading-[1.68] text-[#3D463C] dark:text-[#D4CEBE]">
            {t.calculator.pageSubtitle}
          </p>
        </div>

        <ol className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {t.calculator.steps.map((step, idx) => {
            const isLastOdd =
              t.calculator.steps.length % 2 === 1 && idx === t.calculator.steps.length - 1;
            return (
              <li
                key={step.num}
                className={`min-w-0 rounded-[9px] sm:rounded-[10px] border p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row items-start gap-2 sm:gap-3 bg-[#FAF8F3] border-[#D8D0BE] dark:bg-[#1A221B] dark:border-[#344034] ${
                  isLastOdd ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] text-[11px] sm:text-xs font-bold flex items-center justify-center shrink-0 tabular-nums bg-[#E9E3D4] text-[#286631] border border-[#D4CAB4] dark:bg-[#233224] dark:text-[#7AB34C] dark:border-[#3D463C]">
                  {step.num}
                </span>
                <div className="min-w-0">
                  <h2 className="text-[12.5px] sm:text-sm font-bold leading-snug text-[#1F2720] dark:text-[#F4F1E8]">
                    {step.title}
                  </h2>
                  <p className="mt-0.5 text-[11px] sm:text-xs leading-relaxed text-[#3D463C] dark:text-[#C5BFB0]">
                    {step.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <CompostCalculatorWidget mode="full" />
      </div>
    </div>
  );
}
