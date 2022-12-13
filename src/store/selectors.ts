import { RootState } from "./reducer";
import { backdropAdapter } from "./slices/backdrops";
import { tokenAdapter } from "./slices/tokens";

export const selectActiveLayer = (state: RootState) => state.app.activeLayer;
export const selectContextMenu = (state: RootState) => state.app.contextMenu;
export const selectDialog = (state: RootState) => state.app.dialog;
export const selectDraggingId = (state: RootState) => state.app.dragging;
export const selectPosition = (state: RootState) => state.app.position;

export const {
  selectAll: selectAllTokens,
  selectEntities: selectTokenDictionary,
} = tokenAdapter.getSelectors<RootState>((state) => state.tokens);

export const { selectAll: selectAllBackdrops } =
  backdropAdapter.getSelectors<RootState>((state) => state.backdrops);
