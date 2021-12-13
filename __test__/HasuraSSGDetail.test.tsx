/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { getPage, initTestHelpers } from "next-page-tester";
import { setupServer } from "msw/node";
import { handlers } from "../mock/handlers";
import "setimmediate";

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

describe("UserDetail Test Cases", () => {
  it("Should render the user detail pre-fetched by getStaticProps", async () => {
    const { page } = await getPage({
      route: "/users/9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d3",
    });
  });
  //   it("Should render the user detail pre-fetched by getStaticProps", async () => {
  //     const { page } = await getPage({
  //       route: "/users/9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d3",
  //     });
  //     render(page);
  //     expect(await screen.findByText("User detail")).toBeInTheDocument();
  //     expect(screen.getByText("Test user A")).toBeInTheDocument();
  //   });
});
