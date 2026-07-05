import React from 'react';
import { FlameIcon } from './flame-icon';
import { BoostIcon } from './boost-icon';
import { GemIcon } from './gem-icon';
import { HomeIcon } from './home-icon';
import { TasksIcon } from './tasks-icon';
import { RewardsIcon } from './rewards-icon';
import { BalanceIcon } from './balance-icon';
import { ProfileIcon } from './profile-icon';
import { StarIcon } from './star-icon';
import { LockIcon } from './lock-icon';
import { CheckIcon } from './check-icon';
import { ChevronIcon } from './chevron-icon';
import { BackIcon } from './back-icon';
import { ExternalLinkIcon } from './external-link-icon';
import { PrizeIcon } from './prize-icon';

export type IconName =
  | 'flame'
  | 'boost'
  | 'gem'
  | 'home'
  | 'tasks'
  | 'rewards'
  | 'prize'
  | 'balance'
  | 'profile'
  | 'star'
  | 'lock'
  | 'check'
  | 'chevron'
  | 'back'
  | 'external-link';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  active?: boolean;
  filled?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
};

export function Icon({ name, size = 24, color, active, filled, direction }: IconProps) {
  switch (name) {
    case 'flame': return <FlameIcon size={size} />;
    case 'boost': return <BoostIcon size={size} />;
    case 'gem': return <GemIcon size={size} />;
    case 'home': return <HomeIcon size={size} active={active} />;
    case 'tasks': return <TasksIcon size={size} active={active} />;
    case 'rewards': return <RewardsIcon size={size} active={active} />;
    case 'prize': return <PrizeIcon size={size} active={active} />;
    case 'balance': return <BalanceIcon size={size} active={active} />;
    case 'profile': return <ProfileIcon size={size} active={active} />;
    case 'star': return <StarIcon size={size} filled={filled} />;
    case 'lock': return <LockIcon size={size} />;
    case 'check': return <CheckIcon size={size} />;
    case 'chevron': return <ChevronIcon size={size} direction={direction} />;
    case 'back': return <BackIcon size={size} color={color} />;
    case 'external-link': return <ExternalLinkIcon size={size} color={color} />;
  }
}
