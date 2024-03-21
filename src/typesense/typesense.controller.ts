import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { TypesenseService } from './typesense.service';

@Controller('typesense')
export class TypesenseController {
    constructor(
        private typesenseService: TypesenseService
    ) { }

    @Post("createKey")
    @HttpCode(HttpStatus.CREATED)
    async createApiKey(@Body("name") name: string) {
        return await this.typesenseService.createApiKey(name);
    };

    @Get("listKeys")
    @HttpCode(HttpStatus.OK)
    async listAllKeys() {
        return await this.typesenseService.listAllKeys();
    };

    @Delete("deleteKey/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAPIKey(@Param("id") id: number) {
        return await this.typesenseService.deleteAPIKey(id);
    };

    @Get("listCollections")
    @HttpCode(HttpStatus.OK)
    async listCollections() {
        return await this.typesenseService.listCollections();
    }

    @Get("search")
    @HttpCode(HttpStatus.OK)
    async searchAllCollections(@Body("search") search: string) {
        return await this.typesenseService.searchAllCollections(search);
    };
}
