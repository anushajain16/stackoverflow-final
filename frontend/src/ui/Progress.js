import * as ProgressPrimitive from "@radix-ui/react-progress"


const Progress = ({ value = 0, className = "", ...props }) => {
  return (
    <ProgressPrimitive.Root
      className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-global-1 transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
