import React from "react";
import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import pokemonPage from "../../redux/pokemonPage";
import { AppState } from "../../redux/types";
import PokemonList from "./";
import { withRedux, withRouter } from "../testHelpers";

describe("PokemonList container", () => {
  let renderResult: RenderResult | undefined = undefined;
  let routerValuesResult: any;
  let dispatchSpy: jest.SpyInstance | undefined = undefined;

  beforeEach(() => {
    const initialState: Partial<AppState> = {
      pokemonPage: {
        loading: false,
        error: "error",
        pageCount: 111,
        currentPage: 2,
        data: {
          count: 10,
          previous: "the-url-for-previous-page",
          next: "the-url-for-next-page",
          results: [{ name: "aaa", url: "http://aaa.com" }]
        },
        details: new Map([["aaa", { loading: true, error: undefined, data: undefined }]])
      }
    };

    const reduxResult = withRedux(<PokemonList />, { pokemonPage }, initialState);
    dispatchSpy = reduxResult.dispatchSpy;

    const routerResult = withRouter(reduxResult.result);
    renderResult = render(routerResult.result);
    routerValuesResult = routerResult.routerValues;
  });

  describe("pagination", () => {
    it("renders current and total page", () => {
      expect(renderResult!.getByTestId("pagination-values")).toHaveTextContent(
        /^page 2 of 111$/
      );
    });

    it("goes to next page", () => {
      userEvent.click(renderResult!.getByTestId("pagination-button-right"));

      expect(dispatchSpy!.mock.calls).toEqual([
        [
          {
            type: "pokemonData/clearData",
            payload: undefined
          }
        ],
        [
          {
            type: "pokemonPage/fetchPage",
            payload: {
              url: "the-url-for-next-page"
            }
          }
        ]
      ]);
    });

    it("goes to previous page", () => {
      userEvent.click(renderResult!.getByTestId("pagination-button-left"));

      expect(dispatchSpy!.mock.calls).toEqual([
        [
          {
            type: "pokemonData/clearData",
            payload: undefined
          }
        ],
        [
          {
            type: "pokemonPage/fetchPage",
            payload: {
              url: "the-url-for-previous-page"
            }
          }
        ]
      ]);
    });
  });

  describe("cards", () => {
    test("go to pokemon details route on click", () => {
      expect(routerValuesResult.location.pathname).toEqual("/");

      userEvent.click(renderResult!.getByTestId("card"));

      expect(routerValuesResult.location.pathname).toEqual("/pokemon/aaa");
    });
  });
});
