export function Button({ className = "", variant, ...props }) {
    const base =
      "inline-flex items-center justify-center font-semibold transition disabled:pointer-events-none disabled:opacity-50";
  
    const style =
      variant === "outline"
        ? "border border-slate-300 bg-transparent hover:bg-slate-100"
        : "bg-slate-950 text-white hover:bg-slate-800";
  
    return <button className={`${base} ${style} ${className}`} {...props} />;
  }