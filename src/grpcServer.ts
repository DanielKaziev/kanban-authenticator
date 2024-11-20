import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import {
  handleValidateToken,
  handleValidateTokenPermission,
} from "./proto/token";

const PROTO_PATH = path.join(__dirname, "./proto/auth.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth as any;

const GRPC_HOST = process.env.KANBAN_GRPC_HOST || "localhost"
const GRPC_PORT = process.env.KANBAN_GRPC_PORT || "50051"

const server = new grpc.Server();

server.addService(authProto.AuthService.service, {
  ValidateTokenPermission: handleValidateTokenPermission,
  ValidateToken: handleValidateToken,
});

server.bindAsync(
  `${GRPC_HOST}:${GRPC_PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`gRPC server running at ${GRPC_HOST}:${GRPC_PORT}`);
  }
);
