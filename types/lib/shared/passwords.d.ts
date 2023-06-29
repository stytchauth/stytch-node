export interface MD5MigrateRequest {
    hash_type: "md_5";
    md_5_config?: {
        prepend_salt?: string;
        append_salt?: string;
    };
}
export interface BcryptMigrateRequest {
    hash_type: "bcrypt";
}
export interface Argon2IMigrateRequest {
    hash_type: "argon_2i";
    argon_2_config?: {
        salt: string;
        iteration_amount: number;
        memory: number;
        threads: number;
        key_length: number;
    };
}
export interface Argon2IDMigrateRequest {
    hash_type: "argon_2id";
    argon_2_config?: {
        salt: string;
        iteration_amount: number;
        memory: number;
        threads: number;
        key_length: number;
    };
}
export interface SHA1MigrateRequest {
    hash_type: "sha_1";
    sha_1_config?: {
        prepend_salt?: string;
        append_salt?: string;
    };
}
export interface PHPassMigrateRequest {
    hash_type: "phpass";
}
export interface ScryptMigrateRequest {
    hash_type: "scrypt";
    scrypt_config?: {
        salt: string;
        n_parameter: number;
        r_parameter: number;
        p_parameter: number;
        key_length: number;
    };
}
export interface PBKDF2MigrateRequest {
    hash_type: "pbkdf_2";
    pbkdf_2_config?: {
        salt: string;
        iteration_amount: number;
        key_length: number;
    };
}
