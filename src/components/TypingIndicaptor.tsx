const TypingIndicaptor = () => (
  <div className="absolute left-4 mt-4 flex h-7 w-12 items-center justify-center gap-1 rounded-full bg-(--typingColor)">
    <div className="animate-wave h-1.5 w-1.5 rounded-full bg-gray-500" />
    <div
      className="animate-wave h-1.5 w-1.5 rounded-full bg-gray-500"
      style={{ animationDelay: '100ms' }}
    />
    <div
      className="animate-wave h-1.5 w-1.5 rounded-full bg-gray-500"
      style={{ animationDelay: '200ms' }}
    />
  </div>
);

export default TypingIndicaptor;
