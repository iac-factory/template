declare module "Parameter" {
    export type Parameter<String extends string, Delimiter extends "/" | "." | "-" | ""> = string extends String ? string[] :
        String extends '' ? [] :
            String extends `${infer Constant}${Delimiter}${infer Inference}` ? [Constant, ... Parameter<Inference, Delimiter>] :
                String extends `${infer Inference}${infer Constant}${Delimiter}` ? [... Parameter<Inference, Delimiter>] :
                    [String];

    export type Extended<String extends string, Delimiter extends "/" | "." | "-" | ""> =
        string extends String ? string[] :
            String extends '' ? []:
                String extends `${Delimiter}${infer Constant}` ? [... Extended<Constant, Delimiter>] :
                    String extends `${infer Constant}${Delimiter}` ? [... Extended<Constant, Delimiter>] :
                        [String];

    export function Slash<Namespace extends Parameter<string, "/">[0], Environment extends Parameter<string, "/">[1], Application extends Parameter<string, "/">[2], Service extends Parameter<string, "/">[3], Identifier extends Parameter<string, "/">[4]>(namespace: `${Namespace}`, environment: `${Environment}`, application: `${Application}`, service: `${Service}`, identifier: `${Identifier}`): `${Namespace}/${Environment}/${Application}/${Service}/${Identifier}` & Parameter<`${Namespace}/${Environment}/${Application}/${Service}/${Identifier}`, "/"> & {
        readonly Namespace: Namespace,
        readonly Environment: Environment,
        readonly Application: Application,
        readonly Service: Service,
        readonly Identifier: Identifier
    };

    export function Dot<Namespace extends Parameter<string, ".">[0], Environment extends Parameter<string, ".">[1], Application extends Parameter<string, ".">[2], Service extends Parameter<string, ".">[3], Identifier extends Parameter<string, ".">[4]>(namespace: `${Namespace}`, environment: `${Environment}`, application: `${Application}`, service: `${Service}`, identifier: `${Identifier}`): `${Namespace}.${Environment}.${Application}.${Service}.${Identifier}` & Parameter<`${Namespace}.${Environment}.${Application}.${Service}.${Identifier}`, "."> & {
        readonly Namespace: Namespace,
        readonly Environment: Environment,
        readonly Application: Application,
        readonly Service: Service,
        readonly Identifier: Identifier
    };

    export function Dash<Namespace extends Parameter<string, "-">[0], Environment extends Parameter<string, "-">[1], Application extends Parameter<string, "-">[2], Service extends Parameter<string, "-">[3], Identifier extends Parameter<string, "-">[4]>(namespace: `${Namespace}`, environment: `${Environment}`, application: `${Application}`, service: `${Service}`, identifier: `${Identifier}`): `${Namespace}-${Environment}-${Application}-${Service}-${Identifier}` & Parameter<`${Namespace}-${Environment}-${Application}-${Service}-${Identifier}`, "-"> & {
        readonly Namespace: Namespace,
        readonly Environment: Environment,
        readonly Application: Application,
        readonly Service: Service,
        readonly Identifier: Identifier
    };

    export enum Environment {
        Development = "Development",
        development = "Development",
        QA = "QA",
        qa = "QA",
        Staging = "Staging",
        staging = "Staging",
        UAT = "UAT",
        uat = "UAT",
        "Pre-Production" = "Pre-Production",
        "pre-production" = "pre-production",
        Production = "Production",
        production = "Production"
    }

    export type Environments = keyof Pick<typeof Environment, "Development"> | keyof Pick<typeof Environment, "QA"> | keyof Pick<typeof Environment, "Staging"> | keyof Pick<typeof Environment, "UAT"> | keyof Pick<typeof Environment, "Production">;
}

/// const slash = Slash("Organization", "Development", "Platform", "Utility", "Unique");
/// const dot = Dot("Organization", "Development", "Platform", "Utility", "Unique");
/// const dash = Dash("Organization", "Development", "Platform", "Utility", "Unique");
