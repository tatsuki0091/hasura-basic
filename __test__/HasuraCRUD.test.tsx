import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useEvent from "@testing-library/user-event";
import { getPage, initTestHelpers } from "next-page-tester";
import { setupServer } from "msw/node";
import { handlers } from "../mock/handlers";

process.env.NEXT_PUBLIC_HASURA_URL =
  "https://fitting-albacore-32.hasura.app/v1/graphql";
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

describe("Hasura CRUD test", () => {
  it("Should render the list of user", async () => {
    const { page } = await getPage({
      route: "/hasura-crud",
    });
    render(page);
    expect(await screen.findByText("Hasura CRUD")).toBeInTheDocument();
    expect(await screen.findByText("Test user A")).toBeInTheDocument();

    expect(
      screen.getByText("2021-12-03T19:59:56.094014+00:00")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("edit-9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d3")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("delete-9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d3")
    ).toBeInTheDocument();
    expect(screen.getByText("Test user B")).toBeInTheDocument();
    expect(
      screen.getByText("2021-12-03T19:58:56.094014+00:00")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("edit-9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d2")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("delete-9ef3ccf9-1040-4c91-bee1-d8d4cc8a63d2")
    ).toBeInTheDocument();
  });
});
