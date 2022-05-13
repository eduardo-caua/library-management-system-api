import { Tracking } from './tracking.entity';
import { TRACKING_REPOSITORY } from '../../core/constants';

export const trackingProviders = [{
    provide: TRACKING_REPOSITORY,
    useValue: Tracking,
}];