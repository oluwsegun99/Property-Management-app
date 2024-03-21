import * as Typesense from "typesense";
import { projectSchema } from "./common/typesenseSchema/project.schema";
import { propertySchema } from "./common/typesenseSchema/property.schema";
import { propertyCategorySchema } from "./common/typesenseSchema/propertyCategory.schema";

require('dotenv').config();

async function createTypesenseCollections() {

    const typesenseClient = new Typesense.Client({
        nodes: [
            {
                host: process.env.TYPESENSE_HOST,
                port: 8108,
                protocol: 'http',
            },
        ],
        apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
    });

    try {
        // Create the Project collection
        await typesenseClient.collections().create(projectSchema);

        // // Create the Property collection
        await typesenseClient.collections().create(propertySchema);

        // // Create Property Category collection
        await typesenseClient.collections().create(propertyCategorySchema);

        // await typesenseClient.collections('project').delete();

        // await typesenseClient.collections().create(projectSchema);

        // await typesenseClient.collections('property').delete();

        // await typesenseClient.collections().create(propertySchema);

        //update the user schema
        // await typesenseClient.collections("users").update(customerShema);

        //update the post schema
        // await typesenseClient.collections("posts").update(updatePostSchema);

        console.log('Collections created successfully.');
    } catch (error) {
        console.error('Error creating collections:', error);
    };
};

async function seed() {
    await createTypesenseCollections();
};

seed()
    .catch((error) => {
        console.error(error);
    });