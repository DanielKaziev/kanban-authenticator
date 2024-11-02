import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import tokenService from "./service/tokenService";

const PROTO_PATH = path.join(__dirname, "./proto/auth.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth as any;

const server = new grpc.Server();

server.addService(authProto.AuthService.service, {
  ValidateToken: (call: any, callback: any) => {
    const { token, permission } = call.request;
    const validationResult = tokenService.validateAccessTokenWithPermission(
      token,
      permission
    );
    callback(null, validationResult);
  },
});

const PORT = process.env.GRPC_PORT || "50051";

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`gRPC server running at http://0.0.0.0:${PORT}`);
    server.start();
  }
);
