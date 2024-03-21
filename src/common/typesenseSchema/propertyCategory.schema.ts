import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";


export const propertyCategorySchema: CollectionCreateSchema = {
    name: "propertyCategory",
    fields: [
        { "name": "id", "type": "string", "optional": false },
        { "name": "categoryName", "type": 'string', "optional": false },
        { "name": "createdAt", "type": "string", "optional": false },
    ],
    "default_sorting_field": "",
};