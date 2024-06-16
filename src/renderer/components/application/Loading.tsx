import { useTheme } from '@rHooks/useTheme';

export function Loading() {
  const { theme } = useTheme();
  return (
    <main
      data-theme={theme}
      className="w-screen h-screen top-0 fixed bg-gray100 data-[theme=light]:bg-gray900 flex items-center gap-8 justify-center"
    >
      <span className="text-7xl font-title">Fictional</span>
      <div className="fill-mode-both w-[50px] h-[50px] bg-purple900 animate-square-spin shadow-purpleShadow shadow-purple900 rounded-[10px]" />
    </main>
  );
}
