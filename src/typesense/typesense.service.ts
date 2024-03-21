import { Injectable } from '@nestjs/common';
import { projectSchema } from 'src/common/typesenseSchema/project.schema';
import { propertySchema } from 'src/common/typesenseSchema/property.schema';
import { propertyCategorySchema } from 'src/common/typesenseSchema/propertyCategory.schema';
import { Project, Property, PropertyCategory } from 'src/graphql';
import * as Typesense from 'typesense';
import { MultiSearchRequestsSchema } from 'typesense/lib/Typesense/MultiSearch';
import { SyncPropertyToTypesense } from './importTypes/property.sync';
import { ImportTypesensePropertyCategory } from './importTypes/propertyCategory.import';

@Injectable()
export class TypesenseService {
    private client: Typesense.Client;

    constructor() {
        this.client = new Typesense.Client({
            nodes: [
                {
                    host: process.env.TYPESENSE_HOST,
                    port: 8108,
                    protocol: process.env.TYPESENSE_PROTOCOL,
                },
            ],
            apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
        });
    };

    async createApiKey(name: string) {
        const createKey = await this.client.keys().create({
            'description': `${name}-key`,
            'actions': ['documents:search'],
            'collections': ['project', 'property', 'propertyCategory'],
            'expires_at': 2012054334
        });

        return createKey;
    };

    async listAllKeys() {
        return await this.client.keys().retrieve();
    };

    async deleteAPIKey(id: number) {
        try {
            await this.client.keys(id).delete();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async listCollections() {
        return await this.client.collections().retrieve();
    };

    async searchAllCollections(search: string) {
        try {
            const searchRequests: MultiSearchRequestsSchema = {
                searches: [
                    {
                        collection: 'project',
                        q: search,
                        query_by: 'projectName, description, address', //to query by multiple columns
                        prioritize_token_position: true,
                        // filter_by: `businessId:${businessId}` //to filter data by condition e.g name
                    },
                    {
                        collection: 'property',
                        q: search,
                        query_by: "name, description, address",
                        prioritize_token_position: true,
                        // filter_by: `businessId:${businessId}`
                    },
                    {
                        collection: 'propertyCategory',
                        q: search,
                        query_by: "categoryName",
                        prioritize_token_position: true,
                        // filter_by: `businessId:${businessId}`
                    },
                ]
            };

            const searchResults = await this.client.multiSearch.perform(searchRequests);
            return searchResults;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    //Project
    async syncProjectToTypesense(project: Project) {
        // Transform the user data to match your Typesense schema
        const projectForTypesense = {
            id: project.id.toString(),
            projectName: project.projectName,
            description: project.description,
            developerCompanyId: project.developerCompanyId.toString(),
            city: project.city.cityName,
            address: project.address,
            userId: project.userId.toString(),
            createdAt: project.createdAt.toISOString(),
        };

        try {
            // Add the project to the Typesense collection
            await this.client
                .collections('project')
                .documents()
                .create(projectForTypesense);

            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async updateProjectInTypesense(project: Project) {
        const id = project.id.toString();

        const projectForTypesense = {
            projectName: project.projectName,
            description: project.description,
            city: project.city.cityName,
            address: project.address
        };

        try {
            await this.client.collections('project').documents(id).update(projectForTypesense);
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async deleteProjectFromTypesense(projectId: string) {
        const id = projectId.toString();

        try {
            await this.client.collections('project').documents(id).delete();
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async deleteAllProjectsFromTypesense() {
        try {
            await this.client.collections('project').delete();

            await this.client.collections().create(projectSchema);
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    //PROPERTY
    async syncPropertyToTypesense(property: SyncPropertyToTypesense) {
        // Transform the user data to match your Typesense schema
        const propertyForTypesense = {
            id: property.id.toString(),
            name: property.name,
            description: property.description,
            developerCompanyId: property.developerCompanyId.toString(),
            city: property.city,
            address: property.address,
            developedById: property.developedById.toString(),
            createdAt: property.createdAt.toISOString(),
        };

        try {
            // Add the property to the Typesense collection
            await this.client
                .collections('property')
                .documents()
                .create(propertyForTypesense);

            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async updatePropertyInTypesense(property: Property) {
        const id = property.id.toString();

        const propertyForTypesense = {
            name: property.name,
            description: property.description,
            // address: property.address
        };

        try {
            await this.client.collections('property').documents(id).update(propertyForTypesense);
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async deletePropertyFromTypesense(propertyId: string) {
        const id = propertyId.toString();

        try {
            await this.client.collections('property').documents(id).delete();
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async deleteAllPropertiesFromTypesense() {
        try {
            await this.client.collections('property').delete();

            await this.client.collections().create(propertySchema);
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    //CATEGORY
    async syncPropertyCategoryToTypesense(category: PropertyCategory) {
        // Transform the user data to match your Typesense schema
        const propertyCategoryForTypesense = {
            id: category.id.toString(),
            categoryName: category.categoryName,
            createdAt: category.createdAt.toISOString(),
        };

        try {
            // Add the property category to the Typesense collection
            await this.client
                .collections('propertyCategory')
                .documents()
                .create(propertyCategoryForTypesense);

            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async importPropertyCategoriesToTypesense(propertyCategories: ImportTypesensePropertyCategory[]) {
        try {
            await this.client.collections('propertyCategory').documents().import(propertyCategories, { action: 'create' })
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async updatePropertyCategoryInTypesense(category: PropertyCategory) {
        const id = category.id.toString();

        const propertyCategoryForTypesense = {
            categoryName: category.categoryName,
        };

        try {
            await this.client.collections('propertyCategory').documents(id).update(propertyCategoryForTypesense);
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async deletePropertyCategoryFromTypesense(categoryId: string) {
        const id = categoryId.toString();

        try {
            await this.client.collections('propertyCategory').documents(id).delete();
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async deleteManyPropertyCategoriesFromTypesense(categoryName: string) {
        try {
            await this.client.collections('propertyCategory').documents().delete({ 'filter_by': `categoryName:${categoryName}` });
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };

    async deleteAllPropertyCategoriesFromTypesense() {
        try {
            await this.client.collections('propertyCategory').delete();

            await this.client.collections().create(propertyCategorySchema);
            return true;
        } catch (error) {
            throw new Error(`Typesense synchronization failed: ${error.message}`);
        };
    };
}
