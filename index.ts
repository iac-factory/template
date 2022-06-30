/*** Local Development SSH Tunnel */

// import Cluster from "cluster";
//
// (Cluster.isPrimary) && Cluster.fork(process.env);
//
// (Cluster.isPrimary) && (async () => import("./proxy"))();
// (Cluster.isWorker) && (async () => {
//     console.log("[Debug] [Worker] Package Entry Point");
//
//     await import("./src");
// })();
//
// Cluster.on("exit", () => process.emit("exit", 0));

export * from "./src";