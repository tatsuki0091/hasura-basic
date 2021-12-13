import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useEvent from "@testing-library/user-event";
import { getPage, initTestHelpers } from "next-page-tester";
import { setupServer } from "msw/node";
import { handlers } from "../mock/handlers";

process.env.NEXT_PUBLIC_HASURA_URL =
  "https://fitting-albacore-32.hasura.app/v1/graphql";

initTestHelpers();

const server = setupServer(...handlers);

beforeEach(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterEach(() => {
  server.close();
});

describe("Hasura Fetch Test Cases", () => {
  it("Should render the list of users list", async () => {
    const { page } = await getPage({
      route: "/hasura-main",
    });
    render(page);
    expect(await screen.findByText("Hasura main page")).toBeInTheDocument();
  });
});
