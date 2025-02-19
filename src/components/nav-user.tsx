import { useMutation } from '@tanstack/react-query'
import { ChevronsUpDown, KeySquare, LogOut, UserRound } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import usersApis from '@/apis/users.apis'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import PATH from '@/constants/path'
import { AppContext } from '@/contexts/app.context'

export function NavUser() {
  const { isMobile } = useSidebar()

  const navigate = useNavigate()

  const { profile, setIsAuthenticated, setProfile } = React.useContext(AppContext)

  const fallbackAvatarName = `${profile?.fullName[0].toUpperCase()}${profile?.fullName[1].toUpperCase()}`

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: usersApis.logout,
    onSuccess: (data) => {
      toast.success(data.data.message)
      setIsAuthenticated(false)
      setProfile(null)
      navigate(PATH.LOGIN)
    }
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={''} alt={profile?.fullName} />
                <AvatarFallback className='rounded-lg'>{fallbackAvatarName}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{profile?.fullName}</span>
                <span className='truncate text-xs'>{profile?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={''} alt={profile?.fullName} />
                  <AvatarFallback className='rounded-lg'>{fallbackAvatarName}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{profile?.fullName}</span>
                  <span className='truncate text-xs'>{profile?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserRound />
                Tài khoản
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <KeySquare />
                Đổi mật khẩu
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
