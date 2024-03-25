import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
    constructor(private prisma: PrismaService) { }

    async getStates() {
        try {
            return await this.prisma.state.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    }

    async getCities() {
        try {
            return await this.prisma.city.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getCitiesByStateId(stateId: string) {
        try {
            return await this.prisma.city.findMany({
                where: {
                    stateId,
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    //comment
}
