/**
 * @jest-environment jsdom
 */
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

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("Navigation Test", () => {
  it("Should route to selected in navbar", async () => {
    const { page } = await getPage({
      route: "/",
    });
    render(page);
    expect(await screen.findByText("Next.js + GraphQL")).toBeInTheDocument();
    useEvent.click(screen.getByTestId("makeVar-nav"));
    expect(await screen.findByText("makeVar")).toBeInTheDocument();
    useEvent.click(screen.getByTestId("fetchPolicy-nav"));
    expect(await screen.findByText("Hasura main page")).toBeInTheDocument();
    useEvent.click(screen.getByTestId("crud-nav"));
    expect(await screen.findByText("Hasura CRUD")).toBeInTheDocument();
    useEvent.click(screen.getByTestId("ssg-nav"));
    expect(await screen.findByText("SSG+ISR")).toBeInTheDocument();
    useEvent.click(screen.getByTestId("memo-nav"));
    expect(
      await screen.findByText("Custom hook + useCallback + memo")
    ).toBeInTheDocument();
    useEvent.click(screen.getByTestId("home-nav"));
    expect(await screen.findByText("Next.js + GraphQL")).toBeInTheDocument();
  });
});
