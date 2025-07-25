import { AspectRatio as AspectRatioPrimitive } from 'radix-ui'

const AspectRatio = ({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) => {
  return (
    <AspectRatioPrimitive.Root
      data-slot='aspect-ratio'
      {...props}
    />
  )
}

export { AspectRatio }
