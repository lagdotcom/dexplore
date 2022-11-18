import { RootState } from "./reducer";
import { tokenAdapter } from "./slices/tokens";

export const selectDraggingTokenId = (state: RootState) => state.app.dragging;

export const {
  selectAll: selectAllTokens,
  selectEntities: selectTokenDictionary,
} = tokenAdapter.getSelectors<RootState>((state) => state.tokens);
