export function Card({ className = "", ...props }) {
    return (
      <div
        className={`rounded-xl border bg-white text-slate-950 ${className}`}
        {...props}
      />
    );
  }
  
  export function CardContent({ className = "", ...props }) {
    return <div className={className} {...props} />;
  }