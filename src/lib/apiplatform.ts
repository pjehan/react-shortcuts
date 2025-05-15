export type ResourceType = 'hydra:Collection';

interface HydraView {
    '@id': string;
    type: string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:previous': string;
    'hydra:next': string;
}

interface HydraSearch {
    '@type': 'string';
    'hydra:template': 'string';
    'hydra:variableRepresentation': 'string';
    'hydra:mapping': [
        {
            '@type': string;
            variable: string;
            property: string;
            required: true;
        }
    ]
}

export interface Collection<T> {
    'hydra:member': T[];
    'hydra:totalItems': number;
    'hydra:view': HydraView;
    'hydra:search': HydraSearch;
}