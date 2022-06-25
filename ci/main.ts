import * as OS                 from "os";
import { TerraformStack } from "cdktf";

import { Application } from "cdktf-factory";
import { Output } from "cdktf-factory";

import { DockerProvider, Container, DataDockerImage } from "@cdktf/provider-docker";

export class Implementation extends TerraformStack {
    /*** Local Development Loopback Hostname := `host.docker.internal` */
    constructor(name: string) {
        super( Application, name );

        new DockerProvider( this, "docker-provider", {
            host: "unix:///var/run/docker.sock"
        } );

        /*** Locally Built - Requires System-Specific Preparation Prior to Deployment */
        const image = new DataDockerImage(this, "docker-image", {
            name: "template"
        });

        /*** The Deployable Service */
        const container = new Container( this, "docker-container", {
            name: name,
            /*** The ID of the image to back the container */
            image: image.name,
            workingDir: "/usr/share/application",
            /*** Environment variables to set in the form of `KEY=VALUE`, e.g. `DEBUG=0` */
            env: [],
            hostname: "iac-api.internal",
            /*** IPC sharing mode for the container. Possible values are: `none`, `private`, `shareable`,` container:<name|id>` or `host`. */
            ipcMode: "host",
            logDriver: ( OS.platform() !== "darwin" ) ? "awslogs" : "local",
            logOpts: ( OS.platform() !== "darwin" ) ? {
                logDriver: ( OS.platform() !== "darwin" ) ? "awslogs" : "local",
                "awslogs-region": "us-east-2",
                "awslogs-create-group": "true",
                "awslogs-group": [ name, "log-group" ].join( "-" ),
                "awslogs-stream-prefix": [ name, "stream" ].join( "-" )
            } : {},
            networkMode: "default",
            ports: [
                {
                    /*** Internal Docker network listening port */
                    internal: 3000,
                    /*** The port the service will be available to the host on */
                    external: 3000
                }
            ],
            /*** Run a Privileged Container - Note that AWS Fargate Containers Cannot run Privileged */
            privileged: false,
            /*** Upon Failure or Stop, Restart the Container - Note that AWS Fargate Disregards this Option */
            restart: "no",
            command: [ "node", "." ]
        } );

        new Output(this, "container", {
            value: container
        });
    }
}

export const Instance = new Implementation( "template" );

Application.synth();
