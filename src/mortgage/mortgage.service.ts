import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MortgageService {
    constructor(private prisma: PrismaService) { }

    async createMortgage() { }

    async getMortgages() { }

    async getMortgagesByUser() { }


}
