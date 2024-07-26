import { createConnectTransport } from "@connectrpc/connect-web"; // npm package
// import * as connectWeb from "@connectrpc/connect-web"; // npm package
import {
  createAuthInterceptor,
  createRegistry,
  createRequest,
  isEmptyMessage,
  streamBlocks,
  unpackMapOutput,
} from "@substreams/core";
// import { serializeMessage } from "./serialize";
import * as fs from "node:fs";
import { createSubstream } from "@substreams/core";
import type { Package } from "@substreams/core/proto";

const readPackageFromFile = (file: string): Package => {
  const fileContents = fs.readFileSync(file);
  return createSubstream(fileContents);
}

const getData = async (JWTtoken: string, module: string) => {
//   const token =
//     "API KEY";
//   const module = "map_apes";
//   const path = "public/substreams-challenge-v0.1.0.spkg";
//   const path = "public/tornado-cash-v1.0.1.spkg";
const path = "public/substreams.spkg"
//   const path = "https://github.com/streamingfast/substreams-uniswap-v3/releases/download/v0.2.7/substreams.spkg"

  const substreamPackage = readPackageFromFile(path);
  const registry = createRegistry(substreamPackage);
//   const transport = connectWeb.createConnectTransport({
  const transport = createConnectTransport({
    baseUrl: "https://api.streamingfast.io",
    interceptors: [createAuthInterceptor(JWTtoken)],
    useBinaryFormat: true,
    jsonOptions: {
      typeRegistry: registry,
    },
  });
  const request = createRequest({
    substreamPackage: substreamPackage,
    outputModule: module,
    productionMode: false, // Set to `true` in production.
    stopBlockNum: "+1000", // Stream the first 10000 blocks. Will follow chain head if not set.
  });

  try {
    for await (const response of streamBlocks(
      transport,
      request
    )) {
      const output = unpackMapOutput(response, registry);
      if (
        output !== undefined &&
        !isEmptyMessage(output)
      ) {
        
        const transfersInBlock = output.toJsonString();

        const parsedData = JSON.parse(transfersInBlock)
        console.log("parsed Data here:::::", parsedData)
        return parsedData;
      } 
    }
  } catch (error) {
    console.log("the error is... :", error);
  }
}

export default getData;