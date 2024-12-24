<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { api } from "$lib/api";
  import { Button } from "$lib/components/ui/button";
  import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuItem,
  } from "$lib/components/ui/dropdown-menu/index.js";

  const meQuery = createQuery({
    queryKey: ["me"],
    queryFn: api.auth.me,
    staleTime: 1000 * 15 * 60,
    retry: false,
  });
</script>

<div class="absolute right-0 top-0 z-[400] m-4">
  {#if $meQuery.isError || $meQuery.isPending}
    <Button
      variant="secondary"
      href={`https://test.stytch.com/v1/public/oauth/google/start?public_token=${
        import.meta.env.VITE_PUBLIC_STYTCH_PUBLIC_TOKEN
      }`}
    >
      Login
    </Button>
  {:else}
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              {$meQuery.data?.data.first_name[0]}{$meQuery.data?.data.last_name[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Hello, {$meQuery.data?.data.first_name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem href="/api/auth/logout">Logout</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  {/if}
</div>
