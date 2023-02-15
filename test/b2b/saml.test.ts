import { SAML } from "../../lib/b2b/saml";
import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";

jest.mock("../../lib/shared");

beforeEach(() => {
  (request as jest.Mock).mockReset();
  (request as jest.Mock).mockImplementation((_, config) => {
    return Promise.resolve({
      method: config.method,
      path: config.url,
      data: config.data,
      params: config.params,
    });
  });
});

const saml = new SAML(MOCK_FETCH_CONFIG);

describe("saml.create", () => {
  test("success", () => {
    return expect(
      saml.create({
        organization_id: "organization-id-1234",
        display_name: "Test Connection",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "sso/saml/organization-id-1234",
      data: {
        display_name: "Test Connection",
      },
    });
  });
});

describe("saml.update", () => {
  test("success", () => {
    return expect(
      saml.update({
        organization_id: "organization-id-1234",
        connection_id: "saml-connection-5678",
        idp_entity_id: "https://example.com/sso",
        display_name: "Test Connection",
        attribute_mapping: {
          email: "NameID",
          first_name: "firstName",
          last_name: "lastName",
        },
        x509_certificate: "This-is-a-cert",
        idp_sso_url: "https://example.com/sso/start",
      })
    ).resolves.toMatchObject({
      method: "PUT",
      path: "sso/saml/organization-id-1234/connections/saml-connection-5678",
      data: {
        idp_entity_id: "https://example.com/sso",
        display_name: "Test Connection",
        attribute_mapping: {
          email: "NameID",
          first_name: "firstName",
          last_name: "lastName",
        },
        x509_certificate: "This-is-a-cert",
        idp_sso_url: "https://example.com/sso/start",
      },
    });
  });
});

describe("saml.deleteVerificationCertificate", () => {
  test("success", () => {
    return expect(
      saml.deleteVerificationCertificate({
        organization_id: "organization-id-1234",
        connection_id: "saml-connection-5678",
        certificate_id: "verification-certificate-9012",
      })
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "sso/saml/organization-id-1234/connections/saml-connection-5678/verification_certificates/verification-certificate-9012",
    });
  });
});
