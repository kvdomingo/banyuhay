<script lang="ts">
  import { api } from "$lib/api";
  import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu/index.js";
  import { createQuery } from "@tanstack/svelte-query";

  const meQuery = createQuery({
    queryKey: ["me"],
    queryFn: api.auth.me,
    staleTime: 1000 * 15 * 60,
    retry: false,
  });
</script>

<div class="absolute top-0 right-0 z-[400] m-4">
  {#if $meQuery.isError || $meQuery.isPending}
    <Button
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
            <DropdownMenuItem href="/api/auth/logout" class="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  {/if}
</div>
