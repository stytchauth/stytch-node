import { base64Encode } from "../../lib/shared/base64";
import { randomBytes, randomUUID } from "crypto";

describe("base64Encode", () => {
  test("Successfully encodes a project ID and secret for basic auth", () => {
    const project_id = "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317";
    const secret = "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=";
    const header = project_id + ":" + secret;

    const expected = Buffer.from(header).toString("base64");
    const encoded = base64Encode(header);

    expect(encoded).toEqual(expected);
  });

  test("Successfully encodes a variety of inputs", () => {
    const inputs = [];

    for (let i = 0; i < 200; i++) {
      inputs.push(randomUUID());
      inputs.push(randomBytes(20).toString("hex"));
      inputs.push(randomBytes(20).toString("ascii"));
      inputs.push(randomBytes(20).toString("base64"));
      inputs.push(randomBytes(20).toString("base64url"));
    }

    for (const input of inputs) {
      const expected = Buffer.from(input).toString("base64");
      const encoded = base64Encode(input);
      expect(encoded).toEqual(expected);
    }
  });

  test("Throws an error when given unicode input", () => {
    expect(() => base64Encode("😅")).toThrow(
      "Base64 encoded unicode is not supported. Cannot encode 😅"
    );
  });
});
