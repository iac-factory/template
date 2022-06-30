export * from "./module";

void ( async () => {
    const debug = ( process.argv.includes( "--redis" ) );

    const test = async () => {
        const { Cache } = await import(".");

        const data = await Cache.hash();

        console.log( data  );
    };

    ( debug ) && await test();
} )();

// aws ec2 describe-instances --filters Name=tag:Bastion,Values=Development --output json --query 'Reservations[*].Instances[*].[PrivateIpAddress,InstanceId,PublicDnsName,Tags[?Key==`Name`].Value]' --no-cli-auto-prompt