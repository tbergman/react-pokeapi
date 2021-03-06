import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../redux/pokemonPage";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../redux/types";
import { actions as pokemonDataActions } from "../redux/pokemonData";
import { pokemonRoute } from "../routeManager";

export function useFetchInitialPageEffect() {
  const dispatch = useDispatch();
  const pageState = useTypedSelector(state => state.pokemonPage);

  React.useEffect(() => {
    if (pageState.currentPage === 0)
      dispatch(
        actions.fetchPage({
          offset: 0,
          size: 20
        })
      );
  }, [dispatch, pageState.currentPage]);

  React.useEffect(() => {
    dispatch(pokemonDataActions.clearData());
  }, [dispatch]);
}

export function useFetchPage() {
  const dispatch = useDispatch();
  const pageState = useTypedSelector(state => state.pokemonPage);

  return {
    fetchPrevPage: () => {
      if (pageState.data?.previous)
        dispatch(
          actions.fetchPage({
            url: pageState.data.previous
          })
        );
    },
    fetchNextPage: () => {
      if (pageState.data?.next)
        dispatch(
          actions.fetchPage({
            url: pageState.data.next
          })
        );
    }
  };
}

export function usePokemonPageState() {
  return useTypedSelector(state => state.pokemonPage);
}

export function useGoToDetails() {
  const history = useHistory();

  return (pokemonName: string) => {
    history.push(pokemonRoute.generate({ pokemonName }));
  };
}
