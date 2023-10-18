import { request } from "../../lib/shared";
import { MOCK_FETCH_CONFIG } from "../helpers";

const fetchMock = jest.fn();

global.fetch = fetchMock;

beforeEach(() => {
  jest.resetAllMocks();
});

const mockResponse = (data: unknown, statusCode: number) => {
  fetchMock.mockResolvedValueOnce({
    json: async () => data,
    status: statusCode,
  });
};

describe("request", () => {
  test("successful response returns data", () => {
    mockResponse({ key: "value" }, 200);
    expect(
      request(MOCK_FETCH_CONFIG, {
        url: "http://localhost:8000/hello",
        method: "GET",
      })
    ).resolves.toEqual({ key: "value" });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8000/hello", {
      method: "GET",
      cache: "no-store",
      ...MOCK_FETCH_CONFIG,
    });
  });

  test("Appends key-value pairs to the URL search params", async () => {
    mockResponse({ key: "value" }, 200);
    await request(MOCK_FETCH_CONFIG, {
      url: "http://localhost:8000/hello",
      method: "GET",
      cache: "no-store",
      params: {
        string: "here",
        number: 1234,
      },
    });

    const expectedURL = "http://localhost:8000/hello?string=here&number=1234";

    expect(fetchMock).toHaveBeenCalledWith(expectedURL, {
      method: "GET",
      cache: "no-store",
      ...MOCK_FETCH_CONFIG,
    });
  });

  test("Stringifies the request JSON body", async () => {
    mockResponse({ key: "value" }, 200);
    await request(MOCK_FETCH_CONFIG, {
      url: "http://localhost:8000/hello",
      method: "GET",
      data: {
        string: "here",
        number: 1234,
        deep: {
          array: [123],
        },
      },
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8000/hello", {
      method: "GET",
      cache: "no-store",
      body: `{"string":"here","number":1234,"deep":{"array":[123]}}`,
      ...MOCK_FETCH_CONFIG,
    });
  });

  test("error response throws inspectable error", async () => {
    expect.assertions(2);

    mockResponse(
      {
        status_code: 400,
        error_type: "bad_request",
        error_message: "Whoops!",
        error_url: "https://stytch.com/docs/api/errors/400",
      },
      400
    );

    await request(MOCK_FETCH_CONFIG, {
      url: "http://localhost:8000/whoops",
      method: "POST",
    }).catch((err) => {
      expect(err).toMatchObject({
        status_code: 400,
        error_type: "bad_request",
        error_message: "Whoops!",
        error_url: "https://stytch.com/docs/api/errors/400",
      });
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/whoops",
      expect.objectContaining({
        method: "POST",
        ...MOCK_FETCH_CONFIG,
      })
    );
  });

  test("no response rethrows original error", () => {
    expect.assertions(3);

    fetchMock.mockRejectedValue(new Error("connect ECONNREFUSED 127.0.0.1:80"));

    return request(MOCK_FETCH_CONFIG, { url: "nowhere", method: "GET" }).catch(
      (err) => {
        expect(err.toString()).toEqual(
          "Error: connect ECONNREFUSED 127.0.0.1:80"
        );
        expect(err.message).toEqual("connect ECONNREFUSED 127.0.0.1:80");
        expect(err.request).toMatchObject({
          url: "nowhere",
        });
      }
    );
  });

  test("JSON parse error ", () => {
    expect.assertions(3);

    fetchMock.mockRejectedValue(new Error("connect ECONNREFUSED 127.0.0.1:80"));

    return request(MOCK_FETCH_CONFIG, { url: "nowhere", method: "GET" }).catch(
      (err) => {
        expect(err.toString()).toEqual(
          "Error: connect ECONNREFUSED 127.0.0.1:80"
        );
        expect(err.message).toEqual("connect ECONNREFUSED 127.0.0.1:80");
        expect(err.request).toMatchObject({
          url: "nowhere",
        });
      }
    );
  });

  test("unsendable request rethrows original error", () => {
    // Using assertions instead of .rejects so we can check both .toString() and unpacked values
    // in the same matcher.
    expect.assertions(3);

    // BigInts don't serialize, which is weird, but that's useful to us here!
    return request(MOCK_FETCH_CONFIG, {
      url: "bigint",
      method: "GET",
      data: { bigint: BigInt(10) },
    }).catch((err) => {
      expect(err.toString()).toEqual(
        "Error: Do not know how to serialize a BigInt"
      );
      expect(err.message).toEqual("Do not know how to serialize a BigInt");
      expect(err.request).toMatchObject({
        url: "bigint",
      });
    });
  });
});
