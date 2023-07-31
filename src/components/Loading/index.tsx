export function Loading() {
  return (
    <main className="w-screen h-screen fixed bg-gray100 flex items-center gap-8 justify-center">
      <span className="text-7xl font-title text-text100">Magiscrita</span>
      <div className="fill-mode-both w-[50px] h-[50px] bg-purple900 animate-square-spin shadow-purpleShadow shadow-purple900 rounded-[10px]" />
    </main>
  );
}
