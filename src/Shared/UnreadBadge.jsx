const UnreadBadge = ({ count }) => {
    if (!count || count <= 0) return null;
  
    return (
      <span className="bg-[#eb5b2a] text-white text-xs font-medium px-2 py-0.5 rounded-full">
        {count > 99 ? '99+' : count}
      </span>
    );
  };
  
  export default UnreadBadge;