import type { ResourceType as ResourceTypeBase } from "./apiplatform";

type ResourceType = ResourceTypeBase & 'Category' | 'MediaObject' | 'Shortcut' | 'Software';

interface Resource {
    '@id'?: string;
    '@type'?: ResourceType;
}

export interface MediaObject extends Resource {
    contentUrl: string;
}

export interface Category extends Resource {
    id: number;
    name: string;
    shortcuts: string[];
}

export interface Software extends Resource {
    id: number;
    name: string;
    logo: MediaObject;
}

export interface Shortcut extends Resource {
    id?: number;
    title: string;
    windows: string;
    macos: string;
    linux: string;
    context: string;
    description: string;
    image?: MediaObject;
    created_at?: Date;
    software: Software|string;
    categories: Category[]|string[];
}
