import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";


export const projectSchema: CollectionCreateSchema = {
    name: "project",
    fields: [
        { "name": "id", "type": "string", "optional": false },
        { "name": "projectName", "type": 'string', "optional": false },
        { "name": "description", "type": 'string', "optional": false },
        { "name": "developerCompanyId", "type": 'string', "optional": true },
        { "name": "city", "type": 'string', "optional": false },
        { "name": "address", "type": 'string', "optional": false },
        { "name": "userId", "type": 'string', "optional": false },
        { "name": "createdAt", "type": "string", "optional": false },
    ],
    "default_sorting_field": "",
};