
const TypingIndicaptor = () => (
    <div className="w-12 h-7 bg-gray-200 rounded-full flex items-center justify-center gap-1 ml-4">
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-wave" />
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-wave" style={{ animationDelay: '100ms' }} />
      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-wave" style={{ animationDelay: '200ms' }} />
      </div>
  )

export default TypingIndicaptor
