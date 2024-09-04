export type ScopeAuthorizationFunc = ({ hasScopes, requiredScopes, }: {
    hasScopes: string[];
    requiredScopes: string[];
}) => boolean;
export declare function performAuthorizationCheck({ hasScopes, requiredScopes, }: {
    hasScopes: string[];
    requiredScopes: string[];
}): boolean;
