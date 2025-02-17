import { NextFunction, Request, Response, RequestHandler } from "express";
import { envs } from "../../config/envs";


export class GithubSha256Middleware {

  private static encoder = new TextEncoder();

  constructor() {}

  static verifyGithubSignature = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["x-hub-signature-256"] as string;
    const payload = JSON.stringify(req.body);
    const secret = envs.SECRET_TOKEN;

    if (!header) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    let isValid = await GithubSha256Middleware.verifySignature(secret, header, payload);

    if (isValid) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  private static async verifySignature(secret: string, header: string, payload: string) {

    try {
      let parts = header.split("=");
      let sigHex = parts[1];

      let algorithm = { name: "HMAC", hash: { name: "SHA-256" } };

      let keyBytes = GithubSha256Middleware.encoder.encode(secret);
      let extractable = false;
      let key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        ["sign", "verify"]
      );

      let sigBytes = GithubSha256Middleware.hexToBytes(sigHex);
      let dataBytes = GithubSha256Middleware.encoder.encode(payload);
      let equal = await crypto.subtle.verify(
        algorithm,
        key,
        sigBytes,
        dataBytes
      );

      return equal;

    } catch (error) {
      console.error(error);
      return false;
    }

  };

  private static hexToBytes(hex: string) {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      let c = hex.slice(i * 2, i * 2 + 2);
      let byte = parseInt(c, 16);
      bytes[i] = byte;
    }

    return bytes;
  }

}