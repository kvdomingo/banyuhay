<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Avatar as AvatarPrimitive } from "bits-ui";

  type $Props = AvatarPrimitive.FallbackProps;

  let className: $Props["class"] = undefined;
  export { className as class };
</script>

<AvatarPrimitive.Fallback
  class={cn("bg-muted flex h-full w-full items-center justify-center rounded-full", className)}
  {...$$restProps}
>
  <slot />
</AvatarPrimitive.Fallback>
