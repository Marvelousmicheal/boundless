import type { UserStats as UserStatsType } from '@/types/profile';

interface UserStatsProps {
  stats: UserStatsType;
}

export default function UserStats({ stats }: UserStatsProps) {
  return (
    <div className='flex items-center gap-8'>
      <div className='flex items-center font-medium text-xs gap-1 text-gray-500'>
        <span className='text-white font-medium text-base'>{stats.organizations}</span>
        Organizations
      </div>
      <div className='flex items-center font-medium text-xs gap-1 text-gray-500'>
        <span className='text-white font-medium text-base'>{stats.projects}</span>
        Projects
      </div>
      <div className='flex items-center font-medium text-xs gap-1 text-gray-500'>
        <span className='text-white font-medium text-base'>{stats.following}</span>
        Following
      </div>
      <div className='flex items-center font-medium text-xs gap-1 text-gray-500'>
        <span className='text-white font-medium text-base'>{stats.followers}</span>
        Followers
      </div>
    </div>
  );
}
