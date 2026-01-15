const Tooltip = ({ children }: { children: React.ReactNode }) => (
  <div className="pointer-events-none invisible absolute right-0 min-w-25 rounded-[10px] bg-[rgba(0,0,0,0.6)] p-2 text-[13px] text-white opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
    {children}
  </div>
);

export default Tooltip;
