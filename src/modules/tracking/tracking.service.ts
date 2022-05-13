import { Injectable, Inject } from '@nestjs/common';
import { Tracking } from './tracking.entity';
import { TrackingDto } from './dto/tracking.dto';
import { TRACKING_REPOSITORY } from '../../core/constants';
import { Customer } from '../customers/customer.entity';

@Injectable()
export class TrackingService {

    constructor(@Inject(TRACKING_REPOSITORY) private readonly trackingRepository: typeof Tracking) { }

    async find(): Promise<Tracking[]> {
        return await this.trackingRepository.findAll<Tracking>({
            include:[
                {model: Customer, required: true},
            ]
        });
    }

    async findById(id: number): Promise<Tracking> {
        return await this.trackingRepository.findOne<Tracking>({ 
            include:[
                {model: Customer, required: true},
            ],
            where: { id }
        });
    }

    async findByBookId(bookId: number): Promise<Tracking[]> {
        return await this.trackingRepository.findAll<Tracking>({ 
            include:[
                {model: Customer, required: true},
            ],
            where: { bookId },
            order: [['createdAt', 'DESC']]
        });
    }

    async create(tracking: TrackingDto): Promise<Tracking> {
        return await this.trackingRepository.create<Tracking>(tracking);
    }

    async update(id: number, tracking: TrackingDto): Promise<[Number]> {
        return await this.trackingRepository.update<Tracking>(tracking, { where: { id } });
    }

    async delete(id: number): Promise<Boolean> {
        return await this.trackingRepository.destroy<Tracking>({ where: { id } }) == 1;
    }
}