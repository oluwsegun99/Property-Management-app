import { ForbiddenException, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { ProjectMediaCategory, PropertyCategory, PropertyMediaCategory, PurchaseRequestStatusEnum, PurchaseRequestTypeEnum } from 'src/common/enums/property.enum';
import { validateApprovePurchaseRequestDTO, validateCreateProjectDTO, validateCreatePropertyDetailDTO, validateCreatePropertyDTO, validateCreatePropertyPurchaseRequestDTO, validateCreatePrototypeDTO, validateProjectMediaArray, validatePropertyMediaArray, validatePrototypeMediaArray, validateUpdateProjectDTO, validateUpdatePropertyPurchaseRequestDTO, validateUpdatePrototypeDTO } from 'src/common/validationFunctions/property.validation';
import { ApprovePurchaseRequest, CreateProject, CreateProperty, CreatePropertyPurchaseRequest, CreatePrototype, PropertyMedia, UpdateProject, UpdateProperty, UpdatePropertyPurchaseRequest, UpdatePrototype, UserDeveloperCompany } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImportTypesensePropertyCategory } from 'src/typesense/importTypes/propertyCategory.import';
import { TypesenseService } from 'src/typesense/typesense.service';

@Injectable()
export class PropertyService implements OnModuleInit {
    constructor(
        private prisma: PrismaService,
        private typesense: TypesenseService
    ) { }

    private readonly logger = new Logger(PropertyService.name);

    async onModuleInit() {

        //Property Category
        const propertyCategoryValues = Object.values(PropertyCategory).map((category) => category.toString());

        const existingPropertyCategories = await this.prisma.propertyCategory.findMany({
            select: {
                categoryName: true,
            },
        });

        const existingPropertyCategorySet = new Set(existingPropertyCategories.map((propertyCategory) => propertyCategory.categoryName));

        const propertyCategoriesToDelete: string[] = [];

        for (const category of existingPropertyCategorySet) {
            if (!propertyCategoryValues.includes(category)) {
                propertyCategoriesToDelete.push(category);
            };
        };

        if (propertyCategoriesToDelete.length > 0) {
            const categoriesToDelete = await this.prisma.propertyCategory.findMany({
                where: {
                    categoryName: {
                        in: propertyCategoriesToDelete,
                    },
                },
            });

            for (const category of categoriesToDelete) {
                await this.typesense.deletePropertyCategoryFromTypesense(category.id);
            };

            await this.prisma.propertyCategory.deleteMany({
                where: {
                    categoryName: {
                        in: propertyCategoriesToDelete,
                    },
                },
            });
        };

        const propertyCategoriesToCreate: {
            categoryName: string
        }[] = [];

        const newCategoryNames: string[] = [];

        for (const category of propertyCategoryValues) {
            if (existingPropertyCategorySet.has(category)) {
                continue;
            } else {
                propertyCategoriesToCreate.push({
                    categoryName: category,
                });

                newCategoryNames.push(category);
            };
        };

        if (propertyCategoriesToCreate.length > 0) {
            await this.prisma.propertyCategory.createMany({
                data: propertyCategoriesToCreate,
            });
        };

        const newPropertyCategories = await this.prisma.propertyCategory.findMany({
            where: {
                categoryName: {
                    in: newCategoryNames,
                },
            },
        });

        if (newPropertyCategories.length > 0) {
            const propertyCategoriesForTypesense: ImportTypesensePropertyCategory[] = newPropertyCategories.map((category) => {
                return {
                    id: category.id,
                    categoryName: category.categoryName,
                    createdAt: category.createdAt,
                };
            });

            if (process.env.TYPESENSE_HOST === "localhost") {

                for (const category of propertyCategoriesForTypesense) {
                    await this.typesense.deleteManyPropertyCategoriesFromTypesense(category.categoryName);
                    this.logger.log("deleted previous category");
                };
            };

            await this.typesense.importPropertyCategoriesToTypesense(propertyCategoriesForTypesense);

            this.logger.log("Properties categories successfully synced with typesense");
        };
    };

