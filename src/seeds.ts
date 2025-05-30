import { PrismaClient } from "@prisma/client";
import { CompanyType } from "./common/enums/companyType.enum";
import { InspectionStatus, InspectionType } from "./common/enums/inspection.enum";
import { InvestmentFrequency, InvestmentState, PaymentStatus } from "./common/enums/investment.enum";
import { CITY_DATA, Country, STATE_DATA } from "./common/enums/location.enum";
import { MortgagePaymentFrequency, MortgageStatus } from "./common/enums/mortage.enum";
import { PrequalificationStatus } from "./common/enums/prequalification.enum";
import { DurationType, ProjectMediaCategory, ProjectStatus, PROJECT_MEDIA_CATEGORY, PropertyCategory, PropertyOption, PropertyStatus, PROPERTY_MEDIA_CATEGORY, PurchaseRequestStatus, PurchaseRequestType, RequestUpdateStatus } from "./common/enums/property.enum";
import { Role } from "./common/enums/role.enum";
import { ImportTypesensePropertyCategory } from "./typesense/importTypes/propertyCategory.import";


const prisma = new PrismaClient();

async function seed() {
    //ROLES
    const roleValues = Object.values(Role).map((role) => role.toString());

    const existingRoles = await prisma.role.findMany({
        select: {
            roleName: true,
        },
    });

    const existingRolesSet = new Set(existingRoles.map((role) => role.roleName));

    const rolesToDelete: string[] = [];

    //delete roles that are not in enum
    for (const role of existingRolesSet) {
        if (!roleValues.includes(role)) {
            rolesToDelete.push(role);
        };
    };

    if (rolesToDelete.length > 0) {
        await prisma.role.deleteMany({
            where: {
                roleName: {
                    in: rolesToDelete,
                },
            },
        });
    };

    //create roles in enum that don't exist in database
    const rolesData = roleValues.map((role) => {
        if (!existingRolesSet.has(role)) {
            return {
                roleName: role
            };
        };
    });

    if (rolesData.length > 0) {
        await prisma.role.createMany({
            data: rolesData,
        });
    };


    //CompanyTypes
    const companyTypeValues = Object.values(CompanyType).map((type) => type.toString());

    const existingCompanyTypes = await prisma.companyType.findMany({
        select: {
            type: true,
        },
    });

    const existingCompanyTypeSet = new Set(existingCompanyTypes.map((companyType) => companyType.type));

    const companyTypesToDelete: string[] = [];

    for (const type of existingCompanyTypeSet) {
        if (!companyTypeValues.includes(type)) {
            companyTypesToDelete.push(type);
        };
    };

    if (companyTypesToDelete.length > 0) {
        await prisma.companyType.deleteMany({
            where: {
                type: {
                    in: companyTypesToDelete,
                },
            },
        });
    };

    const companyTypesToCreate: {
        id: number,
        type: string
    }[] = [];

    let companyTypeIndex = 0;

    for (const type of companyTypeValues) {
        companyTypeIndex++;

        if (existingCompanyTypeSet.has(type)) {
            continue;
        } else if (!existingCompanyTypeSet.has(type)) {
            companyTypesToCreate.push({
                id: companyTypeIndex,
                type: type,
            });
        };
    };

    if (companyTypesToCreate.length > 0) {
        await prisma.companyType.createMany({
            data: companyTypesToCreate,
        });
    };

    //Property status
    const propertyStatusValues = Object.values(PropertyStatus).map((status) => status.toString());

    const existingPropertyStatuses = await prisma.propertyStatus.findMany({
        select: {
            propertyStatus: true,
        },
    });

    const existingPropertyStatusSet = new Set(existingPropertyStatuses.map((propertyStatusEntity) => propertyStatusEntity.propertyStatus));

    const propertyStatusesToDelete: string[] = [];

    for (const status of existingPropertyStatusSet) {
        if (!propertyStatusValues.includes(status)) {
            propertyStatusesToDelete.push(status);
        };
    };

    if (propertyStatusesToDelete.length > 0) {
        await prisma.propertyStatus.deleteMany({
            where: {
                propertyStatus: {
                    in: propertyStatusesToDelete,
                },
            },
        });
    };

    const propertyStatusesToCreate: {
        id: number,
        propertyStatus: string
    }[] = [];

    let propertystatusIndex = 0;

    for (const status of propertyStatusValues) {
        propertystatusIndex++;

        if (existingPropertyStatusSet.has(status)) {
            continue;
        } else if (!existingPropertyStatusSet.has(status)) {
            propertyStatusesToCreate.push({
                id: propertystatusIndex,
                propertyStatus: status,
            });
        };
    };

    if (propertyStatusesToCreate.length > 0) {
        await prisma.propertyStatus.createMany({
            data: propertyStatusesToCreate,
        });
    };

    //Property Option
    const propertyOptionValues = Object.values(PropertyOption).map((option) => option.toString());

    const existingPropertyOptions = await prisma.propertyOption.findMany({
        select: {
            propertyOption: true,
        },
    });

    const existingPropertyOptionSet = new Set(existingPropertyOptions.map((propertyOptionEntity) => propertyOptionEntity.propertyOption));

    const propertyOptionsToDelete: string[] = [];

    for (const option of existingPropertyOptionSet) {
        if (!propertyOptionValues.includes(option)) {
            propertyOptionsToDelete.push(option);
        };
    };

    if (propertyOptionsToDelete.length > 0) {
        await prisma.propertyOption.deleteMany({
            where: {
                propertyOption: {
                    in: propertyOptionsToDelete,
                },
            },
        });
    };

    const propertyOptionsToCreate: {
        id: number,
        propertyOption: string
    }[] = [];

    let optionIndex = 0;

    for (const option of propertyOptionValues) {
        optionIndex++;

        if (existingPropertyOptionSet.has(option)) {
            continue;
        } else if (!existingPropertyOptionSet.has(option)) {
            propertyOptionsToCreate.push({
                id: optionIndex,
                propertyOption: option,
            });
        };
    };

    if (propertyOptionsToCreate.length > 0) {
        await prisma.propertyOption.createMany({
            data: propertyOptionsToCreate,
        });
    };

    //Project status
    const projectStatusValues = Object.values(ProjectStatus).map((status) => status.toString());

    const existingProjectStatuses = await prisma.projectStatus.findMany({
        select: {
            projectStatus: true,
        },
    });

    const existingProjectStatusSet = new Set(existingProjectStatuses.map((projectStatus) => projectStatus.projectStatus));

    const projectStatusesToDelete: string[] = [];

    for (const status of existingProjectStatusSet) {
        if (!projectStatusValues.includes(status)) {
            projectStatusesToDelete.push(status);
        };
    };

    if (projectStatusesToDelete.length > 0) {
        await prisma.projectStatus.deleteMany({
            where: {
                projectStatus: {
                    in: projectStatusesToDelete,
                },
            },
        });
    };

    const projectStatusesToCreate: {
        id: number,
        projectStatus: string
    }[] = [];

    let projectStatusIndex = 0;

    for (const status of projectStatusValues) {
        projectStatusIndex++;

        if (existingProjectStatusSet.has(status)) {
            continue;
        } else if (!existingProjectStatusSet.has(status)) {
            projectStatusesToCreate.push({
                id: projectStatusIndex,
                projectStatus: status,
            });
        };
    };

    if (projectStatusesToCreate.length > 0) {
        await prisma.projectStatus.createMany({
            data: projectStatusesToCreate,
        });
    };

    //Request Update Status
    const requestUpdateStatusValues = Object.values(RequestUpdateStatus).map((status) => status.toString());

    const existingRequestUpdateStatuses = await prisma.requestUpdateStatus.findMany({
        select: {
            requestUpdateStatus: true,
        },
    });

    const existingRequestUpdateStatusSet = new Set(existingRequestUpdateStatuses.map((requestUpdateStatus) => requestUpdateStatus.requestUpdateStatus));

    const requestUpdateStatusesToDelete: string[] = [];

    for (const status of existingRequestUpdateStatusSet) {
        if (!requestUpdateStatusValues.includes(status)) {
            requestUpdateStatusesToDelete.push(status);
        };
    };

    if (requestUpdateStatusesToDelete.length > 0) {
        await prisma.requestUpdateStatus.deleteMany({
            where: {
                requestUpdateStatus: {
                    in: requestUpdateStatusesToDelete,
                },
            },
        });
    };

    const requestUpdateStatusesToCreate: {
        id: number,
        requestUpdateStatus: string
    }[] = [];

    let requestUpdateStatusIndex = 0;

    for (const status of requestUpdateStatusValues) {
        requestUpdateStatusIndex++;

        if (existingRequestUpdateStatusSet.has(status)) {
            continue;
        } else if (!existingRequestUpdateStatusSet.has(status)) {
            requestUpdateStatusesToCreate.push({
                id: requestUpdateStatusIndex,
                requestUpdateStatus: status,
            });
        };
    };

    if (requestUpdateStatusesToCreate.length > 0) {
        await prisma.requestUpdateStatus.createMany({
            data: requestUpdateStatusesToCreate,
        });
    };

    //Purchase request Type
    const purchaseRequestTypeValues = Object.values(PurchaseRequestType).map((type) => type.toString());

    const existingPurchaseRequestTypes = await prisma.purchaseRequestType.findMany({
        select: {
            purchaseRequestType: true,
        },
    });

    const existingPurchaseRequestTypeSet = new Set(existingPurchaseRequestTypes.map((purchaseRequestType) => purchaseRequestType.purchaseRequestType));

    const purchaseRequestTypesToDelete: string[] = [];

    for (const type of existingPurchaseRequestTypeSet) {
        if (!purchaseRequestTypeValues.includes(type)) {
            purchaseRequestTypesToDelete.push(type);
        };
    };

    if (purchaseRequestTypesToDelete.length > 0) {
        await prisma.purchaseRequestType.deleteMany({
            where: {
                purchaseRequestType: {
                    in: purchaseRequestTypesToDelete,
                },
            },
        });
    };

    const purchaseRequestTypesToCreate: {
        id: number,
        purchaseRequestType: string
    }[] = [];

    let purchaseRequestTypeIndex = 0;

    for (const type of purchaseRequestTypeValues) {
        purchaseRequestTypeIndex++;

        if (existingPurchaseRequestTypeSet.has(type)) {
            continue;
        } else if (!existingPurchaseRequestTypeSet.has(type)) {
            purchaseRequestTypesToCreate.push({
                id: purchaseRequestTypeIndex,
                purchaseRequestType: type,
            });
        };
    };

    if (purchaseRequestTypesToCreate.length > 0) {
        await prisma.purchaseRequestType.createMany({
            data: purchaseRequestTypesToCreate,
        });
    };

    //Duration Type
    const durationTypeValues = Object.values(DurationType).map((type) => type.toString());

    const existingDurationTypes = await prisma.durationType.findMany({
        select: {
            durationType: true,
        },
    });

    const existingDurationTypeSet = new Set(existingDurationTypes.map((durationType) => durationType.durationType));

    const durationTypesToDelete: string[] = [];

    for (const type of existingDurationTypeSet) {
        if (!durationTypeValues.includes(type)) {
            durationTypesToDelete.push(type);
        };
    };

    if (durationTypesToDelete.length > 0) {
        await prisma.durationType.deleteMany({
            where: {
                durationType: {
                    in: durationTypesToDelete,
                },
            },
        });
    };

    const durationTypesToCreate: {
        id: number,
        durationType: string
    }[] = [];

    let durationTypeIndex = 0;

    for (const type of durationTypeValues) {
        durationTypeIndex++;

        if (existingDurationTypeSet.has(type)) {
            continue;
        } else if (!existingDurationTypeSet.has(type)) {
            durationTypesToCreate.push({
                id: durationTypeIndex,
                durationType: type,
            });
        };
    };

    if (durationTypesToCreate.length > 0) {
        await prisma.durationType.createMany({
            data: durationTypesToCreate,
        });
    };

    //property category was here

    //Property Media Category
    const propertyMediaCategoryValues = PROPERTY_MEDIA_CATEGORY.map((category) => category.mediaCategory);

    const existingMediaCategories = await prisma.propertyMediaCategory.findMany({
        select: {
            mediaCategory: true,
        },
    });

    const existingMediaCategoriesSet = new Set(existingMediaCategories.map((category) => category.mediaCategory));

    const mediaCategoriesToDelete: string[] = [];

    for (const category of existingMediaCategoriesSet) {
        if (!propertyMediaCategoryValues.includes(category)) {
            mediaCategoriesToDelete.push(category);
        };
    };

    if (mediaCategoriesToDelete.length > 0) {
        await prisma.propertyMediaCategory.deleteMany({
            where: {
                mediaCategory: {
                    in: mediaCategoriesToDelete,
                },
            },
        });
    };

    const mediaCategoryData = propertyMediaCategoryValues.map((category) => {
        if (!existingMediaCategoriesSet.has(category)) {
            const categoryEntity = PROPERTY_MEDIA_CATEGORY.find((value) => value.mediaCategory === category);

            return {
                mediaCategory: categoryEntity.mediaCategory,
                required: categoryEntity.required
            };
        };
    });

    if (mediaCategoryData.length > 0) {
        await prisma.propertyMediaCategory.createMany({
            data: mediaCategoryData,
        });
    };

    //Countries
    const countryValues = Object.values(Country).map((country) => country.toString());

    const existingCountries = await prisma.country.findMany({
        select: {
            countryName: true,
        },
    });

    const existingCountrySet = new Set(existingCountries.map((country) => country.countryName));

    const countriesToDelete: string[] = [];

    for (const country of existingCountrySet) {
        if (!countryValues.includes(country)) {
            countriesToDelete.push(country);
        };
    };

    if (countriesToDelete.length > 0) {
        await prisma.country.deleteMany({
            where: {
                countryName: {
                    in: countriesToDelete,
                },
            },
        });
    };

    const countriesToCreate: {
        countryName: string
    }[] = [];

    for (const country of countryValues) {

        if (existingCountrySet.has(country)) {
            continue;
        } else {
            countriesToCreate.push({
                countryName: country,
            });
        };
    };

    if (countriesToCreate.length > 0) {
        await prisma.country.createMany({
            data: countriesToCreate,
        });
    };

    //states
    const stateValues = STATE_DATA.map((state) => state.stateName);

    const existingStates = await prisma.state.findMany({
        select: {
            stateName: true,
        },
    });

    const countries = await prisma.country.findMany({
        select: {
            id: true,
            countryName: true,
        },
    });

    const existingStatesSet = new Set(existingStates.map((state) => state.stateName));

    const stateNamesToDelete: string[] = [];

    for (const state of existingStatesSet) {
        if (!stateValues.includes(state)) {
            stateNamesToDelete.push(state);
        };
    };

    if (stateNamesToDelete.length > 0) {
        await prisma.state.deleteMany({
            where: {
                stateName: {
                    in: stateNamesToDelete,
                },
            },
        });
    };

    const stateData = stateValues.map((state) => {
        if (!existingStatesSet.has(state)) {
            const stateEntity = STATE_DATA.find((value) => value.stateName === state);
            const country = countries.find((country) => country.countryName === stateEntity.country);

            return {
                stateName: stateEntity.stateName,
                countryId: country.id,
            };
        };
    });

    if (stateData.length > 0) {
        await prisma.state.createMany({
            data: stateData,
        });
    };

    //City
    const cityValues = CITY_DATA.map((city) => city.cityName);

    const existingCities = await prisma.city.findMany({
        select: {
            cityName: true,
        },
    });

    const states = await prisma.state.findMany({
        select: {
            id: true,
            stateName: true,
        },
    });

    const existingCitiesSet = new Set(existingCities.map((city) => city.cityName));

    const cityNamesToDelete: string[] = [];

    for (const city of existingCitiesSet) {
        if (!cityValues.includes(city)) {
            cityNamesToDelete.push(city);
        };
    };

    if (cityNamesToDelete.length > 0) {
        await prisma.city.deleteMany({
            where: {
                cityName: {
                    in: cityNamesToDelete,
                },
            },
        });
    };

    const cityData = cityValues.map((city) => {
        if (!existingCitiesSet.has(city)) {
            const cityEntity = CITY_DATA.find((value) => value.cityName === city);
            const state = states.find((state) => state.stateName === cityEntity.stateName);

            return {
                cityName: cityEntity.cityName,
                stateId: state.id,
            };
        };
    });

    if (cityData.length > 0) {
        await prisma.city.createMany({
            data: cityData,
        });
    };

    //INSPECTION TYPE
    const inspectionTypeValues = Object.values(InspectionType).map((type) => type.toString());

    const existingInspectionTypes = await prisma.inspectionType.findMany({
        select: {
            inspectionType: true,
        },
    });

    const existingInspectionTypeSet = new Set(existingInspectionTypes.map((inspectionType) => inspectionType.inspectionType));

    const inspectionTypesToDelete: string[] = [];

    for (const type of existingInspectionTypeSet) {
        if (!inspectionTypeValues.includes(type)) {
            inspectionTypesToDelete.push(type);
        };
    };

    if (inspectionTypesToDelete.length > 0) {
        await prisma.inspectionType.deleteMany({
            where: {
                inspectionType: {
                    in: inspectionTypesToDelete,
                },
            },
        });
    };

    const inspectionTypesToCreate: {
        id: number,
        inspectionType: string
    }[] = [];

    let typeIndex = 0;

    for (const type of inspectionTypeValues) {
        typeIndex++;

        if (existingInspectionTypeSet.has(type)) {
            continue;
        } else {
            inspectionTypesToCreate.push({
                id: typeIndex,
                inspectionType: type,
            });
        };
    };

    if (inspectionTypesToCreate.length > 0) {
        await prisma.inspectionType.createMany({
            data: inspectionTypesToCreate,
        });
    };

    //INSPECTION STATUS
    const inspectionStatusValues = Object.values(InspectionStatus).map((status) => status.toString());

    const existingInspectionStatuses = await prisma.inspectionStatus.findMany({
        select: {
            inspectionStatus: true,
        },
    });

    const existingInspectionStatusSet = new Set(existingInspectionStatuses.map((inspectionStatus) => inspectionStatus.inspectionStatus));

    const inspectionStatusesToDelete: string[] = [];

    for (const status of existingInspectionStatusSet) {
        if (!inspectionStatusValues.includes(status)) {
            inspectionStatusesToDelete.push(status);
        };
    };

    if (inspectionStatusesToDelete.length > 0) {
        await prisma.inspectionStatus.deleteMany({
            where: {
                inspectionStatus: {
                    in: inspectionStatusesToDelete,
                },
            },
        });
    };

    const inspectionStatusesToCreate: {
        id: number,
        inspectionStatus: string
    }[] = [];

    let inspectionstatusIndex = 0;

    for (const status of inspectionStatusValues) {
        inspectionstatusIndex++;

        if (existingInspectionStatusSet.has(status)) {
            continue;
        } else {
            inspectionStatusesToCreate.push({
                id: inspectionstatusIndex,
                inspectionStatus: status,
            });
        };
    };

    if (inspectionStatusesToCreate.length > 0) {
        await prisma.inspectionStatus.createMany({
            data: inspectionStatusesToCreate,
        });
    };

    //PREQUALIFICATION STATUS

    const prequalificationStatusValues = Object.values(PrequalificationStatus).map((status) => status.toString());

    const existingPrequalificationStatuses = await prisma.prequalificationStatus.findMany({
        select: {
            prequalificationStatus: true,
        },
    });

    const existingPrequalificationStatusSet = new Set(existingPrequalificationStatuses.map((prequalificationStatus) => prequalificationStatus.prequalificationStatus));

    const prequalificationStatusesToDelete: string[] = [];

    for (const status of existingPrequalificationStatusSet) {
        if (!prequalificationStatusValues.includes(status)) {
            prequalificationStatusesToDelete.push(status);
        }
    }

    if (prequalificationStatusesToDelete.length > 0) {
        await prisma.prequalificationStatus.deleteMany({
            where: {
                prequalificationStatus: {
                    in: prequalificationStatusesToDelete,
                },
            },
        });
    }

    const prequalificationStatusesToCreate: {
        id: number,
        prequalificationStatus: string
    }[] = [];

    let prequalificationStatusIndex = 0;

    for (const status of prequalificationStatusValues) {
        prequalificationStatusIndex++;

        if (existingPrequalificationStatusSet.has(status)) {
            continue;
        } else {
            prequalificationStatusesToCreate.push({
                id: prequalificationStatusIndex,
                prequalificationStatus: status,
            });
        }
    }

    if (prequalificationStatusesToCreate.length > 0) {
        await prisma.prequalificationStatus.createMany({
            data: prequalificationStatusesToCreate,
        });
    };

    //PROJECT MEDIA CATEGORY

    const projectMediaCategoryValues = PROJECT_MEDIA_CATEGORY.map((category) => category.mediaCategory);

    const existingProjectMediaCategories = await prisma.projectMediaCategory.findMany({
        select: {
            mediaCategory: true,
        },
    });

    const existingProjectMediaCategorySet = new Set(existingProjectMediaCategories.map((projectMediaCategory) => projectMediaCategory.mediaCategory));

    const projectMediaCategoriesToDelete: string[] = [];

    for (const category of existingProjectMediaCategorySet) {
        if (!projectMediaCategoryValues.includes(category)) {
            projectMediaCategoriesToDelete.push(category);
        }
    }

    if (projectMediaCategoriesToDelete.length > 0) {
        await prisma.projectMediaCategory.deleteMany({
            where: {
                mediaCategory: {
                    in: projectMediaCategoriesToDelete,
                },
            },
        });
    }

    const projectMediaCategoryData = projectMediaCategoryValues.map((category) => {
        if (!existingProjectMediaCategorySet.has(category)) {
            const categoryEntity = PROJECT_MEDIA_CATEGORY.find((value) => value.mediaCategory === category);

            return {
                mediaCategory: categoryEntity.mediaCategory,
                required: categoryEntity.required
            };
        };
    });

    if (projectMediaCategoryData.length > 0) {
        await prisma.projectMediaCategory.createMany({
            data: projectMediaCategoryData,
        });
    };

    //INVESTMENT STATE

    const investmentStateValues = Object.values(InvestmentState).map((state) => state.toString());

    const existingInvestmentStates = await prisma.investmentState.findMany({
        select: {
            investmentState: true,
        },
    });

    const existingInvestmentStateSet = new Set(existingInvestmentStates.map((investmentState) => investmentState.investmentState));

    const investmentStatesToDelete: string[] = [];

    for (const state of existingInvestmentStateSet) {
        if (!investmentStateValues.includes(state)) {
            investmentStatesToDelete.push(state);
        }
    }

    if (investmentStatesToDelete.length > 0) {
        await prisma.investmentState.deleteMany({
            where: {
                investmentState: {
                    in: investmentStatesToDelete,
                },
            },
        });
    }

    const investmentStatesToCreate: {
        id: number,
        investmentState: string
    }[] = [];

    let investmentStateIndex = 0;

    for (const state of investmentStateValues) {
        investmentStateIndex++;

        if (existingInvestmentStateSet.has(state)) {
            continue;
        } else {
            investmentStatesToCreate.push({
                id: investmentStateIndex,
                investmentState: state,
            });
        }
    }

    if (investmentStatesToCreate.length > 0) {
        await prisma.investmentState.createMany({
            data: investmentStatesToCreate,
        });
    }

    //INVESTMENT FREQUENCY

    const investmentFrequencyValues = Object.values(InvestmentFrequency).map((frequency) => frequency.toString());

    const existingInvestmentFrequencies = await prisma.investmentFrequency.findMany({
        select: {
            investmentFrequency: true,
        },
    });

    const existingInvestmentFrequencySet = new Set(existingInvestmentFrequencies.map((investmentFrequency) => investmentFrequency.investmentFrequency));

    const investmentFrequenciesToDelete: string[] = [];

    for (const frequency of existingInvestmentFrequencySet) {
        if (!investmentFrequencyValues.includes(frequency)) {
            investmentFrequenciesToDelete.push(frequency);
        }
    }

    if (investmentFrequenciesToDelete.length > 0) {
        await prisma.investmentFrequency.deleteMany({
            where: {
                investmentFrequency: {
                    in: investmentFrequenciesToDelete,
                },
            },
        });
    }

    const investmentFrequenciesToCreate: {
        id: number,
        investmentFrequency: string
    }[] = [];

    let investmentFrequencyIndex = 0;

    for (const frequency of investmentFrequencyValues) {
        investmentFrequencyIndex++;

        if (existingInvestmentFrequencySet.has(frequency)) {
            continue;
        } else {
            investmentFrequenciesToCreate.push({
                id: investmentFrequencyIndex,
                investmentFrequency: frequency,
            });
        }
    }

    if (investmentFrequenciesToCreate.length > 0) {
        await prisma.investmentFrequency.createMany({
            data: investmentFrequenciesToCreate,
        });
    }

    //PAYMENT STATUS

    const paymentStatusValues = Object.values(PaymentStatus).map((status) => status.toString());

    const existingPaymentStatuses = await prisma.paymentStatus.findMany({
        select: {
            paymentStatus: true,
        },
    });

    const existingPaymentStatusSet = new Set(existingPaymentStatuses.map((paymentStatus) => paymentStatus.paymentStatus));

    const paymentStatusesToDelete: string[] = [];

    for (const status of existingPaymentStatusSet) {
        if (!paymentStatusValues.includes(status)) {
            paymentStatusesToDelete.push(status);
        };
    };

    if (paymentStatusesToDelete.length > 0) {
        await prisma.paymentStatus.deleteMany({
            where: {
                paymentStatus: {
                    in: paymentStatusesToDelete,
                },
            },
        });
    };

    const paymentStatusesToCreate: {
        id: number,
        paymentStatus: string
    }[] = [];

    let paymentStatusIndex = 0;

    for (const status of paymentStatusValues) {
        paymentStatusIndex++;

        if (existingPaymentStatusSet.has(status)) {
            continue;
        } else {
            paymentStatusesToCreate.push({
                id: paymentStatusIndex,
                paymentStatus: status,
            });
        };
    };

    if (paymentStatusesToCreate.length > 0) {
        await prisma.paymentStatus.createMany({
            data: paymentStatusesToCreate,
        });
    };

    //PURCHASE REQUEST STATUS

    const purchaseRequestStatusValues = Object.values(PurchaseRequestStatus).map((status) => status.toString());

    const existingPurchaseRequestStatuses = await prisma.purchaseRequestStatus.findMany({
        select: {
            purchaseRequestStatus: true,
        },
    });

    const existingPurchaseRequestStatusSet = new Set(existingPurchaseRequestStatuses.map((requestStatus) => requestStatus.purchaseRequestStatus));

    const purchaseRequestStatusesToDelete: string[] = [];

    for (const status of existingPurchaseRequestStatusSet) {
        if (!purchaseRequestStatusValues.includes(status)) {
            purchaseRequestStatusesToDelete.push(status);
        };
    };

    if (purchaseRequestStatusesToDelete.length > 0) {
        await prisma.purchaseRequestStatus.deleteMany({
            where: {
                purchaseRequestStatus: {
                    in: purchaseRequestStatusesToDelete,
                },
            },
        });
    };

    const purchaseRequestStatusesToCreate: {
        id: number,
        purchaseRequestStatus: string
    }[] = [];

    let purchaseRequestStatusIndex = 0;

    for (const status of purchaseRequestStatusValues) {
        purchaseRequestStatusIndex++;

        if (existingPurchaseRequestStatusSet.has(status)) {
            continue;
        } else {
            purchaseRequestStatusesToCreate.push({
                id: purchaseRequestStatusIndex,
                purchaseRequestStatus: status,
            });
        };
    };

    if (purchaseRequestStatusesToCreate.length > 0) {
        await prisma.purchaseRequestStatus.createMany({
            data: purchaseRequestStatusesToCreate,
        });
    };

    //MORTGAGE STATUS

    const mortgageStatusValues = Object.values(MortgageStatus).map((status) => status.toString());

    const existingMortgageStatuses = await prisma.mortgageStatus.findMany({
        select: {
            mortgageStatus: true,
        },
    });

    const existingMortgageStatusSet = new Set(existingMortgageStatuses.map((mortgageStatus) => mortgageStatus.mortgageStatus));

    const mortgageStatusesToDelete: string[] = [];

    for (const status of existingMortgageStatusSet) {
        if (!mortgageStatusValues.includes(status)) {
            mortgageStatusesToDelete.push(status);
        };
    };

    if (mortgageStatusesToDelete.length > 0) {
        await prisma.mortgageStatus.deleteMany({
            where: {
                mortgageStatus: {
                    in: mortgageStatusesToDelete,
                },
            },
        });
    };

    const mortgageStatusesToCreate: {
        id: number,
        mortgageStatus: string
    }[] = [];

    let mortgageStatusIndex = 0;

    for (const status of mortgageStatusValues) {
        mortgageStatusIndex++;

        if (existingMortgageStatusSet.has(status)) {
            continue;
        } else {
            mortgageStatusesToCreate.push({
                id: mortgageStatusIndex,
                mortgageStatus: status,
            });
        };
    };

    if (mortgageStatusesToCreate.length > 0) {
        await prisma.mortgageStatus.createMany({
            data: mortgageStatusesToCreate,
        });
    };
};

seed()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });