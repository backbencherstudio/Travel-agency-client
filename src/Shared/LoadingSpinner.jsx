export default function LoadingSpinner() {
  return (
    <div
      className="bg-[#e9f0f9] flex items-center justify-center"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="w-16 h-16 border-4 border-[#eb5b2a] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