    async getPropertyStatuses() {
        try {
            return await this.prisma.propertyStatus.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPropertyOptions() {
        try {
            return await this.prisma.propertyOption.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPropertyCategories() {
        try {
            return await this.prisma.propertyCategory.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getProjectStatuses() {
        try {
            return await this.prisma.projectStatus.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPropertyMediaCategories() {
        try {
            return await this.prisma.propertyMediaCategory.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    }

    async getProjectMediaCategories() {
        try {
            return await this.prisma.projectMediaCategory.findMany();
        } catch (error) {
            console.error(error);
            throw error;
        };
    }

    async createProject(userId: string, dto: CreateProject) {
        try {
            // Validate
            const errors: string[] = await validateCreateProjectDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //project media validation
            const projectMediaErrors: string[] = await validateProjectMediaArray(dto.projectMedia);
            if (projectMediaErrors.length > 0) {
                const errorMessage = `Validation error: ${projectMediaErrors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            let user: User;

            if (dto.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: dto.developerCompanyId,
                        isOwner: true,
                    },
                    select: {
                        user: true,
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access denied");

                user = userDeveloperCompany.user
            } else {
                const userEntity = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!userEntity) throw new UnauthorizedException("Access denied");
                if (userEntity.isDeveloper !== true) throw new ForbiddenException("Access denied: user is not a developer");
                if (userEntity.hasCompany === true) throw new ForbiddenException("developer company ID not found in request");

                user = userEntity;
            };

            //is CityId valid
            const cityExists = await this.prisma.city.findUnique({
                where: {
                    id: dto.cityId,
                },
            });
            if (!cityExists) throw new ForbiddenException("City not found");

            //is neighbourhoodId valid
            if (dto.neighborhoodId) {
                const neighborhoodExixsts = await this.prisma.neighborhood.findUnique({
                    where: {
                        id: dto.neighborhoodId,
                    },
                });
                if (!neighborhoodExixsts) throw new ForbiddenException("Neighborhood not found");
            };

            //is project status Id valid
            const projectStatusExists = await this.prisma.projectStatus.findUnique({
                where: {
                    id: dto.projectStatusId,
                },
            });
            if (!projectStatusExists) throw new ForbiddenException("Invalid Project status");

            const createProject = await this.prisma.$transaction(async (prisma) => {
                const newProject = await prisma.project.create({
                    data: {
                        projectName: dto.projectName,
                        description: dto.description,
                        address: dto.address,
                        // projectLayoutUrl: dto.projectLayoutUrl,
                        cityId: dto.cityId,
                        neighborhoodId: dto.neighborhoodId,
                        userId: user.id,
                        developerCompanyId: dto.developerCompanyId ? dto.developerCompanyId : null,
                        projectStatusId: dto.projectStatusId,
                    },
                    include: {
                        city: true,
                    },
                });

                if (dto.projectMedia.length > 0) {
                    const projectMediaCategories = await prisma.projectMediaCategory.findMany();

                    const requiredMediaCategories = projectMediaCategories.filter((category) => category.required === true).map((mediaCategory) => {
                        return {
                            id: mediaCategory.id,
                            mediaCategory: mediaCategory.mediaCategory
                        };
                    });

                    // const bannerMediaCategory = requiredMediaCategories.find((category) => category.mediaCategory === ProjectMediaCategory.Banner);

                    const projectMediaData = dto.projectMedia.map((media) => {
                        const mediaCategoryExists = projectMediaCategories.find((category) => category.id === media.projectMediaCategoryId);
                        if (!mediaCategoryExists) throw new ForbiddenException("Invalid media category");

                        return {
                            projectId: newProject.id,
                            index: media.index,
                            mediaUrl: media.mediaUrl,
                            projectMediaCategoryId: media.projectMediaCategoryId,
                            description: media.description,
                        };
                    });

                    const handledMediaCategoryIds = projectMediaData.map((data) => data.projectMediaCategoryId);

                    //check for multiple banner entries
                    // const bannerEntries = handledMediaCategoryIds.filter((id) => id === bannerMediaCategory.id);
                    // if (bannerEntries.length > 1) throw new ForbiddenException("Multiple Banner entries: Only one banner entry is required");

                    //check if all required categories are present
                    for (const requiredCategory of requiredMediaCategories) {

                        //there can be multiple entries of the required category but this ensures that at least one entry is present instead of using filter
                        const requiredCategoryPresent = handledMediaCategoryIds.find((data) => data === requiredCategory.id);
                        if (!requiredCategoryPresent) throw new ForbiddenException(`Required: ${requiredCategory.mediaCategory} Url not found`);
                    };

                    await prisma.projectMedia.createMany({
                        data: projectMediaData,
                    });
                };

                return newProject
            });

            await this.typesense.syncProjectToTypesense(createProject);

            return createProject;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getProjects() {
        try {
            return await this.prisma.project.findMany({
                include: {
                    user: true,
                    developerCompany: true,
                    city: true,
                    properties: true,
                    prototypes: true,
                    projectsMedia: {
                        include: {
                            projectMediaCategory: true,
                        },
                    },
                    projectStatus: true,
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getProjectById(projectId: string) {
        try {
            const project = await this.prisma.project.findUnique({
                where: {
                    id: projectId,
                },
                include: {
                    user: true,
                    developerCompany: true,
                    city: true,
                    properties: {
                        include: {
                            propertiesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                            propertyDetail: true,
                        },
                    },
                    prototypes: {
                        include: {
                            prototypesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                        },
                    },
                    projectsMedia: {
                        include: {
                            projectMediaCategory: true,
                        },
                    },
                    projectStatus: true,
                }
            });
            if (!project) throw new ForbiddenException("Project not found");

            return project
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getProjectsByCompany(userId: string, companyId: string, cursor?: string, sets?: number) {
        try {
            let queryOptions: {
                where: {
                    developerCompanyId: string,
                },
                include: {
                    user: true,
                    developerCompany: true,
                    city: true,
                    properties: true,
                    prototypes: true,
                    projectsMedia: {
                        include: {
                            projectMediaCategory: true,
                        },
                    },
                    projectStatus: true,
                }
                orderBy: {
                    createdAt: "desc"
                },
                skip?: 1,
                cursor?: {
                    id: string
                },
                take?: number
            } = {
                where: {
                    developerCompanyId: companyId,
                },
                include: {
                    user: true,
                    developerCompany: true,
                    city: true,
                    properties: true,
                    prototypes: true,
                    projectsMedia: {
                        include: {
                            projectMediaCategory: true,
                        },
                    },
                    projectStatus: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
            };

            const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                where: {
                    userId,
                    developerCompanyId: companyId,
                },
            });
            if (!userDeveloperCompany) throw new UnauthorizedException("Access denied");

            if (cursor) {
                queryOptions.cursor = {
                    id: cursor,
                };

                queryOptions.skip = 1
            };

            const projectsByCompany = await this.prisma.project.findMany(queryOptions);
            if (!projectsByCompany) throw new ForbiddenException("Query error");

            let take;

            if (sets) {
                take = Math.ceil(projectsByCompany.length / sets);
            } else {
                take = projectsByCompany.length;
            };

            const projectsByCompanyLimited = projectsByCompany.slice(0, take);

            if (projectsByCompanyLimited.length === 0) {
                throw new ForbiddenException("Content exhausted");
            };

            if (!cursor && !sets) {
                return {
                    projectsByCompany: projectsByCompanyLimited,
                    cursorId: null
                };
            };

            const lastProjectIndex = projectsByCompanyLimited.length - 1;
            const lastPostInProjectByCompany = projectsByCompanyLimited[lastProjectIndex];
            const myCursor = lastPostInProjectByCompany.id;

            return {
                projectsByCompany: projectsByCompanyLimited,
                cursorId: myCursor
            };
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async updateProject(userId: string, dto: UpdateProject) {
        try {
            // Validate
            const errors: string[] = await validateUpdateProjectDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            const projectExists = await this.prisma.project.findUnique({
                where: {
                    id: dto.projectId,
                },
            });
            if (!projectExists) throw new ForbiddenException("Project not found");

            if (projectExists.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: projectExists.developerCompanyId,
                        isOwner: true,
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access denied");
            } else {
                const userEntity = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!userEntity) throw new UnauthorizedException("Access denied");
                if (userEntity.isDeveloper !== true) throw new ForbiddenException("Access denied: user is not a developer");
                if (projectExists.userId !== userId) throw new ForbiddenException("Access denied");
            };

            //is CityId valid
            if (dto.cityId) {
                const cityExists = await this.prisma.city.findUnique({
                    where: {
                        id: dto.cityId,
                    },
                });
                if (!cityExists) throw new ForbiddenException("City not found");
            };

            //is neighbourhoodId valid
            if (dto.neighborhoodId) {
                const neighborhoodExixsts = await this.prisma.neighborhood.findUnique({
                    where: {
                        id: dto.neighborhoodId,
                    },
                });
                if (!neighborhoodExixsts) throw new ForbiddenException("Neighborhood not found");
            };

            //is project status Id valid
            if (dto.projectStatusId) {
                const projectStatusExists = await this.prisma.projectStatus.findUnique({
                    where: {
                        id: dto.projectStatusId,
                    },
                });
                if (!projectStatusExists) throw new ForbiddenException("Invalid Project status");
            };

            const updatedProject = await this.prisma.project.update({
                where: {
                    id: dto.projectId,
                },
                data: {
                    projectName: dto.projectName,
                    description: dto.description,
                    address: dto.address,
                    projectLayoutUrl: dto.projectLayoutUrl,
                    cityId: dto.cityId,
                    neighborhoodId: dto.neighborhoodId,
                    projectStatusId: dto.projectStatusId,
                },
            });

            return updatedProject;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteProject(userId: string, projectId: string) {
        try {
            const projectExists = await this.prisma.project.findUnique({
                where: {
                    id: projectId,
                },
            });
            if (!projectExists) throw new ForbiddenException("Project not found");

            if (projectExists.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: projectExists.developerCompanyId,
                        isOwner: true,
                    },
                    select: {
                        user: true,
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access denied");
            } else {
                const userEntity = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!userEntity) throw new UnauthorizedException("Access denied");
                if (userEntity.isDeveloper !== true) throw new ForbiddenException("Access denied: user is not a developer");
                if (projectExists.userId !== userId) throw new ForbiddenException("Access denied");
            };

            await this.prisma.project.delete({
                where: {
                    id: projectId,
                },
            });

            await this.typesense.deleteProjectFromTypesense(projectId);

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllProjects() {
        try {
            await this.prisma.project.deleteMany();
            await this.typesense.deleteAllProjectsFromTypesense();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async createPrototype(userId: string, dto: CreatePrototype) {
        try {
            // Validate
            const errors: string[] = await validateCreatePrototypeDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //prototype media validation
            const prototypeMediaErrors: string[] = await validatePrototypeMediaArray(dto.prototypeMedia);
            if (prototypeMediaErrors.length > 0) {
                const errorMessage = `Validation error: ${prototypeMediaErrors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const projectExists = await this.prisma.project.findUnique({
                where: {
                    id: dto.projectId,
                },
            });
            if (!projectExists) throw new ForbiddenException("Project not found");

            //if the project belongs to a developer company check if user belongs to that company...else ensure the user creating the prototype created the project.
            if (projectExists.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: projectExists.developerCompanyId,
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access Denied");
            } else {
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!user) throw new UnauthorizedException("Access denied: user not found");

                if (projectExists.userId !== userId) throw new ForbiddenException("Access denied: cannot create prototype for this project");
            };

            const categoryExists = await this.prisma.propertyCategory.findUnique({
                where: {
                    id: dto.categoryId,
                },
            });
            if (!categoryExists) throw new ForbiddenException("Category not found");

            const createPrototype = await this.prisma.$transaction(async (prisma) => {
                const newPrototype = await prisma.prototype.create({
                    data: {
                        prototypeName: dto.prototypeName,
                        categoryId: dto.categoryId,
                        projectId: dto.projectId,
                        description: dto.description,
                        // mediaUrl: dto.mediaUrl,
                    },
                });

                if (dto.prototypeMedia.length > 0) {
                    const propertyMediaCategories = await prisma.propertyMediaCategory.findMany();

                    const requiredMediaCategories = propertyMediaCategories.filter((category) => category.required === true).map((mediaCategory) => {
                        return {
                            id: mediaCategory.id,
                            mediaCategory: mediaCategory.mediaCategory
                        };
                    });

                    const bannerMediaCategory = requiredMediaCategories.find((category) => category.mediaCategory === PropertyMediaCategory.Banner);

                    const prototypeMediaData = dto.prototypeMedia.map((media) => {
                        const mediaCategoryExists = propertyMediaCategories.find((category) => category.id === media.propertyMediaCategoryId);
                        if (!mediaCategoryExists) throw new ForbiddenException("Invalid media category");

                        return {
                            prototypeId: newPrototype.id,
                            index: media.index,
                            mediaUrl: media.mediaUrl,
                            propertyMediaCategoryId: media.propertyMediaCategoryId,
                            description: media.description,
                        };
                    });

                    const handledMediaCategoryIds = prototypeMediaData.map((data) => data.propertyMediaCategoryId);

                    //check for multiple banner entries
                    const bannerEntries = handledMediaCategoryIds.filter((id) => id === bannerMediaCategory.id);
                    if (bannerEntries.length > 1) throw new ForbiddenException("Multiple Banner entries: Only one banner entry is required");

                    //check if all required categories are present
                    for (const requiredCategory of requiredMediaCategories) {

                        //there can be multiple entries of the required category but this ensures that at least one entry is present instead of using filter
                        const requiredCategoryPresent = handledMediaCategoryIds.find((data) => data === requiredCategory.id);
                        if (!requiredCategoryPresent) throw new ForbiddenException(`Required: ${requiredCategory.mediaCategory} Url not found`);
                    };

                    await prisma.prototypeMedia.createMany({
                        data: prototypeMediaData,
                    });
                };

                return newPrototype;
            })

            return createPrototype
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPrototypes() {
        try {
            return await this.prisma.prototype.findMany({
                include: {
                    properties: true,
                    project: true,
                    prototypesMedia: {
                        include: {
                            propertyMediaCategory: true,
                        },
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPrototypesByProject(projectId: string) {
        try {
            const projectExists = await this.prisma.project.findUnique({
                where: {
                    id: projectId,
                },
                select: {
                    prototypes: {
                        include: {
                            properties: true,
                            project: true,
                            prototypesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!projectExists) throw new ForbiddenException("Project not found");

            const projectPrototypes = projectExists.prototypes;

            return projectPrototypes;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPrototypeById(prototypeId: string) {
        try {
            const prototypeExists = await this.prisma.prototype.findUnique({
                where: {
                    id: prototypeId,
                },
                include: {
                    properties: true,
                    project: true,
                    prototypesMedia: {
                        include: {
                            propertyMediaCategory: true,
                        },
                    },
                },
            });
            if (!prototypeExists) throw new ForbiddenException("Prototype not found");

            return prototypeExists;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async updatePrototype(userId: string, dto: UpdatePrototype) {
        try {
            // Validate
            const errors: string[] = await validateUpdatePrototypeDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const prototypeExists = await this.prisma.prototype.findUnique({
                where: {
                    id: dto.prototypeId,
                },
                select: {
                    id: true,
                    project: true,
                },
            });
            if (!prototypeExists) throw new ForbiddenException("Prototype not found");

            //if the project belongs to a developer company check if user belongs to that company...else ensure the user creating the prototype created the project.
            if (prototypeExists.project.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: prototypeExists.project.developerCompanyId,
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access Denied");
            } else {
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!user) throw new UnauthorizedException("Access denied: user not found");

                if (prototypeExists.project.userId !== userId) throw new ForbiddenException("Access denied: cannot create prototype for this project");
            };

            if (dto.categoryId) {
                const categoryExists = await this.prisma.propertyCategory.findUnique({
                    where: {
                        id: dto.categoryId,
                    },
                });
                if (!categoryExists) throw new ForbiddenException("Category not found");
            };

            const updatedPrototype = await this.prisma.prototype.update({
                where: {
                    id: prototypeExists.id,
                },
                data: {
                    prototypeName: dto.prototypeName,
                    categoryId: dto.categoryId,
                    description: dto.description,
                    mediaUrl: dto.mediaUrl,
                },
            });

            return updatedPrototype;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deletePrototype(userId: string, prototypeId: string) {
        try {
            //authorization
            const prototypeExists = await this.prisma.prototype.findUnique({
                where: {
                    id: prototypeId,
                },
                select: {
                    id: true,
                    project: true,
                },
            });
            if (!prototypeExists) throw new ForbiddenException("Prototype not found");

            //if the project belongs to a developer company check if user belongs to that company...else ensure the user creating the prototype created the project.
            if (prototypeExists.project.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: prototypeExists.project.developerCompanyId,
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access Denied");
            } else {
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!user) throw new UnauthorizedException("Access denied: user not found");

                if (prototypeExists.project.userId !== userId) throw new ForbiddenException("Access denied: cannot create prototype for this project");
            };

            await this.prisma.prototype.delete({
                where: {
                    id: prototypeId,
                },
            });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllPrototypes() {
        try {
            await this.prisma.prototype.deleteMany();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async createProperty(userId: string, dto: CreateProperty) {
        try {
            //validation
            const errors: string[] = await validateCreatePropertyDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //property detail validation
            const propertyDetailErrors: string[] = await validateCreatePropertyDetailDTO(dto.propertyDetail);
            if (propertyDetailErrors.length > 0) {
                const errorMessage = `Validation error: ${propertyDetailErrors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //property media validation
            const propertyMediaErrors: string[] = await validatePropertyMediaArray(dto.propertyMedia);
            if (propertyMediaErrors.length > 0) {
                const errorMessage = `Validation error: ${propertyMediaErrors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            let newPropertyData: {
                name: string,
                description: string,
                price: number,
                categoryId: string,
                propertyStatusId: number,
                projectId?: string,
                prototypeId?: string,
                cityId: string,
                developedById: string,
                developerCompanyId?: string
            } = {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                categoryId: "",
                propertyStatusId: 0,
                cityId: "",
                developedById: ""
            };

            // authorization
            if (dto.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: dto.developerCompanyId,
                        // isOwner: true,
                    },
                    select: {
                        user: true,
                        developerCompany: true
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access denied");

                newPropertyData.developerCompanyId = dto.developerCompanyId;
                newPropertyData.developedById = userDeveloperCompany.developerCompany.ownedById;
            } else {
                const userEntity = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!userEntity) throw new UnauthorizedException("Access denied");
                if (userEntity.isDeveloper !== true) throw new ForbiddenException("Access denied: user is not a developer");
                if (userEntity.hasCompany === true) throw new ForbiddenException("developer company ID not found in request");

                newPropertyData.developedById = userId;
            };

            //check validity of IDs
            const categoryExists = await this.prisma.propertyCategory.findUnique({
                where: {
                    id: dto.categoryId,
                },
            });
            if (!categoryExists) throw new ForbiddenException("Category not found");

            newPropertyData.categoryId = dto.categoryId;

            const propertyStatusExists = await this.prisma.propertyStatus.findUnique({
                where: {
                    id: dto.propertyStatusId,
                },
            });
            if (!propertyStatusExists) throw new ForbiddenException("Property status not found");

            newPropertyData.propertyStatusId = dto.propertyStatusId;

            const cityExists = await this.prisma.city.findUnique({
                where: {
                    id: dto.cityId,
                },
            });
            if (!cityExists) throw new ForbiddenException("City not found");

            newPropertyData.cityId = dto.cityId;

            if (dto.projectId) {

                let projectQuery: {
                    id: string,
                    developerCompanyId?: string,
                    userId?: string
                } = {
                    id: dto.projectId,
                };

                //to ensure the user has authorization to the project
                if (dto.developerCompanyId) {
                    projectQuery.developerCompanyId = dto.developerCompanyId;
                } else {
                    projectQuery.userId = userId;
                };

                const projectExists = await this.prisma.project.findFirst({
                    where: projectQuery,
                });
                if (!projectExists) throw new ForbiddenException("Project not found for user");

                newPropertyData.projectId = dto.projectId;

                if (dto.prototypeId) {
                    const prototypeExists = await this.prisma.prototype.findFirst({
                        where: {
                            id: dto.prototypeId,
                            projectId: projectExists.id,
                        },
                    });
                    if (!prototypeExists) throw new ForbiddenException("Invalid prototype");

                    newPropertyData.prototypeId = dto.prototypeId;
                };
            } else if (dto.prototypeId && !dto.projectId) throw new ForbiddenException("Project ID not found");

            // Check for empty strings and handle them appropriately
            Object.entries(newPropertyData).forEach(([key, value]) => {
                if (typeof value === 'string' && value.trim() === '') {
                    throw new Error(`Empty value found for key: ${key}`);
                }
            });

            const today = new Date(Date.now());

            const propertyCreated = await this.prisma.$transaction(async (prisma) => {

                const newProperty = await prisma.property.create({
                    data: newPropertyData,
                });

                const propertyOptionExists = await prisma.propertyOption.findUnique({
                    where: {
                        id: dto.propertyDetail.propertyOptionId,
                    },
                });
                if (!propertyOptionExists) throw new ForbiddenException("Property Option not found");

                if (dto.propertyDetail.neighborhoodId) {
                    const neighborhoodExists = await prisma.neighborhood.findUnique({
                        where: {
                            id: dto.propertyDetail.neighborhoodId,
                        },
                    });
                    if (!neighborhoodExists) throw new ForbiddenException("Neighborhood not found");
                };

                const propertyDetail = await prisma.propertyDetail.create({
                    data: {
                        id: newProperty.id,
                        address: dto.propertyDetail.address,
                        longitude: dto.propertyDetail.longitude,
                        latitude: dto.propertyDetail.latitude,
                        bedrooms: dto.propertyDetail.bedrooms,
                        bathrooms: dto.propertyDetail.bathrooms,
                        toilets: dto.propertyDetail.toilets,
                        floors: dto.propertyDetail.floors,
                        sizeSqft: dto.propertyDetail.sizeSqft,
                        dateCompleted: dto.propertyDetail.dateCompleted,
                        parkingSpaces: dto.propertyDetail.parkingSpaces,
                        propertyOptionId: dto.propertyDetail.propertyOptionId,
                        neighborhoodId: dto.propertyDetail.neighborhoodId,
                        isFurnished: dto.propertyDetail.isFurnished,
                        hasPool: dto.propertyDetail.hasPool,
                        hasGarden: dto.propertyDetail.hasGarden,
                        isNewConstruction: dto.propertyDetail.isNewConstruction,
                        canPayInstallment: dto.propertyDetail.canPayInstallment,
                        canMortgage: dto.propertyDetail.canMortgage
                    },
                    include: {
                        property: {
                            include: {
                                city: true,
                            },
                        },
                    },
                });

                if (dto.propertyMedia.length > 0) {
                    const propertyMediaCategories = await prisma.propertyMediaCategory.findMany();

                    const requiredMediaCategories = propertyMediaCategories.filter((category) => category.required === true).map((mediaCategory) => {
                        return {
                            id: mediaCategory.id,
                            mediaCategory: mediaCategory.mediaCategory
                        };
                    });

                    const bannerMediaCategory = requiredMediaCategories.find((category) => category.mediaCategory === PropertyMediaCategory.Banner);

                    const propertyMediaData = dto.propertyMedia.map((media) => {
                        const mediaCategoryExists = propertyMediaCategories.find((category) => category.id === media.mediaCategoryId);
                        if (!mediaCategoryExists) throw new ForbiddenException("Invalid media category");

                        return {
                            propertyId: newProperty.id,
                            index: media.index,
                            mediaUrl: media.mediaUrl,
                            propertyMediaCategoryId: media.mediaCategoryId,
                            description: media.description,
                        };
                    });

                    const handledMediaCategoryIds = propertyMediaData.map((data) => data.propertyMediaCategoryId);

                    //check for multiple banner entries
                    const bannerEntries = handledMediaCategoryIds.filter((id) => id === bannerMediaCategory.id);
                    if (bannerEntries.length > 1) throw new ForbiddenException("Multiple Banner entries: Only one banner entry is required");

                    //check if all required categories are present
                    for (const requiredCategory of requiredMediaCategories) {

                        //there can be multiple entries of the required category but this ensures that at least one entry is present instead of using filter
                        const requiredCategoryPresent = handledMediaCategoryIds.find((data) => data === requiredCategory.id);
                        if (!requiredCategoryPresent) throw new ForbiddenException(`Required: ${requiredCategory.mediaCategory} Url not found`);
                    };

                    await prisma.propertyMedia.createMany({
                        data: propertyMediaData,
                    });
                };

                await prisma.propertyCostHistory.create({
                    data: {
                        propertyId: newProperty.id,
                        price: newProperty.price,
                        effectiveDate: today,
                    },
                });

                return propertyDetail;
            });

            await this.typesense.syncPropertyToTypesense({
                id: propertyCreated.property.id,
                name: propertyCreated.property.name,
                description: propertyCreated.property.description,
                developerCompanyId: propertyCreated.property.developerCompanyId,
                city: propertyCreated.property.city.cityName,
                address: propertyCreated.address,
                developedById: propertyCreated.property.developedById,
                createdAt: propertyCreated.property.createdAt
            });

            return propertyCreated.property;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getProperties() {
        try {
            return await this.prisma.property.findMany({
                include: {
                    city: true,
                    propertyStatus: true,
                    propertyDetail: {
                        include: {
                            propertyOption: true,
                        },
                    },
                    propertiesMedia: {
                        include: {
                            propertyMediaCategory: true
                        }
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPropertiesByProject(projectId: string) {
        try {
            const projectExists = await this.prisma.project.findUnique({
                where: {
                    id: projectId,
                },
                select: {
                    properties: {
                        include: {
                            city: true,
                            propertyStatus: true,
                            propertyDetail: true,
                            propertiesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!projectExists) throw new ForbiddenException("Project not found");

            const projectProperties = projectExists.properties;

            return projectProperties;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPropertiesByCompany(companyId: string) {
        try {
            const companyExists = await this.prisma.developerCompany.findUnique({
                where: {
                    id: companyId,
                },
                select: {
                    properties: {
                        include: {
                            city: true,
                            propertyStatus: true,
                            propertyDetail: true,
                            propertiesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!companyExists) throw new ForbiddenException("Company not found");

            const companyProperties = companyExists.properties;

            return companyProperties;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPropertyByDeveloper(developerId: string) {
        try {
            const developerExists = await this.prisma.user.findFirst({
                where: {
                    id: developerId,
                    isDeveloper: true,
                },
                select: {
                    properties: {
                        include: {
                            city: true,
                            propertyStatus: true,
                            propertyDetail: true,
                            propertiesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!developerExists) throw new ForbiddenException("Developer not found");

            const developerProperties = developerExists.properties;

            return developerProperties;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async getPropertyById(propertyId: string) {
        try {
            const propertyExists = await this.prisma.property.findUnique({
                where: {
                    id: propertyId,
                },
                include: {
                    city: {
                        include: {
                            state: true,
                        },
                    },
                    propertyStatus: true,
                    propertyDetail: true,
                    propertiesMedia: {
                        include: {
                            propertyMediaCategory: true,
                        },
                    },
                },
            });
            if (!propertyExists) throw new ForbiddenException("Property not found");

            return propertyExists;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async updateProperty(userId: string, dto: UpdateProperty) {
        try {

        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteProperty(userId: string, propertyId: string) {
        try {
            const propertyExists = await this.prisma.property.findUnique({
                where: {
                    id: propertyId,
                },
            });
            if (!propertyExists) throw new ForbiddenException("Property not found");

            // authorization
            if (propertyExists.developerCompanyId) {
                const userDeveloperCompany = await this.prisma.userDeveloperCompany.findFirst({
                    where: {
                        userId,
                        developerCompanyId: propertyExists.developerCompanyId,
                        // isOwner: true,
                    },
                    select: {
                        user: true,
                        developerCompany: true
                    },
                });
                if (!userDeveloperCompany) throw new UnauthorizedException("Access denied");
            } else {
                const userEntity = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });
                if (!userEntity) throw new UnauthorizedException("Access denied");
                if (userEntity.isDeveloper !== true) throw new ForbiddenException("Access denied: user is not a developer");
                if (propertyExists.developedById !== userId) throw new ForbiddenException("Access denied");
            };

            await this.prisma.property.delete({
                where: {
                    id: propertyId,
                },
            });

            await this.typesense.deletePropertyFromTypesense(propertyId);

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllPropertyCategories() {
        try {
            await this.prisma.propertyCategory.deleteMany();
            await this.typesense.deleteAllPropertyCategoriesFromTypesense();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async deleteAllProperties() {
        try {
            await this.prisma.property.deleteMany();
            await this.typesense.deleteAllPropertiesFromTypesense();
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    async createPurchaseRequest(userId: string, dto: CreatePropertyPurchaseRequest) {
        try {
            // Validate
            const errors: string[] = await validateCreatePropertyPurchaseRequestDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const validRequestTypes: number[] = [PurchaseRequestTypeEnum.FullPayment, PurchaseRequestTypeEnum.MortgagePayment, PurchaseRequestTypeEnum.Rent];
            if (!validRequestTypes.includes(dto.purchaseRequestTypeId)) throw new ForbiddenException("Invalid property request type");

            const purchaseRequestData: {
                propertyId: string,
                requestDate: Date,
                purchaseRequestTypeId: number,
                purchaseRequestStatusId: number,
                durationTypeId?: number,
                purchaseDuration?: number
                userId: string
            } = {
                propertyId: dto.propertyId,
                requestDate: dto.requestDate,
                purchaseRequestStatusId: PurchaseRequestStatusEnum.Pending,
                purchaseRequestTypeId: dto.purchaseRequestTypeId,
                userId,
            };

            if (dto.purchaseRequestTypeId === PurchaseRequestTypeEnum.Rent || dto.purchaseRequestTypeId === PurchaseRequestTypeEnum.MortgagePayment) {
                if (!dto.durationTypeId || !dto.purchaseDuration) throw new ForbiddenException("Missing fields");

                purchaseRequestData.durationTypeId = dto.durationTypeId;
                purchaseRequestData.purchaseDuration = dto.purchaseDuration;
            };

            const newPurchaseRequest = await this.prisma.propertyPurchaseRequest.create({
                data: purchaseRequestData,
            });

            return newPurchaseRequest;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async getPurchaseRequests() {
        try {
            return await this.prisma.propertyPurchaseRequest.findMany({
                include: {
                    property: true,
                    durationType: true,
                    purchaseRequestStatus: true,
                    purchaseRequestType: true,
                    paymentTransactions: true,
                }
            });
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async getPurchaseRequestsByUser(userId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
                select: {
                    propertyPurchaseRequests: {
                        include: {
                            property: {
                                include: {
                                    propertyDetail: true,
                                    propertiesMedia: {
                                        include: {
                                            propertyMediaCategory: true,
                                        },
                                    },
                                },
                            },
                            durationType: true,
                            purchaseRequestStatus: true,
                            purchaseRequestType: true,
                            paymentTransactions: true,
                        },
                    },
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            return user.propertyPurchaseRequests;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async adminGetPurchaseRequests(adminId: string) {
        try {
            //authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Access denied");

            return await this.prisma.propertyPurchaseRequest.findMany({
                include: {
                    property: {
                        include: {
                            propertyDetail: true,
                            propertiesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                        },
                    },
                    durationType: true,
                    purchaseRequestStatus: true,
                    purchaseRequestType: true,
                    paymentTransactions: true,
                },
            });
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async getPurchaseRequestById(purchaseRequestId: string) {
        try {
            const purchaseRequest = await this.prisma.propertyPurchaseRequest.findUnique({
                where: {
                    id: purchaseRequestId,
                },
                include: {
                    property: {
                        include: {
                            propertyDetail: true,
                            propertiesMedia: {
                                include: {
                                    propertyMediaCategory: true,
                                },
                            },
                        },
                    },
                    durationType: true,
                    purchaseRequestStatus: true,
                    purchaseRequestType: true,
                    paymentTransactions: true,
                },
            });
            if (!purchaseRequest) throw new ForbiddenException("Property purchase request not found");

            return purchaseRequest;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async updatePurchaseRequest(userId: string, dto: UpdatePropertyPurchaseRequest) {
        try {
            // Validate
            const errors: string[] = await validateUpdatePropertyPurchaseRequestDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const purchaseRequest = await this.prisma.propertyPurchaseRequest.findUnique({
                where: {
                    id: dto.purchaseRequestId,
                },
            });
            if (!purchaseRequest) throw new ForbiddenException("Property purchase request not found");
            if (purchaseRequest.userId !== userId) throw new ForbiddenException("Access denied");
            if (purchaseRequest.purchaseRequestStatusId !== PurchaseRequestStatusEnum.Pending) throw new ForbiddenException("Cannot update purchase request")

            const purchaseRequestData: {
                requestDate?: Date,
                purchaseRequestTypeId?: number,
                durationTypeId?: number,
                purchaseDuration?: number
            } = {
                requestDate: dto.requestDate,
            };

            if (dto.purchaseRequestTypeId) {
                const validRequestTypes: number[] = [PurchaseRequestTypeEnum.FullPayment, PurchaseRequestTypeEnum.MortgagePayment, PurchaseRequestTypeEnum.Rent];
                if (!validRequestTypes.includes(dto.purchaseRequestTypeId)) throw new ForbiddenException("Invalid property request type");

                if (dto.purchaseRequestTypeId === PurchaseRequestTypeEnum.Rent || dto.purchaseRequestTypeId === PurchaseRequestTypeEnum.MortgagePayment) {
                    purchaseRequestData.purchaseRequestTypeId = dto.purchaseRequestTypeId;
                    purchaseRequestData.durationTypeId = dto.durationTypeId;
                    purchaseRequestData.purchaseDuration = dto.purchaseDuration;
                } else {
                    purchaseRequestData.purchaseRequestTypeId = dto.purchaseRequestTypeId;
                    purchaseRequestData.durationTypeId = null;
                    purchaseRequestData.purchaseDuration = null;
                };
            };

            const updatedPurchaseRequest = await this.prisma.propertyPurchaseRequest.update({
                where: {
                    id: dto.purchaseRequestId,
                },
                data: purchaseRequestData
            });

            return updatedPurchaseRequest;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async approvePurchaseRequest(adminId: string, dto: ApprovePurchaseRequest) {
        try {
            // Validate
            const errors: string[] = await validateApprovePurchaseRequestDTO(dto);
            if (errors.length > 0) {
                const errorMessage = `Validation error: ${errors.join(', ')}`;
                throw new ForbiddenException(errorMessage);
            };

            //authorization
            const admin = await this.prisma.admin.findUnique({
                where: {
                    id: adminId,
                },
            });
            if (!admin) throw new UnauthorizedException("Access denied");

            const purchaseRequest = await this.prisma.propertyPurchaseRequest.findUnique({
                where: {
                    id: dto.purchaseRequestId,
                },
            });
            if (!purchaseRequest) throw new ForbiddenException("Property purchase request not found");
            if (purchaseRequest.purchaseRequestStatusId !== PurchaseRequestStatusEnum.Pending) throw new ForbiddenException("Purchase request already approved")

            const validRequestStatus: number[] = [PurchaseRequestStatusEnum.Approved, PurchaseRequestStatusEnum.Rejected];
            if (!validRequestStatus.includes(dto.purchaseRequestStatusId)) throw new ForbiddenException("Invalid status");

            await this.prisma.propertyPurchaseRequest.update({
                where: {
                    id: dto.purchaseRequestId,
                },
                data: {
                    purchaseRequestStatusId: dto.purchaseRequestStatusId,
                },
            });

            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async deletePurchaseRequest(userId: string, purchaseRequestId: string) {
        try {
            //authorization
            const user = await this.prisma.user.findFirst({
                where: {
                    id: userId,
                    isDeveloper: false,
                    hasCompany: false,
                },
            });
            if (!user) throw new UnauthorizedException("Access denied");

            const purchaseRequest = await this.prisma.propertyPurchaseRequest.findUnique({
                where: {
                    id: purchaseRequestId,
                },
            });
            if (!purchaseRequest) throw new ForbiddenException("Property purchase request not found");
            if (purchaseRequest.userId !== userId) throw new ForbiddenException("Access denied");

            await this.prisma.propertyPurchaseRequest.delete({
                where: {
                    id: purchaseRequestId,
                },
            });

            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };

    async deleteAllPurchaseRequest() {
        try {
            await this.prisma.propertyPurchaseRequest.deleteMany();
            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        };
    };
}
